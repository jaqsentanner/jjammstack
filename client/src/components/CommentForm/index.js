import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

<<<<<<< HEAD:client/src/components/ReactionForm/index.js
const ReactionForm = ({ postId }) => {
  const [reactionBody, setBody] = useState('');
=======
const CommentForm = ({ postId }) => {
  const [commentBody, setBody] = useState('');
>>>>>>> main:client/src/components/CommentForm/index.js
  const [characterCount, setCharacterCount] = useState(0);
  const [addcomment, { error }] = useMutation(ADD_COMMENT);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 300) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
<<<<<<< HEAD:client/src/components/ReactionForm/index.js
      await addReaction({
        variables: { reactionBody, postId },
=======
      await addcomment({
        variables: { commentBody, postId },
>>>>>>> main:client/src/components/CommentForm/index.js
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 300 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/300
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
<<<<<<< HEAD:client/src/components/ReactionForm/index.js
          placeholder="Leave a reaction to this post.."
          value={reactionBody}
=======
          placeholder="Leave a comment to this post..."
          value={commentBody}
>>>>>>> main:client/src/components/CommentForm/index.js
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default CommentForm;
