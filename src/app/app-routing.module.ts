import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { DepositoComponent } from "./deposito/deposito.component";
import { ExtratoComponent } from "./extrato/extrato.component";
import { TransferenciaComponent } from "./transferencia/transferencia.component";

const routes: Routes = [
  { path: "cadastro", component: CadastroComponent },
  { path: "deposito", component: DepositoComponent },
  { path: "transferencia", component: TransferenciaComponent },
  { path: "extrato", component: ExtratoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
