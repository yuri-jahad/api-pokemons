
export default async function searchHandler(request, reply) {
  const result = "👁️👁️👁️👁️🦧🦧🦧😊😊😊😊";
  
  result.length === 0
    ? reply.code(404).send({ error: "Aucun items trouvé" })
    : reply.send(result);
}
