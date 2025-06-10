import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'quienes-somos',
    pathMatch: 'full'
  },
  {
    path: 'quienes-somos',
    loadComponent: () =>
      import('./components/quienes-somos/quienes-somos.component')
        .then(m => m.QuienesSomosComponent),
    title: '¿Quiénes somos? - Incredicol'
  },
  {
    path: 'orientacion',
    loadComponent: () =>
      import('./components/orientacion/orientacion.component')
        .then(m => m.OrientacionComponent),
    title: 'Orientación - Incredicol'
  },
  {
    path: 'plataformas',
    loadComponent: () =>
      import('./components/plataformas/plataformas.component')
        .then(m => m.PlataformasComponent),
    title: 'Plataformas - Incredicol'
  },
  {
    path: 'comparacion',
    loadComponent: () =>
      import('./components/comparacion/comparacion.component')
        .then(m => m.ComparacionComponent),
    title: 'Comparación - Incredicol'
  },
  {
    path: 'simulador-rapicredit',
    loadComponent: () =>
      import('./components/simuladores/rapicredit/simulador-rapicredit.component')
        .then(m => m.SimuladorRapicreditComponent),
    title: 'Simulador Rapicredit - Incredicol',
    data: {
      montoMin: 100000,
      montoMax: 1000000,
      plazos: [5, 15, 30, 60, 90, 120, 150]
    }
  },
  {
    path: '**',
    redirectTo: 'quienes-somos'
  }
];
