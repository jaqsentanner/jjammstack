const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts')


        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('posts')

    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')

        .populate('posts');
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
      const newPost = await Post.create({ ...args, username: context.user.username });
        return newPost;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { postId, commentBody }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: { commentBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    editPost: async (parent, {postId, postText}, context) => {
      if (context.user) {
        const newPost = await Post.findOneAndUpdate(
          
            {_id: postId},
            { postText: postText},
            { new: true, runValidators: true }
          );
          return newPost
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    // Delete button should only appear if logged in user username matches
    // comment username
    // OR: uptade to include the userID in commments
    removeComment: async (parent, { commentId, postId }, context) => {
      if (context.user) {
        const deleteComment = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { comments: {_id: commentId}}},
          { new: true, runValidators: true }
        );

        return deleteComment;
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const deletedPost = await Post.findOneAndDelete(
          { _id: postId },

          { new: true, runValidators: true }
        );

        return deletedPost;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
