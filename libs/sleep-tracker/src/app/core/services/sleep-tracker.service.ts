import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SleepData } from '@portfolio/interfaces';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SleepTrackerService {
    baseUrl = '/api/sleepData';
    sleepDay$ = new Subject<{ sleepData: SleepData; message: string }>();
    averages$ = new Subject<any>();

    constructor(private readonly http: HttpClient) {}

    static convertToHourString(totalMinutes: number): string {
        let hours: string | number = Math.floor(totalMinutes / 60);
        let minutes: string | number = totalMinutes % 60;
        hours = hours > 9 ? hours : '0' + hours;
        minutes = minutes > 9 ? minutes : '0' + minutes;

        return hours + ':' + minutes;
    }

    postSleepData(sleepData: unknown): Observable<unknown> {
        return this.http.post(this.baseUrl + '/create', sleepData);
    }

    patchSleepData(sleepData: unknown): Observable<unknown> {
        return this.http.patch(this.baseUrl + '/patch', sleepData);
    }

    getAllSleepData(): Observable<any> {
        return this.http.get(this.baseUrl + '/getAll');
    }

    getSleepData(dateOfSleep: number): void {
        this.http
            .get<SleepData>(`${this.baseUrl}/get/${dateOfSleep}`)
            .pipe(catchError(() => EMPTY))
            .subscribe((data: any) => {
                this.sleepDay$.next(data);
            });
    }

    getAveragesForSleepData(): void {
        this.http
            .get(`${this.baseUrl}/getAverages`)
            .pipe(catchError(() => EMPTY))
            .subscribe((data: any) => {
                console.log(data);
                this.averages$.next(data);
            });
    }
}
