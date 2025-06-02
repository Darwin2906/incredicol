import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ComparacionComponent } from './components/comparacion/comparacion.component';

import { SimuladorDoctorpesoComponent } from './components/simuladores/doctorpeso/simulador-doctorpeso.component';
import { SimuladorFinancashComponent } from './components/simuladores/financash/simulador-financash.component';
import { SimuladorKrediticyComponent } from './components/simuladores/krediticy/simulador-krediticy.component';
import { SimuladorLineruComponent } from './components/simuladores/lineru/simulador-lineru.component';
import { SimuladorPrestaenlineaComponent } from './components/simuladores/prestaenlinea/simulador-prestaenlinea.component';
import { SimuladorRapicreditComponent } from './components/simuladores/rapicredit/simulador-rapicredit.component';
import { SimuladorRayoComponent } from './components/simuladores/rayo/simulador-rayo.component';
import { SimuladorSolventaComponent } from './components/simuladores/solventa/simulador-solventa.component';
import { SimuladorWasticreditComponent } from './components/simuladores/wasticredit/simulador-wasticredit.component';

import { routes } from './app.routes'; // 👈 Importa tus rutas definidas

@NgModule({
  declarations: [
    AppComponent,
    ComparacionComponent,
    SimuladorRapicreditComponent,
    SimuladorDoctorpesoComponent,
    SimuladorFinancashComponent,
    SimuladorKrediticyComponent,
    SimuladorLineruComponent,
    SimuladorPrestaenlineaComponent,
    SimuladorRayoComponent,
    SimuladorSolventaComponent,
    SimuladorWasticreditComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes) // 👈 Usa tus rutas aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
