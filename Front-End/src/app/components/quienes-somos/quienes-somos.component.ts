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
  nombre: string = '';
  apellidos: string = '';
  comentarios: any;
  cargando: boolean = false;
  error: string = '';

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

  // ✅ MÉTODO COMPLETAMENTE CORREGIDO
  cargarComentariosBD(): void {
    this.cargando = true;
    this.error = '';
    
    this.solicitudService.listarSolicitudes().subscribe({
      next: (solicitudesArray: any[]) => {
        console.log('✅ Array recibido del servicio:', solicitudesArray);
        this.cargando = false;
        
        // VERIFICACIÓN EXTRA DE SEGURIDAD
        if (!Array.isArray(solicitudesArray)) {
          console.error('❌ El servicio no devolvió un array:', solicitudesArray);
          this.solicitudes = [];
          this.error = 'Error al cargar los comentarios';
          return;
        }

        try {
          this.solicitudes = solicitudesArray
            .filter((solicitud: any) => {
              // Filtro SEGURO con verificaciones
              const tieneComentario = solicitud && 
                                    solicitud.comentario && 
                                    solicitud.comentario.toString().trim() !== '';
              const tienePuntuacion = solicitud && 
                                    solicitud.puntuacion !== undefined && 
                                    solicitud.puntuacion !== null;
              return tieneComentario && tienePuntuacion;
            })
            .map((solicitud: any) => ({
              nombre: solicitud.nombre || 'Anónimo',
              apellidos: solicitud.apellidos || '',
              comentario: solicitud.comentario,
              puntuacion: solicitud.puntuacion
            }))
            .sort((a, b) => b.puntuacion - a.puntuacion);

          console.log('🎉 Comentarios cargados exitosamente:', this.solicitudes.length);
        } catch (error) {
          console.error('💥 Error procesando datos:', error);
          this.solicitudes = [];
          this.error = 'Error al procesar los comentarios';
        }
      },
      error: (error) => {
        console.error('💥 Error en la suscripción:', error);
        this.cargando = false;
        this.error = 'No se pudieron cargar los comentarios';
        this.solicitudes = [];
      }
    });
  }

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