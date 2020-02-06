import { Component, OnInit, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AsYouType } from 'libphonenumber-js'

@Component({
  selector: 'ui-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TelInputComponent), multi: true }
  ],
})
export class TelInputComponent implements OnInit, ControlValueAccessor {
  
  private onChange: (value: string) => void;
  private onTouch: () => void;
  private formatter = new AsYouType();

  value = '';


  constructor() { 

  }

  ngOnInit() {

  }

  public onInputKeyPress(event: KeyboardEvent): void {
    const pattern = /[0-9\+\-\ ]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
      return;
    }
    this.onTouch();
  }
  
  onValueChanged(phone: string) {
    if (phone[0] !== '+') {
      phone = `+${phone}`;
    }
    this.formatter.reset();
    this.value = this.formatter.input(phone);
    let phoneNumber = this.formatter.getNumber();
    if (phoneNumber && phoneNumber.isValid()) {
      this.onChange(this.value);
    } else {
      this.onChange(null);
    }
  }

  writeValue(value) {
    if (!value) {
      return;
    }
    this.onValueChanged(value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
      this.onTouch = fn;
  }
}