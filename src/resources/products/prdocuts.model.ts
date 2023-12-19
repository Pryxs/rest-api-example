import { Schema, model } from 'mongoose';

export type Product = {
    id: number;
    title: string;
    year: number;
    desc: string;
    price: number;
    color: string;
}

export type Products = Product[]

const productSchema = new Schema<Product>({
    id: Number,
    title: String,
    year: Number,
    desc: String,
    price: Number,
    color: String,
})

export const Product = model<Product>('product', productSchema)