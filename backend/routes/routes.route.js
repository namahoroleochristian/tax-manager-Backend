import express from 'express'
import { TaxPayer_register } from '../controllers/user.controller.js'
const app = express()
export const Router = express.Router()


Router.post('/payer/register',TaxPayer_register)