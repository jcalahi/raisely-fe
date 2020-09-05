import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Form from './Form';

const App = () => {
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450, textAlign: 'left' }}>
        <Header as="h2" style={{ color: '#5c41d0' }} textAlign="center">
          Create your account
        </Header>
        <Form />
      </Grid.Column>
    </Grid>
  );
};

export default App;
