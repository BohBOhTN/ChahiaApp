# ChahiaApp - Poultry Business Management System

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)

A full-stack web application for managing poultry business operations, including inventory tracking, sales management, supplier/client relationships, and financial reporting.

![ChahiaApp Screenshot](./screenshot.png) <!-- Add actual screenshot later -->

## 🚀 Features

- **Role-Based Access Control**
  - Manager: Full system access & analytics
  - Staff: Sales processing & inventory receiving
- **Inventory Management**
  - Track products by weight/pieces
  - Automatic stock updates
  - Supplier purchase tracking
- **Sales & Credit System**
  - Cash/Credit payments
  - Partial payment tracking
  - Client management
- **Financial Tracking**
  - Expense management (rent, utilities)
  - Profit margin calculations
  - Sales/purchase reports
- **Dashboard & Analytics**
  - Real-time inventory status
  - Sales trends visualization
  - Credit payment tracking

## 🛠 Technologies Used

**Frontend**
- React 18
- Redux Toolkit (State management)
- Axios (API calls)
- Chart.js (Data visualization)
- React Router (Navigation)
- Tailwind CSS (Styling)

**Backend**
- Node.js 18
- Express.js 4.18
- PostgreSQL 15 (Database)
- Sequelize (ORM)
- JWT (Authentication)
- Bcrypt (Password hashing)

**Development Tools**
- PostgreSQL
- Postman (API testing)
- Git (Version control)
- Docker (Containerization)

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Git

### Setup Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/BohBOhTN/ChahiaApp.git
   cd ChahiaApp
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Database Configuration**
   - Create PostgreSQL database
     ```bash
     createdb chahia_db
     ```
   - Run migrations & seed data
     ```bash
     npx sequelize-cli db:migrate
     npx sequelize-cli db:seed:all
     ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Environment Variables**
   - Create `.env` files in both frontend/backend directories:
     ```env
     # backend/.env
     DB_NAME=chahia_db
     DB_USER=postgres
     DB_PASSWORD=your_password
     DB_HOST=localhost
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

## 🖥 Usage

### Start Servers
```bash
# Backend (from /backend)
npm start

# Frontend (from /frontend)
npm start
```

### Access Application
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

### Default Accounts
- **Manager:**
  - Email: ali@meatmart.com
  - Password: Manager@123
- **Staff:**
  - Email: fatima@meatmart.com
  - Password: Staff@123

## 📚 API Documentation

### Key Endpoints:
| Endpoint              | Method | Description               |
|-----------------------|--------|---------------------------|
| /api/auth/login       | POST   | User authentication       |
| /api/products         | GET    | Get all products          |
| /api/sales            | POST   | Create new sale           |
| /api/purchases        | POST   | Record goods received     |
| /api/credits/:id/pay  | POST   | Process credit payment    |
| /api/analytics/sales  | GET    | Get sales reports         |

View Full API Documentation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by real-world poultry business needs
- UI components from Heroicons