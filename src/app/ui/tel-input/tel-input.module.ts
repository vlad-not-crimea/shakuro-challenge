import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TelInputComponent } from './tel-input.component';

@NgModule({
    declarations: [
        TelInputComponent,
    ],
    exports: [
        TelInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ]
})
export class TelInputModule {

}