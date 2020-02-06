import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[min]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MinNumberValidator), multi: true }
    ]
})
export class MinNumberValidator implements Validator {

    @Input('min')
    public minValue: number;

    constructor(

    ) { }

    validate(control: AbstractControl): { [key: string]: any } {
        if (control.value === '' || control.value === null || control.value === undefined) {
            return null;
        }

        if (isNaN(control.value) || control.value < this.minValue) {
            return {
                min: false
            }
        } 

        return null;
    }
}