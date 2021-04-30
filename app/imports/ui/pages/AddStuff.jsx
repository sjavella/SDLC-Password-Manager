import React from 'react';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
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
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loader: false};
  }

  load = (data, fRef) => {
    this.setState({ loader: true });
    setTimeout(() => {
      this.encryptedInsert(data, fRef);
      this.setState({ loader: false });
    }, 100);
  }

  encryptedInsert(data, formRef) {
    let { website, username, password } = data;
    const owner = Meteor.user().username;
    password = cryptr.encrypt(password);
    Stuffs.collection.insert({ website, username, password, owner }, (error) => {
            if (error) { swal('Error', error.message, 'error'); }
            else { swal('Success', 'Password Successfully Added', 'success'); formRef.reset();}});
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null, loading = this.state.loader;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Password</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.load(data,fRef)} disabled={loading}>
          {loading && (<Loader active>Encrypting...</Loader>)}
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
