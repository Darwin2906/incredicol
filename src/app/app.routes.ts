import { Routes } from '@angular/router';
import path from 'path';
import { title } from 'process';

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
        .then(m => m.RapicreditComponent),
    title: 'Simulador Rapicredit - Incredicol',
    data: {
      montoMin: 100000,
      montoMax: 1000000,
      plazos: [5, 15, 30, 60, 90, 120, 150]
    }
  },
  {
    path: 'simulador-lineru',
    loadComponent: () =>
      import('./components/simuladores/lineru/simulador-lineru.component')
        .then(m => m.LineruComponent),
    title: 'Simulador Linerú - Incredicol',
    data: {
      montoMin: 100000,
      montoMax: 1000000,
      plazos: [5, 10, 15, 20, 30]
    }
  },
  {
    path: 'simulador-solventa',
    loadComponent: () =>
      import('./components/simuladores/solventa/simulador-solventa.component')
        .then(m => m.SimuladorSolventaComponent),
    title: 'Simulador Solventa - Incredicol',
    data: {
      montoMin: 150000,
      montoMax: 5000000,
      plazos: [1, 3, 6]
    }
  },
  {
    path: 'simulador-galilea',
    loadComponent: () =>
      import('./components/simuladores/galilea/simulador-galilea.component')
        .then(m => m.SimuladorGalileaComponent),
    title: 'Simulador Galilea - Incredicol',
    data: {
      montoMin: 100000,
      montoMax: 3000000,
      plazos: [10, 25]
    }
  },
  {
    path: 'simulador-wasticredit',
    loadComponent: () =>
      import('./components/simuladores/wasticredit/simulador-wasticredit.component')
        .then(m => m.SimuladorWasticreditComponent),
    title: 'Simulador WastiCredit - Incredicol',
    data: {
      montoMin: 300000,
      montoMax: 1000000,
      plazos: [1, 30]
    }
  },
    {
    path:'simulador-prestanza',
    loadComponent: () =>
      import('./components/simuladores/prestanza/simulador-prestanza.component')
      .then(m =>m.SimuladorPrestanzaComponent),
      title: 'Simulador Prestanza - Incredicol',
      data:{
        montoMin: 100000,
        montoMax: 2000000,
        plazos: [1,2,3,4,5,6]
      }
  },
  {
    path:'simulador-quipu',
    loadComponent: () =>
      import('./components/simuladores/quipu/simulador-quipu.component')
      .then(m =>m.SimuladorQuipuComponent),
    title:'Simulador Quipu - Incredicol',
    data:{
      montoMin: 500000,
      montoMax: 1000000,
      plazo:[7,8,9,10,11,12]
    }
  },
  {
    path: '**',
    redirectTo: 'quienes-somos'
  }
];