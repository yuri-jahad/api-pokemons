import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../config.js";
import { applyPagination } from "../enhancePaginationAndSort.js";
import { pokeData } from "../loadData.js";

export default function pokedexEvolutions({ evo_match }) {
  if (!evo_match) return [];

  const entries = evo_match.includes(",")
    ? evo_match.split(",").map((entry) => entry.trim())
    : [evo_match];

  const matchSet = new Set();
  const idSet = new Set();

  entries.forEach((entry) => {
    const parsedEntry = parseInt(entry);
    if (isNaN(parsedEntry)) {
      matchSet.add(entry.toLowerCase());
    } else {
      idSet.add(parsedEntry);
    }
  });

  const data = pokeData.pokedex.reduce((acc, pokemon) => {
    if (
      pokemon.evolution &&
      (idSet.has(pokemon.id) || matchSet.has(pokemon.name.fr.toLowerCase()))
    ) {
      acc.push({ target: pokemon.name["fr"], ...pokemon.evolution });
    }
    return acc;
  }, []);

  return applyPagination(data, DEFAULT_PAGE, DEFAULT_PAGE_SIZE);
}
