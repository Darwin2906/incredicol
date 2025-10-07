import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = `${environment.apiUrl}/solicitudes`;

  constructor(private http: HttpClient) { 
    console.log('🔗 URL del API:', this.apiUrl); // Para debug
  }

  crearSolicitud(data: any): Observable<any> {
    console.log('📤 Enviando solicitud a:', this.apiUrl, data);
    return this.http.post(this.apiUrl, data);
  }

  listarSolicitudes(): Observable<any> {
    console.log('📥 Obteniendo solicitudes de:', this.apiUrl);
    return this.http.get<any[]>(this.apiUrl);
  }
}