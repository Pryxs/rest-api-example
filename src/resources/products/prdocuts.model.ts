import { Schema, model } from 'mongoose';

export type IProduct = {
    id: number;
    title: string;
    year: number;
    desc: string;
    price: number;
    color: string;
}

const productSchema = new Schema<IProduct>({
    id: Number,
    title: String,
    year: Number,
    desc: String,
    price: Number,
    color: String,
}, {
    versionKey: false
})

export const Product = model<IProduct>('product', productSchema)