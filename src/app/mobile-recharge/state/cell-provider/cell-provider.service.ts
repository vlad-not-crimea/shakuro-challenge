import { Injectable } from '@angular/core';
import { CellProviderStore } from './cell-provider.store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CellProvider } from './cell-provider.model';

@Injectable({ providedIn: 'root' })
export class CellProviderService {

  constructor(
    private _store: CellProviderStore,
    private _http: HttpClient
  ) {
  }

  query() {
    return this._http.get<CellProvider[]>('/api/v1/cell-provider').pipe(
      tap(value => this._store.set(value))
    )

  }

}
