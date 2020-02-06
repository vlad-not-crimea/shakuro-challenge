import { Component, OnInit } from '@angular/core';
import { CellProviderService, CellProviderQuery } from '../../state/cell-provider';

@Component({
  selector: 'app-cell-providers-list',
  templateUrl: './cell-providers-list.component.html',
  styleUrls: ['./cell-providers-list.component.scss']
})
export class CellProvidersListComponent implements OnInit {

  public cellProviders$ = this._cellProviderQuery.selectAll();
  public isLoading$ = this._cellProviderQuery.selectLoading();

  constructor(
    private _cellProviderService: CellProviderService,
    private _cellProviderQuery: CellProviderQuery
  ) { }

  ngOnInit() {
    if (!this._cellProviderQuery.getHasCache()) {
      this._cellProviderService.query().subscribe();
    }
  }

  trackByIndex(index: number, _) {
    return index;
  }

}
