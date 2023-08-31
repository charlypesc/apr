import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../models/estudiante';
import { ParticipanteReg } from '../models/participanteReg';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  ApiUrl!: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.ApiUrl = environment.endpoint;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.headers.set('Accept', 'application/json');
  }
  getDataAction<T>(oUrl: string): Observable<T[]> {
    return this.http.get<T[]>(this.ApiUrl + oUrl);
  }
  public GetDataAction<T>(oUrlControl: string, oQuery: string): Observable<T[]> {
    return this.http.get<T[]>(this.ApiUrl + oUrlControl + '/' + oQuery, {
      headers: this.headers,
    });
  }
  /**
   * @param oId : de tipo number
   * @param oUrl : de tipo string
   */

  getDataActionById(oId: number, oUrl: string): Observable<any> {
    return this.http.get(this.ApiUrl + oUrl + '/' + oId);
  }
  public NewControl<T>(oObject: T, oUrlControl: string): Observable<any> {
    return this.http.post<T>(this.ApiUrl + oUrlControl, oObject, {
      headers: this.headers,
    });
  }
  deleteActionById(oUrl: string, oId: number): Observable<any> {
    return this.http.delete(this.ApiUrl + oUrl + '/' + oId);
  }
  public UpdateControl<T>(oId: any, oObject: T, oUrlControl: string): Observable<any> {
    return this.http.put<T>(this.ApiUrl + oUrlControl + '/' + oId.toString(), oObject, { headers: this.headers });
  }
  public participanteReg(estudiantes: Estudiante[], asunto: string, RegistroId: number, folio: number): ParticipanteReg[] {
    if (estudiantes) {
      const listParticipante: ParticipanteReg[] = [];
      for (let index = 0; index < estudiantes.length; index++) {
        const participante: ParticipanteReg = {
          nombreParticipante: estudiantes[index].nombre,
          rut: estudiantes[index].run,
          rbd: estudiantes[index].rbd,
          asunto: asunto,
          registroId: RegistroId,
          folio: folio,
        };
        listParticipante.push(participante);
      }
      return listParticipante;
    }
  }
}
