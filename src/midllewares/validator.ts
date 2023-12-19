import { NextFunction, Request, Response } from "express";
import type { ValidationResult } from "../types";
import { IProduct } from "../resources/products/prdocuts.model";

type ValidatorMidlleware = {
    validator: (prdouct: IProduct) => ValidationResult<IProduct>,
    type?: 'body' | 'header'
}

export const validatorMidlleware = ({ validator, type = 'body' }: ValidatorMidlleware) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = validator(req[type])
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        next();
    }
}