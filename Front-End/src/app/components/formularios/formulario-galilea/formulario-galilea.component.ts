import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-formulario-galilea',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './formulario-galilea.component.html',
  styleUrl: './formulario-galilea.component.css'
})
export class FormularioGalileaComponent implements OnInit {
  solicitud: any = {
    nombre: '',
    apellidos: '',
    email: '',
    monto: '',
    fecha: '',
    comentario: '',
    puntuacion: null,
    simulador: 'galilea'
  };
  mensaje: string = '';
  error: string = '';
  enviando = false;

  hoveredStar: number | null = null;

  setRating(rating: number) {
    this.solicitud.puntuacion = rating;
  }

  getStarClass(star: number): string {
    const rating = this.hoveredStar !== null ? this.hoveredStar : this.solicitud.puntuacion;
    if (rating >= star) {
      return 'star-filled';
    } else if (rating >= star - 0.5 && rating < star) {
      return 'star-half-filled';
    } else {
      return 'star-empty';
    }
  }

  getStarFill(star: number): string {
    const rating = this.hoveredStar !== null ? this.hoveredStar : this.solicitud.puntuacion;
    if (rating >= star) {
      return '#FFD700';
    } else if (rating >= star - 0.5 && rating < star) {
      return `url(#halfStar${star})`;
    } else {
      return '#ccc';
    }
  }

  getStarGradientOffset(star: number): string {
    const rating = this.hoveredStar !== null ? this.hoveredStar : this.solicitud.puntuacion;
    if (rating >= star - 0.5 && rating < star) {
      return '50%';
    } else {
      return rating >= star ? '100%' : '0%';
    }
  }

  onStarMouseMove(event: MouseEvent, star: number) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const isLeft = x < rect.width / 2;
    this.hoveredStar = isLeft ? star - 0.5 : star;
  }

  onStarClick(event: MouseEvent, star: number) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const isLeft = x < rect.width / 2;
    this.setRating(isLeft ? star - 0.5 : star);
  }
  constructor(
    private route: ActivatedRoute,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['monto']) {
        this.solicitud.monto = params['monto'].replace(/[^\d]/g, '');
      }
        // Lógica para fecha/plazo
        if (params['fecha']) {
          // Si es una fecha directa (YYYY-MM-DD)
          this.solicitud.fecha = params['fecha'];
        } else if (params['plazo']) {
          // Si es plazo en días o meses
          const plazo = params['plazo'].toLowerCase();
          const hoy = new Date();
          let fechaPago = new Date(hoy);
          if (plazo.includes('dia')) {
            // Ejemplo: "15dias"
            const dias = parseInt(plazo);
            if (!isNaN(dias)) {
              fechaPago.setDate(hoy.getDate() + dias);
            }
          } else if (plazo.includes('mes')) {
            // Ejemplo: "1mes"
            const meses = parseInt(plazo);
            if (!isNaN(meses)) {
              fechaPago.setMonth(hoy.getMonth() + meses);
            }
          }
          // Si cae en domingo, pasar al lunes siguiente
          if (fechaPago.getDay() === 0) {
            fechaPago.setDate(fechaPago.getDate() + 1);
          }
          // Formato yyyy-mm-dd para el input date
          const dd = String(fechaPago.getDate()).padStart(2, '0');
          const mm = String(fechaPago.getMonth() + 1).padStart(2, '0');
          const yyyy = fechaPago.getFullYear();
          this.solicitud.fecha = `${yyyy}-${mm}-${dd}`;
          // Guardar también la fecha en formato colombiano para mostrarla
          this.solicitud.fechaCol = `${dd}-${mm}-${yyyy}`;
        }
    });
  }

  enviarSolicitud() {
    this.mensaje = '';
    this.error = '';
    this.enviando = true;
    // Validación básica
    if (!this.solicitud.nombre.trim() || !this.solicitud.apellidos.trim() || !this.solicitud.email.trim() || !this.solicitud.monto || this.solicitud.puntuacion === null) {
      this.error = 'Por favor, completa todos los campos obligatorios.';
      this.enviando = false;
      return;
    }
    // Validar monto (solo números, sin símbolos)
    this.solicitud.monto = String(this.solicitud.monto).replace(/[^\d]/g, '');
    // Validar puntuación
    if (this.solicitud.puntuacion < 0 || this.solicitud.puntuacion > 5) {
      this.error = 'La puntuación debe estar entre 0 y 5.';
      this.enviando = false;
      return;
    }
    // Validar email básico
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.solicitud.email)) {
      this.error = 'El correo electrónico no es válido.';
      this.enviando = false;
      return;
    }
    this.solicitudService.crearSolicitud(this.solicitud).subscribe({
      next: () => {
        this.solicitud = { nombre: '', apellidos: '', email: '', monto: '', fecha: '', comentario: '', puntuacion: null, simulador: 'galilea' };
        this.enviando = false;
        Swal.fire({
          icon: 'success',
          title: '¡Solicitud enviada!',
          text: 'Serás redirigido a la página principal en unos segundos...',
          timer: 7000,
          showConfirmButton: false
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 7000);
      },
      error: (err) => {
        this.error = 'Error al enviar la solicitud.';
        this.enviando = false;
      }
    });
  }
}
