import { Guest } from "./Guest.ts";
import { FileStorage } from "./FileStorage.ts";

export class EventRegistry {
  private storage: FileStorage;
  private guests: Guest[] = [];

  constructor(filepath: string) {
    this.storage = new FileStorage(filepath);
  }

  async load() {
    const data = await this.storage.read();
    this.guests = data.map(g => new Guest(g.nome, g.confirmado, g.acompanhantes));
  }

  search(query: string): Guest[] {
    const lowerQuery = query.toLowerCase();
    return this.guests.filter(g => g.nome.toLowerCase().includes(lowerQuery));
  }

  async confirmGuest(nome: string, acompanhantes: number): Promise<boolean> {
    if (acompanhantes < 0) throw new Error("Acompanhantes não podem ser negativos");
    const guest = this.guests.find(g => g.nome === nome);
    if (!guest) return false;
    
    guest.confirmado = true;
    guest.acompanhantes = acompanhantes;
    
    await this.storage.write(this.guests.map(g => g.toJSON()));
    return true;
  }

  getStats() {
    const total = this.guests.length;
    const confirmed = this.guests.filter(g => g.confirmado).length;
    const absent = total - confirmed;
    const companions = this.guests.reduce((sum, g) => sum + (g.confirmado ? g.acompanhantes : 0), 0);
    
    return { total, confirmed, absent, companions };
  }
}