import Joi from 'joi'
import validator from 'express-joi-validation'
import { IProduct } from '../resources/products/prdocuts.model'
import type { ValidationResult, ObjectSchema } from '../types/index'

validator.createValidator({})

export const validateProduct = (product: IProduct): ValidationResult<IProduct> => {
    const schema: ObjectSchema<IProduct> = Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        year: Joi.number().optional(),
        price: Joi.number().required(),
        color: Joi.string().optional(),
    })

    return schema.validate(product)
}