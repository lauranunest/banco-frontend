export interface Conta {
  numeroConta: string;
  saldo: number;
  extrato: Transferencia[];
}

export interface Transferencia {
  data: string;
  tipo: string;
  valor: number;
}
