import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Registro } from '../model/registro.model';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AutService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  cadastrarUsuario(registro: Registro): Observable<any>{
    return this.http.post(`${this.apiUrl}/cadastro`, registro);
  }

  loginUsuario(loginData: Login, headers: HttpHeaders): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      catchError((error) =>{
        if(error.status === 404){
          alert('Usuario não encontrado');

        }else if(error.status === 401){
            alert('Senha incorreta');
          }
          return throwError(error);

      })
    )
  }

}
