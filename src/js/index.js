//https://www.food2fork.com/api/search
//fcd773eb744ccfeaba30a02650835ea6
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked objects
 */

const state = {};

// Search Controller

const controlSearch = async () => {
    // 1. Get the query from the view
    const query = searchView.getInput();

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            //4. Search for recipes
            await state.search.getResults();
    
            //5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch (error){
            console.log(error);
            alert("Error while processing the query! Please refresh the page and try again.")
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})


// Recipe Controller

const controlRecipe = async () => {
    // Get the ID from the URL
    const id = window.location.hash.replace("#", "");
    // console.log(id);

    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            // console.log(state.recipe.ingredients)
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe

            console.log(state.recipe);

        } catch (error) {
            console.log(error);
            alert("Error processing recipe!")
        }
    }
};

["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipe));