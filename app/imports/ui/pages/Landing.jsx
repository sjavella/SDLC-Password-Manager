import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

        <Grid.Column width={4}>
          <Image size='small' circular src="/images/locknkey.jpg"/>
        </Grid.Column>

        <Grid.Column width={8}>
          <h1>Password Manager</h1>
          <p>Info & security disclaimer</p>
        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
