import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

const PostForm = () => {
  const [postText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      
      // could potentially not exist yet, so wrap in a try/catch
    try {
      // update me array's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    } catch (e) {
      console.warn("First post insertion by user!")
    }

    // update post array's cache
    const { posts } = cache.readQuery({ query: QUERY_POSTS });
    cache.writeQuery({
      query: QUERY_POSTS,
      data: { posts: [addPost, ...posts] },

    });
  }
})

  // update state based on form input changes
  const handleChange = (event) => {

    if (event.target.value.length <= 300) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(postText)
    try {
      await addPost({
        variables: { postText },
      });

      // clear form value
      setText('');
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
        {error && <span className="ml-2"></span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md"
        onClick={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new thought..."
          value={postText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
<button
            type="button"
            className=""><Link href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span className="relative px-20 py-7 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white">Submit Post</span>
            </span>
            </Link>
          </button>
      </form>
    </div>
  );
};

export default PostForm;
