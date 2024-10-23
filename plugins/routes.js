import fp from "fastify-plugin";
import pokedexRoutes from "../routes/pokedexRoutes.js";
import itemsRoutes from "../routes/itemsRoutes.js";

export default fp(
  async function (fastify) {
    await fastify.register(pokedexRoutes, { prefix: "/api/pokedex" });
    await fastify.register(itemsRoutes, { prefix: "/api/items" });
  },
  { name: "routes" }
);
