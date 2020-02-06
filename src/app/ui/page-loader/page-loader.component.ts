import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent implements OnInit {

  @Input()
  public title: string;

  constructor() { }

  ngOnInit() {
  }

}
