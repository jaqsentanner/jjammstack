import React from 'react';
import { Link } from 'react-router-dom';


const PostList = ({ posts, title }) => {
  if (!posts.length) {
    return <a>No Posts Yet</a>;
    
  }

  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map(post => (
          <div key={post._id} className="card mb-3">
            <p className="card-header">Posted By: 
              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {post.username}
              </Link>{' '}<br></br>
              Submitted On: {post.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/post/${post._id}`}>
                <p>{post.postText}</p><br></br>
                <button className="mb-0">
                  Comments: {post.commentCount}</button><br></br>
{/* 
                  <button className= 'flex max-w-lg bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 hover:from-indigo-600 hover:via-pink-600 hover:to-red-600 focus:outline-none text-black text-2x1 shadow-md mx-auto p-4 rad'> Click to{' '}
                  {post.commentCount ? 'add comment' : 'be the first to comment'}
                </button> */}

        <button className="btn col-12 col-md-3" type="submit"
            ><a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span className="relative px-20 py-flex transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white">{post.commentCount ? 'Add a comment' : 'Be the first to comment'}</span>
            </span>
            </a>
          </button>

              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
