# Passport-Ping

[Passport](http://passportjs.org/) strategy for authenticating with [PingFederate](https://pingidentity.com/)
using the OAuth 2.0 API.

This module lets you authenticate using PingFederate in your Node.js applications.
By plugging into Passport, PingFederate authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-ping

## Usage

#### Configure Strategy

The PingFederate authentication strategy authenticates users using PingFederate
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a client ID, client secret, and callback URL.

    passport.use(new PingStrategy({
        clientID: PING_CLIENT_ID,
        clientSecret: PING_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/ping/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ ... }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'ping'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/ping',
      passport.authenticate('ping'));

    app.get('/auth/ping/callback',
      passport.authenticate('ping', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 MuleSoft, Inc.  All rights reserved.  http://www.mulesoft.com
