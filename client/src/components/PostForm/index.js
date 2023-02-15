import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const PostForm = () => {
  const [thoughtText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addThought } }) {
      
      // could potentially not exist yet, so wrap in a try/catch
    try {
      // update me array's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      });
    } catch (e) {
      console.warn("First thought insertion by user!")
    }

    // update thought array's cache
    const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
    cache.writeQuery({
      query: QUERY_THOUGHTS,
      data: { thoughts: [addThought, ...thoughts] },
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

    try {
      await addThought({
        variables: { thoughtText },
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
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Whats on your mind?"
          value={thoughtText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
<button
            type="button"
            className=""><a href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span class="relative px-20 py-7 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span class="relative text-white">Submit</span>
            </span>
            </a>
          </button>
      </form>
    </div>
  );
};

export default PostForm;
