import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import { Router } from "./routes/routes.route.js";

dotenv.config()
const app = express()

const PORT = process.env.PORT

connectDB()

app.use(express.json())
app.use('/tax',Router)

app.listen(PORT,async ()=>{
    console.log(`app running on http://localhost:${PORT}`)
})
    



