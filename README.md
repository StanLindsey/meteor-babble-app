Babble for Meteor
======================

A simple real time chat app to showcase how quick it is to get started with MeteorJS 

To be used with  
https://github.com/StanLindsey/meteor-babble-presentation.

To use run type `meteor` on the command line.  
Then go to `localhost:3000` in your web browser.

To use electron & online hosting create a settings.json file with the following:

```
{
    "electron": {
        "name": "Babble",
        "version": "0.1.0",
        "description": "A really cool chat app.",
        "rootUrl": "http://yourappurl.com/"
    },
    "galaxy.meteor.com": {
      "env": {
        "ROOT_URL": "http://yourappurl.com",
        "MONGO_URL": "mongodb://yourmongouser:yourmongopass@<mongodbserver>:<port>/<database>",
        "MONGO_OPLOG_URL": ""
      }
    }
}

```

then run meteor with `meteor --settings settings.json`

Based on the original Meteor speaker kit: https://www.meteor.com/community/speaker-kit