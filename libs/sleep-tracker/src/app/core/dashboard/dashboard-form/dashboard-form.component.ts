import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SleepData, SleepTrackerForm } from '@portfolio/interfaces';
import { SleepTrackerService } from '../../services/sleep-tracker.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, map, Observable, Subscription, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'st-dashboard-form',
    templateUrl: './dashboard-form.component.html',
    styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit, OnDestroy {
    sleepTrackerForm!: FormGroup<SleepTrackerForm>;
    qualities: number[];
    sleepDataSub!: Subscription;
    sleepDate!: number;
    sleepDay$: Observable<{ sleepData: SleepData; message: string }> = this.sleepTrackerService.sleepDay$;
    editingSleepData = false;
    sleepDataId!: string | undefined;
    submitType!: 'postSleepData' | 'patchSleepData';
    loading = false;

    constructor(
        private readonly fb: FormBuilder,
        private readonly sleepTrackerService: SleepTrackerService,
        private readonly toastr: ToastrService,
        private readonly cdr: ChangeDetectorRef,
        private readonly activatedRoute: ActivatedRoute
    ) {
        this.qualities = [1, 2, 3, 4, 5];
    }

    ngOnInit(): void {
        this.initForm();
        this.cdr.detectChanges();
        this.sleepDate = this.activatedRoute.snapshot.queryParams['dateOfSleep'];
        this.patchFormValue();
    }

    onSubmit(): void {
        this.submitType = this.editingSleepData ? 'patchSleepData' : 'postSleepData';
        const { dateOfSleep, wentToBedAt, wokeUpAt } = this.sleepTrackerForm.value;
        const reqBody: any = {
            ...this.sleepTrackerForm.value,
            dateOfSleep: this.editingSleepData
                ? (new Date(dateOfSleep as Date) as Date)
                : dateOfSleep?.setHours(0, 0, 0, 0),
            wentToBedAt: this.getMinutes(wentToBedAt as string),
            wokeUpAt: this.getMinutes(wokeUpAt as string)
        };
        if (this.editingSleepData) {
            reqBody._id = this.sleepDataId;
        }

        this.sleepTrackerService[this.submitType](reqBody)
            .pipe(
                tap((resp: any) => this.toastr.success(resp.message)),
                catchError(() => EMPTY)
            )
            .subscribe();
    }

    private patchFormValue(): void {
        if (this.sleepDate) {
            this.sleepTrackerService.getSleepData(this.sleepDate);
            this.editingSleepData = true;
            this.loading = true;
            this.sleepDataSub = this.sleepDay$
                .pipe(
                    map((resp: any): SleepData => {
                        const data = resp.sleepData;
                        this.sleepDataId = data._id;
                        const wentToBedAt = SleepTrackerService.convertToHourString(Number(data.wentToBedAt));
                        const wokeUpAt = SleepTrackerService.convertToHourString(Number(data.wokeUpAt));
                        const sleepData = { ...data, wentToBedAt, wokeUpAt };

                        return sleepData;
                    })
                )
                .subscribe((sleepData) => {
                    this.sleepTrackerForm.patchValue(sleepData);
                    this.loading = false;
                });
        }
    }

    cancelEditing(): void {
        this.initForm();
        this.editingSleepData = false;
    }

    private getMinutes(timeInHours: string): number {
        const timeParts = timeInHours?.split(':');
        return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }

    private initForm(): void {
        this.sleepTrackerForm = this.fb.group({
            dateOfSleep: new FormControl(new Date(), { nonNullable: true, validators: Validators.required }),
            wentToBedAt: new FormControl('22:00', { nonNullable: true }),
            wokeUpAt: new FormControl('06:00', { nonNullable: true }),
            quality: new FormControl(1, { nonNullable: true }),
            mood: new FormControl(1, { nonNullable: true }),
            description: new FormControl('', { nonNullable: true })
        });
    }

    ngOnDestroy(): void {
        this.sleepDataSub?.unsubscribe();
    }
}
