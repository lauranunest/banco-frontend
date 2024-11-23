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
      localStorage.setItem(
        JSON.stringify(this.cadastroForm.value.numeroConta),
        JSON.stringify(this.cadastroForm.value)
      );
      this.mostrarErro = false;
      this.mostrarSucesso = true;
      this.fecharMensagens();
    } else {
      this.mostrarErro = true;
      this.mostrarSucesso = false;
      this.fecharMensagens();
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

  fecharMensagens() {
    setTimeout(() => {
      this.mostrarErro = false;
      this.mostrarSucesso = false;
    }, 2000);
  }
}
