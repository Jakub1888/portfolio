import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SleepData } from '@portfolio/interfaces';
import { Observable } from 'rxjs';
import { SleepTrackerService } from '../../../services/sleep-tracker.service';

@Component({
    selector: 'st-day-detail',
    styleUrls: ['./day-detail.component.scss'],
    template: `
        <div *ngIf="sleepDay$ | async as sleepDay">
            <div *ngIf="sleepDay.sleepData as SleepData">
                <h1>{{ sleepDay.sleepData.dateOfSleep | date: 'fullDate' }}</h1>

                <p>Mood after waking up: {{ sleepDay.sleepData.mood }}</p>
                <p>Quality of your sleep: {{ sleepDay.sleepData.quality }}</p>
                <p>Went to bed at: {{ convertToHourString(+sleepDay.sleepData.wentToBedAt) }}</p>
                <p>Woke up at: {{ convertToHourString(+sleepDay.sleepData.wokeUpAt) }}</p>
                <p *ngIf="sleepDay.sleepData.description">Description: {{ sleepDay.sleepData.description }}</p>
                <button (click)="onNavigateToEdit(sleepDay.sleepData.dateOfSleep)">Edit</button>
            </div>

            <div *ngIf="sleepDay.message">
                <p>{{ sleepDay.message }}</p>
            </div>
        </div>

        <div *ngIf="loading">Loading...</div>
    `
})
export class DayDetailComponent {
    sleepDay$: Observable<{ sleepData: SleepData; message: string }> = this.sleepTrackerService.sleepDay$;
    loading = false;
    convertToHourString = SleepTrackerService.convertToHourString;

    constructor(
        private readonly sleepTrackerService: SleepTrackerService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    onNavigateToEdit(dateOfSleep: Date): void {
        const value = new Date(dateOfSleep).getTime();
        this.router.navigate([{ outlets: { st: ['form'] } }], {
            relativeTo: this.activatedRoute.parent?.parent,
            queryParams: { dateOfSleep: value }
        });
    }
}
