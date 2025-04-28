import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { OrientacionComponent } from './components/orientacion/orientacion.component';
import { PlataformasComponent } from './components/plataformas/plataformas.component';
import { ComparacionComponent } from './components/comparacion/comparacion.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    QuienesSomosComponent,
    OrientacionComponent,
    PlataformasComponent,
    ComparacionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
