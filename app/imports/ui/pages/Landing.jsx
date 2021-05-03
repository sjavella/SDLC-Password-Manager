import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

        <Grid.Column width={4}>
          <Image size='small' circular src="/images/locknkey.jpg"/>
        </Grid.Column>

        <Grid.Column width={8}>
          <Header> SDLC Password Manager </Header>
          <p>Warning: This app was developed as an exercise in the Secure Development LifeCycle, and is not inteded to be used as a secure apppcation.</p>
          <Header size='small'>Security Features:</Header>
          <p> User accounts - passwords encrypted with bcrypt js. Bcrypt was choosen for securing the user account feature because it
               it is a one way hashing algorithm, meaning it doesnt have the ability to decrypt hash's, only to compare hashed
               codes, making it an optimal choice for a program with a small attack surface. </p>
          <p> Admin account - implemented in inital development, removed so as to reduce attack surface area and cut down on redundancy. </p>
          <p> Sensitive Databases - All sensitive information is hashed before it gets stored to the database, allowing for the secure addition of data.</p>
          <p> Encryption - All added passwords encrypted with cryptr. Cryptr was choosen because it allows for 2 way hashing, meaning all hashed
               passwords can be decrypted for the user to see. It is less efficient than bcrypt because its not asynchronous, and therefore takes longer to hash.</p>
          <p> Decryption - Automatically re-encrypts shown password after 10 seconds </p>
          <p> Secure Edit/Delete Functions - All data is encrypted before being re-added or removed to/from a collection. </p>
        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
