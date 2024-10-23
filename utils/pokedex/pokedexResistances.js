                         
import { pokeData } from "../loadData.js";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } from "../config.js";

const EPSILON = 0.000001;

const parseEfficacite = (efficacite) =>
  efficacite.split(",").reduce((acc, pair) => {
    const [type, value] = pair.split(":");
    acc[type.toLowerCase()] = parseFloat(value);
    return acc;
  }, {});

const compareFloats = (a, b) => Math.abs(a - b) < EPSILON;

const createResistanceMap = (resistances) =>
  resistances.reduce((acc, { name, multiplier }) => {
    acc[name.toLowerCase()] = multiplier;
    return acc;
  }, {});

const filterByIncludes = (pokemons, criteria) =>
  pokemons.filter((pokemon) => {
    if (!pokemon.resistances) return false;
    const resistanceMap = createResistanceMap(pokemon.resistances);
    return Object.entries(criteria).some(([type, value]) =>
      compareFloats(resistanceMap[type], value)
    );
  });

const filterByMatch = (pokemons, criteria) =>
  pokemons.filter((pokemon) => {
    if (!pokemon.resistances) return false;
    const resistanceMap = createResistanceMap(pokemon.resistances);
    return Object.entries(criteria).every(([type, value]) =>
      compareFloats(resistanceMap[type], value)
    );
  });

const applyPagination = (items, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    page,
    pageSize,
    totalCount: items.length,
    totalPages: Math.ceil(items.length / pageSize),
    items: paginatedItems,
  };
};

export default function pokedexResistances(query) {
  const {
    eff_includes,
    eff_match,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
  } = query;

  let filteredPokemons;

  if (eff_includes) {
    filteredPokemons = filterByIncludes(
      pokeData.pokedex,
      parseEfficacite(eff_includes)
    );
  } else if (eff_match) {
    filteredPokemons = filterByMatch(
      pokeData.pokedex,
      parseEfficacite(eff_match)
    );
  } else {
    filteredPokemons = pokeData.pokedex;
  }

  // Application de la pagination
  const paginatedResult = applyPagination(
    filteredPokemons,
    Number(page),
    Number(pageSize)
  );

  console.log(
    `Total results: ${paginatedResult.totalCount}, Page ${paginatedResult.page} of ${paginatedResult.totalPages}`
  );

  return paginatedResult;
}
