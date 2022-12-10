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

const userValidation = {
    username: Joi.string().required(),
    password: Joi.string()
        .pattern(new RegExp(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/))
        .required()
};

export const Schemas = {
    user: {
        register: Joi.object<IUserWithBooks>({
            ...userValidation,
            confirmPassword: Joi.string()
                .pattern(new RegExp(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/))
                .required()
        }),
        login: Joi.object<IUserWithBooks>({ ...userValidation }),
        update: Joi.object<IUserWithBooks>({
            ...userValidation
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
