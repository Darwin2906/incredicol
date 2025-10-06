import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plataformas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plataformas.component.html',
  styleUrls: ['./plataformas.component.css'] // ✅ en plural
})
export class PlataformasComponent {

}
