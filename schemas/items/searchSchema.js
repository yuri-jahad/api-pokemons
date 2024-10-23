export default {
    querystring: {
      type: "object",
      properties: {
        generation: {
          type: "integer",
          minimum: 1,
          errorMessage: {
            type: "La génération doit être un nombre entier.",
            minimum: "La génération doit être supérieure ou égale à 1.",
          },
        },
        category: {
          type: "string",
          errorMessage: {
            type: "La catégorie doit être une chaîne de caractères.",
          },
        },
        name: {
          type: "string",
          minLength: 1,
          errorMessage: {
            type: "Le nom doit être une chaîne de caractères.",
            minLength: "Le nom ne peut pas être vide.",
          },
        },
        gender: {
          type: "string",
          pattern: "^(male_only|female_only|equal|none|male:[0-9]+(\\.[0-9]+)?|female:[0-9]+(\\.[0-9]+)?)$",
          errorMessage: {
            type: "Le genre doit être une chaîne de caractères.",
            pattern: "Format invalide. Utilisez soit 'male_only', 'female_only', 'equal', 'none', ou spécifiez un pourcentage avec 'male:XX' ou 'female:XX' (exemple: male:87.5).",
          },
        },
        sort: {
          type: "string",
          pattern: "^([a-zA-Z]+|[a-zA-Z]+_[a-zA-Z0-9]+)(:(asc|desc))?$",
          errorMessage: {
            type: "Le tri doit être une chaîne de caractères",
            pattern: "Format de tri invalide. Utilisez soit le nom du champ seul, soit 'champ:asc' ou 'champ:desc' (exemple: 'name', 'level_100:asc')",
          },
        },
        language: {
          type: "string",
          enum: ["fr", "jp", "en"],
          errorMessage: {
            enum: "La langue doit être 'fr', 'jp' ou 'en'.",
          },
        },
        type_includes: {
          type: "string",
          pattern: "^[a-zA-Z]+(,[a-zA-Z]+)*$",
          errorMessage: {
            pattern: "Le type_includes doit être un ou plusieurs types séparés par des virgules, sans espaces (ex: feu,eau).",
          },
        },
        type_match: {
          type: "string",
          pattern: "^[a-zA-Z]+(,[a-zA-Z]+)*$",
          errorMessage: {
            pattern: "Le type_match doit être un ou plusieurs types séparés par des virgules, sans espaces (ex: feu,eau).",
          },
        },
        egg_groups_includes: {
          type: "string",
          pattern: "^[a-zA-Z]+(,[a-zA-Z]+)*$",
          errorMessage: {
            pattern: "Les groupes d'œufs doivent être séparés par des virgules, sans espaces (ex: monster,dragon).",
          },
        },
        egg_groups_match: {
          type: "string",
          pattern: "^[a-zA-Z]+(,[a-zA-Z]+)*$",
          errorMessage: {
            pattern: "Les groupes d'œufs doivent être séparés par des virgules, sans espaces (ex: monster,dragon).",
          },
        },
        talent_includes: {
          type: "string",
          pattern: "^[a-zA-Z]+(,[a-zA-Z]+)*$",
          errorMessage: {
            pattern: "Le talent_includes doit être un ou plusieurs talents séparés par des virgules, sans espaces (ex: force,vitesse).",
          },
        },
        talent_match: {
          type: "string",
          pattern: "^[a-zA-Z]+(,[a-zA-Z]+)*$",
          errorMessage: {
            pattern: "Le talent_match doit être un ou plusieurs talents séparés par des virgules, sans espaces (ex: force,vitesse).",
          },
        },
        page: {
          type: "integer",
          minimum: 1,
          errorMessage: {
            type: "Le numéro de page doit être un entier.",
            minimum: "Le numéro de page doit être supérieur ou égal à 1.",
          },
        },
        pageSize: {
          type: "integer",
          minimum: 1,
          maximum: 100,
          errorMessage: {
            type: "La taille de page doit être un entier.",
            minimum: "La taille de page doit être supérieure ou égale à 1.",
            maximum: "La taille de page ne doit pas dépasser 100.",
          },
        },
      },
      minProperties: 1,
      additionalProperties: false,
      errorMessage: {
        minProperties: "Au moins un paramètre de requête doit être fourni.",
        additionalProperties: "Les propriétés supplémentaires ne sont pas autorisées dans la requête.",
      },
    },
  };