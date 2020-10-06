import axios from "../../axios-orders";
import * as actionTypes from "./actionsTypes";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

const setIngredients = (ing) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ing,
  };
};

const initBurgerBasePrice = (basePrice) => {
  return {
    type: actionTypes.INIT_BURGER_BASE_PRICE,
    totalPrice: basePrice,
  };
};

const setIngredientPrices = (ingPrices) => {
  return {
    type: actionTypes.SET_INGREDIENT_PRICES,
    ingredientPrices: ingPrices,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

//async method
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data));
        axios.get("/base-burger-price.json").then((res) => {
          dispatch(initBurgerBasePrice(res.data));
          axios.get("/ingredient-prices.json").then((res) => {
            dispatch(setIngredientPrices(res.data));
          });
        });
      })
      .catch((err) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
