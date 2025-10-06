import { Routes } from '@angular/router';
import path from 'path';
import { title } from 'process';

export const routes: Routes = [
  // Formularios
  {
    path: 'formularios/formulario-doctorpeso',
    loadComponent: () =>
      import('./components/formularios/formulario-doctorpeso/formulario-doctorpeso.component')
        .then(m => m.FormularioDoctorpesoComponent)
  },
  {
    path: 'formularios/formulario-galilea',
    loadComponent: () =>
      import('./components/formularios/formulario-galilea/formulario-galilea.component')
        .then(m => m.FormularioGalileaComponent)
  },
  {
    path: 'formularios/formulario-lineru',
    loadComponent: () =>
      import('./components/formularios/formulario-lineru/formulario-lineru.component')
        .then(m => m.FormularioLineruComponent)
  },
  {
    path: 'formularios/formulario-prestaenlinea',
    loadComponent: () =>
      import('./components/formularios/formulario-prestaenlinea/formulario-prestaenlinea.component')
        .then(m => m.FormularioPrestaenlineaComponent)
  },
  {
    path: 'formularios/formulario-prestanza',
    loadComponent: () =>
      import('./components/formularios/formulario-prestanza/formulario-prestanza.component')
        .then(m => m.FormularioPrestanzaComponent)
  },
  {
    path: 'formularios/formulario-quipu',
    loadComponent: () =>
      import('./components/formularios/formulario-quipu/formulario-quipu.component')
        .then(m => m.FormularioQuipuComponent)
  },
  {
    path: 'formularios/formulario-rapicredit',
    loadComponent: () =>
      import('./components/formularios/formulario-rapicredit/formulario-rapicredit.component')
        .then(m => m.FormularioRapicreditComponent)
  },
  {
    path: 'formularios/formulario-solventa',
    loadComponent: () =>
      import('./components/formularios/formulario-solventa/formulario-solventa.component')
        .then(m => m.FormularioSolventaComponent)
  },
  {
    path: 'formularios/formulario-wasticredit',
    loadComponent: () =>
      import('./components/formularios/formulario-wasticredit/formulario-wasticredit.component')
        .then(m => m.FormularioWasticreditComponent)
  },
  {
    path: 'formularios/formulario-yadinero',
    loadComponent: () =>
      import('./components/formularios/formulario-yadinero/formulario-yadinero.component')
        .then(m => m.FormularioYadineroComponent)
  },
  // Formularios
  {
    path: 'formularios/formulario-doctorpeso',
    loadComponent: () =>
      import('./components/formularios/formulario-doctorpeso/formulario-doctorpeso.component')
        .then(m => m.FormularioDoctorpesoComponent)
  },
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
    path:'simulador-doctorpeso',
    loadComponent: () =>
      import('./components/simuladores/doctorpeso/simulador-doctorpeso.component')
      .then(m =>m.SimuladorDoctorpesoComponent),
    title:'Simulador doctorpeso - Incredicol',
    data:{
      montoMin: 100000,
      montoMax: 1100000,
      plazo:[1, 30]
    }
  },
  {
    path:'simulador-prestaenlinea',
    loadComponent:() =>
      import('./components/simuladores/prestaenlinea/simulador-prestaenlinea.component')
      .then(m =>m.SimuladorPrestaenlineaComponent),
      title:'Simulador Presta en linea - Incredicol',
      data: {
        montoMin: 100000,
        montoMax: 1000000,
        plazo:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
      }
  },
  {
    path:'simulador-yadinero',
    loadComponent:() =>
      import('./components/simuladores/yadinero/simulador-yadinero.component')
      .then(m =>m.SimuladorYaDineroComponent),
      title:'Simulador Ya dinero - Incredicol',
      data: {
        montoMin: 120000,
        montoMax: 2000000,
        plazo:[5, 30]
      }
  },
  {
    path: '**',
    redirectTo: 'quienes-somos'
  }
];