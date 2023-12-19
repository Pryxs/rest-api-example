import { Router } from "express";
import { get, getAll, create, update, remove } from './products.controller'
import { validatorMidlleware } from "../../midllewares/validator";
import { validateProduct } from "../../dto/product.dto"

const router = Router();

router.route('').get(getAll).post([validatorMidlleware({ validator: validateProduct })], create);
router
    .route('/:id')
    .get(get)
    .put([validatorMidlleware({ validator: validateProduct })], update)
    .delete(remove);

export const ProductRouter = router;

