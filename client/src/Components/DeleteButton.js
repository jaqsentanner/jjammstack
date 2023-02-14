import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { FETCH_POSTS_QUERY } from "../Util/graphql";
import CustomPopup from "../Util/CustomPopup";

function DeleteButton({ postId, commentId, cb }) {
  const [confirm, setConfirm] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirm(false);

      if (!commentId) {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      // callback
      if (cb) cb();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <CustomPopup
        type="top"
        content={`Delete ${commentId ? "comment" : "post"}`}
      >
        <Button
          floated="right"
          as="div"
          color="red"
          onClick={() => setConfirm(true)}
        >
          <Icon style={{ margin: 0 }} name="trash" />
        </Button>
      </CustomPopup>
      <Confirm
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
