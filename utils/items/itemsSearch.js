// pokedexSearch.js

import { DEFAULT_LANGUAGE } from "../../config/pagination.js";
import { pokeData } from "../data/loadData.js";
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
  // Filtre sur le nom (déjà fait)
  name: (item, queryValues, language) => {
    const searchValue = queryValues.toLowerCase();
    if (language === "en") {
      const nameEn = item["nameEn"];
      return Array.isArray(nameEn)
        ? nameEn.some((name) => name.toLowerCase().includes(searchValue))
        : nameEn.toLowerCase().includes(searchValue);
    }
    return item["name"].toLowerCase().includes(searchValue);
  },

  // Première apparition
  firstAppearance: (item, queryValues) =>
    item.firstAppearance && Array.isArray(item.firstAppearance)
      ? item.firstAppearance.some((val) =>
          val.toLowerCase().includes(queryValues.toLowerCase())
        )
      : item.firstAppearance.toLowerCase().includes(queryValues.toLowerCase()),

  // Filtres générations (déjà faits)
  generation_includes: (item, queryValues) =>
    item.generations &&
    queryValues.some((generation) =>
      item.generations.some((val) => val == generation)
    ),

  generation_match: (item, queryValues) =>
    item.generations &&
    queryValues.every((generation) =>
      item.generations.some((val) => val == generation)
    ),

  // Catégorie
  category: (item, queryValues) =>
    item.category && Array.isArray(item.category)
      ? item.category.some((val) =>
          val.toLowerCase().includes(queryValues.toLowerCase())
        )
      : item.category.toLowerCase().includes(queryValues.toLowerCase()),

  // Type d'objet
  type: (item, queryValues) =>
    item.type && Array.isArray(item.type)
      ? item.type.some((val) =>
          val.toLowerCase().includes(queryValues.toLowerCase())
        )
      : item.type.toLowerCase().includes(queryValues.toLowerCase()),

  // Lieu d'utilisation
  useLocation: (item, queryValues) =>
    item.useLocation && Array.isArray(item.useLocation)
      ? item.useLocation.some((val) =>
          val.toLowerCase().includes(queryValues.toLowerCase())
        )
      : item.useLocation.toLowerCase().includes(queryValues.toLowerCase()),

  // Achat
  purchasable: (item, queryValues) =>
    item.purchasable && Array.isArray(item.purchasable)
      ? item.purchasable.some((val) =>
          val.toLowerCase().includes(queryValues.toLowerCase())
        )
      : item.purchasable.toLowerCase().includes(queryValues.toLowerCase()),

  // Vente
  sellable: (item, queryValues) =>
    item.sellable && Array.isArray(item.sellable)
      ? item.sellable.some((val) =>
          val.toLowerCase().includes(queryValues.toLowerCase())
        )
      : item.sellable.toLowerCase().includes(queryValues.toLowerCase()),
};

function applyFilters(pokemons, query, language) {
  return pokemons.filter((pokemon) =>
    Object.entries(query).every(([key, value]) => {
      if (key === "language") return true;
      const filter = filters[key];
      if (!filter) return true;
      const processedValue = key.includes("generation")
        ? value
            .toLowerCase()
            .split(",")
            .map((v) => v.trim())
        : value;

      return filter(pokemon, processedValue, language);
    })
  );
}

export default function itemsSearch(query) {
  const { language = DEFAULT_LANGUAGE, ...restQuery } = query;
  let result = applyFilters(pokeData.items, restQuery, language);
  return paginationAndSort(restQuery, result, null, (item, key) =>
    getSortValue(item, key, language)
  );
}
