export interface IUser {
    username?: string;
    password?: string;
}

export interface IUserWithBooks extends IUser {
    books: { _id: any }[];
}
