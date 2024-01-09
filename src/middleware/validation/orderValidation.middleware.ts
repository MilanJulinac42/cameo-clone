import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const createOrderValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const orderSchema = Joi.object({
        userId: Joi.string()
            .required()
            .regex(/^[0-9a-fA-F]{24}$/),
        celebrityId: Joi.string()
            .required()
            .regex(/^[0-9a-fA-F]{24}$/),
        message: Joi.string().required(),
        price: Joi.number().required(),
        paymentMethod: Joi.string().required(),
        paymentStatus: Joi.string()
            .valid("Paid", "Pending", "Failed")
            .required(),
        videoMessageId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        deleted: Joi.boolean().default(false),
    });

    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

const updateOrderValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const orderSchema = Joi.object({
        message: Joi.string(),
        price: Joi.number(),
        paymentMethod: Joi.string(),
        paymentStatus: Joi.string().valid("Paid", "Pending", "Failed"),
        videoMessageId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        deleted: Joi.boolean(),
    }).min(1);

    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

export { createOrderValidation, updateOrderValidation };
