import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ComparacionComponent } from './components/comparacion/comparacion.component';
import { SimuladorRapicreditComponent } from './components/simuladores/rapicredit/simulador-rapicredit.component';

import { routes } from './app.routes'; // 👈 Importa tus rutas definidas

@NgModule({
  declarations: [
    AppComponent,
    ComparacionComponent,
    SimuladorRapicreditComponent // Asegúrate de declarar todos los componentes que uses
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes) // 👈 Usa tus rutas aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
