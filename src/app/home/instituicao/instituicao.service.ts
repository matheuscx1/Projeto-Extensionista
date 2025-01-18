import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  private apiUrl = 'http://localhost:8080/api/instituicao/cadastrar';
  private apiUrlListar = 'http://localhost:8080/api/instituicao/listar';
  private apiUrlRemover = 'http://localhost:8080/api/instituicao/remover/';


  constructor(private http: HttpClient) {}

  cadastrarInstituicao(formulario: FormGroup): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('nome', formulario.get('nome')?.value);
    formData.append('endereco', formulario.get('endereco')?.value);
    formData.append('site', formulario.get('site')?.value);


    const imagem = formulario.get('imagem')?.value;
    if (imagem) {
    formData.append('imagem', imagem, imagem.name);

    }




    return this.http.post(this.apiUrl, formData);
  }

  listarInstituicoes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlListar);
  }

  excluirInstituicao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlRemover}${id}`);
  }
}
