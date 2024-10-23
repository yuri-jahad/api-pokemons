export default {
  querystring: {
    type: "object",
    properties: {
      evo_match: {
        type: "string",
        pattern: "^([a-zA-Z]+|[a-zA-Z]+(,[a-zA-Z]+)*|[0-9]+)$",
        // une chaine || carapuce,chenipan // nombre
        maxLength: 1000,
        errorMessage: {
          pattern:
            "Un nombre pour l'id ou le nom du pokémon (sans chiffres) ou une liste de noms séparés par des virgules doivent être spécifiés.",
        },
      },

      page: {
        type: "integer",
        minimum: 1,
        errorMessage: {
          type: "La valeur pour 'page' doit être un nombre entier.",
          minimum: "La valeur pour 'page' doit être supérieure ou égale à 1.",
        },
      },
      pageSize: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        errorMessage: {
          type: "La valeur pour 'pageSize' doit être un nombre entier.",
          minimum:
            "La valeur pour 'pageSize' doit être supérieure ou égale à 1.",
          maximum: "La valeur pour 'pageSize' ne doit pas dépasser 100.",
        },
      },
    },
    minProperties: 1,
    additionalProperties: false,
    errorMessage: {
      minProperties: "Au moins un paramètre de requête doit être fourni.",
      additionalProperties:
        "Les propriétés supplémentaires ne sont pas autorisées dans la requête.",
      _: "La requête contient des erreurs de validation. Veuillez vérifier tous les champs.",
    },
  },
};
