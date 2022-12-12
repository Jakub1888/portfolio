import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, map, of, take, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';

export interface authForm {
    username: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    selector: 'portfolio-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    authChoice!: 'login' | 'register';
    authForm!: FormGroup;
    validators;
    regPasswordValidators;
    darkTheme = false;

    constructor(
        private readonly authService: AuthService,
        private readonly http: HttpClient,
        private readonly fb: FormBuilder,
        private readonly globalService: GlobalService,
        private readonly toastr: ToastrService
    ) {
        this.validators = [Validators.required, Validators.minLength(6), Validators.maxLength(30)];
        this.regPasswordValidators = [...this.validators, Validators.pattern(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/)];
        this.initForm();

        this.globalService.colorTheme$.subscribe((theme: boolean) => {
            this.darkTheme = theme;
        });
    }

    chooseAuthOption(choice: 'login' | 'register'): void {
        this.authChoice = choice;
        this.changePasswordValidity();
        this.authForm.reset();
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
                    // TODO redirect na projekty
                    this.toastr.success(`You have been successfully ${successMessage}.`);
                    this.authForm.reset();
                });
        }
    }

    private matchValues(matchTo: string): ValidatorFn {
        return (control: any) => {
            return control?.value === control.parent?.controls[matchTo].value ? null : { isMatching: true };
        };
    }

    private initForm() {
        this.authForm = this.fb.group({
            username: ['', this.validators],
            password: [''],
            confirmPassword: ['']
        });
    }

    changePasswordValidity(): void {
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

    getAuthFormValues() {
        const authFormValue: { username: string; password: string; confirmPassword?: string } = {
            username: this.getControl('username').value,
            password: this.getControl('password').value
        };
        if (this.authChoice === 'register') {
            authFormValue.confirmPassword = this.getControl('confirmPassword').value;
        }

        return authFormValue;
    }

    getControl(control: string): AbstractControl<string, string> {
        return this.authForm.controls[control] as FormControl;
    }

    ping(): void {
        this.http.get('api/ping').subscribe((resp) => console.log(resp));
    }
}
