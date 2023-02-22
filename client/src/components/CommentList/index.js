import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light"><u><b>Comments</b></u></span>
      </div>
      <div className="card-body">
        {comments &&
          comments.map(comment => (
            <p className="pill mb-3" key={comment._id}>
              {comment.commentBody}<br>
              </br><br></br>{'Posted By: '}
              <Link to={`/profile/${comment.username}`} style={{ fontWeight: 700 }}>
                {comment.username} <br></br>On {comment.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
