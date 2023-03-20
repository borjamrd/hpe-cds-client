import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './pages/cities/cities.component';
import { CityinfoComponent } from './pages/cityinfo/cityinfo.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'cities',
        canActivate: [AuthGuard],
        component: CitiesComponent,
      },
      {
        path: 'cities/:city',
        canActivate: [AuthGuard],
        component: CityinfoComponent,
      },
    ],
  },
  {
    path: '**',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
