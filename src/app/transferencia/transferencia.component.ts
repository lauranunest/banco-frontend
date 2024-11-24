import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-transferencia",
  templateUrl: "./transferencia.component.html",
  styleUrls: ["./transferencia.component.scss"],
})
export class TransferenciaComponent implements OnInit {
  transferenciaForm: FormGroup;
  mensagemErro: string = "";
  mostrarErro: boolean = false;
  mostrarSucesso: boolean = false;

  constructor(private title: Title, private fb: FormBuilder) {}

  ngOnInit() {
    this.title.setTitle("Banco | Transferência");
    this.transferenciaForm = this.fb.group({
      numeroContaOrigem: "",
      numeroContaDestino: "",
      valorTransferencia: "",
    });
  }

  submeterTransferencia() {
    if (this.transferenciaForm.valid) {
      const contaCadastradaOrigem = JSON.parse(
        localStorage.getItem(
          JSON.stringify(this.transferenciaForm.value.numeroContaOrigem)
        ) || "{}"
      );
      const contaCadastradaDestino = JSON.parse(
        localStorage.getItem(
          JSON.stringify(this.transferenciaForm.value.numeroContaDestino)
        ) || "{}"
      );

      if (
        contaCadastradaOrigem.numeroConta == contaCadastradaDestino.numeroConta
      ) {
        this.mensagemErro =
          "Não é possível realizar transferência para a mesma conta!";
        this.mostrarErro = true;
        this.fecharMensagens();
      }

      if (
        !contaCadastradaOrigem.numeroConta &&
        !contaCadastradaDestino.numeroConta
      ) {
        this.mensagemErro = "Contas de origem e destino inválidas.";
        this.mostrarErro = true;
        this.fecharMensagens();
        return null;
      } else if (!contaCadastradaOrigem.numeroConta) {
        this.mensagemErro = "Conta de origem inválida.";
        this.mostrarErro = true;
        this.fecharMensagens();
        return null;
      } else if (!contaCadastradaDestino.numeroConta) {
        this.mensagemErro = "Conta de destino inválida.";
        this.mostrarErro = true;
        this.fecharMensagens();
        return null;
      }

      if (this.transferenciaForm.value.valorTransferencia <= 0) {
        this.mensagemErro =
          "Valor de transferência deve ser maior do que R$0!.";
        this.mostrarErro = true;
        this.fecharMensagens();
      }

      contaCadastradaOrigem.saldo = contaCadastradaOrigem.saldo || 0;
      contaCadastradaDestino.saldo = contaCadastradaDestino.saldo || 0;

      if (
        contaCadastradaOrigem.saldo <
        this.transferenciaForm.value.valorTransferencia
      ) {
        this.mensagemErro =
          "Saldo da conta de origem insuficiente para transferência!";
        this.mostrarErro = true;
        this.fecharMensagens();
      } else {
        contaCadastradaOrigem.saldo -= parseFloat(
          this.transferenciaForm.value.valorTransferencia
        );
        contaCadastradaDestino.saldo += parseFloat(
          this.transferenciaForm.value.valorTransferencia
        );

        contaCadastradaOrigem.extrato = contaCadastradaOrigem.extrato || [];

        contaCadastradaOrigem.extrato.push({
          data: new Date().toLocaleString(),
          tipo: "Transferência enviada",
          valor: parseFloat(this.transferenciaForm.value.valorTransferencia),
        });

        contaCadastradaDestino.extrato = contaCadastradaDestino.extrato || [];

        contaCadastradaDestino.extrato.push({
          data: new Date().toLocaleString(),
          tipo: "Transferência recebida",
          valor: parseFloat(this.transferenciaForm.value.valorTransferencia),
        });

        localStorage.setItem(
          JSON.stringify(contaCadastradaOrigem.numeroConta),
          JSON.stringify(contaCadastradaOrigem)
        );
        localStorage.setItem(
          JSON.stringify(contaCadastradaDestino.numeroConta),
          JSON.stringify(contaCadastradaDestino)
        );
        this.mostrarSucesso = true;
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
