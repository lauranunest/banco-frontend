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
  mensagemErro: string = "";

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.depositoForm = this.fb.group({
      numeroConta: "",
      valorDeposito: "",
    });
  }

  submeterDeposito() {
    if (this.depositoForm.valid) {
      if (this.depositoForm.value.valorDeposito <= 0) {
        this.mensagemErro = "Valor de depósito deve ser maior do que R$0!";
        this.mostrarErro = true;
        this.fecharMensagens();
        return null;
      }
      const deposito = this.depositoForm.value;
      const contaCadastrada = JSON.parse(
        localStorage.getItem(
          JSON.stringify(this.depositoForm.value.numeroConta)
        ) || "{}"
      );

      if (contaCadastrada.numeroConta === deposito.numeroConta) {
        contaCadastrada.saldo =
          (contaCadastrada.saldo || 0) + parseFloat(deposito.valorDeposito);

        contaCadastrada.extrato = contaCadastrada.extrato || [];

        contaCadastrada.extrato.push({
          data: new Date().toLocaleString(),
          tipo: "Depósito",
          valor: parseFloat(deposito.valorDeposito),
        });

        localStorage.setItem(
          JSON.stringify(this.depositoForm.value.numeroConta),
          JSON.stringify(contaCadastrada)
        );
        this.mostrarSucesso = true;
        this.fecharMensagens();
      } else {
        this.mensagemErro = "Conta inválida!";
        this.mostrarErro = true;
        this.fecharMensagens();
      }
    } else {
      this.mensagemErro = "Por favor, preencha todos campos!";
      this.mostrarErro = true;
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
    }, 2000);
  }
}
