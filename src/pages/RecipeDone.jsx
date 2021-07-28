import React, { useEffect } from 'react';
import Header from '../components/Header';
import RecipeDoneList from '../components/RecipeDoneList';
import useRecipesDone from '../hooks/recipesDone';

function RecipesDone() {
  const { recipesDone, setRecipesDone,
    allRecipesDone, setAllRecipesDone } = useRecipesDone();

  useEffect(() => {
    const localStorageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!localStorageDoneRecipes) return;
    setRecipesDone(localStorageDoneRecipes);
    setAllRecipesDone(localStorageDoneRecipes);
  }, []);

  function filterAll() {
    const localStorageDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!localStorageDoneRecipe) return;
    setRecipesDone(localStorageDoneRecipe);
  }

  function filter(e) {
    if (recipesDone !== undefined) {
      const filtered = allRecipesDone.filter((recipe) => (recipe.type === e));
      setRecipesDone(filtered);
    }
    return null;
  }

  return (
    <>
      <Header title="Receitas Feitas" withIconSearch={ false } />
      <div id="recipeDone">
        <button
          className="tagFilter"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterAll() }
        >
          All
        </button>
        <button
          className="tagFilter"
          type="button"
          value="comida"
          data-testid="filter-by-food-btn"
          onClick={ (e) => filter(e.target.value) }
        >
          Food
        </button>
        <button
          className="tagFilter"
          type="button"
          value="bebida"
          data-testid="filter-by-drink-btn"
          onClick={ (e) => filter(e.target.value) }
        >
          Drinks
        </button>
        <RecipeDoneList />
      </div>
    </>
  );
}

export default RecipesDone;
