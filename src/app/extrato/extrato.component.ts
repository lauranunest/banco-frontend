import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
        this.mostrarExtrato = true;
      } else {
        this.mensagemErro = "Conta não encontrada!";
        this.mostrarErro = true;
      }
    } else {
      this.mensagemErro = "Por favor, preencha o campo!";
      this.mostrarErro = true;
    }
  }

  somenteNumeros(event: any): void {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  }
}
