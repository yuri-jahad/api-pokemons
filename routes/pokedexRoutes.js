import evolutionsHandler from "../handler/pokedex/evolutionsHandler.js";
import resistancesHandler from "../handler/pokedex/resistancesHandler.js";
import searchHandler from "../handler/pokedex/searchHandler.js";
import statsHandler from "../handler/pokedex/statsHandler.js";
import searchSchema from "../schemas/pokedex/searchSchema.js";
import resistancesSchema from "../schemas/pokedex/resistancesSchema.js";
import statsSchema from "../schemas/pokedex/statsSchema.js";
import evolutionsSchema from "../schemas/pokedex/evolutionsSchema.js";

export default async function pokedexRoutes(fastify) {
  fastify.get("/search", {
    schema: searchSchema,
    handler: searchHandler,
  });

  fastify.get("/stats", {
    schema: statsSchema,
    handler: statsHandler,
  });

  fastify.get("/resistances", {
    schema: resistancesSchema,
    handler: resistancesHandler,
  });
  fastify.get("/evolutions", {
    schema: evolutionsSchema,
    handler: evolutionsHandler,
  });
}
