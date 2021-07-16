import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "./Utils";

function CommentCard({ post }) {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

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
                <div className="comment">
                  <p>{comment.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CommentCard;
