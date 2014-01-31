/**
 * Copyright (c) 2013 MuleSoft, Inc.  All rights reserved.  http://www.mulesoft.com
 */

/**
 * Module dependencies.
 */

var util = require('util');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

/**
 * `Strategy` constructor.
 *
 * The Ping authentication strategy authenticates requests by delegating to
 * PingFederate using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occurred, `err` should be set.
 *
 * Options:
 *   - `host`      your Ping server host
 *   - `port`      your Ping server port
 *   - `clientID`      your Ping application's Client ID
 *   - `clientSecret`  your Ping application's Client Secret
 *   - `callbackURL`   URL to which Ping will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new PingStrategy({
 *         clientID: '123-456-789' ,
 *         clientSecret: 'shhh-its-a-secret' ,
 *         callbackURL: 'https://www.example.net/auth/ping/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 *     passport.use(new PingStrategy({
 *         host: 'localhost' ,
 *         clientID: '123-456-789' ,
 *         clientSecret: 'shhh-its-a-secret' ,
 *         callbackURL: 'https://www.example.net/auth/ping/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 *     passport.use(new PingStrategy({
 *         host: 'localhost' ,
 *         port: 9031 ,
 *         clientID: '123-456-789' ,
 *         clientSecret: 'shhh-its-a-secret' ,
 *         callbackURL: 'https://www.example.net/auth/ping/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options , verify) {
    options = options || {};
    options.host = options.host || 'localhost';
    options.port = options.port || 9031;
    options.authorizationURL = options.authorizationURL || util.format('https://%s:%d/as/authorization.oauth2', options.host, options.port);
    options.tokenURL = options.tokenURL || util.format('https://%s:%d/as/token.oauth2', options.host, options.port);

    OAuth2Strategy.call(this , options , verify);
    this.name = 'ping';
}

util.inherits(Strategy , OAuth2Strategy);

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
