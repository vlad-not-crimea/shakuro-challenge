import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CellProvidersListComponent } from './containers/cell-providers-list/cell-providers-list.component';
import { RechargeFormComponent } from './containers/recharge-form/recharge-form.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { CellProviderComponent } from './containers/cell-providers-list/cell-provider/cell-provider.component';
import { ButtonModule } from '@ui/button';
import { FormControlModule } from '@ui/form-control';
import { CoreModule } from '../core/core.module';
import { TelInputModule } from '@ui/tel-input';
import { PageLoaderModule } from '@ui/page-loader/page-loader.module';

@NgModule({
  declarations: [CellProvidersListComponent, RechargeFormComponent, CellProviderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    CoreModule,
    ButtonModule,
    FormControlModule,
    TelInputModule,
    PageLoaderModule
  ]
})
export class MobileRechargeModule { }
