import React from 'react';
import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
// components
// hooks
import useCheckUser from '../../hooks/useCheckUser';
// etc
import { EMAIL_PATTERN } from '../../constants';

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

function FormEmail() {
  const { errors } = useFormContext();
  const [isChecking, checkUser] = useCheckUser();

  return (
    <Controller
      name="email"
      render={({ onChange, onBlur, value, name }) => {
        return (
          <StyledFormInput
            error={
              errors && errors.email ? { content: errors.email.message } : null
            }
            id="email"
            label="Email"
            placeholder="Enter your email address"
            type="text"
            onChange={(e, { value }) => onChange(value)}
            onBlur={() => {
              if (!errors.email && value !== '') {
                checkUser(value);
              }
              return onBlur(value);
            }}
            loading={isChecking}
          />
        )
      }}
      rules={{
        required: {
          value: true,
          message: 'This field is required',
        },
        pattern: {
          value: new RegExp(EMAIL_PATTERN),
          message: 'Please enter a valid email address',
        },
      }}
    />
  );
}

export default FormEmail;
