import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Conta } from "../models/conta.model";

@Injectable({
  providedIn: "root",
})
export class ExtratoService {
  consultarExtrato(numeroConta: string): Observable<Conta | null> {
    if (numeroConta === "12345") {
      const conta = {
        numeroConta: "12345",
        saldo: 1000.75,
        extrato: [
          { data: "2024-11-01", tipo: "Transferência enviada", valor: 500.5 },
          { data: "2024-11-01", tipo: "Débito", valor: 200.0 },
          { data: "2024-11-01", tipo: "Transferência recebida", valor: 300.25 },
        ],
      };
      return of(conta);
    } else {
      return of(null);
    }
  }
}
