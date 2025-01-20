import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  Doar(): void {
    this.router.navigate(['/login']); // Direciona para a rota de 'doar'
  }

  Instituicoes(): void {
    this.router.navigate(['/instituicoes']); // Direciona para a rota de 'instituições'
  }

}
