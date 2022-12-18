import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SleepTrackerForm } from '@portfolio/interfaces';
import { SleepTrackerService } from '../../services/sleep-tracker/sleep-tracker.service';

@Component({
    selector: 'st-dashboard-form',
    templateUrl: './dashboard-form.component.html',
    styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
    sleepTrackerForm!: FormGroup<SleepTrackerForm>;
    qualities: number[];

    constructor(private readonly fb: FormBuilder, private readonly sleepTrackerService: SleepTrackerService) {
        this.qualities = [1, 2, 3, 4, 5];
    }

    ngOnInit(): void {
        this.initForm();
    }

    onSubmit(): void {
        const date = this.sleepTrackerForm.value.dateOfSleep?.setHours(0, 0, 0, 0);
        const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.userId : null;
        console.log(date);
        this.sleepTrackerService
            .postSleepData({ ...this.sleepTrackerForm.value, dateOfSleep: date, user: userId })
            .subscribe((resp) => console.log(resp));
    }

    private initForm(): void {
        this.sleepTrackerForm = this.fb.group({
            dateOfSleep: new FormControl(new Date(), { nonNullable: true }),
            wentToBedAt: new FormControl('22:00', { nonNullable: true }),
            wokeUpAt: new FormControl('06:00', { nonNullable: true }),
            quality: new FormControl(1, { nonNullable: true }),
            mood: new FormControl(1, { nonNullable: true }),
            description: new FormControl('', { nonNullable: true })
        });
    }
}
