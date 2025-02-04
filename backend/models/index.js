const User = require('./User');
const Supplier = require('./Supplier');
const Product = require('./Product');
const Client = require('./Client');
const Purchase = require('./Purchase');
const Sale = require('./Sale');
const CreditPayment = require('./CreditPayment');
const PaymentHistory = require('./PaymentHistory');
const ExpenseCategory = require('./ExpenseCategory');
const Expense = require('./Expense');

// Define associations here

module.exports = {
  User,
  Supplier,
  Product,
  Client,
  Purchase,
  Sale,
  CreditPayment,
  PaymentHistory,
  ExpenseCategory,
  Expense,
};
