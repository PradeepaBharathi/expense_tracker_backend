import Expense from "../model/expenseModel.js";

export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    if ( !amount || !category || !date) {
      return res.status(400).json({ message: "Please fill in all details" });
    }
    const newExpense = await Expense.create({
  
      amount: amount,
      category: category,
      date: date,
      description: description,
    });

    if (newExpense) {
      return res
        .status(200)
        .json({ message: "Expense added successfully", newExpense });
    }
    if (!newExpense) {
      return res.status(500).json({ msg: "Expense not added" });
    }
  } catch (error) {
    return res.status(400).json({ message: " error occured" });
  }
};

export const getallExpense = async (req, res) => {
  try {
    const allExpenses = await Expense.find({});
    return res.status(200).json({ expenses: allExpenses });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const getexpensebyDate = async (req, res) => {
  try {
    const today = new Date();

    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const todayExpenses = await Expense.find({
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    console.log(todayExpenses);
    return res.status(200).json({ expenses: todayExpenses });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
