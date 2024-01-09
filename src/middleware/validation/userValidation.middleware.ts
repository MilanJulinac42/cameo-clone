import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createUserValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phoneNumber: Joi.string().pattern(/^\d{10}$/),
    });

    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

export const updateUserValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userSchema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        phoneNumber: Joi.string().pattern(/^\d{10}$/),
    });

    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};
