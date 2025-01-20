import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { InstituicaoComponent } from './home/instituicao/instituicao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutModule } from './aut/aut.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    InstituicaoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
