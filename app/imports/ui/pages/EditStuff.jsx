import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Stuffs } from '../../api/stuff/Stuff';
import token from '../../api/stuff/token';

const bridge = new SimpleSchema2Bridge(Stuffs.schema);
const Cryptr = require('cryptr');
const key = token.token;
const cryptr = new Cryptr(key);

/** Renders the Page for editing a single document. */
class EditStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loader: false};
  }

  load = (data) => {
    this.setState({ loader: true });
    setTimeout(() => {
      this.submit(data);
      this.setState({ loader: false });
    }, 100);
  }

  // On successful submit, insert the data.
  submit(data) {
    let { website, username, password, _id } = data;
    password = cryptr.encrypt(password);
    Stuffs.collection.update(_id, { $set: { website, username, password } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Password updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
   let loading = this.state.loader;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Stuff</Header>
          <AutoForm schema={bridge} onSubmit={data => this.load(data)} model={this.props.doc}>
          {loading && (<Loader active>Encrypting...</Loader>)}
            <Segment>
              <TextField name='website'/>
              <TextField name='username'/>
              <TextField type='password' name='password'/>
              <SubmitField disabled={loading} value='Encrypt'/>
              <ErrorsField/>
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditStuff.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Stuffs.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditStuff);
