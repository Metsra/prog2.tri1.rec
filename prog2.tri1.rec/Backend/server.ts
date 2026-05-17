import { EventRegistry } from "./EventRegistry.ts";
import { AppServer } from "./AppServer.ts";

const registry = new EventRegistry("./dados.json");
await registry.load();

const server = new AppServer(registry, 3000);
server.start();