import React from 'react';
import { Form as UIForm, Segment } from 'semantic-ui-react';
import { FormProvider, useForm } from 'react-hook-form';

import FormInput from '../FormInput';
import FormButton from '../FormButton';
import { emailPattern, namePattern } from '../constants';

function Form() {
  const formMethods = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = () => {};
  const onError = () => {};
  return (
    <FormProvider {...formMethods}>
      <UIForm size="large" onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
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
                value: new RegExp(namePattern),
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
                value: new RegExp(namePattern),
                message: 'This field only accepts alphabetical letters'
              }
            }}
            type="text"
          />
          <FormInput
            label="Email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            rules={{
              required: {
                value: true,
                message: 'This field is required',
              },
              pattern: {
                value: new RegExp(emailPattern),
                message: 'Please enter a valid email address',
              },
            }}
            type="text"
          />
          <FormInput
            label="Password"
            name="password"
            id="password"
            placeholder="Enter your password address"
            rules={{
              required: {
                value: true,
                message: 'This field is required',
              }
            }}
            type="password"
          />
          <FormButton fluid size="large" color="violet">
            Create my account
          </FormButton>
        </Segment>
      </UIForm>
    </FormProvider>
  );
}

export default Form;
