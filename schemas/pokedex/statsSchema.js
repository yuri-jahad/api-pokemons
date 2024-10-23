export default {
  querystring: {
    type: "object",
    properties: {
      sort: {
        type: "string",
        pattern:
          "^(hp|atk|def|spe_atk|spe_def|vit):(asc|desc)(,(hp|atk|def|spe_atk|spe_def|vit):(asc|desc))*$",
        errorMessage: {
          type: "Le paramètre de tri doit être une chaîne de caractères.",
          pattern:
            "Le format du paramètre de tri est invalide. Utilisez le format 'champ:ordre' avec des champs valides (ex: 'hp:asc,atk:desc').",
        },
      },
      compare: {
        maxLength: 5000,
        type: "string",
        pattern: "^([a-zA-ZÀ-ÿ ]+,)*[a-zA-ZÀ-ÿ ]+$",
        errorMessage: {
          maxLength:
            "La chaîne de comparaison ne doit pas dépasser 5000 caractères.",
          pattern: "Le format de la chaîne de comparaison est invalide.",
        },
      },

      evolve: {
        type: "string",
        pattern: "^([a-zA-ZÀ-ÿ]+|[0-9]+)$",
        maxLength: 200,
        errorMessage: {
          pattern:"Un nombre pour l'id ou le nom du pokémon doit être spécifié.",
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
