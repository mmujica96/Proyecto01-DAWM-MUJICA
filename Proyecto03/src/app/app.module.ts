import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { RedesComponent } from './redes/redes.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashComponent } from './splash/splash.component';
import { PrincipalComponent } from './principal/principal.component';
import { AlbumComponent } from './album/album.component';

  
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  { path: "splash", component: SplashComponent },
  { path: "principal", component: PrincipalComponent },
     { path: "album", component: AlbumComponent },
     { path: "**", redirectTo: "splash" }
];

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    CabeceraComponent,
    RedesComponent,
    SplashComponent,
    PrincipalComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,  
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
