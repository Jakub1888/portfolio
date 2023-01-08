import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Averages, SleepData } from '@portfolio/interfaces';
import { BehaviorSubject, catchError, EMPTY, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SleepTrackerService {
    baseUrl = '/api/sleepData';
    sleepDay$ = new Subject<{ sleepData: SleepData; message: string } | null>();
    averages$ = new Subject<Averages>();
    loadingIndicator$ = new BehaviorSubject<boolean>(false);

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

    getAllSleepData(): Observable<unknown> {
        return this.http.get(this.baseUrl + '/getAll');
    }

    deleteSleepData(_id: any): Observable<unknown> {
        return this.http.delete(this.baseUrl + '/delete', { body: { _id } });
    }

    getSleepData(dateOfSleep: number): void {
        this.loadingIndicator$.next(true);
        this.http
            .get<SleepData>(`${this.baseUrl}/get/${dateOfSleep}`)
            .pipe(catchError(() => EMPTY))
            .subscribe((data: any) => {
                this.sleepDay$.next(data);
                this.loadingIndicator$.next(false);
            });
    }

    getAveragesForSleepData(limit: number): void {
        this.http
            .get(`${this.baseUrl}/getAverages/${limit}`)
            .pipe(catchError(() => EMPTY))
            .subscribe((data: any) => {
                console.log(data);
                this.averages$.next(data);
            });
    }
}
