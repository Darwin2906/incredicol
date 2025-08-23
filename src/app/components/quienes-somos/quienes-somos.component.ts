import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Verificar si estamos en el navegador antes de usar window
    if (isPlatformBrowser(this.platformId)) {
      // Inicializar el observador de intersección para animaciones al hacer scroll
      this.initIntersectionObserver();
    }
  }

  // Método para inicializar el observador de intersección
  initIntersectionObserver(): void {
    const sections = document.querySelectorAll('.section-fade');
    
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          entry.target.classList.remove('section-hidden');
        } else {
          entry.target.classList.remove('section-visible');
          entry.target.classList.add('section-hidden');
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // Método para navegar a la página de comparación
  navigateToComparacion(): void {
    this.router.navigate(['/comparacion']);
  }

  // Método para navegar a la página de plataformas
  navigateToPlataformas(): void {
    this.router.navigate(['/plataformas']);
  }

  // Método para navegar a la página de orientación
  navigateToOrientacion(): void {
    this.router.navigate(['/orientacion']);
  }
}