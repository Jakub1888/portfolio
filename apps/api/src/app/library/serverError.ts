import { Response } from 'express';
import { Error } from 'mongoose';

export const serverError = (error: Error, res: Response) => res.status(500).json({ error });
