import React, { Component } from "react";

const AsyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null, //set to dynamically loaded component
    };

    componentDidMount() {
      importComponent().then((comp) => {
        this.setState({ component: comp.default });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default AsyncComponent;
