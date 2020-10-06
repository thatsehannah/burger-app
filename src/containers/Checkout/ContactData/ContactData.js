import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Forms/Input/Input";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandling/withErrorHandling";
import * as storeActions from "../../../store/actions/index"; //index can be omitted
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: null,
    isFormValid: false,
  };

  componentDidMount() {
    this.setState({
      orderForm: {
        name: this.stateOrderFormBuilder(
          "input",
          "text",
          "Your Name",
          "",
          undefined,
          [{ required: true }],
          false,
          "Please enter a name."
        ),
        street: this.stateOrderFormBuilder(
          "input",
          "text",
          "Street",
          "",
          undefined,
          [{ required: true }],
          false,
          "Please enter an address."
        ),
        zipCode: this.stateOrderFormBuilder(
          "input",
          "text",
          "ZIP Code",
          "",
          undefined,
          [{ required: true }, { minLength: 5 }, { maxLength: 5 }],
          false,
          "Please enter a valid zip code."
        ),
        country: this.stateOrderFormBuilder(
          "input",
          "text",
          "Country",
          "",
          undefined,
          [{ required: true }],
          false,
          "Please enter a country."
        ),
        email: this.stateOrderFormBuilder(
          "input",
          "email",
          "Your E-mail",
          "",
          undefined,
          [{ required: true }, { isEmail: true }],
          false,
          "Please enter an email address."
        ),
        phone: this.stateOrderFormBuilder(
          "input",
          "text",
          "Your phone number",
          "",
          undefined,
          [{ required: true }, { exactLength: 10 }],
          false,
          "Please enter a valid phone number"
        ),
        deliveryMethod: this.stateOrderFormBuilder(
          "select",
          null,
          null,
          "fastest",
          [{ value: "fastest" }, { value: "cheapest" }],
          undefined,
          true
        ),
      },
    });
  }

  stateOrderFormBuilder = (
    inputType,
    elType,
    holderTxt,
    elValue,
    options,
    elRules,
    elValidated,
    errorMessage
  ) => {
    let selectoptions = null;
    let validationrules = null;

    if (options !== undefined) {
      selectoptions = [];

      options.forEach((opt) => {
        selectoptions.push({
          value: opt.value,
          displayValue:
            String(opt.value).charAt(0).toUpperCase() +
            String(opt.value).slice(1),
        });
      });
    }

    if (elRules !== undefined) {
      validationrules = elRules;
    }

    return {
      elementType: inputType,
      elementConfig: {
        type: elType,
        placeholder: holderTxt,
        selectoptions,
      },
      value: elValue,
      validationrules,
      isValid: elValidated,
      touched: false,
      error: errorMessage,
    };
  };

  submitOrderHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (let formId in this.state.orderForm) {
      formData[formId] = this.state.orderForm[formId].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price, //in a production app, manipulate price on the server
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (e, inputId) => {
    const newFormElement = updateObject(this.state.orderForm[inputId], {
      value: e.target.value,
      isValid: checkValidity(
        e.target.value,
        this.state.orderForm[inputId].validationrules
      ),
      touched: true,
    });

    const newOrderForm = updateObject(this.state.orderForm, {
      [inputId]: newFormElement,
    });

    let isFormValid = true;
    for (let inputId in newOrderForm) {
      isFormValid = newOrderForm[inputId].isValid && isFormValid;
    }
    this.setState({ orderForm: newOrderForm, isFormValid: isFormValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        setup: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.submitOrderHandler}>
        {formElementsArray.map((el) => (
          <Input
            key={el.id}
            elementType={el.setup.elementType}
            elementConfig={el.setup.elementConfig}
            value={el.setup.value}
            shouldValidate={el.setup.validationrules}
            touched={el.setup.touched}
            invalid={!el.setup.isValid}
            errorMessage={el.setup.error}
            changed={(e) => this.inputChangedHandler(e, el.id)}
          />
        ))}
        <Button disabled={!this.state.isFormValid} btnType="Success">
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (order, token) =>
      dispatch(storeActions.purchaseBurger(order, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
