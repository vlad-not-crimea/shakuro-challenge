import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TelInputComponent } from './tel-input.component';

describe('TelInputComponent', () => {
    let component: TelInputComponent;
    let fixture: ComponentFixture<TelInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [TelInputComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TelInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not allow to input chars except numbers or spaces', async () => {
        component.registerOnTouched(() => {});
        let keyEvent: KeyboardEvent;
        let spy: jasmine.Spy;
        const initKeypressEvent = (key: string) => {
            keyEvent = new KeyboardEvent('keypress', {key});
            spy = spyOn(keyEvent, 'preventDefault'); 
        }
        initKeypressEvent('A')
        component.onInputKeyPress(keyEvent);
        expect(spy).toHaveBeenCalled();

        initKeypressEvent('+');
        component.onInputKeyPress(keyEvent);
        expect(spy).not.toHaveBeenCalled();


        initKeypressEvent('7');
        component.onInputKeyPress(keyEvent);
        expect(spy).not.toHaveBeenCalled();

        initKeypressEvent(' ');
        component.onInputKeyPress(keyEvent);
        expect(spy).not.toHaveBeenCalled();
    });
});
