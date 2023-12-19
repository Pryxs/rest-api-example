import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import dbConnect from './utils/dbConnect'
import { Product, Products } from "./resources/products/prdocuts.model";
import type { IResponse } from "./types";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || '3000';

dbConnect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/products', async (req: Request, res: Response<IResponse<Products>>) => {
    try {
        const products = await Product.find().select('-__v')

        res.status(200).json({ data: products })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

app.get('/products/:id', async (req: Request<{ id: string }>, res: Response<IResponse<Product>>) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({ _id: id }).select('-__v')

        if (!product) return res.status(404).json({ error: 'Product not found' })

        res.status(200).json({ data: product })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
});


app.post('/products', async (req: Request<{}, {}, Omit<Product, 'id'>>, res: Response<IResponse<Product>>) => {
    try {
        const product = new Product(req.body)
        product.save();

        res.status(201).json({ data: product })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

app.put('/products/:id', async (req: Request<{ id: string }>, res: Response<IResponse<Product>>) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product) return res.status(404).json({ error: 'Product not found' })

        res.status(200).json({ data: product })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }

})

app.delete('/products/:id', async (req: Request<{ id: string }>, res: Response<IResponse<{ id: string }>>) => {
    const { id } = req.params;

    try {
        await Product.deleteOne({ _id: id })

        res.status(200).json({ data: { id } })
    } catch (err) {

        res.status(500).json({ error: 'Internal server error' })
    }
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});