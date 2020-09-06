import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import debounce from 'lodash/debounce';
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
    
    .check {
      color: green;
      font-size: 18px;
    }
    
    .ban {
      color: red;
      font-size: 18px;
    }
  }
`;

function FormEmail({ onCheckUser }) {
  const { clearErrors, errors, setError } = useFormContext();
  const [isChecking, checkUser, status, setStatus] = useCheckUser();

  const debounceCheck = useMemo(() => debounce(checkUser, 500), [checkUser]);

  useEffect(() => {
    onCheckUser(status);
  }, [status, onCheckUser]);

  const setIconStatus = () => {
    if (!isChecking && !errors.email) {
      if (status === 'OK') {
        return 'check circle outline';
      } else if (status === 'EXISTS') {
        return 'ban';
      }
    }
  };

  return (
    <Controller
      name="email"
      render={({ onChange, onBlur, value }) => {
        return (
          <StyledFormInput
            error={
              errors && errors.email ? { content: errors.email.message } : null
            }
            id="email"
            label="Email"
            placeholder="Enter your email address"
            type="text"
            onChange={(e, { value }) => {
              const isValidEmail = new RegExp(EMAIL_PATTERN).test(value);
              if (isValidEmail) {
                clearErrors(['email']);
                debounceCheck(value);
              }
              return onChange(value);
            }}
            onBlur={() => {
              const isValidEmail = new RegExp(EMAIL_PATTERN).test(value);
              if (!isValidEmail) {
                setStatus(null);
                setError('email', {
                  type: 'manual',
                  message: 'Please enter a valid email address'
                });
              }
              return onBlur(value);
            }}
            loading={isChecking}
            icon={setIconStatus()}
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
