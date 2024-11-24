import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-extrato",
  templateUrl: "./extrato.component.html",
  styleUrls: ["./extrato.component.scss"],
})
export class ExtratoComponent implements OnInit {
  extratoForm: FormGroup;
  extrato: any[] = [];
  mensagemErro: string = "";
  mostrarErro: boolean = false;
  mostrarExtrato: boolean = false;
  numeroConta: string = "";
  saldo: number = 0;

  constructor(private title: Title, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.title.setTitle("Banco | Consulta de extrato");
    this.extratoForm = this.fb.group({
      numeroConta: "",
    });
  }

  submeterConsulta(): void {
    const numeroConta = this.extratoForm.value.numeroConta;

    if (numeroConta) {
      const contaCadastrada = JSON.parse(
        localStorage.getItem(JSON.stringify(numeroConta)) || "{}"
      );

      if (contaCadastrada.numeroConta) {
        this.numeroConta = contaCadastrada.numeroConta;
        this.extrato = contaCadastrada.extrato || [];
        this.saldo = contaCadastrada.saldo || 0;
        this.mostrarExtrato = true;
      } else {
        this.mensagemErro = "Conta não encontrada!";
        this.mostrarErro = true;
        this.fecharMensagens();
        return null;
      }
    } else {
      this.mensagemErro = "Por favor, preencha o campo!";
      this.mostrarErro = true;
      this.fecharMensagens();
      return null;
    }
  }

  somenteNumeros(event: any): void {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  }

  fecharMensagens() {
    setTimeout(() => {
      this.mostrarErro = false;
      this.mostrarExtrato = false;
    }, 2000);
  }
}
