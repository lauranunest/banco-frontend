import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  mostrarErro: boolean = false;
  mostrarSucesso: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      numeroConta: "",
      nome: "",
      rg: "",
      endereco: "",
      email: "",
    });
  }

  submeter() {
    if (this.cadastroForm.valid) {
      localStorage.setItem("user", JSON.stringify(this.cadastroForm.value));
      this.mostrarErro = false;
      this.mostrarSucesso = true;
    } else {
      this.mostrarErro = true;
      this.mostrarSucesso = false;
    }
  }

  somenteNumeros(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  }

  somenteLetras(event: any) {
    event.target.value = event.target.value.replace(
      /[^a-zA-ZáÁéÉíÍóÓúÚãÃçÇâÂêÊîÎôÔûÛàÀ]/g,
      ""
    );
  }
}
