import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../actions/user.actions";
import { isEmpty } from "./Utils";

function FollowHandler({ idTofollow }) {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idTofollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idTofollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idTofollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idTofollow]);

  return (
    <>
      <div>
        {isFollowed && !isEmpty(userData) && (
          <span>
            <button onClick={handleUnfollow} className="unfollow-btn">
              Abonné
            </button>
          </span>
        )}
        {!isFollowed && !isEmpty(userData) && (
          <span>
            <button onClick={handleFollow} className="follow-btn">
              Suivre
            </button>
          </span>
        )}
      </div>
    </>
  );
}

export default FollowHandler;
