import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { AutService } from './aut.service';
import { HttpHeaders } from '@angular/common/http';



export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;

  if (email && !email.includes('@hotmail.com')) {
    return { emailInvalido: true };
  }

  return null;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  senha: string = '';


  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AutService) {}

  login!: FormGroup;

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, emailValidator]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if(this.login.valid){
      const loginData = {
        email: this.email,
        senha: this.senha
      }


      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.authService.loginUsuario(loginData, headers).subscribe({
        next: (response) =>{
          this.router.navigate(['/instituicoes']);
        },
        error:(error) =>{
          console.error('Erro no login', error);
        }

      });
    }
  }


  goToCadastro(): void {
    console.log('Navegando para cadastro...');
    this.router.navigate(['/aut/cadastro']);
  }

}



