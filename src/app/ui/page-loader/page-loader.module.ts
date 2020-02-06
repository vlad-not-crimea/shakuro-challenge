import { NgModule } from "@angular/core";
import { PageLoaderComponent } from './page-loader.component';
import { BarLoaderModule } from '@ui/bar-loader';

@NgModule({
    imports: [BarLoaderModule],
    declarations: [ PageLoaderComponent ],
    exports: [ PageLoaderComponent ]
})
export class PageLoaderModule {

}