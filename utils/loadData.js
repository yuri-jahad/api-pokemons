import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

/**
 * Lit et parse le contenu d'un fichier JSON
 * @param {string} filePath - Chemin du fichier à lire
 * @returns {Promise<object|null>} Le contenu parsé du fichier ou null en cas d'erreur
 */

const readJsonFile = async (filePath) => {
  try {
    const fileContent = await readFile(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(`Erreur de parsing JSON dans ${filePath}:`, error.message);
    } else {
      console.error(
        `Erreur lors de la lecture du fichier ${filePath}:`,
        error.message
      );
    }
    return null;
  }
};

/**
 * Charge tous les fichiers JSON d'un répertoire dans un objet
 * @param {string} directoryPath - Chemin du répertoire contenant les fichiers JSON
 * @returns {Promise<object>} Un objet contenant les données de tous les fichiers JSON
 */

const loadPokemonData = async (directoryPath) => {
  try {
    const filesPaths = await readdir(directoryPath);
    const pokeData = {};

    await Promise.all(
      filesPaths.map(async (file) => {
        if (path.extname(file).toLowerCase() === ".json") {
          const filePath = path.join(directoryPath, file);
          const data = await readJsonFile(filePath);
          if (data) {
            pokeData[path.basename(file, ".json")] = data;
          }
        }
      })
    );

    return pokeData;
  } catch (error) {
    console.error(
      "Erreur lors du chargement des données Pokémon:",
      error.message
    );
    return {};
  }
};

const pokeData = await loadPokemonData("./data");
const propsPokeData = Object.keys(pokeData);

export { pokeData, loadPokemonData, propsPokeData };
