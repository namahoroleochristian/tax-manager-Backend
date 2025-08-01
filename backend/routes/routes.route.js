import express from 'express'
import { Customer_Login, Customer_Register, forgotPassword, Support_Login, Support_Register, TaxPayer_Login, TaxPayer_register } from '../controllers/user.controller.js'
import { createItem, deleteItem } from '../controllers/items.controller.js'
import { createSaleByBarcode } from '../controllers/sales.controller.js'
import { tokenVerify } from '../middlewares/tokenVerify.js'
const app = express()
export const Router = express.Router()

// ------------- REGISTER --------------------- \\

Router.post('/payer/register',TaxPayer_register)
Router.post('/customer/register',Customer_Register)
Router.post('/support/register',Support_Register)

// ------------- REGISTER --------------------- \\



// ------------- LOGIN --------------------- \\
Router.post('/payer/login',TaxPayer_Login)
Router.post('/customer/login',Customer_Login)
Router.post('/support/login',Support_Login)

// ------------- LOGIN --------------------- \\



// ------------- PASSWORD RECOVERY --------------------- \\
Router.post('/user/recover-password',forgotPassword)
// ------------- PASSWORD RECOVERY --------------------- \\

// ------------- ITEMS --------------------- \\
Router.post('/item/register/:id',createItem)
Router.delete('/item/delete/:id',deleteItem)
Router.delete('/item/delete/:id',deleteItem)

// ------------- ITEMS --------------------- \\


// ------------- SALES --------------------- \\

Router.post('/sales/create',tokenVerify,createSaleByBarcode)


// ------------- SALES --------------------- \\