import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = `${environment.apiUrl}/solicitudes`;

  constructor(private http: HttpClient) { 
    console.log('🔗 URL del API:', this.apiUrl);
  }

  crearSolicitud(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  listarSolicitudes(): Observable<any[]> {
    console.log('📥 Obteniendo solicitudes de:', this.apiUrl);
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        console.log('📦 Respuesta completa:', response);
        // ✅ EXTRAE el array 'data' del objeto de respuesta
        return response && response.data ? response.data : [];
      })
    );
  }
}