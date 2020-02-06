import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CellProvider } from './cell-provider.model';

export interface CellProviderState extends EntityState<CellProvider> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'cell-provider',
  idKey: 'id'
})
export class CellProviderStore extends EntityStore<CellProviderState> {

  constructor() {
    super();
  }

}
