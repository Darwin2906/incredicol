import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { OrientacionComponent } from './components/orientacion/orientacion.component';
import { routes } from './app.routes';
import { RapicreditComponent } from './components/rapicredit/rapicredit.component';
import { KrediticyComponent } from './components/krediticy/krediticy.component';
import { LineruComponent } from './components/lineru/lineru.component';
import { OtrasOpcionesComponent } from './components/otras-opciones/otras-opciones.component';

@NgModule({
  declarations: [
    AppComponent,
    QuienesSomosComponent,
    OrientacionComponent,
    RapicreditComponent,
    KrediticyComponent,
    LineruComponent,
    OtrasOpcionesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
