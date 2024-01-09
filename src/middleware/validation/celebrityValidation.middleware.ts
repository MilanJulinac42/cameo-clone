import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const createCelebrityValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const celebritySchema = Joi.object({
        name: Joi.string().required(),
        profession: Joi.string().required(),
        imageUrl: Joi.string().required(),
        bio: Joi.string(),
        demoVideo: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        socialMediaLinks: Joi.object().pattern(/./, Joi.string()),
        pricePerMessage: Joi.number().required(),
        availability: Joi.boolean().required(),
    });

    const { error } = celebritySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

const updateCelebrityValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const celebritySchema = Joi.object({
        name: Joi.string(),
        profession: Joi.string(),
        imageUrl: Joi.string(),
        bio: Joi.string(),
        demoVideo: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        socialMediaLinks: Joi.object().pattern(/./, Joi.string()),
        pricePerMessage: Joi.number(),
        availability: Joi.boolean(),
        deleted: Joi.boolean(),
    }).min(1);

    const { error } = celebritySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

export { createCelebrityValidation, updateCelebrityValidation };
