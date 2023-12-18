import fs from "node:fs";
import type { Products, Product } from "../types";


export const FileManager = () => {

    const read = async (path: string): Promise<Products> => {
        try {
            const data = await fs.readFileSync(path, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            throw 'Cannot read file';
        }
    }

    const write = async (path: string, data: any): Promise<Product> => {
        try {
            fs.writeFile(path, JSON.stringify(data), err => {
                if (err) throw err;
            })
            return data;
        } catch (err) {
            throw 'Failed write file'
        }
    }

    return {
        read,
        write,
    }
}