-- Create ENUM types
CREATE TYPE user_role AS ENUM ('manager', 'staff');
CREATE TYPE unit_type AS ENUM ('weight', 'piece');
CREATE TYPE payment_status AS ENUM ('paid', 'unpaid', 'partially_paid');
CREATE TYPE payment_method_type AS ENUM ('cash', 'credit');

-- Create Tables
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role user_role NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    credit_terms TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    unit_type unit_type NOT NULL,
    stock NUMERIC(10,2) NOT NULL CHECK (stock >= 0),
    avg_buy_price NUMERIC(10,2) CHECK (avg_buy_price >= 0),
    sell_price NUMERIC(10,2) NOT NULL CHECK (sell_price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    business_type VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE purchases (
    purchase_id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL REFERENCES suppliers(supplier_id) ON DELETE RESTRICT,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE RESTRICT,
    quantity NUMERIC(10,2) NOT NULL CHECK (quantity > 0),
    unit_cost NUMERIC(10,2) NOT NULL CHECK (unit_cost >= 0),
    total_cost NUMERIC(10,2) GENERATED ALWAYS AS (quantity * unit_cost) STORED,
    payment_method payment_method_type NOT NULL,
    invoice_number VARCHAR(255),
    invoice_photo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(client_id) ON DELETE SET NULL,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE RESTRICT,
    quantity NUMERIC(10,2) NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
    total_price NUMERIC(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    payment_method payment_method_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE credit_payments (
    credit_id SERIAL PRIMARY KEY,
    sale_id INT NOT NULL REFERENCES sales(sale_id) ON DELETE CASCADE,
    client_id INT NOT NULL REFERENCES clients(client_id) ON DELETE CASCADE,
    total_due NUMERIC(10,2) NOT NULL CHECK (total_due >= 0),
    total_paid NUMERIC(10,2) NOT NULL CHECK (total_paid >= 0) DEFAULT 0,
    status payment_status NOT NULL DEFAULT 'unpaid',
    due_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (total_paid <= total_due)
);

CREATE TABLE payment_history (
    payment_history_id SERIAL PRIMARY KEY,
    credit_id INT NOT NULL REFERENCES credit_payments(credit_id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    payment_date DATE NOT NULL,
    payment_method payment_method_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expense_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES expense_categories(category_id) ON DELETE RESTRICT,
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    expense_date DATE NOT NULL,
    is_recurring BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_purchases_product ON purchases(product_id);
CREATE INDEX idx_sales_product ON sales(product_id);
CREATE INDEX idx_credit_payments_client ON credit_payments(client_id);
CREATE INDEX idx_credit_payments_due_date ON credit_payments(due_date);

-- Trigger Function for Automatic Stock Update
CREATE OR REPLACE FUNCTION update_inventory()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'purchases' THEN
        UPDATE products
        SET 
            stock = stock + NEW.quantity,
            avg_buy_price = (
                (COALESCE(avg_buy_price * stock, 0) + NEW.unit_cost * NEW.quantity) 
                / (stock + NEW.quantity)
            )
        WHERE product_id = NEW.product_id;
    ELSIF TG_TABLE_NAME = 'sales' THEN
        UPDATE products
        SET stock = stock - NEW.quantity
        WHERE product_id = NEW.product_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create Triggers
CREATE TRIGGER trg_purchases_inventory
AFTER INSERT ON purchases
FOR EACH ROW
EXECUTE FUNCTION update_inventory();

CREATE TRIGGER trg_sales_inventory
AFTER INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION update_inventory();

-- Trigger for Credit Payment Updates
CREATE OR REPLACE FUNCTION update_credit_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.amount = (SELECT total_due FROM credit_payments WHERE credit_id = NEW.credit_id) THEN
        UPDATE credit_payments
        SET 
            total_paid = total_paid + NEW.amount,
            status = 'paid'
        WHERE credit_id = NEW.credit_id;
    ELSE
        UPDATE credit_payments
        SET 
            total_paid = total_paid + NEW.amount,
            status = 'partially_paid'
        WHERE credit_id = NEW.credit_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_payment_history
AFTER INSERT ON payment_history
FOR EACH ROW
EXECUTE FUNCTION update_credit_status();

-- Insert Users
INSERT INTO users (name, email, role, password_hash) VALUES
('Ali Hassan', 'ali@meatmart.com', 'manager', 'hashed_password_123'),
('Fatima Ahmed', 'fatima@meatmart.com', 'staff', 'hashed_password_456'),
('Omar Khalid', 'omar@meatmart.com', 'staff', 'hashed_password_789');

-- Insert Suppliers
INSERT INTO suppliers (name, contact, credit_terms) VALUES
('Fresh Poultry Farms', '+971501234567', 'Net 30 days'),
('Quality Meats Co.', '+971502345678', '50% advance, 50% on delivery'),
('Gulf Chicken Distributors', '+971503456789', 'Cash on delivery');

-- Insert Products
INSERT INTO products (name, category, unit_type, stock, avg_buy_price, sell_price) VALUES
('Whole Chicken', 'Fresh Chicken', 'piece', 150, 12.50, 18.00),
('Chicken Breast', 'Fresh Chicken', 'weight', 200.00, 8.75, 13.50),
('Chicken Thighs', 'Fresh Chicken', 'weight', 180.50, 7.25, 11.00),
('Frozen Chicken Sausages', 'Processed Meats', 'piece', 500, 2.10, 3.50),
('Turkey Breast', 'Specialty Meats',  'weight', 75.00, 15.00, 22.00);

-- Insert Clients
INSERT INTO clients (name, contact, business_type) VALUES
('City Restaurant', 'Mohammed +971504567890', 'Restaurant'),
('Green Grocery', 'Ahmed +971505678901', 'Retail Store'),
('Beachside Cafe', 'Khalid +971506789012', 'Cafe');

-- Insert Purchases (Goods Received)
INSERT INTO purchases (supplier_id, product_id, quantity, unit_cost, payment_method, invoice_number) VALUES
(1, 1, 200, 12.00, 'credit', 'INV-2023-001'),
(2, 2, 150, 8.50, 'cash', 'INV-2023-002'),
(3, 4, 1000, 2.00, 'credit', 'INV-2023-003'),
(1, 3, 100, 7.00, 'cash', 'INV-2023-004');

-- Insert Sales (3 days of transactions)
-- Day 1 Sales
INSERT INTO sales (client_id, product_id, quantity, unit_price, payment_method) VALUES
(1, 2, 25.5, 13.50, 'credit'),  -- Restaurant order
(2, 4, 50, 3.50, 'cash'),       -- Grocery store
(NULL, 1, 3, 18.00, 'cash'),    -- Anonymous customer
(3, 3, 15.2, 11.00, 'credit');  -- Cafe order

-- Day 2 Sales
INSERT INTO sales (client_id, product_id, quantity, unit_price, payment_method) VALUES
(2, 2, 18.7, 13.50, 'cash'),
(NULL, 4, 10, 3.50, 'cash'),
(1, 5, 8.5, 22.00, 'credit');

-- Day 3 Sales
INSERT INTO sales (client_id, product_id, quantity, unit_price, payment_method) VALUES
(3, 1, 5, 18.00, 'cash'),
(2, 3, 22.3, 11.00, 'credit'),
(NULL, 2, 4.5, 13.50, 'cash');

-- Insert Credit Payments
-- For sale_id 1 (City Restaurant)
INSERT INTO credit_payments (sale_id, client_id, total_due, due_date) VALUES
(1, 1, 344.25, '2023-11-15'),
(4, 3, 167.20, '2023-11-18'),
(7, 1, 187.00, '2023-11-20'),
(9, 2, 245.30, '2023-11-22');

-- Partial Payment Example (Client pays 50% early)
INSERT INTO payment_history (credit_id, amount, payment_date, payment_method) VALUES
(1, 172.13, '2023-11-10', 'cash');

-- Insert Expense Categories
INSERT INTO expense_categories (name) VALUES
('Rent'), ('Utilities'), ('Salaries'), ('Delivery'), ('Equipment');

-- Insert Expenses
INSERT INTO expenses (category_id, amount, expense_date, is_recurring) VALUES
(1, 15000.00, '2023-11-01', true),    -- Monthly rent
(2, 2500.00, '2023-11-05', true),     -- Electricity/water
(5, 4200.00, '2023-11-10', false),    -- New refrigerator
(4, 350.00, '2023-11-15', false);     -- Delivery van repair

-- Sample Queries for Backend Development:

-- 1. Current Stock Levels
SELECT product_id, name, stock, unit_type 
FROM products;

-- 2. Pending Credit Payments
SELECT c.name, cp.total_due, cp.total_paid, cp.due_date 
FROM credit_payments cp
JOIN clients c ON cp.client_id = c.client_id
WHERE cp.status != 'paid';

-- 3. Daily Sales Report
SELECT DATE(created_at) AS sale_date, 
       SUM(total_price) AS daily_sales
FROM sales
GROUP BY sale_date
ORDER BY sale_date;

-- 4. Supplier Outstanding Payments
SELECT s.name, SUM(p.total_cost) AS total_owed
FROM purchases p
JOIN suppliers s ON p.supplier_id = s.supplier_id
WHERE p.payment_method = 'credit'
GROUP BY s.name;