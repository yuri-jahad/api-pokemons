import pokedexStats from "../../utils/pokedex/pokedexStats.js";

export default async function statsHandler(request, reply) {
  const result = pokedexStats(request.query);
  if (!result || !result.length) return reply.code(404).send({ error:"Un problème est survenu." });
  return result;
}
