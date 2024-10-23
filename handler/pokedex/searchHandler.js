import pokedexSearch from "../../utils/pokedex/pokedexSearch.js";

export default async function searchHandler(request, reply) {
  const result = pokedexSearch(request.query);
  
  result.length === 0
    ? reply.code(404).send({ error: "Aucun Pokémon trouvé" })
    : reply.send(result);
}
