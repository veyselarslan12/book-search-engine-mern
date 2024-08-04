const { User } = require('../models')
const { AuthenticationError, signToken } = require('../utils/auth')

const resolvers = {
    Query : {
        me: async (parent, args, context) => {
            if (context.user) {
              return await User.findById(context.user._id)
            }
            throw AuthenticationError
          }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }, context, info ) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user)
            return { token, user}
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw AuthenticationError
            }

            const isCorrectPassword = user.isCorrectPassword(password)

            if (!isCorrectPassword) {
                throw AuthenticationError
            }

            const token = signToken(user)
            return { token, user }
        },
        saveBook: async (parent, { authors, title, description, bookId, image, link }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: {
                        savedBooks: { authors, title, description, bookId, image, link }
                    }},
                    {
                        new: true,
                        runValidators: true
                    }
                );
                return updatedUser
            }
            throw AuthenticationError
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId }}},
                    { new: true }
                )
            }
            throw AuthenticationError
        },
    }

}

module.exports = resolvers