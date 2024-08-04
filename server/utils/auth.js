const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Adding authentication error
  AuthenticationError: new GraphQLError('Could not authenticate user', {
    extensions: {
      code: 'UNAUTHENTICATED'
    }
  }),
  signToken: function ({ _id, username, email }) {
    const payload = { _id, username, email };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch(error) {
      console.log('Invalid token');
    }

    return req
  },
};
