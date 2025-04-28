import { Routes } from '@angular/router';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { OrientacionComponent } from './components/orientacion/orientacion.component';
import { PlataformasComponent } from './components/plataformas/plataformas.component';
import { ComparacionComponent } from './components/comparacion/comparacion.component';

export const routes: Routes = [
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'orientacion', component: OrientacionComponent },
  { path: 'plataformas', component: PlataformasComponent },
  { path: 'comparacion', component: ComparacionComponent },
  { path: '**', redirectTo: 'quienes-somos' }
];
