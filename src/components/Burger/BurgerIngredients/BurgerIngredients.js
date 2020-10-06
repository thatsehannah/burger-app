import React from "react";
import classes from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";

const BurgerIngredients = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bottomBun":
      ingredient = <div className={classes.BottomBun} />;
      break;
    case "topBun":
      ingredient = (
        <div className={classes.TopBun}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      );
      break;
    case "turkeyMeat":
      ingredient = <div className={classes.TurkeyMeat} />;
      break;
    case "cheese":
      ingredient = <div className={classes.Cheese} />;
      break;
    case "lettuce":
      ingredient = <div className={classes.Lettuce} />;
      break;
    case "turkeyBacon":
      ingredient = <div className={classes.TurkeyBacon} />;
      break;
    default:
      ingredient = null;
      break;
  }

  return ingredient;
};

BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredients;
