import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { FormsModule, NgForm } from '@angular/forms';
import { Component, DebugElement } from '@angular/core';

import { FormControlComponent } from './form-control.component';


@Component({
  selector: 'app-test',
  template: `
    <form>
      <ui-form-control label="test">
        <input name="val" [(ngModel)]="val" required />
      </ui-form-control>
      <button type="submit">submit></button>
    </form>
  `
})
class TestComponent {
}

describe('FormControlComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let formControlDebugElement: DebugElement;
  let formControlInstance: FormControlComponent;
  let formControlNativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ FormControlComponent, TestComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    formControlDebugElement = fixture.debugElement.query(By.directive(FormControlComponent));
    formControlInstance = formControlDebugElement.componentInstance;
    formControlNativeElement = formControlDebugElement.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show label', () => {
    expect(formControlNativeElement.querySelector('.FormControl-label').innerHTML).toEqual(formControlInstance.label);
  });

  it('should project control', () => {
    expect(formControlNativeElement.querySelector('input')).toBeTruthy();
  });

  it('should not show errors until form submitted', () => {
    expect(formControlNativeElement.querySelector('.FormControl-error').innerHTML.trim()).toBeFalsy();
  });

  it('should show error after form submitted', async(async () => {
    fixture.debugElement.nativeElement.querySelector('button').click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(formControlNativeElement.querySelector('.FormControl-error').innerHTML.trim()).toBeTruthy();
    fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm).resetForm();
  }));



});
