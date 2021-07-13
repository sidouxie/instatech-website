import React, { useContext, useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { UidContext } from "./AppContext";

function LikeBtn({ post }) {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
  }, [uid, post.likers, liked]);

  return (
    <div className="like">
      <IoHeartOutline size="1.8rem" color="#8c8c8c" />
      <span>25</span>
    </div>
  );
}

export default LikeBtn;
