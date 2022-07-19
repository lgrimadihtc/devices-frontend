import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router'; 
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { PaymentComponent } from './pages/payment/payment.component';


export const routes: Routes = [
  {
    path: '', 
    component: PagesComponent, 
    children:[
     
      { path: '', loadChildren: () => import('./pages/product/products.module').then(m => m.DeviceModule), data: { breadcrumb: 'product' } },
      { path: 'payment', component: PaymentComponent, data: { breadcrumb: 'Payment' } },
      { path: '**', component: NotFoundComponent }
          ]
  },
 
]; 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      relativeLinkResolution: 'legacy',
      // useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }