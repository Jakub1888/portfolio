/* eslint-disable @typescript-eslint/no-unused-vars */
import { Req } from '@portfolio/interfaces';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { serverError } from '../library/serverError';
import Book from '../models/Book';
import User from '../models/User';

const createBook = (req: Req, res: Response, next: NextFunction) => {
    const { title } = req.body;
    let creator;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        user: req.userId
    });

    return book
        .save()
        .then((book) => {
            return User.findById(req.userId);
        })
        .then((user) => {
            creator = user;
            user.books.push(book);
            return user.save();
        })
        .then((result) => {
            res.status(201).json({
                message: 'Book added successfully',
                book,
                creator: { id: creator._id, name: creator.name }
            });
        })
        .catch((error) => serverError(error, res));
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .populate('author')
        .select('-__v')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => serverError(error, res));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .populate('author')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((error) => serverError(error, res));
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body);

                return book
                    .save()
                    .then((book) => res.status(201).json({ book }))
                    .catch((error) => serverError(error, res));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => serverError(error, res));
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findByIdAndDelete(bookId)
        .then((book) =>
            book ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })
        )
        .catch((error) => serverError(error, res));
};

export default {
    createBook,
    readBook,
    readAll,
    updateBook,
    deleteBook
};
