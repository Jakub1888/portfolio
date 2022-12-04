import { Component, Input, OnInit } from '@angular/core';
import { Book } from '@portfolio/interfaces';

@Component({
    selector: 'portfolio-learning-card',
    template: `
        <mat-card class="card">
            <mat-card-header>
                <mat-card-title-group>
                    <mat-card-title>Shiba Inu</mat-card-title>
                    <mat-card-subtitle>Small</mat-card-subtitle>
                </mat-card-title-group>
            </mat-card-header>
            <mat-card-content>
                <ul>
                    <li *ngFor="let item of learningList">
                        <portfolio-link
                            [link]="{ title: item.title, class: 'learningLink', href: item.url }"
                        ></portfolio-link>
                        <span>{{ item.description }}</span>
                    </li>
                </ul>
            </mat-card-content>
        </mat-card>
    `,
    styleUrls: ['./learning-card.component.scss']
})
export class LearningCardComponent implements OnInit {
    @Input() learningList!: Book[];
    constructor() {}

    ngOnInit(): void {}
}
