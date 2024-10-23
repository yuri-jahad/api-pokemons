// enhancedPaginationAndSort.js

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } from "./config.js";

/**
 * Parse les options de tri à partir d'une chaîne.
 * @param {string} sort - Chaîne de tri (ex: "name:asc,stats.attack:desc")
 * @returns {Array} Options de tri analysées
 */
export function parseSortOptions(sort) {
  if (!sort) return [];
  return sort.split(",").map((param) => {
    const [field, order = "asc"] = param.split(":");
    return {
      field,
      order: ["asc", "desc"].includes(order.toLowerCase())
        ? order.toLowerCase()
        : "asc",
    };
  });
}

/**
 * Récupère la valeur de tri d'un objet, prenant en charge les chemins imbriqués.
 * @param {Object} obj - Objet à trier
 * @param {string} path - Chemin de la propriété (ex: "stats.attack")
 * @returns {*} Valeur de la propriété
 */
function getNestedValue(obj, path) {
  return path
    .split(".")
    .reduce(
      (current, key) =>
        current && current[key] !== undefined ? current[key] : null,
      obj
    );
}

/**
 * Compare deux valeurs pour le tri.
 * @param {*} a - Première valeur
 * @param {*} b - Deuxième valeur
 * @param {string} order - Ordre de tri ('asc' ou 'desc')
 * @returns {number} Résultat de la comparaison
 */
function compareValues(a, b, order) {
  if (a === b) return 0;
  if (a == null) return order === "asc" ? 1 : -1;
  if (b == null) return order === "asc" ? -1 : 1;

  const numA = Number(a),
    numB = Number(b);
  if (!isNaN(numA) && !isNaN(numB)) {
    return order === "asc" ? numA - numB : numB - numA;
  }

  if (typeof a === "string" && typeof b === "string") {
    return order === "asc" ? a.localeCompare(b) : b.localeCompare(a);
  }

  return order === "asc" ? (a < b ? -1 : 1) : b < a ? -1 : 1;
}

export function applySorting(items, sortOptions, pokeKey, getSortValue) {
  if (sortOptions.length === 0) return items;

  return [...items].sort((a, b) => {
    for (const { field, order } of sortOptions) {
      let aValue, bValue;

      if (getSortValue) {
        aValue = getSortValue(a, field);
        bValue = getSortValue(b, field);
      } else {
        aValue = pokeKey && a[pokeKey] ? a[pokeKey][field] : null;
        bValue = pokeKey && b[pokeKey] ? b[pokeKey][field] : null;
      }

      if (aValue === null && bValue === null) continue;
      if (aValue === null) return order === "asc" ? 1 : -1;
      if (bValue === null) return order === "asc" ? -1 : 1;

      const comparison = compareValues(aValue, bValue, order);
      if (comparison !== 0) return comparison;
    }
    return 0;
  });
}

/**
 * Applique la pagination sur un tableau d'éléments.
 * @param {Array} items - Tableau d'éléments
 * @param {number} page - Numéro de page
 * @param {number} pageSize - Taille de la page
 * @returns {Object} Résultat paginé
 */
export function applyPagination(items, page, pageSize) {
  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedData = items.slice(start, start + pageSize);

  return { totalCount, page, pageSize, totalPages, data: paginatedData };
}

/**
 * Applique le tri et la pagination sur un tableau d'éléments.
 * @param {Object} query - Objet de requête contenant les options de tri et de pagination
 * @param {Array} items - Tableau d'éléments
 * @param {string} objKey - Clé de l'objet pour accéder aux propriétés (ex: "stats")
 * @param {Function} [getSortValue] - Fonction optionnelle pour obtenir la valeur de tri
 * @returns {Object} Résultat trié et paginé
 */
export function paginationAndSort(query, items, objKey, getSortValue) {
  const { sort, page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE } = query;

  const sortOptions = parseSortOptions(sort);
  const pageNumber = Number(page);
  const itemsPerPage = Number(pageSize);

  const sortedItems = applySorting(items, sortOptions, objKey, getSortValue);
  const paginatedResult = applyPagination(
    sortedItems,
    pageNumber,
    itemsPerPage
  );

  console.log(
    `Total results: ${paginatedResult.totalCount}, Page ${paginatedResult.page} of ${paginatedResult.totalPages}`
  );

  return paginatedResult;
}
