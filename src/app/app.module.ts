import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DepositoComponent } from "./deposito/deposito.component";
import { TransferenciaComponent } from "./transferencia/transferencia.component";
import { ExtratoComponent } from "./extrato/extrato.component";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    DepositoComponent,
    TransferenciaComponent,
    ExtratoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [{ provide: LOCALE_ID, useValue: "pt-BR" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
