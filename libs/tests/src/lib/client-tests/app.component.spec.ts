/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UiComponentsModule } from '@portfolio/ui-components';
import { AppComponent } from '../../../../../apps/client/src/app/app.component';
import { NavigationComponent } from '../../../../../apps/client/src/app/core/navigation/navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialsComponent } from '../../../../../apps/client/src/app/core/socials/socials.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, NavigationComponent, SocialsComponent],
            imports: [
                HttpClientModule,
                UiComponentsModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
                RouterTestingModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
