import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  website: String,
  username: String,
  password: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const bcrypt = require('bcryptjs');

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  // On submit, insert the encrypted data.
  encryptedInsert(data, formRef) {
    let { website, username, password } = data;
    const owner = Meteor.user().username;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        password = hash;
        Stuffs.collection.insert({ website, username, password, owner },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Success', 'Item added successfully', 'success');
              formRef.reset();
            }
          });
      });
    });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Password</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.encryptedInsert(data, fRef)} >
            <Segment>
              <TextField name='website'/>
              <TextField name='username'/>
              <TextField name='password'/>
              <SubmitField value='Encrypt'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddStuff;
