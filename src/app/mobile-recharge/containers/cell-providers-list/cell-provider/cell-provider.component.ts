import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CellProvider } from 'src/app/mobile-recharge/state/cell-provider';

@Component({
  selector: 'app-cell-provider',
  templateUrl: './cell-provider.component.html',
  styleUrls: ['./cell-provider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellProviderComponent implements OnInit {

  @Input()
  public cellProvider: CellProvider;

  constructor() { }

  ngOnInit() {
  }

}
