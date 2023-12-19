import type { IResponse } from '../../types'
import { IProduct, Product } from './prdocuts.model'
import type { Request, Response } from "express";


export const get = async (req: Request<{ id: string }>, res: Response<IResponse<IProduct>>) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id)

        if (!product) return res.status(404).json({ error: 'Product not found' })

        res.status(200).json({ data: product })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getAll = async (req: Request, res: Response<IResponse<IProduct[]>>) => {
    try {
        const products = await Product.find()

        res.status(200).json({ data: products })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
};

export const create = async (req: Request<{}, {}, Omit<IProduct, 'id'>>, res: Response<IResponse<IProduct>>) => {
    try {
        const product = new Product(req.body)
        product.save();

        res.status(201).json({ data: product })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
};

export const update = async (req: Request<{ id: string }>, res: Response<IResponse<IProduct>>) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })

        if (!product) return res.status(404).json({ error: 'Product not found' })

        res.status(200).json({ data: product })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
};

export const remove = async (req: Request<{ id: string }>, res: Response<IResponse<{ id: string }>>) => {
    const { id } = req.params;

    try {
        await Product.deleteOne({ _id: id })

        res.status(200).json({ data: { id } })
    } catch (err) {

        res.status(500).json({ error: 'Internal server error' })
    }
}
