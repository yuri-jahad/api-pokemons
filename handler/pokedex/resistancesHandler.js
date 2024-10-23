import pokedexResistances from "../../utils/pokedex/pokedexResistances.js";

export default async function resistancesHandler(request, reply) {
  const result = pokedexResistances(request.query);
  console.log(result, request.query)
  result.length === 0
    ? reply.code(404).send({ error: "Aucun Pokémon trouvé" })
    : reply.send(result);
}
