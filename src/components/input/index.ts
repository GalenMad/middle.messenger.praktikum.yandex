import Block from '../../modules/block';

const parseValidatorsFromDefinition = (validators: Record<string, { argument?: number, func: Function, message: string | Function }>) => {
  const result: Record<string, Function> = {};
  const validatorList: string[] = Object.keys(validators)
  validatorList.forEach((validatorName) => {
    const validator = validators[validatorName];
    const { argument, func } = validator;
    if (validator.argument) {
      const expandFunction = func(argument);
      result[validatorName] = expandFunction;
    } else {
      const expandFunction = func();
      result[validatorName] = expandFunction;
    }
    return validator;
  });
  return result;
};

class Input extends Block {
  constructor(props: { attributes?: Record<string, string>, validators?: Record<string, { argument: number, func: Function, message: string | Function }> } = {}) {
    const autocomplete = (props.attributes && props.attributes.name) || '';
    const attributes = { ...props.attributes, autocomplete };
    const validators: Record<string, Function> = props.validators ? parseValidatorsFromDefinition(props.validators) : {};
    super('input', { ...props, attributes, validators });
  }

  get value() {
    return this.element.value;
  }

  get triggeredValidator() {
    const { value } = this;
    if (this.props.validators) {
      const validators: Record<string, Function> = this.props.validators;
      return Object.keys(validators).find((name: string) => !validators[name](value));
    }
  }
}

export default Input;
