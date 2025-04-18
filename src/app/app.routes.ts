import { Routes } from '@angular/router';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { OrientacionComponent } from './components/orientacion/orientacion.component';
import { RapicreditComponent } from './components/rapicredit/rapicredit.component';
import { KrediticyComponent } from './components/krediticy/krediticy.component';
import { LineruComponent } from './components/lineru/lineru.component';
import { OtrasOpcionesComponent } from './components/otras-opciones/otras-opciones.component';

export const routes: Routes = [
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'orientacion', component: OrientacionComponent },
  { path: 'rapicredit', component: RapicreditComponent },
  { path: 'krediticy', component: KrediticyComponent },
  { path: 'lineru', component: LineruComponent },
  { path: 'otras-opciones', component: OtrasOpcionesComponent },
  { path: '**', redirectTo: 'quienes-somos' }
];
