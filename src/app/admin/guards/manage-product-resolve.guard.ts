import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { Product } from './../../products/models/product.model';
import { ProductsService } from './../../products/services/products.service';
import { AdminServicesModule } from '../../admin/admin-services.module';

@Injectable({
  providedIn: AdminServicesModule
})
export class ManageProductResolveGuard implements Resolve<Product> {
  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product | null> {
    console.log('ManageProductResolve Guard is called');

    if (!route.paramMap.has('productID')) {
      return of(new Product(null, '', '', 0, false));
    }

    const id = +route.paramMap.get('productID');

    return this.productService.getProduct(id).pipe(
      map((product: Product) => {
        if (product) {
          return product;
        } else {
          this.router.navigate(['/products']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/products']);
        // catchError MUST return observable
        return of(null);
      })
    );
  }
}

