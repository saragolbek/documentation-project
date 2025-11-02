// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

import pokeapiSidebar from './docs/pokeapi-api/sidebar.ts';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Explicitly define the sidebar order so the Welcome (intro) page appears first
  tutorialSidebar: [
    // Put the intro/welcome page at the top of the sidebar
    'intro',
    // Then list other docs in the desired order
    'LoveLitReviews',
    'currency-exchange',
    'pokeapi-quick-start',
    {
      type: 'category',
      label: 'PokeAPI Reference',
      link: {
        type: 'doc',
        id: 'pokeapi-api/pokeapi',
      },
      items: pokeapiSidebar,
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
