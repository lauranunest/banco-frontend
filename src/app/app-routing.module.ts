import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { DepositoComponent } from "./deposito/deposito.component";

const routes: Routes = [
  { path: "cadastro", component: CadastroComponent },
  { path: "deposito", component: DepositoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
