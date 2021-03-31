import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.stuff.website}</Table.Cell>
        <Table.Cell>{this.props.stuff.username}</Table.Cell>
        <Table.Cell>{this.props.stuff.password}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
        </Table.Cell>
        <Table.Cell>
          //Autoform button; send data to decrypt function, then print 
          <Link to={`na`}>Decrypt</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
StuffItem.propTypes = {
  stuff: PropTypes.shape({
    website: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(StuffItem);
