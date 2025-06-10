import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 👈 IMPORTANTE
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // 👈 IMPORTANTE
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'incredicol';
}
