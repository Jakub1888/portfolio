import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
    authChoiceChoosen = false;
    authChoice: 'login' | 'register' = 'login';

    authForm = new FormGroup<authForm>({
        username: new FormControl('', { nonNullable: true }),
        password: new FormControl('', { nonNullable: true })
    });

    constructor(private readonly authService: AuthService, private readonly http: HttpClient) {}

    chooseAuthOption(choice: 'login' | 'register'): void {
        this.authChoice = choice;
        this.authChoiceChoosen = true;
        this.authForm.reset();
    }

    onSubmit(): void {
        const authChoice = this.authChoice;

        this.authService[authChoice](this.authForm.value).subscribe((user) => {
            console.log(user);
        });
    }

    ping() {
        this.http.get('api/ping').subscribe((resp) => console.log(resp));
    }
}
