import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  ingredientPrices: null,
  building: false
};

const mutateIngredient = (state, action, value) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + value,
  };

  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice:
      value === 1
        ? state.totalPrice + state.ingredientPrices[action.ingredientName]
        : state.totalPrice - state.ingredientPrices[action.ingredientName],
        building: true
  };

  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return mutateIngredient(state, action, 1);

    case actionTypes.REMOVE_INGREDIENT:
      return mutateIngredient(state, action, -1);

    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        building: false
      });

    case actionTypes.INIT_BURGER_BASE_PRICE:
      return updateObject(state, {
        totalPrice: action.totalPrice,
      });

    case actionTypes.SET_INGREDIENT_PRICES: {
      return updateObject(state, {
        ingredientPrices: action.ingredientPrices,
      });
    }

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true,
      });

    default:
      return state;
  }
};

export default reducer;
