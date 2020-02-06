import { Route } from '@angular/router';
import { CellProvidersListComponent } from './containers/cell-providers-list/cell-providers-list.component';
import { RechargeFormComponent } from './containers/recharge-form/recharge-form.component';

export const routes: Route[] = [
    {path: '', component: CellProvidersListComponent },
    {path: ':providerId', component: RechargeFormComponent }
]