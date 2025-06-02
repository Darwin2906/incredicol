import { Routes } from '@angular/router';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { OrientacionComponent } from './components/orientacion/orientacion.component';
import { PlataformasComponent } from './components/plataformas/plataformas.component';
import { ComparacionComponent } from './components/comparacion/comparacion.component';
import { SimuladorRapicreditComponent } from './components/simuladores/rapicredit/simulador-rapicredit.component';
import { SimuladorLineruComponent } from './components/simuladores/lineru/simulador-lineru.component';
import { SimuladorKrediticyComponent } from './components/simuladores/krediticy/simulador-krediticy.component';
import { SimuladorPrestaenlineaComponent } from './components/simuladores/prestaenlinea/simulador-prestaenlinea.component';
import { SimuladorSolventaComponent } from './components/simuladores/solventa/simulador-solventa.component';
import { SimuladorWasticreditComponent } from './components/simuladores/wasticredit/simulador-wasticredit.component';
import { SimuladorDoctorpesoComponent } from './components/simuladores/doctorpeso/simulador-doctorpeso.component';
import { SimuladorRayoComponent } from './components/simuladores/rayo/simulador-rayo.component';
import { FinancashComponent } from './components/simuladores/financash/financash.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'comparacion',
    pathMatch: 'full'
  },
  {
    path: 'quienes-somos',
    component: QuienesSomosComponent,
    title: '¿Quiénes Somos? - Incredicol'
  },
  {
    path: 'orientacion',
    component: OrientacionComponent,
    title: 'Orientación Financiera - Incredicol'
  },
  {
    path: 'plataformas',
    component: PlataformasComponent,
    title: 'Plataformas - Incredicol'
  },
  {
    path: 'comparacion',
    component: ComparacionComponent,
    title: 'Comparador de Préstamos - Incredicol'
  },
  {
    path: 'simulador-rapicredit',
    component: SimuladorRapicreditComponent,
    title: 'Simulador Rapicredit - Incredicol',
    data: {
      montoMin: 100000,
      montoMax: 1000000,
      plazos: [5, 15, 30, 60, 90, 120, 150]
    }
  },
  {
    path: 'simulador-lineru',
    component: SimuladorLineruComponent,
    title: 'Simulador Lineru - Incredicol'
  },
  {
    path: 'simulador-krediticy',
    component: SimuladorKrediticyComponent,
    title: 'Simulador Krediticy - Incredicol'
  },
  {
    path: 'simulador-prestaenlinea',
    component: SimuladorPrestaenlineaComponent,
    title: 'Simulador Prestaenlinea - Incredicol'
  },
  {
    path: 'simulador-solventa',
    component: SimuladorSolventaComponent,
    title: 'Simulador Solventa - Incredicol'
  },
  {
    path: 'simulador-wasticredit',
    component: SimuladorWasticreditComponent,
    title: 'Simulador Wasticredit - Incredicol'
  },
  {
    path: 'simulador-doctorpeso',
    component: SimuladorDoctorpesoComponent,
    title: 'Simulador Doctorpeso - Incredicol'
  },
  {
    path: 'simulador-rayo',
    component: SimuladorRayoComponent,
    title: 'Simulador Rayo - Incredicol'
  },
  {
    path: 'simulador-financash',
    component: FinancashComponent,
    title: 'Simulador Financash - Incredicol'
  },
  {
    path: '**',
    redirectTo: 'comparacion'
  }
];
