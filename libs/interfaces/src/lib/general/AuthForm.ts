import { FormControl } from '@angular/forms';

export interface AuthForm {
    username: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}

export interface AuthFormValue {
    username: string;
    password: string;
    confirmPassword?: string | undefined;
}
