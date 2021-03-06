import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "./Utils";
import {
  IoEllipsisHorizontal,
  IoChatbubblesOutline,
  IoChatbubbles,
  IoArrowRedoOutline,
} from "react-icons/io5";
import LikeBtn from "./LikeBtn";
import { updatePost } from "../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CommentCard from "./CommentCard";
import { Link } from "react-router-dom";

function Card({ post }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComment, setShowComment] = useState(false);

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <>
      <li key={post._id} className="card-container">
        {isLoading ? (
          <i
            style={{ width: "100%" }}
            className="fa fa-spinner fa-spin fa-3x fa-fw"
          ></i>
        ) : (
          <>
            <div className="card-head">
              <div className="sec-avatar">
                <Link to={`/user/${post.posterId}`}>
                  <img
                    className="avatar-icon"
                    src={
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === post.posterId) return user.picture;
                          else return null;
                        })
                        .join("")
                    }
                    alt="avatar user profil"
                  />
                </Link>
                <div className="sec-name">
                  <Link to={`/user/${post.posterId}`}>
                    <h3>
                      {!isEmpty(usersData[0]) &&
                        usersData.map((user) => {
                          if (user._id === post.posterId) return user.pseudo;
                          else return null;
                        })}
                    </h3>
                  </Link>
                  <p>{dateParser(post.createdAt)}</p>
                </div>
              </div>
              {userData._id === post.posterId ? (
                <IoEllipsisHorizontal
                  onClick={() => setIsUpdated(!isUpdated)}
                  size="1.5rem"
                  color="#333"
                  style={{ cursor: "pointer", marginRight: "1.5rem" }}
                />
              ) : (
                <div className="chombit"></div>
              )}
            </div>

            <div className="card-content">
              {isUpdated ? (
                <div className="update-post">
                  <textarea
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />

                  <div className="btn-container">
                    <button onClick={updateItem} className="btn">
                      {" "}
                      valider modification
                    </button>
                  </div>
                </div>
              ) : (
                <p>{post.message}</p>
              )}

              {userData._id === post.posterId && (
                <div className="sec-icones">
                  <DeleteCard id={post._id} />
                </div>
              )}

              {post.picture || post.video ? (
                <div className="sec-image">
                  {post.video && (
                    <iframe
                      src={post.video}
                      frameBorder="0"
                      marginHeight="0"
                      marginWidth="0"
                      scrolling="no"
                      allow="accelerometre; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={post.video}
                    ></iframe>
                  )}
                  {post.picture && (
                    <img src={post.picture} alt="content user cover" />
                  )}
                </div>
              ) : null}
            </div>

            <div className="card-footer">
              <div className="icons-card">
                <LikeBtn post={post} />

                <div className="comment">
                  {showComment ? (
                    <IoChatbubbles
                      onClick={() => setShowComment(!showComment)}
                      size="1.8rem"
                      color="#f3be00"
                    />
                  ) : (
                    <IoChatbubblesOutline
                      onClick={() => setShowComment(!showComment)}
                      size="1.8rem"
                      color="#8c8c8c"
                    />
                  )}
                  <span>{post.comments ? post.comments.length : null}</span>
                </div>

                <div className="share">
                  <IoArrowRedoOutline size="1.8rem" color="#8c8c8c" />
                  <span>25</span>
                </div>
              </div>

              {showComment && <CommentCard post={post} />}
            </div>
          </>
        )}
      </li>
    </>
  );
}

export default Card;
