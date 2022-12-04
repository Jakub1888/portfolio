import { IUserWithBooks } from '@portfolio/interfaces';
import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import Logging from '../library/logging';
import { IBook } from '../models/Book';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<IUserWithBooks>({
            username: Joi.string().required(),
            password: Joi.string().min(6).alphanum().required()
        }),
        update: Joi.object<IUserWithBooks>({
            username: Joi.string().required(),
            password: Joi.string().min(6).alphanum().required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            user: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }
};
