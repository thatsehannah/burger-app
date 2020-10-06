import React, { Component } from "react";
import Input from "../../components/UI/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: null,
    isSignUp: true,
  };

  componentDidMount = () => {
    this.setState({
      controls: {
        email: this.stateAuthFormBuilder(
          "input",
          "email",
          "E-Mail Address",
          "",
          [{ required: true }, { isEmail: true }]
        ),
        password: this.stateAuthFormBuilder(
          "input",
          "password",
          "Password",
          "",
          [{ required: true }, { minLength: 6 }]
        ),
      },
    });

    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.setAuthRedirectPath();
    }
  };

  stateAuthFormBuilder = (inputType, elType, holderTxt, elValue, elRules) => {
    return {
      elementType: inputType,
      elementConfig: {
        type: elType,
        placeholder: holderTxt,
      },
      value: elValue,
      validationRules: elRules,
      isValid: false,
      touched: false,
    };
  };

  inputChangedHandler = (e, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: e.target.value,
        isValid: checkValidity(
          e.target.value,
          this.state.controls[controlName].validationRules
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };

  

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        setup: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((el) => (
      <Input
        key={el.id}
        elementType={el.setup.elementType}
        elementConfig={el.setup.elementConfig}
        value={el.setup.value}
        shouldValidate={el.setup.validationRules}
        touched={el.setup.touched}
        invalid={!el.setup.isValid}
        errorMessage={el.setup.error}
        changed={(e) => this.inputChangedHandler(e, el.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
