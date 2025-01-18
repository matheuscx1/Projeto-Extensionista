import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { AutService } from '../login/aut.service';
import { Registro } from '../model/registro.model';


export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;

  if (email && !email.includes('@hotmail.com')) {
    return { emailInvalido: true };
  }

  return null;
}


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent implements OnInit {

  constructor(
     private formBuilder: FormBuilder,
     private router: Router,
     private authService: AutService

    ) {}

  cadastro!: FormGroup;
  mensagemErro: string = '';

  ngOnInit(): void {
    this.cadastro = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, emailValidator]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    if(this.cadastro.valid){
      const registro: Registro = this.cadastro.value;

      this.authService.cadastrarUsuario(registro).subscribe({
        next: (response) =>{
          console.log('Usuário cadastrado com sucesso', response);
          this.router.navigate(['/login']);

        },

        error: (error) => {
          console.error('Erro ao cadastrar usuário', error);

          if(error.status === 409){
            this.mensagemErro = 'Email já cadastrado. Tente outro email.'
          }else{
            this.mensagemErro = 'Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde'
          }
        },
        complete: () => {
          this.router.navigate(['/login']);
        }



      }

      )
    }


  }

}



