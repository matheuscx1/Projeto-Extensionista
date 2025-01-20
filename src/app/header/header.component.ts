import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  doeAgora(){
    this.router.navigate(['/login']);
  }

  toggleMenu(){
    this.menuOpen = !this.menuOpen;

  }
}
