import fp from "fastify-plugin";
import pokedexRoutes from "../routes/pokedexRoutes.js";
import itemsRoutes from "../routes/itemsRoutes.js";
import pokemonsAttacks from "../routes/pokeAttacksRoutes.js";


export default fp(
  async function (fastify) {
    await fastify.register(pokedexRoutes, { prefix: "/api/pokedex" });
    await fastify.register(itemsRoutes, { prefix: "/api/items" });
    await fastify.register(pokemonsAttacks, { prefix: "/api/pokeAttacks" });
  },
  { name: "routes" }
);
