import { Component, Input } from '@angular/core';


@Component({
    selector: 'ui-bar-loader',
    templateUrl: './bar-loader.component.html',
    styleUrls: ['./bar-loader.component.scss']
})
export class BarLoaderComponent {

    @Input()
    public width: number = 85;

    @Input()
    public height: number = 50;
}