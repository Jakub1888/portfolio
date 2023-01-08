export interface AverageValues {
    awakeTime: number;
    mood: number;
    quality: number;
    wentToBedAt: number;
    wokeUpAt: number;
}

export interface FirstAndLast {
    first: Date;
    last: Date;
    count: number;
    limit: number;
}

export interface Averages {
    averages: AverageValues[];
    firstAndLast: FirstAndLast[];
}
