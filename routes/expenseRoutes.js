import express from 'express'
import { addExpense, getallExpense, getexpensebyDate } from '../controllers/expenseController.js'


const router = express.Router()

router.post("/addexpense",addExpense)
router.get("/getexpense",getallExpense)
router.get("/expensedate",getexpensebyDate)


export default router