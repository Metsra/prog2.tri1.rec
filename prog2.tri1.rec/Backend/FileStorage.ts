export class FileStorage {
  constructor(private filepath: string) {}

  async read(): Promise<any[]> {
    const file = Bun.file(this.filepath);
    if (await file.exists()) {
      const data = await file.text();
      return JSON.parse(data);
    }
    return [];
  }

  async write(data: any[]): Promise<void> {
    await Bun.write(this.filepath, JSON.stringify(data, null, 2));
  }
}