import { NgModule } from "@angular/core";
import { FormControlComponent } from './form-control.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [FormControlComponent],
    exports: [FormControlComponent]
})
export class FormControlModule {

}