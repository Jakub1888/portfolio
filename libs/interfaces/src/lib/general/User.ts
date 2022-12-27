export interface UserAuth {
    username?: string;
    password?: string;
    confirmPassword?: string;
}

export interface UserTokens {
    accessToken: string;
    refreshToken: string;
    userId: string;
}

export interface IUserWithSleepDataCollection extends UserAuth {
    sleepDataCollection?: { _id: any }[];
}
