import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { WeekDay } from '@portfolio/interfaces';
import * as moment from 'moment';
import { SleepTrackerService } from '../../services/sleep-tracker.service';

@Component({
    selector: 'st-day-list',
    styleUrls: ['./day-list.component.scss'],
    template: `
        <section class="day-select">
            <h2 class="st-heading">Data about your sleep by date</h2>
            <div class="day-select-inputs">
                <mat-form-field>
                    <mat-label class="inp-label">Days to display</mat-label>
                    <mat-select [formControl]="numberOfDays">
                        <mat-option [value]="7"> Last 7 Days </mat-option>
                        <mat-option [value]="30"> Last 30 Days </mat-option>
                        <mat-option [value]="'Specifi date'"> Specific date </mat-option>
                    </mat-select>
                </mat-form-field>

                <mat-form-field *ngIf="showDatePicker" class="specific-date-selector">
                    <mat-label class="inp-label">Date of sleep</mat-label>
                    <input
                        [formControl]="dateOfSleep"
                        matInput
                        [matDatepicker]="picker"
                        (dateChange)="onDateChange($event)"
                    />
                    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>

                <div aria-label="Date selection" *ngIf="!showDatePicker">
                    <span (click)="onButtonGroupClick($event)" class="scrolling-wrapper">
                        <button
                            class="day-btn"
                            *ngFor="let weekDay of weekDays"
                            (click)="loadSleepData(weekDay.numericFormat)"
                        >
                            {{ weekDay.day }}
                        </button>
                    </span>
                </div>
            </div>

            <router-outlet name="day"></router-outlet>
        </section>
    `
})
export class DayListComponent implements OnInit {
    weekDays: WeekDay[] = [];
    numberOfDays = new FormControl(7);
    dateOfSleep = new FormControl();
    showDatePicker = false;

    constructor(
        private readonly sleepTrackerService: SleepTrackerService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.weekDays = this.getWeekDays(7);
        this.onNumberOfDaysChange();
    }

    loadSleepData(numericFormat: number): void {
        this.router.navigate([{ outlets: { day: ['detail'] } }], { relativeTo: this.activatedRoute });
        this.sleepTrackerService.getSleepData(numericFormat);
    }

    onDateChange(event: MatDatepickerInputEvent<Date>): void {
        const value = event.target.value as number | Date;
        this.loadSleepData(new Date(value).getTime());
    }

    onButtonGroupClick($event: any): void {
        const clickedElement = $event.target || $event.srcElement;

        if (clickedElement.nodeName === 'BUTTON') {
            const isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector('.active');
            if (isCertainButtonAlreadyActive) {
                isCertainButtonAlreadyActive.classList.remove('active');
            }

            clickedElement.className += ' active';
        }
    }

    private onNumberOfDaysChange(): void {
        this.numberOfDays.valueChanges.subscribe((value) => {
            if (value === 7 || value === 30) {
                this.weekDays = this.getWeekDays(value);
                this.showDatePicker = false;
            } else {
                this.showDatePicker = true;
            }
        });
    }

    private getWeekDays(numberOfDays: number): WeekDay[] {
        const days = [];
        for (let i = numberOfDays - 1; i >= 0; i--) {
            days.push({
                day: moment()
                    .subtract(i, 'days')
                    .format(numberOfDays === 7 ? 'dddd' : 'DD/MM/YY'),
                numericFormat: new Date(moment().subtract(i, 'days').format('L')).valueOf()
            });
        }
        return days;
    }
}
