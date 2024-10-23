// pokedexSearch.js

import { pokeData } from "../loadData.js";
import { DEFAULT_LANGUAGE } from "../config.js";
import { paginationAndSort } from "../enhancePaginationAndSort.js";

const getSortValue = (pokemon, key, language) => {
  switch (key) {
    case "min":
      return pokemon.name[language].toLowerCase();
    case "max":
      return pokemon.category.toLowerCase();
    default:
      return pokemon[key];
  }
};

const filters = {
  name: (pokemon, value, language) =>
    pokemon.name[language].toLowerCase().includes(value.toLowerCase()),
  generation: (pokemon, value) => pokemon.generation == value,
  category: (pokemon, value) =>
    pokemon.category.toLowerCase().includes(value.toLowerCase()),
  type_includes: (pokemon, types) =>
    pokemon.types &&
    types.some((type) =>
      pokemon.types.some((t) => t.name.toLowerCase() === type)
    ),
  type_match: (pokemon, types) =>
    pokemon.types &&
    types.every((type) =>
      pokemon.types.some((t) => t.name.toLowerCase() === type)
    ),
  egg_includes: (pokemon, eggNames) =>
    pokemon.egg_groups &&
    eggNames.some((eggName) =>
      pokemon.egg_groups.some((val) => val.toLowerCase().includes(eggName))
    ),
  egg_match: (pokemon, eggNames) =>
    pokemon.egg_groups &&
    eggNames.every((eggName) =>
      pokemon.egg_groups.some((val) => val.toLowerCase().includes(eggName))
    ),
  talent_includes: (pokemon, talents) =>
    pokemon.talents &&
    talents.some((talent) =>
      pokemon.talents.some((t) => t.name.toLowerCase().includes(talent))
    ),
  talent_match: (pokemon, talents) =>
    pokemon.talents &&
    talents.every((talent) =>
      pokemon.talents.some((t) => t.name.toLowerCase().includes(talent))
    ),
  gender: (pokemon, value) => {
    if (!pokemon.sexe) return value === "none";

    // Gestion des pourcentages pour mâle et femelle
    if (value.includes(":")) {
      const [gender, percentage] = value.split(":");
      const searchValue = Number(percentage);

      if (gender === "male") return pokemon.sexe.male === searchValue;
      if (gender === "female") return pokemon.sexe.female === searchValue;
      return false;
    }

    // Cas prédéfinis
    switch (value) {
      case "male_only":
        return pokemon.sexe.male === 100;
      case "female_only":
        return pokemon.sexe.female === 100;
      case "equal":
        return pokemon.sexe.male === 50;
      case "none":
        return !pokemon.sexe;
      default:
        return true;
    }
  },
};

function applyFilters(pokemons, query, language) {
  return pokemons.filter((pokemon) =>
    Object.entries(query).every(([key, value]) => {
      if (key === "language") return true;
      const filter = filters[key];
      if (!filter) return true;
      const processedValue =
        key.includes("type") || key.includes("talent") || key.includes("egg")
          ? value
              .toLowerCase()
              .split(",")
              .map((v) => v.trim())
          : value;

      return filter(pokemon, processedValue, language);
    })
  );
}

export default function pokedexSearch(query) {
  const { language = DEFAULT_LANGUAGE, ...restQuery } = query;
  let result = applyFilters(pokeData.pokedex, restQuery, language);
  return paginationAndSort(restQuery, result, null, (item, key) =>
    getSortValue(item, key, language)
  );
}
