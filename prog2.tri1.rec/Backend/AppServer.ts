import { EventRegistry } from "./EventRegistry.ts";

export class AppServer {
  constructor(private registry: EventRegistry, private port: number) {}

  start() {
    const registry = this.registry;
    
    Bun.serve({
      port: this.port,
      async fetch(req) {
        const url = new URL(req.url);
        const path = url.pathname;
        const method = req.method;

        if (path === "/api/guests" && method === "GET") {
          const query = url.searchParams.get("q") || "";
          return Response.json(registry.search(query));
        }

        if (path === "/api/confirm" && method === "POST") {
          const body = await req.json();
          try {
            const success = await registry.confirmGuest(body.nome, body.acompanhantes);
            if (success) return Response.json({ message: "Confirmado com sucesso" });
            return Response.json({ error: "Convidado não encontrado" }, { status: 404 });
          } catch (e: any) {
            return Response.json({ error: e.message }, { status: 400 });
          }
        }

        if (path === "/api/stats" && method === "GET") {
          return Response.json(registry.getStats());
        }

        // Servindo a interface web
        let filePath = path === '/' ? '/index.html' : path;
        const file = Bun.file(`./frontend${filePath}`);
        
        if (await file.exists()) return new Response(file);

        return new Response("Not Found", { status: 404 });
      }
    });

    console.log(`Servidor rodando em http://localhost:${this.port}`);
  }
}