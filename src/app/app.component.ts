import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule], // 👈 IMPORTANTE
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
  title = 'incredicol';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          // Cierra el menú colapsable de Bootstrap
          navbarCollapse.classList.remove('show');
        }
      }
    });
  }
}
