import React from 'react';
import { Table, Button, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import PropTypes from 'prop-types';
import { withRouter, Link, Redirect, Router, Route} from 'react-router-dom';
import { Stuffs } from '../../api/stuff/Stuff';
import token from '../../api/stuff/token';

const Cryptr = require('cryptr');
const key = token.token;
const cryptr = new Cryptr(key);

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isRequested: false,
      loader: false,
      decryptedPassword: "",
    };
  }

  timer = () => {
    setTimeout(() => { this.setState({ isRequested: false }); }, 14000);
  }

  load = () => {
    this.setState({ loader: true });
    setTimeout(() => {
      this.timer();
      this.decryptedPrint();
      this.setState({ loader: false });
    }, 100);
  }

  decryptedPrint = () => {
    this.props.stuff.decryptedString = cryptr.decrypt(this.props.stuff.password);
    this.setState((currentState, props) => {
      return { isRequested: !currentState.isRequested, decryptedPassword: props.stuff.decryptedString };
    });
  }

  edit = () => { this.props.history.push(`/edit/${this.props.stuff._id}`); }

  delete = () => { Stuffs.collection.remove({_id: this.props.stuff._id});  }

  render() {
    const request = this.state.isRequested;
    let sensitive, loading = this.state.loader;
    request ? sensitive = <Table.Cell>{this.state.decryptedPassword}</Table.Cell> : sensitive = <Table.Cell>••••••••••</Table.Cell>
    return (
      <Table.Row>
        <Table.Cell>{this.props.stuff.website}</Table.Cell>
        <Table.Cell>{this.props.stuff.username}</Table.Cell>
        {sensitive}
        <Table.Cell><Button content='Decrypt' color='blue' onClick={this.load} disabled={loading}/>{loading && (<Loader active>Working...</Loader>)}</Table.Cell>
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
