import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  { path: "splash", component: SplashComponent },
  { path: "login", component: LoginComponent},
  { path: "home", component: HomeComponent },
  {path: 'busqueda', component: BusquedaComponent},
  {path: '', component: LoginComponent},
  { path: "**", redirectTo: "splash" }
];


@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  declarations: [
  ]
})
export class AppRoutingModule { }