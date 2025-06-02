import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimuladorDoctorpesoComponent } from './doctorpeso/simulador-doctorpeso.component';
import { SimuladorFinancashComponent } from './financash/simulador-financash.component';
import { SimuladorKrediticyComponent } from './krediticy/simulador-krediticy.component';
import { SimuladorLineruComponent } from './lineru/simulador-lineru.component';
import { SimuladorPrestaenlineaComponent } from './prestaenlinea/simulador-prestaenlinea.component';
import { SimuladorRapicreditComponent } from './rapicredit/simulador-rapicredit.component';
import { SimuladorRayoComponent } from './rayo/simulador-rayo.component';
import { SimuladorSolventaComponent } from './solventa/simulador-solventa.component';
import { SimuladorWasticreditComponent } from './wasticredit/simulador-wasticredit.component';

@NgModule({
  declarations: [
    SimuladorDoctorpesoComponent,
    SimuladorFinancashComponent,
    SimuladorKrediticyComponent,
    SimuladorLineruComponent,
    SimuladorPrestaenlineaComponent,
    SimuladorRapicreditComponent,
    SimuladorRayoComponent,
    SimuladorSolventaComponent,
    SimuladorWasticreditComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SimuladorDoctorpesoComponent,
    SimuladorFinancashComponent,
    SimuladorKrediticyComponent,
    SimuladorLineruComponent,
    SimuladorPrestaenlineaComponent,
    SimuladorRapicreditComponent,
    SimuladorRayoComponent,
    SimuladorSolventaComponent,
    SimuladorWasticreditComponent
  ]
})
export class SimuladoresModule { }
