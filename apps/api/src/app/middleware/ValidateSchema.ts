import { IUserWithSleepDataCollection, SleepData } from '@portfolio/interfaces';
import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import Logging from '../utils/logging';

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

const sleepDataValidation = {
    dateOfSleep: Joi.date().required(),
    wentToBedAt: Joi.number().required(),
    wokeUpAt: Joi.number().required(),
    mood: Joi.number().required(),
    quality: Joi.number().required(),
    description: Joi.string().max(200).allow('').optional()
};

export const Schemas = {
    user: {
        register: Joi.object<IUserWithSleepDataCollection>({
            ...userValidation,
            confirmPassword: Joi.string()
                .pattern(new RegExp(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/))
                .required()
        }),
        login: Joi.object<IUserWithSleepDataCollection>({
            username: Joi.string().required(),
            password: Joi.string().required()
        }),
        update: Joi.object<IUserWithSleepDataCollection>({
            ...userValidation
        }),
        token: Joi.object<any>({
            refreshToken: Joi.string().required()
        })
    },
    sleepData: {
        create: Joi.object<SleepData>(sleepDataValidation),
        update: Joi.object<SleepData>({ ...sleepDataValidation, _id: Joi.string().required() }),
        delete: Joi.object<{ _id: string }>({
            _id: Joi.string().required()
        })
    }
};
