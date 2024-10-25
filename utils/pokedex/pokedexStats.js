/**
 * @file pokedexStats.js
 * @description Module pour calculer, comparer et classer les statistiques des Pokémon.
 * Ce module fournit des fonctions pour évaluer la force des Pokémon,
 * comparer plusieurs Pokémon entre eux, et générer un classement global.
 */

import { pokeData } from "../data/loadData.js";
import { paginationAndSort } from "../enhancePaginationAndSort.js";

/** Multiplicateur pour le score de résistance */
const RESISTANCE_MULTIPLIER = 10;
/** Multiplicateur pour le score de type */
const TYPE_MULTIPLIER = 5;
/** Multiplicateur pour le score de talent */
const ABILITY_MULTIPLIER = 5;

/**
 * Calcule le score de résistance d'un Pokémon.
 * @param {Array<{multiplier: number}>} resistances - Les résistances du Pokémon.
 * @returns {number} Le score de résistance.
 */
const calculateResistanceScore = (resistances) => {
  if (!Array.isArray(resistances)) return 0;

  return resistances.reduce((score, { multiplier }) => {
    if (multiplier < 1) return score + (1 - multiplier);
    if (multiplier > 1) return score - (multiplier - 1);
    return score;
  }, 0);
};

/**
 * Calcule le score total d'un Pokémon.
 * @param {Object} pokemon - L'objet Pokémon.
 * @param {Object} pokemon.stats - Les statistiques du Pokémon.
 * @param {Array} pokemon.resistances - Les résistances du Pokémon.
 * @param {Array} pokemon.types - Les types du Pokémon.
 * @param {Array} pokemon.talents - Les talents du Pokémon.
 * @returns {number} Le score total du Pokémon.
 */
const calculatePokemonScore = (pokemon) => {
  if (!pokemon || typeof pokemon !== "object" || !pokemon.stats) return 0;

  const { stats, resistances, types, talents } = pokemon;

  const statsScore = Object.values(stats).reduce(
    (sum, stat) => sum + (Number(stat) || 0),
    0
  );
  const resistanceScore =
    calculateResistanceScore(resistances) * RESISTANCE_MULTIPLIER;
  const typeScore = (Array.isArray(types) ? types.length : 0) * TYPE_MULTIPLIER;
  const abilityScore =
    (Array.isArray(talents)
      ? talents.length + (talents.some((talent) => talent?.tc) ? 0.5 : 0)
      : 0) * ABILITY_MULTIPLIER;

  return statsScore + resistanceScore + typeScore + abilityScore;
};

/**
 * Compare plusieurs Pokémon et retourne leurs scores et un classement.
 * @param {...Object} pokemons - Les Pokémon à comparer.
 * @returns {Object} Un objet contenant les scores, le classement et une comparaison des Pokémon.
 */
const compareMultiplePokemon = (...pokemons) => {
  const scores = pokemons.map((pokemon) => ({
    name: pokemon.name?.fr || "Pokémon inconnu",
    score: calculatePokemonScore(pokemon),
  }));

  scores.sort((a, b) => b.score - a.score);

  const result = {
    scores: {},
    ranking: scores.map((pokemon, index) => `${index + 1}. ${pokemon.name}`),
    comparison: `${scores[0].name} semble être le plus fort parmi les Pokémon comparés.`,
  };

  scores.forEach((pokemon) => {
    result.scores[pokemon.name] = pokemon.score;
  });

  return result;
};

/**
 * Fonction principale pour obtenir les statistiques du Pokédex.
 * @param {Object} query - L'objet de requête contenant les paramètres de filtrage et de tri.
 * @param {string} [query.compare] - Paramètre de comparaison ("global" ou noms de Pokémon séparés par des virgules).
 * @returns {Object} Les statistiques du Pokédex, le résultat de la comparaison, ou une erreur.
 */

export default function pokedexStats({ compare }) {
  if (compare === "global") {
    const rankedData = pokeData.pokedex
      .filter(
        (pokemon) => pokemon && typeof pokemon === "object" && pokemon.stats
      )
      .map((pokemon) => ({
        name: pokemon.name?.fr || "Pokémon inconnu",
        score: calculatePokemonScore(pokemon),
      }))
      .sort((a, b) => b.score - a.score)
      .map((pokemon, index) => ({ rank: index + 1, ...pokemon }));

    return paginationAndSort(query, rankedData, "score");
  }

  if (compare) {
    const pokemonNames = compare
      .toLowerCase()
      .split(",")
      .map((name) => name.trim());
    const pokemonsToCompare = pokemonNames
      .map((name) =>
        pokeData.pokedex.find((p) => p.name?.fr?.toLowerCase() === name)
      )
      .filter((pokemon) => pokemon && pokemon.stats);

    if (pokemonsToCompare.length < 2) {
      return {
        error: "Veuillez fournir au moins deux Pokémon valides à comparer.",
      };
    }

    return compareMultiplePokemon(...pokemonsToCompare);
  }

  // Filtre pour s'assurer que tous les Pokémon ont des stats valides
  const validPokemons = pokeData.pokedex.filter(
    (pokemon) => pokemon && pokemon.stats
  );
  return paginationAndSort(query, validPokemons, "stats");
}
