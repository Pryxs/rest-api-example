import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connect from './connect'
import { Product } from "./resources/products/prdocuts.model";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await Product.find().select('-__v')

        res.send(products);
    } catch (err) {
        res.status(500).json(err)
    }
});

app.get('/products/:id', async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    try {
        const products = await Product.findOne({ _id: id }).select('-__v')

        res.send(products);
    } catch (err) {
        res.status(500).json(err)
    }
});

app.post('/products', async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body)
        product.save();
        res.send(product);
    } catch (err) {
        res.status(500).json(err)
    }
});

app.put('/products/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, req.body)
        res.send(product);
    } catch (err) {
        throw 'Failed to update product';
    }

})

app.delete('/products/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.deleteOne({ _id: id })
        res.send(product);
    } catch (err) {
        throw 'Failed to delete product';
    }
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});