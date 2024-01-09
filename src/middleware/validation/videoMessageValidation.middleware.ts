import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const createVideoMessageValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const videoMessageSchema = Joi.object({
        fromCelebrityId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        toUserId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        message: Joi.string().required(),
        videoUrl: Joi.string(),
        duration: Joi.number(),
        price: Joi.number().required(),
        status: Joi.string()
            .valid("Pending", "Accepted", "Completed", "Rejected")
            .required(),
    });

    const { error } = videoMessageSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

const updateVideoMessageValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const videoMessageSchema = Joi.object({
        fromCelebrityId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        toUserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        message: Joi.string(),
        videoUrl: Joi.string(),
        duration: Joi.number(),
        price: Joi.number(),
        status: Joi.string().valid(
            "Pending",
            "Accepted",
            "Completed",
            "Rejected"
        ),
    });

    const { error } = videoMessageSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

export { createVideoMessageValidation, updateVideoMessageValidation };
