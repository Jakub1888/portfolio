export interface User {
    username?: string;
    password?: string;
    confirmPassword?: string;
}

export interface IUserWithBooks extends User {
    books?: { _id: any }[];
    sleepDataCollection?: { _id: any }[];
}
