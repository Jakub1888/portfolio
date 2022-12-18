import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';
import { AuthForm, AuthFormValue } from '@portfolio/interfaces';

@Component({
    selector: 'portfolio-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    authChoice!: 'login' | 'register';
    authForm!: FormGroup<AuthForm>;
    validators!: ((control: AbstractControl<any, any>) => ValidationErrors | null)[];
    regPasswordValidators!: ((control: AbstractControl<any, any>) => ValidationErrors | null)[] | ValidatorFn;
    darkTheme = false;

    constructor(
        private readonly authService: AuthService,
        private readonly http: HttpClient,
        private readonly fb: FormBuilder,
        private readonly globalService: GlobalService,
        private readonly toastr: ToastrService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.validators = [Validators.required, Validators.minLength(6), Validators.maxLength(30)];
        this.regPasswordValidators = [...this.validators, Validators.pattern(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/)];
        this.initForm();

        this.globalService.colorTheme$.subscribe((theme: boolean) => {
            this.darkTheme = theme;
        });
    }

    onSubmit(): void {
        if (this.authForm.valid) {
            const successMessage = this.authChoice === 'register' ? 'registered' : 'logged in';
            const authFormValue = this.getAuthFormValues();

            this.authService[this.authChoice](authFormValue)
                .pipe(
                    take(1),
                    catchError(() => EMPTY)
                )
                .subscribe(() => {
                    this.toastr.success(`You have been successfully ${successMessage}.`);
                    this.router.navigateByUrl('projects/sleep-tracker');
                    this.authForm.reset();
                });
        }
    }

    chooseAuthOption(choice: 'login' | 'register'): void {
        this.authChoice = choice;
        this.changePasswordValidity();
        this.authForm.reset();
    }

    private initForm(): void {
        this.authForm = this.fb.group({
            username: new FormControl('', { nonNullable: true, validators: this.validators }),
            password: new FormControl('', { nonNullable: true }),
            confirmPassword: new FormControl('', { nonNullable: true })
        });
    }

    private changePasswordValidity(): void {
        this.getControl('password').clearValidators();

        if (this.authChoice === 'register') {
            this.getControl('confirmPassword').addValidators([Validators.required, this.matchValues('password')]);
            this.getControl('password').addValidators(this.regPasswordValidators);

            this.getControl('password').valueChanges.subscribe(() => {
                this.getControl('confirmPassword').updateValueAndValidity();
            });
        } else {
            this.getControl('confirmPassword').clearValidators();
            this.getControl('password').addValidators(Validators.required);
        }
    }

    private matchValues(matchTo: string): ValidatorFn {
        return (control: any) => {
            return control?.value === control.parent?.controls[matchTo].value ? null : { isMatching: true };
        };
    }

    private getAuthFormValues(): AuthFormValue {
        const authFormValue: { username: string; password: string; confirmPassword?: string } = {
            username: this.getControl('username').value,
            password: this.getControl('password').value
        };
        if (this.authChoice === 'register') {
            authFormValue.confirmPassword = this.getControl('confirmPassword').value;
        }

        return authFormValue;
    }

    private getControl(control: string): AbstractControl<string, string> {
        return this.authForm.get(control) as FormControl;
    }

    ping(): void {
        this.http.get('api/ping').subscribe((resp) => console.log(resp));
    }
}
