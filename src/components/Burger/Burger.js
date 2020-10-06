import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        //here, for each ingredient, it will allocate space in the array based on the value of the key-value pair. So initially, the array size will be 6 (refer to the initial state in BurgerBuilder.js). Make sure to use the spread operator
        //I also don't care about what the Array object populates with, which is why i passed in an underscore _ as my first argument, but I do care about the index, i
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .flat(); //the alternative would be: transformedIngredients.reduce((accumulator, value) => accumlator.concat(value), [])

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="topBun" />
      {transformedIngredients}
      <BurgerIngredient type="bottomBun" />
    </div>
  );
};

export default withRouter(Burger);
