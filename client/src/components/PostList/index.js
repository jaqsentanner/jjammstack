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
                  Comments: {post.commentCount}</button>

                  <button className= 'flex max-w-lg bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 hover:from-indigo-600 hover:via-pink-600 hover:to-red-600 focus:outline-none text-black text-2xl shadow-md mx-auto p-5 rad'> Click to{' '}
                  {post.commentCount ? 'add comment' : 'be the first to comment'}
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
