export interface IUser {
    username?: string;
    password?: string;
    confirmPassword?: string;
}

export interface IUserWithBooks extends IUser {
    books?: { _id: any }[];
    sleepDataCollection?: { _id: any }[];
}
