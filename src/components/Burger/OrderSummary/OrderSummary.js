import React, { memo } from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    var displayIng = igKey.replace(/([a-zA-Z])(?=[A-Z])/g, "$1 ");
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{displayIng}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default memo(OrderSummary);
