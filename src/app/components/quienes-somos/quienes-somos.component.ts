import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Comentario {
  texto: string;
  fecha: string;
}

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

  nuevoComentario: string = '';
  comentarios: Comentario[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initIntersectionObserver();
      this.cargarComentarios();
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

  // Cargar comentarios guardados en localStorage
  cargarComentarios(): void {
    const guardados = localStorage.getItem('comentarios');
    if (guardados) {
      this.comentarios = JSON.parse(guardados);
    }
  }

  // Agregar nuevo comentario con fecha y guardarlo
  agregarComentario(): void {
    if (this.nuevoComentario.trim()) {
      const nuevo: Comentario = {
        texto: this.nuevoComentario.trim(),
        fecha: new Date().toLocaleString()
      };
      this.comentarios.unshift(nuevo);
      localStorage.setItem('comentarios', JSON.stringify(this.comentarios));
      this.nuevoComentario = '';
    }
  }

  // NUEVOS MÉTODOS PARA ELIMINAR COMENTARIOS

  // Método 1: Eliminar un comentario específico por índice
  eliminarComentario(index: number): void {
    this.comentarios.splice(index, 1);
    localStorage.setItem('comentarios', JSON.stringify(this.comentarios));
  }

  // Método 2: Limpiar TODOS los comentarios
  limpiarTodosLosComentarios(): void {
    this.comentarios = [];
    localStorage.removeItem('comentarios');
  }

  // Método 3: Confirmar antes de limpiar todos
  confirmarLimpiarComentarios(): void {
    if (confirm('¿Estás seguro de que quieres eliminar todos los comentarios?')) {
      this.limpiarTodosLosComentarios();
    }
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