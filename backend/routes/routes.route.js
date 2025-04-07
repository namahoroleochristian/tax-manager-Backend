import express from 'express'
import { Customer_Register, TaxPayer_register } from '../controllers/user.controller.js'
const app = express()
export const Router = express.Router()


Router.post('/payer/register',TaxPayer_register)
Router.post('/customer/register',Customer_Register)