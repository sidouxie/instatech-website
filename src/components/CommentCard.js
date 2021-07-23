import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../actions/post.actions";
import EditDeleteComment from "./EditDeleteComment";
import { isEmpty, timestampParser } from "./Utils";

function CommentCard({ post }) {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="comments-container">
        {post.comments.map((comment) => {
          return (
            <div
              key={comment._id}
              className={
                comment.commenterId === userData._id
                  ? "comment-cont client"
                  : "comment-cont"
              }
            >
              <img
                className="avatar-icon"
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="avatar user commenter pic"
              />

              <div className="right-sec">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                </div>
                <div className="timestamp">
                  <span> {timestampParser(comment.timestamp)} </span>
                </div>
                <div className="comment">
                  <p>{comment.text}</p>
                  <EditDeleteComment comment={comment} postId={post._id} />
                </div>
              </div>
            </div>
          );
        })}

        {userData._id && (
          <form action="" onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              name="text"
              placeholder="Laissez un commentaire"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button>Envoyer</button>
          </form>
        )}
      </div>
    </>
  );
}

export default CommentCard;
