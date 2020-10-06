export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules) {
    rules.forEach((rule) => {
      const key = Object.keys(rule).toString();
      const ruleValue = Object.values(rule).toString();

      switch (key) {
        case "required":
          if (ruleValue) {
            isValid = value.trim() !== "" && isValid;
          }
          break;
        case "minLength":
          isValid = value.length >= Number(ruleValue) && isValid;
          break;
        case "isEmail":
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid;
          break;
        case "maxLength":
          isValid = value.length <= Number(ruleValue) && isValid;
          break;
        case "exactLength":
          isValid = value.length === Number(ruleValue) && isValid;
          break;
        default:
          break;
      }
    });
  }

  return isValid;
};
