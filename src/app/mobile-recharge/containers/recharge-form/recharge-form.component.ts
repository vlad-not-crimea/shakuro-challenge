import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RechargeForm, RechargeService } from '../../services/Recharge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeWhile, filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { CellProviderQuery, CellProviderService } from '../../state/cell-provider';
import { Observable, combineLatest } from 'rxjs';
import { filterNil } from '@datorama/akita';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recharge-form',
  templateUrl: './recharge-form.component.html',
  styleUrls: ['./recharge-form.component.scss']
})
export class RechargeFormComponent implements OnInit, OnDestroy {
  
  public model: RechargeForm = {
    amount: null,
    phone: null,
    provider: null
  }

  public providerOpts$: Observable<{value: number | string; label: string}[]>;
  public isAlive = true;
  public isSaving = false;
  public isLoading$: Observable<boolean>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cellProviderQuery: CellProviderQuery,
    private _cellProviderService: CellProviderService,
    private _rechargeService: RechargeService,
    private _router: Router,
    private _toastr: ToastrService
  ) { 
  }

  ngOnInit() {
    if (!this._cellProviderQuery.getHasCache()) {
      this._cellProviderService.query().subscribe();
    }
    
    this.providerOpts$ = this._cellProviderQuery.selectAll().pipe(
      filter(providers => providers.length > 0),
      map(providers => providers.map(p => ({value: p.id, label: p.name})))
    )

    this.isLoading$ = this._cellProviderQuery.selectLoading();

    combineLatest(
      this.providerOpts$,
      this._activatedRoute.paramMap.pipe(
        map(params => {
          let providerId: number = null;
          try {
            providerId = parseInt(params.get('providerId'))
          } catch(e) {

          }
          return providerId;
        }),
        filterNil
      )
    )
    .pipe(
      takeWhile(() => this.isAlive)
    )
    .subscribe(([providers, providerId]) => {
      let provider = providers.find(p => p.value === providerId);
      if (provider) {
        this.model.provider = providerId;
      } else {
        this.model.provider = null;
        this._router.navigate(['..', 'unknown']);
      }
    })

  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  async submit(ngform: NgForm) {
    if (ngform.invalid) {
      return;
    }
    this.isSaving = true;
    try {
      await this._rechargeService.recharge(this.model).toPromise();
      this._toastr.success('Счет успешно пополнен.');
      this._router.navigate(['..']);
    } catch(e) {
      console.error(e);
      this._toastr.error('Не удалось пополнить счет.')
    }
    this.isSaving = false;
  }

  onProviderChanged(providerId: number) {
    if (!providerId) {
      this._router.navigate(['..', 'unnknown']);
    } else {
      this._router.navigate(['..', providerId]);
    }
  }

}
