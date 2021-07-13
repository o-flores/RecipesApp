import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function IngredientBox({ index, ingredient, verify }) {
  const [checked, setChecked] = useState(false);
  const { location: { pathname } } = useHistory();

  const typeOfRecipe = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  let localStorageKey = 'meals';
  if (typeOfRecipe === 'bebidas') localStorageKey = 'cocktails';

  useEffect(() => {
    const allInProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || {};
    if (!allInProgressRecipes.meals && typeOfRecipe === 'comidas') {
      const initialStorage = {
        ...allInProgressRecipes,
        meals: { [id]: [] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialStorage));
      return;
    }
    if (!allInProgressRecipes.cocktails && typeOfRecipe === 'bebidas') {
      const initialStorage = {
        ...allInProgressRecipes,
        cocktails: { [id]: [] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialStorage));
      return;
    }
    const recipeInProgress = Object
      .entries(allInProgressRecipes[localStorageKey])
      .find((values) => values[0] === id);
    if (recipeInProgress[1].find((value) => value === ingredient)) setChecked(true);
  }, [id, ingredient, localStorageKey, typeOfRecipe]);

  function handleCheckBox(text) {
    const isChecked = !checked;
    setChecked(isChecked);
    let action = 'subtract';
    const allInProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (!allInProgressRecipes) return;
    const recipeInProgress = Object
      .entries(allInProgressRecipes[localStorageKey])
      .find((values) => values[0] === id);
    let newArrayIngredients = recipeInProgress[1].filter((value) => value !== text);
    if (isChecked) {
      newArrayIngredients = [...recipeInProgress[1], text];
      action = 'add';
    }
    const newAllInProgressRecipes = {
      ...allInProgressRecipes,
      [localStorageKey]: { ...allInProgressRecipes[localStorageKey],
        [id]: newArrayIngredients },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newAllInProgressRecipes));
    verify(action);
  }
  return (
    <div>
      <label
        style={ checked
          ? { textDecoration: 'line-through' }
          : { textDecoration: 'none' } }
        htmlFor={ `${index}-checkbox` }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          id={ `${index}-checkbox` }
          defaultChecked={ checked }
          // checked={ checked }
          type="checkbox"
          value={ ingredient }
          onChange={ ({ target }) => handleCheckBox(target.value) }
        />
        { ingredient }
      </label>
    </div>
  );
}

export default IngredientBox;

IngredientBox.propTypes = {
  index: PropTypes.number,
  ingredient: PropTypes.string,
  verify: PropTypes.func,
}.isRequired;