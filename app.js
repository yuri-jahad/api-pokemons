import { createServer, PORT } from "./server.js";
import ajvPlugin from "./plugins/ajv.js";
import routePlugin from "./plugins/routes.js";

async function start() {
  const { fastify, startServer } = createServer();
  try {
    await fastify.register(ajvPlugin);
    await fastify.register(routePlugin);
    await startServer(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
