// ===== Algolia credentials =====
const APP_ID = "CDBIZ4LEIG";
const SEARCH_API_KEY = "7f76b183e5b5ddcd4480e9021416a9f1";
const INDEX_NAME = "sw_products";

// Init search client
const searchClient = algoliasearch(APP_ID, SEARCH_API_KEY);

// Create the search instance
const search = instantsearch({
  indexName: INDEX_NAME,
  searchClient
});

// Search input
search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search for products…',
    showReset: true,
    showSubmit: true,
    showLoadingIndicator: true,
  })
]);

search.addWidgets([
  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attribute: 'brand',
    searchable: true,        
    showMore: true,       
    sortBy: ['name:asc'], 
  }),
]);

search.addWidgets([
  instantsearch.widgets.hierarchicalMenu({
    container: '#category-menu',
    attributes: [
      'hierarchicalCategories.lvl0',
      'hierarchicalCategories.lvl1',
      'hierarchicalCategories.lvl2',
      'hierarchicalCategories.lvl3',
    ],
    showParentLevel: true,
  }),
]);

// search.addWidgets([
//   instantsearch.widgets.rangeInput({
//     container: '#price-range',
//     attribute: 'price',
//     templates: {
//       separatorText: 'to',
//     },
//   }),
// ]);

search.addWidgets([
  instantsearch.widgets.pagination({
    container: '#pagination',
    totalPages: 20,
  }),
]);


// Hits (results cards)
search.addWidgets([
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div class="product-item">
          <img src="{{image}}" alt="{{name}}" class="product-image"
               onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">

          <h3 class="product-title">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </h3>

          <div class="product-price">$ {{price}}</div>

          {{#brand}}
            <span class="product-category">{{brand}}</span>
          {{/brand}}
        </div>
      `,
      empty: `
        <div class="no-results">
          <h3>No products found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      `
    }
  })
]);



search.start();