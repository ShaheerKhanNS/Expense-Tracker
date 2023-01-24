const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router
  .route("/")
  .get(expenseController.getAllExpenses)
  .post(expenseController.createExpense);
router
  .route("/:id")
  .get(expenseController.getExpense)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
