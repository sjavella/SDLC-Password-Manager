import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
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
    console.log("inside decryptedPrint()");
    this.props.stuff.decryptedString = cryptr.decrypt(this.props.stuff.password);
    console.log(this.props.stuff.decryptedString);
    this.setState((currentState, props) => {
      return { isRequested: !currentState.isRequested, decryptedPassword: props.stuff.decryptedString};
    });

  }

  render() {
    const request = this.state.isRequested;
    console.log(request);
    let decryptField;
    if (request) {
       console.log("in decrypted password display field");
       console.log(this.state.decryptedPassword);
       decryptField = <Table.Cell>{this.state.decryptedPassword}</Table.Cell>;
     } else {
       decryptField = <Table.Cell>{this.props.stuff.password}</Table.Cell>;
    }
    return (
      <Table.Row>
        <Table.Cell>{this.props.stuff.website}</Table.Cell>
        <Table.Cell>{this.props.stuff.username}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
        </Table.Cell>
        <Table.Cell>
        {decryptField}
        <Button
            content='Decrypt'
            onClick={this.decryptedPrint}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
StuffItem.propTypes = {
  security: PropTypes.shape({
    decryptedString: PropTypes.string,
  }).isRequired,
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
