import React from 'react';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
import { Controller, useFormContext } from 'react-hook-form';

const StyledFormInput = styled(Form.Input)`
  &&& {
    &.field > label {
      color: #262861;
    }

    input:focus {
      border-color: #8e79d6;
    }
  }
`;

function FormInput(props) {
  const {
    id,
    label,
    name,
    placeholder,
    rules,
    type,
  } = props;
  const { errors } = useFormContext();
  return (
    <Controller
      name={name}
      rules={rules}
      as={
        <StyledFormInput
          error={
            errors && errors[name] ? { content: errors[name].message } : null
          }
          id={id}
          label={label}
          placeholder={placeholder}
          type={type}
        />
      }
    />
  );
}

export default FormInput;
