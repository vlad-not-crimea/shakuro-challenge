import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-test', 
    template: '<ui-button [isLoading]="isLoading" (click)="onClick()">test</ui-button>'
})
export class TestComponent {
    
    isLoading = false;


    onClick() {
        console.log('clicked');
    }
}

describe('ButtonComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ ButtonComponent, TestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not trigger click handlers while isLoading === true', async () => {
      component.isLoading = true;
      fixture.detectChanges();
      let pointerEvents = fixture.debugElement.query(By.directive(ButtonComponent)).nativeElement.style.pointerEvents;
      expect(pointerEvents).toBe('none');
  })
});
