import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutRoutingModule } from './aut-routing.module';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CadastrarComponent, LoginComponent],
  imports: [
    CommonModule,
    AutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AutModule { }
