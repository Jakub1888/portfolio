import { FormControl } from '@angular/forms';

export interface SleepTrackerForm {
    quality: FormControl<number>;
    dateOfSleep: FormControl<Date>;
    wentToBedAt: FormControl<string>;
    wokeUpAt: FormControl<string>;
    mood: FormControl<number>;
    description: FormControl<string>;
}

export interface SleepData {
    quality: number;
    dateOfSleep: Date;
    wentToBedAt: string;
    wokeUpAt: string;
    mood: number;
    description: string;
    user?: string;
}
