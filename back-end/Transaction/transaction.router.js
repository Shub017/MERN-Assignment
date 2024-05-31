// Importing the express library
import express from "express";

// Importing the transaction controller module
import transactionController from "./transaction.controller.js";

// Creating a new instance of the express router
const transactionRouter = express.Router();

// Creating a new instance of the TransactionController class from transaction.controller module
const TransactionController = new transactionController();

// Defining a route to handle POST requests to '/gettransactions'
transactionRouter.get('/gettransactions', TransactionController.getTransaction);

// Defining a route to handle POST requests to '/statistics'
transactionRouter.get('/getStatistics', TransactionController.getTotalStats);

transactionRouter.get('/getBarGraphStats', TransactionController.getBarGraphStats);

transactionRouter.get('/getPieChartStats', TransactionController.getPieChartStats);

transactionRouter.get('/getAllTypeStats', TransactionController.getAllTypeStats);
// Handling the default route if none matched
transactionRouter.use((req, res) => {
  res.status(404).send("Route not found");
});

// Exporting the transactionRouter for external usage
export default transactionRouter;
