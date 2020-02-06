import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CellProviderStore, CellProviderState } from './cell-provider.store';

@Injectable({ providedIn: 'root' })
export class CellProviderQuery extends QueryEntity<CellProviderState> {

  constructor(protected store: CellProviderStore) {
    super(store);
  }

}
