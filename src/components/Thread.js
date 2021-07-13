import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Card";
import { isEmpty } from "./Utils";

function Thread() {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);
  return (
    <>
      <div className="main-posts">
        <div className="container">
          <ul>
            {!isEmpty(posts[0]) &&
              posts.map((post) => {
                return (
                  <>
                    <Card key={post._id} post={post} />
                  </>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Thread;
