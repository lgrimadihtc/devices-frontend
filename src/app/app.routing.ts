import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router'; 
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { UploadComponent } from './pages/upload/upload.component';
import { LoadStatusComponent } from './pages/load-status/load-status.component';

export const routes: Routes = [
  {
    path: '', 
    component: PagesComponent, 
    children:[
      { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'Dashboard' }  },          
      { path: 'device', loadChildren: () => import('./pages/devices/device.module').then(m => m.DeviceModule), data: { breadcrumb: 'devices' } },
      { path: 'upload/:id',component:UploadComponent, data: { breadcrumb: 'upload' } },
      { path: 'loadstatus',component:LoadStatusComponent, data: { breadcrumb: 'upload' } },
      { path: '**', component: NotFoundComponent }
      //{ path: 'device', component: DevicesComponent, data: { breadcrumb: 'Device' } }
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