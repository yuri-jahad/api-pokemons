export default {
  querystring: {
    type: "object",
    properties: {
      eff_includes: {
        type: "string",
        pattern:
          "^([a-zA-Z]+:(0|0.25|0.5|1|2|4),)*[a-zA-Z]+:(0|0.25|0.5|1|2|4)$",
        errorMessage: {
          pattern:
            "La valeur d'efficacité pour le type doit être l'une des suivantes : 0 (immunité), 0.25 (très peu efficace), 0.5 (peu efficace), 1 (normal), 2 (super efficace), ou 4 (très efficace).",
        },
      },
      eff_match: {
        type: "string",
        pattern:
          "^([a-zA-Z]+:(0|0.25|0.5|1|2|4),)*[a-zA-Z]+:(0|0.25|0.5|1|2|4)$",
        errorMessage: {
          pattern:
            "La valeur d'efficacité pour le type doit être l'une des suivantes : 0 (immunité), 0.25 (très peu efficace), 0.5 (peu efficace), 1 (normal), 2 (super efficace), ou 4 (très efficace).",
        },
      },

      page: {
        type: "string",
        pattern: "^[1-9]\\d*$",
        errorMessage: {
          pattern: "La valeur pour 'page' doit être un nombre entier positif.",
        },
      },
      pageSize: {
        type: "string",
        pattern: "^[1-9]\\d{0,1}$|^100$",
        errorMessage: {
          pattern:
            "La valeur pour 'pageSize' doit être un nombre entier entre 1 et 100.",
        },
      },
    },
    minProperties: 1,
    additionalProperties: false,
    errorMessage: {
      minProperties: "Au moins un paramètre de requête doit être fourni.",
      additionalProperties:
        "Le paramètre '${0}' n'est pas valide. Les paramètres valides sont les types Pokémon (en minuscules ou avec la première lettre en majuscule), 'page' et 'pageSize'.",
    },
  },
};
