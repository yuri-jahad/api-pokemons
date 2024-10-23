import searchHandler from "../handler/items/searchHandler.js";
import searchSchema from "../schemas/items/searchSchema.js";

export default async function pokedexItems(fastify) {
  fastify.get("/search", {
    schema: searchSchema,
    handler: searchHandler,
  });
}
