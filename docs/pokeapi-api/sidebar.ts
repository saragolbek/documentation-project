import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "pokeapi-api/pokeapi",
    },
    {
      type: "category",
      label: "Pokemon",
      items: [
        {
          type: "doc",
          id: "pokeapi-api/list-pokemon",
          label: "List Pokémon",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "pokeapi-api/get-pokemon",
          label: "Get Pokémon by ID or name",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "pokeapi-api/get-pokemon-species",
          label: "Get Pokémon species",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Berries",
      items: [
        {
          type: "doc",
          id: "pokeapi-api/list-berries",
          label: "List berries",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "pokeapi-api/get-berry",
          label: "Get berry by ID or name",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Items",
      items: [
        {
          type: "doc",
          id: "pokeapi-api/list-items",
          label: "List items",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "pokeapi-api/get-item",
          label: "Get item by ID or name",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Moves",
      items: [
        {
          type: "doc",
          id: "pokeapi-api/list-moves",
          label: "List moves",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "pokeapi-api/get-move",
          label: "Get move by ID or name",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Abilities",
      items: [
        {
          type: "doc",
          id: "pokeapi-api/list-abilities",
          label: "List abilities",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "pokeapi-api/get-ability",
          label: "Get ability by ID or name",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Types",
      items: [
        {
          type: "doc",
          id: "pokeapi-api/list-types",
          label: "List types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "pokeapi-api/get-type",
          label: "Get type by ID or name",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Locations",
      items: [
        {
          type: "doc",
          id: "pokeapi-api/list-locations",
          label: "List locations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "pokeapi-api/get-location",
          label: "Get location by ID or name",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
