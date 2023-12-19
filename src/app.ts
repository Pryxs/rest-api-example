import express, { Express } from "express";
import dbConnect from './utils/dbConnect'
import dotenv from "dotenv";
import { ProductRouter } from './resources/products/products.routes'

dotenv.config();

const app: Express = express();

dbConnect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/api/products', ProductRouter)

export default app;


