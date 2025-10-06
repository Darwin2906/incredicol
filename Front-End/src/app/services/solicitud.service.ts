
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = `${environment.apiUrl}/solicitudes`;

  constructor(private http: HttpClient) { }

  crearSolicitud(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  listarSolicitudes(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
