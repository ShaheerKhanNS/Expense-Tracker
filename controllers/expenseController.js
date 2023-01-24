const Expense = require("../model/expenseModel");

exports.getAllExpenses = async (req, res) => {
  const data = await Expense.findAll();
  res.status(200).json({
    status: "success",
    data,
  });
};

exports.getExpense = async (req, res) => {
  const id = req.params.id;
  const data = await Expense.findByPk(id);
  res.status(200).json({
    status: "success",
    data,
  });
};

exports.createExpense = async (req, res) => {
  try {
    const expense = req.body.expense;
    const price = req.body.price;
    const worth = req.body.worth;

    const data = await Expense.create({
      expense,
      price,
      worth,
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.updateExpense = async (req, res) => {
  const id = req.params.id;
  const newExpense = req.body.expense;
  const newPrice = req.body.price;
  const newWorth = req.body.worth;

  const data = await Expense.findByPk(id);

  data.expense = newExpense;
  data.price = newPrice;
  data.worth = newWorth;
  await data.save();
  res.status(200).json({
    status: "success",
    data,
  });
};

exports.deleteExpense = async (req, res) => {
  const id = req.params.id;

  const data = await Expense.findByPk(id);
  await data.destroy();
  res.status(204).json({
    status: "success",
  });
};
