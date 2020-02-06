import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[max]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MaxNumberValidator), multi: true }
    ]
})
export class MaxNumberValidator implements Validator {

    @Input('max')
    public maxValue: number;

    constructor(

    ) { }

    validate(control: AbstractControl): { [key: string]: boolean } {
        if (control.value === '' || control.value === null || control.value === undefined) {
            return null;
        }

        if (isNaN(control.value) || control.value > this.maxValue) {
            return {
                max: false
            }
        } 

        return null;
    }
}