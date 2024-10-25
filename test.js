import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import util from "node:util";
const properties = [
  "name", // Nom français
  "nameEn", // Nom anglais
  "generations", // Générations
  "firstAppearance", // Première apparition
  "category", // Série
  "type", // Rangement
  "useLocation", // Fonctionnement
  "purchasable", // Achat
  "sellable", // Revente
  "image", // Image
];

const items = JSON.parse(await readFile("./data/items.json", "utf-8"));
const show = (element) => console.dir(element, { depth: null });

const reformProps = items.map((pokemon) =>
  Object.fromEntries(
    Object.entries(pokemon).map(([_, value], index) => {
      const newProps = properties[index];
      return [newProps, value];
    })
  )
);

await writeFile("data/items.json", JSON.stringify(reformProps));
