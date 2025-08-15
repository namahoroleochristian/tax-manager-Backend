import express from 'express'
import {
    Customer_Login,
    Customer_Register,
    resetPassword,
    sendVerificationCode,
    Support_Login,
    Support_Register,
    TaxPayer_Login,
    TaxPayer_register
} from '../controllers/user.controller.js'

import { createItem, deleteItem, getTotalItemsPrice, updateItem } from '../controllers/items.controller.js'
import {
    createSaleByBarcode, deleteSaleByBarcode, getSaleByBarcode
} from '../controllers/sales.controller.js'
import { tokenVerify } from '../middlewares/tokenVerify.js'
import { verifyCode } from '../middlewares/VerifyCode.js'
export const Router = express.Router()

// ------------- REGISTER --------------------- \\

Router.post('/payer/register', TaxPayer_register)
Router.post('/customer/register', Customer_Register)
Router.post('/support/register', Support_Register)

//  ------------- REGISTER --------------------- \\

// ------------- PASSWORD --------------------- \\
Router.post('/request/VerificationCode', sendVerificationCode)
// Router.post('/password/reset', verifyCode, resetPassword)
Router.put('/password/reset', resetPassword)

// ------------- PASSWORD --------------------- \\



// ------------- LOGIN --------------------- \\
Router.post('/payer/login', TaxPayer_Login)
Router.post('/customer/login', Customer_Login)
Router.post('/support/login', Support_Login)

// ------------- LOGIN --------------------- \\

// ------------- ITEMS --------------------- \\
Router.post('/item/register/:id', tokenVerify, createItem)
Router.delete('/item/delete/:id', tokenVerify, deleteItem)
Router.delete('/item/update/:id', tokenVerify, updateItem)
Router.delete('/items/get', tokenVerify, updateItem)
Router.get('/items/totalPrice/:id', getTotalItemsPrice)

// ------------- ITEMS --------------------- \\


// ------------- SALES --------------------- \\

Router.post('/sales/create', tokenVerify, createSaleByBarcode)
Router.post('/sales/delete', tokenVerify, deleteSaleByBarcode)
Router.post('/sales/get', tokenVerify, getSaleByBarcode)

// ------------- SALES --------------------- \\