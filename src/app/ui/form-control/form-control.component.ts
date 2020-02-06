import { Component, OnInit, ContentChild, Optional, Input } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'ui-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

  @ContentChild(NgControl, { static: false })
  private control: NgControl;

  @Input()
  public label: string;

  private validationMessages: {[code: string]: string} = {
    required: 'Это поле обязательно',
    min: 'Не удовлетворяет минимальному значению',
    max: 'Не удовлетворяет максимальному значению'
  }
  public errorMsg$: Observable<string>;

  constructor(
    @Optional() private ngForm: NgForm
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (!this.control) {
      throw new Error('NgControl missing');
    }

    this.errorMsg$ = merge(this.control.statusChanges, this.ngForm.ngSubmit)
      .pipe(
        delay(0), // delay специально, т.к. statusChanges эмитит раньше чем флаг submitted  сбрасывается в  false после resetForm
        map(this.updateMessage.bind(this)),
      )
  }

  private updateMessage() {
    if (!this.control.errors || !this.ngForm.submitted) {
      return '';
    }
    let errorKeys = Object.keys(this.control.errors);
    if (errorKeys.length) {
      return this.validationMessages[errorKeys[0]];
    } else {
      return '';
    }
  }

}
