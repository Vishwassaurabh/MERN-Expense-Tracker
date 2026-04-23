const express = require("express");
const transactionController = require("../controllers/transactionCtrl");
const Transaction = require("../model/Transaction");
const isAuthenticated = require("../middlewares/isAuth");

const transactionRouter = express.Router();

//! add
transactionRouter.post(
  "/api/v1/transactions/create",
  isAuthenticated,
  transactionController.create,
);

//! lists
transactionRouter.get(
  "/api/v1/transactions/lists",
  isAuthenticated,
  transactionController.getFilteredTransactions,
);

//! update
transactionRouter.put(
  "/api/v1/transactions/update/:id",
  isAuthenticated,
  transactionController.update,
);

//! delete
transactionRouter.delete(
  "/api/v1/transactions/delete/:id",
  isAuthenticated,
  transactionController.delete,
);

module.exports = transactionRouter;
