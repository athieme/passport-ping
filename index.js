/**
 * Copyright (c) MuleSoft, Inc.  All rights reserved.  http://www.mulesoft.com
 */

var util = require('util');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var InternalOAuthError = require('passport-oauth').InternalOAuthError;

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
 *   - `clientID`      your GitHub application's Client ID
 *   - `clientSecret`  your GitHub application's Client Secret
 *   - `callbackURL`   URL to which GitHub will redirect the user after granting authorization
 *   - `scope`         array of permission scopes to request.  valid scopes include:
 *                     'user', 'public_repo', 'repo', 'gist', or none.
 *                     (see http://developer.github.com/v3/oauth/#scopes for more info)
 *   — `userAgent`     All API requests MUST include a valid User Agent string.
 *                     e.g: domain name of your application.
 *                     (see http://developer.github.com/v3/#user-agent-required for more info)
 *
 * Examples:
 *
 *     passport.use(new GitHubStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/github/callback',
 *         userAgent: 'myapp.com'
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
    options.authorizationURL = options.authorizationURL || 'https://localhost:9031/as/authorization.oauth2';
    options.tokenURL = options.tokenURL || 'https://localhost:9031/as/token.oauth2';

    OAuth2Strategy.call(this , options , verify);
    this.name = 'ping';
};

Strategy.prototype.userProfile = function (accessToken , done) {
    done(null , { displayName : accessToken });
};

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy , OAuth2Strategy);

exports.Strategy = Strategy;
