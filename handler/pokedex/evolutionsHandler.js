import pokedexEvolutions from "../../utils/pokedex/pokedexEvolutions.js";

export default async function evolutionsHandler(request, reply) {
  const result = pokedexEvolutions(request.query);
  result.data.length === 0
    ? reply.code(404).send({ error: "Aucun Pokémon trouvé" })
    : reply.send(result);
}
