import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Card";
import { isEmpty } from "./Utils";

function Thread() {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, count, dispatch]);
  return (
    <>
      <div className="main-posts">
        <div className="container">
          <ul>
            {!isEmpty(posts[0]) &&
              posts.map((post) => {
                return <Card key={post._id} post={post} />;
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Thread;
