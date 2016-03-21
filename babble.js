Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This will only run on the server
  Meteor.publish('messages.all', () => {
    return Messages.find({}, { sort: { createdAt: -1 }, limit: 15 });
  });
}

if (Meteor.isClient) {
  // This only runs on the client
  Meteor.subscribe('messages.all');
}

Meteor.methods({
  'messages.add'(message) {
    Messages.insert({
      message,
      createdAt: new Date(),
      username: Meteor.user().username
    });
  }
});

if (Meteor.isClient) {
  Template.body.events({
    'submit .new-message'(event) {
      event.preventDefault();
      const message = event.target.message.value;
      Meteor.call('messages.add', message);
      event.target.message.value = '';
    }
  });

  Template.body.helpers({
    recentMessages() {
      return Messages.find();
    },
    ownMessage(msguser) {
      if (Meteor.user().username === msguser) {
        return 'ownMessage';
      }
    }
  });

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}
