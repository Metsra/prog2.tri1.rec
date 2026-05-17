export class Guest {
  constructor(
    public nome: string,
    public confirmado: boolean,
    public acompanhantes: number
  ) {}

  toJSON() {
    return {
      nome: this.nome,
      confirmado: this.confirmado,
      acompanhantes: this.acompanhantes
    };
  }
}