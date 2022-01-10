import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PublicComponent } from './public.component';
import { NgxMasonryModule } from 'ngx-masonry';

const MODULE_ROUTES: Routes = [
  {
    path: "",
    component: PublicComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "about",
        component: AboutComponent,
      }
    ]
  },

]

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PublicComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),

    NgxMasonryModule,

    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
  ]
})
export class PublicModule { }
