import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';

interface Solicitud {
  nombre: string;
  apellidos: string;
  comentario: string;
  puntuacion: number;
}

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  nuevoComentario: string = '';
  puntuacionSeleccionada: number = 5;

  // Propiedades para el nuevo comentario
  nombre: string = '';
  apellidos: string = '';
comentarios: any;

  constructor(
    private router: Router,
    private solicitudService: SolicitudService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initIntersectionObserver();
      this.cargarComentariosBD();
    }
  }

  // IntersectionObserver que anima solo la primera vez
  initIntersectionObserver(): void {
    const sections = document.querySelectorAll('.section-fade');

    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          entry.target.classList.remove('section-hidden');
          obs.unobserve(entry.target);
        }
      });
    }, options);

    sections.forEach(section => observer.observe(section));
  }

  // Cargar comentarios desde la base de datos
  cargarComentariosBD(): void {
    this.solicitudService.listarSolicitudes().subscribe({
      next: (data: any[]) => {
        console.log('Datos recibidos:', data); // Para debug
        this.solicitudes = data
          .filter(solicitud => solicitud.comentario && solicitud.puntuacion) // Filtrar solo con comentario y puntuación
          .map(solicitud => ({
            nombre: solicitud.nombre,
            apellidos: solicitud.apellidos,
            comentario: solicitud.comentario,
            puntuacion: solicitud.puntuacion
          }))
          .sort((a, b) => b.puntuacion - a.puntuacion);
      },
      error: (error) => {
        console.error('Error al cargar comentarios:', error);
        // Datos de ejemplo en caso de error
      }
    });
  }
    // Navegación
    navigateToComparacion(): void {
      this.router.navigate(['/comparacion']);
    }

  navigateToPlataformas(): void {
    this.router.navigate(['/plataformas']);
  }

  navigateToOrientacion(): void {
    this.router.navigate(['/orientacion']);
  }
}