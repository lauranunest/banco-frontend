import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-deposito",
  templateUrl: "./deposito.component.html",
  styleUrls: ["./deposito.component.scss"],
})
export class DepositoComponent implements OnInit {
  depositoForm: FormGroup;
  mostrarErro: boolean = false;
  mostrarSucesso: boolean = false;
  mostrarErroConta: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.depositoForm = this.fb.group({
      numeroConta: "",
      valorDeposito: "",
    });
  }

  submeterDeposito() {
    if (this.depositoForm.valid) {
      const deposito = this.depositoForm.value;
      const contaCadastrada = JSON.parse(localStorage.getItem("user") || "{}");

      if (contaCadastrada.numeroConta === deposito.numeroConta) {
        contaCadastrada.saldo =
          (contaCadastrada.saldo || 0) + parseFloat(deposito.valorDeposito);
        localStorage.setItem("user", JSON.stringify(contaCadastrada));

        this.mostrarErro = false;
        this.mostrarSucesso = true;
        this.fecharMensagens();
      } else {
        this.mostrarErroConta = true;
        this.mostrarErro = false;
        this.mostrarSucesso = false;
        this.fecharMensagens();
      }
    } else {
      this.mostrarErro = true;
      this.mostrarSucesso = false;
      this.fecharMensagens();
    }
  }

  somenteNumeros(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  }

  fecharMensagens() {
    setTimeout(() => {
      this.mostrarErro = false;
      this.mostrarSucesso = false;
      this.mostrarErroConta = false;
    }, 2000);
  }
}
