import searchHandler from "../handler/pokeAttacks/searchHandler.js"
import searchSchema from "../schemas/pokeAttacks/searchSchema.js"


export default async function pokemonsAttacks(fastify) {
    fastify.get("/search", {
        schema:searchSchema,
        handler: searchHandler
    })
}