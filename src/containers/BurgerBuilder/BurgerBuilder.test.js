import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngs={() => {}}/>);
  });

  it("should render <BuildControls/> when receiving ingredients", () => {
    wrapper.setProps({ ings: { lettuce: 0 }, price: 4 });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });

  it("should render <p>Ingredients can't be loaded!</p> when there an error", () => {
      wrapper.setProps({err: true});
      expect(wrapper.contains(<p>Ingredients can't be loaded!</p>)).toEqual(true)
  })
});
