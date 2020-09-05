import React from 'react'
import styled from 'styled-components';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const StyledInput = styled(Form.Input)`
  && {
    &.field > label {
      color: #262861;
    }
  }
`;

const App = () => (
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450, textAlign: "left" }}>
      <Header as="h2" style={{ color: '#5c41d0' }} textAlign="center">
        Create your account
      </Header>
      <Form size="large" error>
        <Segment>
          <StyledInput
            fluid
            id="firstName"
            label="Firstname"
            placeholder="Enter your firstname"
            style={{ color: '#262861' }}
          />
          <StyledInput
            fluid
            id="lastName"
            label="Lastname"
            placeholder="Lastname"
          />
          <StyledInput
            error={{ content: 'Invalid email address' }}
            fluid
            id="email"
            label="Email"
            placeholder="E-mail address"
            onChange={(e, obj) => console.log(obj)}
          />
          <StyledInput
            fluid
            id="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <Message
            error
            header='Could you check something!'
            list={[
              'That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.',
            ]}
          />
          <Button style={{ backgroundColor: '#5c41d0', color: '#fff' }} fluid size="large">
            Create my account
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
)

export default App
