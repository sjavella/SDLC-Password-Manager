import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class StuffsCollection {
  constructor() {
    // The website of this collection.
    this.website = 'StuffsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.website);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      website: String,
      username: String,
      password: String,
      owner: String
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.website}.publication.user`;
    this.adminPublicationName = `${this.website}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StuffsCollection}
 */
export const Stuffs = new StuffsCollection();
