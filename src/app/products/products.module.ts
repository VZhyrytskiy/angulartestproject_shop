import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent, ProductListComponent, ProductFormComponent} from './components';
import {ProductsService} from './services/products.service';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  // providers: [ProductsService],
  exports: [
    ProductListComponent
  ]
})
export class ProductsModule { }
