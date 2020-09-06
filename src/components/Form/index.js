import React, { useCallback, useState } from 'react';
import { Form as UIForm, Message, Segment } from 'semantic-ui-react';
import { FormProvider, useForm } from 'react-hook-form';
// components
import FormInput from '../FormInput';
import FormEmail from '../FormEmail';
import FormButton from '../FormButton';
// hooks
import useCreateAccount from '../../hooks/useCreateAccount';
// etc
import { NAME_PATTERN } from '../../constants';

function Form() {
  const [emailStatus, setEmailStatus] = useState(null);
  const [isCreatingAccount, createAccount, createAccountStatus] = useCreateAccount();
  const formMethods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (value) => {
    createAccount(value);
  };

  const handleCheckUser = useCallback((status) => {
    setEmailStatus(status);
  }, []);

  return (
    <FormProvider {...formMethods}>
      <UIForm
        size="large"
        onSubmit={formMethods.handleSubmit(onSubmit)}
        warning={emailStatus === 'EXISTS'}
        error={createAccountStatus.code === 400}
        success={createAccountStatus.code === 'ACTIVE'}
      >
        <Segment>
          <FormInput
            label="Firstname"
            name="firstName"
            id="firstName"
            placeholder="Enter your firstname"
            rules={{
              required: {
                value: true,
                message: 'This field is required',
              },
              pattern: {
                value: new RegExp(NAME_PATTERN),
                message: 'This field only accepts alphabetical letters'
              }
            }}
            type="text"
          />
          <FormInput
            label="Lastname"
            name="lastName"
            id="lastName"
            placeholder="Enter your lastname"
            rules={{
              required: {
                value: true,
                message: 'This field is required',
              },
              pattern: {
                value: new RegExp(NAME_PATTERN),
                message: 'This field only accepts alphabetical letters'
              }
            }}
            type="text"
          />
          <FormEmail onCheckUser={handleCheckUser} />
          {emailStatus === 'EXISTS' && (
            <Message
              warning
              header="Opps!"
              content="This email address has already been registered."
            />
          )}
          <FormInput
            label="Password"
            name="password"
            id="password"
            placeholder="Enter your password"
            rules={{
              required: {
                value: true,
                message: 'This field is required',
              }
            }}
            type="password"
          />
          {createAccountStatus.code === 400 && (
            <Message
              error
              header="We're sorry!"
              content={createAccountStatus.message}
            />
          )}
          {createAccountStatus.code === 'ACTIVE' && (
            <Message
              success
              header="Your user registration was successful"
              content={createAccountStatus.message}
            />
          )}
          <FormButton
            fluid
            size="large"
            color="violet"
            loading={isCreatingAccount}
            disabled={isCreatingAccount}
          >
            Create my account
          </FormButton>
        </Segment>
      </UIForm>
    </FormProvider>
  );
}

export default Form;
