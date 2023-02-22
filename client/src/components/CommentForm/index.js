import React, { useState } from 'react';
import Auth from '../../utils/auth'
import { useMutation } from '@apollo/client';
import { ADD_COMMENT, EDIT_POST, REMOVE_POST } from '../../utils/mutations';


const CommentForm = ({ postId, postUser }) => {
  const [commentBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const [deletePost, {err}] = useMutation(REMOVE_POST)
  const [editPost, {er}] = useMutation(EDIT_POST)

  let username = "";
  const expired = Auth.isTokenExpired(Auth.getToken());
  if (!expired) {
    username = Auth.getUsername();
  }

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
      await addComment({
        variables: { commentBody, postId },
      });
      window.location.reload()
      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };
  const deleteHandler = async (event) => {
    event.preventDefault();

    try{
      await deletePost({
        variables: { postId }
      });
      window.location.reload()

    }  catch (e) {
      console.error(e);
    }
  }
  const editHandler = async (event) => {
    event.preventDefault();
    const postText = commentBody
    try{
      await editPost({
        variables: { postId, postText }
      });
      window.location.reload()
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div>
      <p
        className={`m-0 ${characterCount === 300 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/300
        {error && <span className="ml-2"></span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a comment to this post..."
          value={commentBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit"
            ><a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span className="relative px-20 py-7 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white">Comment</span>
            </span>
            </a>
          </button>
          {username === postUser ? (
            <div>
              <button className="btn col-12 col-md-3" type="submit"
                ><a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                <span className="relative px-10 py-flex transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                <span className="relative text-white" onClick={editHandler}>🖉 Edit</span>
                </span>
                </a>
              </button>
              <button className="btn col-12 col-md-3" type="submit"
                ><a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                <span className="relative px-7 py-flex transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                <span className="relative text-white" onClick={deleteHandler}>🗑 Delete</span>
                </span>
                </a>
              </button>
            </div>
          ) : (
            <div></div>
          )}
          
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default CommentForm;
