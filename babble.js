// BABBLE
// Babble is a simple chat app used as a demo and introduction to Meteor.
// https://github.com/StanLindsey/meteor-babble-app

// Creates a new Mongo Collection on both the client and server
Messages = new Mongo.Collection('messages');

// This will only run on the server
if (Meteor.isServer) {
  // Server publishs a subset of data from the collection
  Meteor.publish('messages.recent', () => {
    // Returns all messages '{}', sorted by the createdAt field and limited to 15 entries.
    return Messages.find({}, { sort: { createdAt: -1 }, limit: 15 });
  });
}

// This only runs on the client
if (Meteor.isClient) {
  // Client subscribes to the above subset of data
  Meteor.subscribe('messages.recent');
}

// A Method that is called in order to add data to the mongo collection
// This is available on both the client and server, the client runs a 'simulation' of the query
Meteor.methods({
  // Meteor.methods is an object with methods. messages.add is passed through a message variable.
  'messages.add'(message) {
    // Check that message is a String and nothing dangerous
    check(message, String);
    // Check if the client calling this method is a currently logged in user
    if (this.userId !== null) {
      // Insert a document into the Messages collection
      Messages.insert({
        // Short for message: message in ES2015 syntax.
        message,
        // New Javascript date, defaults to the current time
        createdAt: new Date(),
        // Grab the currently logged in username
        username: Meteor.user().username
      });
    }
  }
});

// This only runs on the client
if (Meteor.isClient) {
  // Listen for an event on the client in the body template
  // Events are also defined as an object with methods
  Template.body.events({
    // Listen specifically for the submission of the .new-message form
    'submit .new-message'(event) {
      // Prevent the browser attempting the default action of POSTing the data
      event.preventDefault();
      // Grab the message from the input form and place it in a const
      const message = event.target.message.value;
      // Call the method previously defined and pass through the message
      Meteor.call('messages.add', message);
      // Set the form to an empty string after submission
      event.target.message.value = '';
    }
  });
  // Helpers are functions/methods that are called by the template
  // Helpers is also defined as an object with methods
  Template.body.helpers({
    // recentMessages simply returns to the template all the messages accessible to the client
    // as subscribed earlier
    recentMessages() {
      return Messages.find({}, { sort: { createdAt: 1 } });
    },
    // ownMessage is passed the message.username from the template
    ownMessage(msguser) {
      // the current user is compared to the username of the message
      if (Meteor.user().username === msguser) {
        // sets the class of the message to 'ownMessage' if both are identical
        return 'ownMessage';
      }
      return '';
    }
  });
  // Sets the login form to use usernames instead of an email
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}
