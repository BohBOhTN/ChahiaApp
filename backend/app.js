require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000;
const sequelize = require('./config/database'); // Updated to use the new database configuration

app.use(cors({ origin: 'http://localhost:5173' })); // Enable CORS for the specified origin
app.use(express.json());

// Import models
const User = require('./models/User');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');
const Client = require('./models/Client');
const Purchase = require('./models/Purchase');
const Sale = require('./models/Sale');
const CreditPayment = require('./models/CreditPayment');
const PaymentHistory = require('./models/PaymentHistory');
const ExpenseCategory = require('./models/ExpenseCategory');
const Expense = require('./models/Expense');

// Check database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Import routes
const userRoutes = require('./routes/users');
const supplierRoutes = require('./routes/suppliers');
const productRoutes = require('./routes/products');
const clientRoutes = require('./routes/clients');
const purchaseRoutes = require('./routes/purchases');
const saleRoutes = require('./routes/sales');
const creditPaymentRoutes = require('./routes/credit_payments');
const paymentHistoryRoutes = require('./routes/payment_history');
const expenseCategoryRoutes = require('./routes/expense_categories');
const expenseRoutes = require('./routes/expenses');

// Use routes
app.use('/users', userRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);
app.use('/clients', clientRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/sales', saleRoutes);
app.use('/credit_payments', creditPaymentRoutes);
app.use('/payment_history', paymentHistoryRoutes);
app.use('/expense_categories', expenseCategoryRoutes);
app.use('/expenses', expenseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
