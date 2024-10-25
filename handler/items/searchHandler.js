import itemsSearch from "../../utils/items/itemsSearch.js";

export default async function searchHandler(request, reply) {
  const result = itemsSearch(request.query);

  result.length === 0
    ? reply.code(404).send({ error: "Aucun items trouvé" })
    : reply.send(result);
}
