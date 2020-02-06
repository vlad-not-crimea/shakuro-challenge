import { Route } from '@angular/router';
import { LayoutComponent } from './core/containers/layout/layout.component';

export const routes: Route[] = [
    {path: '', component: LayoutComponent, children: [
        { path: '', loadChildren: () => import('./mobile-recharge/mobile-recharge.module').then(m => m.MobileRechargeModule)},
    ]}
]