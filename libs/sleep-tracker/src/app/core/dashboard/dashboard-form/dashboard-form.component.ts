import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SleepData, SleepTrackerForm } from '@portfolio/interfaces';
import { SleepTrackerService } from '../../services/sleep-tracker.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, map, Observable, pairwise, startWith, Subscription, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@portfolio/ui-components';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'st-dashboard-form',
    templateUrl: './dashboard-form.component.html',
    styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit, OnDestroy {
    sleepTrackerForm!: FormGroup<SleepTrackerForm>;
    qualities: number[] = [1, 2, 3, 4, 5];
    sleepDataSub!: Subscription;
    sleepDate!: number;
    sleepDay$: Observable<{ sleepData: SleepData; message: string } | null> = this.sleepTrackerService.sleepDay$;
    editingSleepData = false;
    sleepDataId!: string | undefined;
    submitType!: 'postSleepData' | 'patchSleepData';
    loading = false;
    formChanged = false;

    constructor(
        private readonly fb: FormBuilder,
        private readonly sleepTrackerService: SleepTrackerService,
        private readonly toastr: ToastrService,
        private readonly cdr: ChangeDetectorRef,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        public dialog: MatDialog
    ) {}

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
            dateOfSleep: this.editingSleepData ? new Date(dateOfSleep as Date) : dateOfSleep?.setHours(0, 0, 0, 0),
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
            .subscribe(() => this.initForm());
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

    openUpdateDialog(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { message: 'Do you wish to update sleep data for the selected day?' }
        });
        console.log(this.formChanged);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.onSubmit();
            }
        });
    }

    cancelEditing(): void {
        this.initForm();
        this.editingSleepData = false;
        this.router.navigate([], { queryParams: { dateOfSleep: null } });
    }

    private getMinutes(timeInHours: string): number {
        const timeParts = timeInHours?.split(':');
        return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }

    private initForm(): void {
        const req = Validators.required;
        this.sleepTrackerForm = this.fb.group({
            dateOfSleep: new FormControl(new Date(), { nonNullable: true, validators: req }),
            wentToBedAt: new FormControl('22:00', { nonNullable: true, validators: req }),
            wokeUpAt: new FormControl('06:00', { nonNullable: true, validators: req }),
            quality: new FormControl(1, { nonNullable: true, validators: req }),
            mood: new FormControl(1, { nonNullable: true, validators: req }),
            description: new FormControl('', { nonNullable: true, validators: Validators.maxLength(200) })
        });
    }

    ngOnDestroy(): void {
        this.sleepDataSub?.unsubscribe();
    }
}
