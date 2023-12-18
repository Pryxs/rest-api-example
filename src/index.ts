import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { FileManager } from "./utils/file.manager";

const productsPath = `${__dirname}/../data/products.json`
const fileManager = FileManager()

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/products', async (req: Request, res: Response) => {
    const products = await fileManager.read(productsPath)

    if (!products) return res.status(404).send({ error: 'Failed to find products' });

    res.send(products);
});

app.get('/products/:id', async (req: Request<{ id: string }>, res: Response) => {
    const products = await fileManager.read(productsPath)
    const { id } = req.params;

    const product = products.find(({ id: productId }) => productId === +id);

    if (!product) return res.status(404).send({ error: 'Failed to find product' });

    res.send({ data: product });
});

app.post('/products', async (req: Request, res: Response) => {
    const products = await fileManager.read(productsPath)

    const nextId = Math.max(...products.map(product => product.id)) + 1;
    const updatedProduct = { ...req.body, id: nextId };
    products.push(updatedProduct)

    const product = await fileManager.write(productsPath, products)

    if (!product) return res.status(404).send({ error: 'Failed to find product' });

    res.status(201).send({ data: product });
});

app.put('/products/:id', async (req: Request, res: Response) => {
    const products = await fileManager.read(productsPath)

    const { id } = req.params;
    const updatedProduct = { ...req.body, id: +id };
    const productIndex = products.findIndex(({ id: productId }) => productId === +id);
    products[productIndex] = updatedProduct

    const product = await fileManager.write(productsPath, products)

    if (!product) return res.status(404).send({ error: 'Failed to find product' });

    res.status(201).send({ data: product });
})

app.delete('/products/:id', async (req: Request, res: Response) => {
    const products = await fileManager.read(productsPath)

    const { id } = req.params;
    const productIndex = products.findIndex(({ id: productId }) => productId === +id);
    products.splice(productIndex, 1)

    const product = await fileManager.write(productsPath, products)

    if (!product) return res.status(404).send({ error: 'Failed to find product' });

    res.status(201).send({ data: product });
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});