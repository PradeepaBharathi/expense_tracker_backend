import express from 'express'
import { LoginUser, registerUser } from '../controllers/userController.js'

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",LoginUser)

export default router