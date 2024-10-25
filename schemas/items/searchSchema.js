export default {
  querystring: {
    type: "object",
    properties: {
      language: {
        type: "string",
        enum: ["fr", "en"],
        description: "Langue de recherche",
        default: "fr",
        errorMessage: {
          enum: "La langue doit être 'fr' ou 'en'.",
        },
      },
      firstAppearance: {
        type: "string",
        description: "Première apparition du jeu",
        example: "Pokémon Diamant et Perle",
      },
      name: {
        type: "string",
        description: "Nom de l'objet (sensible à la langue)",
        minLength: 1,
        example: "Accro Griffe",
        errorMessage: {
          type: "Le nom doit être une chaîne de caractères.",
          minLength: "Le nom ne peut pas être vide.",
        },
      },
      type: {
        type: "string",
        description: "Type d'objet",
        example: "Objets rares",
      },
      category: {
        type: "string",
        description: "Catégorie de jeu",
        example: "Jeux principaux",
      },
      useLocation: {
        type: "string",
        description: "Lieu ou méthode d'utilisation",
        example: "Sur un Pokémon (tenu)",
      },
      purchasable: {
        type: "string",
        description: "Informations sur l'achat",
        example: "10 000 (dans EV)",
      },
      sellable: {
        type: "string",
        description: "Informations sur la revente",
        example: "2500 (dans EV)",
      },
      generation_match: {
        type: "string",
        pattern: "^[0-9]+(,[0-9]+)*$",
        description: "Filtre sur les générations (TOUS les critères)",
        example: "4,5,6",
        errorMessage: {
          type: "La génération doit être une liste de nombres.",
          pattern:
            "Format invalide. Utilisez des nombres séparés par des virgules.",
        },
      },
      generation_includes: {
        type: "string",
        pattern: "^[0-9]+(,[0-9]+)*$",
        description: "Filtre sur les générations (AU MOINS un critère)",
        example: "4,5",
        errorMessage: {
          type: "La génération doit être une liste de nombres.",
          pattern:
            "Format invalide. Utilisez des nombres séparés par des virgules.",
        },
      },
      page: {
        type: "integer",
        minimum: 1,
        description: "Numéro de la page",
        default: 1,
        errorMessage: {
          type: "Le numéro de page doit être un entier.",
          minimum: "Le numéro de page doit être supérieur ou égal à 1.",
        },
      },
      pageSize: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        default: 20,
        description: "Nombre d'éléments par page",
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
      additionalProperties:
        "Les paramètres de requête non reconnus ne sont pas autorisés.",
    },
  },
};
