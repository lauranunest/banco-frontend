import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DepositoComponent } from './deposito/deposito.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';

@NgModule({
  declarations: [AppComponent, CadastroComponent, DepositoComponent, TransferenciaComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
