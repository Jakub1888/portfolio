117;

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        })
    );

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });

    it('User token and ID should be stored as currentUser', () => {
        const data = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…Y1NX0.rWd7C_Bdrve27smhKxbaAV0jlL0dpGRhZuBXHlIxHdI',
            userId: '638c36018a17d172cff5574f'
        };
        const service: AuthService = TestBed.get(AuthService);
        service.setCurrentUser(data);

        let currentUser;
        service.currentUser$.subscribe((user) => (currentUser = user));

        expect(currentUser).toEqual(data);
    });
});
