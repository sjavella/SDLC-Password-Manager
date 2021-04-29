import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import PropTypes from 'prop-types';
import { withRouter, Link, Redirect, Router, Route} from 'react-router-dom';
import { Stuffs } from '../../api/stuff/Stuff';

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {

  constructor(props) {
    super(props);
    this.decryptedPrint = this.decryptedPrint.bind(this);
    this.state = {isRequested: false, decryptedPassword: ""};
  }

  decryptedPrint() {
    this.props.stuff.decryptedString = cryptr.decrypt(this.props.stuff.password);
    this.setState((currentState, props) => {
      return { isRequested: !currentState.isRequested, decryptedPassword: props.stuff.decryptedString};
    });
  }

  edit = () => { this.props.history.push(`/edit/${this.props.stuff._id}`); }

  delete = () => { Stuffs.collection.remove({_id: this.props.stuff._id});
  }

  render() {
    const request = this.state.isRequested; let sensitive;
    request ? sensitive = <Table.Cell>{this.state.decryptedPassword}</Table.Cell> : sensitive = <Table.Cell>••••••••••</Table.Cell>
    return (
      <Table.Row>
        <Table.Cell>{this.props.stuff.website}</Table.Cell>
        <Table.Cell>{this.props.stuff.username}</Table.Cell>
        <Table.Cell>{sensitive}</Table.Cell>
        <Table.Cell><Button content='Decrypt' color='blue' onClick={this.decryptedPrint} /></Table.Cell>
        <Table.Cell><Button content='Edit' onClick={this.edit} /></Table.Cell>
        <Table.Cell><Button content='Delete' color='red' onClick={this.delete} /></Table.Cell>
      </Table.Row>);
  }
}

// Require a document to be passed to this component.
StuffItem.propTypes = {
  stuff: PropTypes.shape({
    decryptedString: PropTypes.string,
    website: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(StuffItem);
