import React, { useContext, useEffect, useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { UidContext } from "./AppContext";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../actions/post.actions";

function LikeBtn({ post }) {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
  }, [uid, post.likers, liked]);

  return (
    <div className="like">
      {liked ? (
        <IoHeart onClick={unlike} size="1.8rem" color="#ff3c3c" />
      ) : (
        <IoHeartOutline onClick={like} size="1.8rem" color="#8c8c8c" />
      )}
      <span className={`${liked ? "likes-num-active" : "likes-num"}`}>
        {post.likers ? post.likers.length : null}{" "}
      </span>
    </div>
  );
}

export default LikeBtn;
