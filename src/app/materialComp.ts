// All the required material components defined by the application
import {
    MatButtonModule, MatCheckboxModule, MatCardModule,
    MatDividerModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatSelectModule, MatListModule, MatDialogModule, MatStepperModule,
    MatProgressBarModule, MatSlideToggleModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatListModule,
        MatDialogModule,
        MatStepperModule,
        MatProgressBarModule,
        MatSlideToggleModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatListModule,
        MatDialogModule,
        MatStepperModule,
        MatProgressBarModule,
        MatSlideToggleModule
    ]
})

export class CustomMaterialCompModule { }