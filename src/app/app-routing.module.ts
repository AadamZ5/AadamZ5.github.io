import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';


const routes: Routes = [
  {
    path: "",
    loadChildren: () => {
      return import('./public/public.module').then((m) => {
        return m.PublicModule;
      });
    }
  },
  {
    path: "admin",
    loadChildren: () => {
      return import('./admin/admin.module').then((m) => {
        return m.AdminModule;
      });
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
