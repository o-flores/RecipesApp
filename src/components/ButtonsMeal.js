import React from 'react';
import { useHistory, Link } from 'react-router-dom';

function ButtonsMeal() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  function checkRecipeInProgress(checkId) {
    const allRecipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || {};
    if (!allRecipesInProgress.meals) {
      return false;
    }
    return Object.keys(allRecipesInProgress.meals).find((key) => key === checkId);
  }

  function checkRecipeDone(mealId) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || {};
    if (Object.keys(doneRecipes).length === 0) {
      return false;
    }
    return doneRecipes.find((recipe) => Number(recipe.id) === Number(mealId));
  }

  return (
    <Link to={ `/comidas/${id}/in-progress` } className="startRecipe">
      { !checkRecipeDone(id)
          && (checkRecipeInProgress(id)
            ? (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btn btn-danger"
              >
                Continuar Receita
              </button>)
            : (
              <button
                type="button"
                className="btn btn-danger"
                data-testid="start-recipe-btn"
              >
                Iniciar Receita
              </button>)
          )}
    </Link>
  );
}
export default ButtonsMeal;
