import { NgModule } from '@angular/core';
import { LayoutComponent } from './containers/layout/layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './containers/layout/header/header.component';
import { FooterComponent } from './containers/layout/footer/footer.component';
import { MinNumberValidator } from './validators/min-number.validator';
import { MaxNumberValidator } from './validators/max-number.validator';

@NgModule({
    imports: [
        RouterModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        MinNumberValidator,
        MaxNumberValidator
    ],
    exports: [
        LayoutComponent,
        MinNumberValidator,
        MaxNumberValidator
    ]
})
export class CoreModule {

}