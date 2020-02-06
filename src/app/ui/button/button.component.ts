import { Component, Input, HostBinding, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'ui-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

    @Input()
    public btnType: 'button' | 'submit' = 'button';

    @Input()
    public isLoading: boolean = false;

    @Input()
    public isDisabled: boolean = false;

    @HostBinding('style.pointerEvents')
    private get _pointerEvents() {
        return this.isDisabled || this.isLoading ? 'none' : null;
    }

}