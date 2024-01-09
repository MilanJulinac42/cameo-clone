import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const objectIdValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        id: Joi.string()
            .required()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .message("Invalid ID format"),
    });

    const { error } = schema.validate(req.params);

    if (error) {
        res.status(400).json({ message: error.details[0].message });
    } else {
        next();
    }
};

export default objectIdValidation;
