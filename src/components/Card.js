import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import {
  IoEllipsisHorizontal,
  IoHeartOutline,
  IoChatbubblesOutline,
  IoArrowRedoOutline,
} from "react-icons/io5";

function Card({ post }) {
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <>
      <li className="card-container">
        {isLoading ? (
          <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        ) : (
          <>
            <div className="card-head">
              <img
                className="avatar-icon"
                src="./uploads/profil/avatar_user.jpg"
                alt="avatar user profil"
              />
              <div className="sec-name">
                <h3>Neville Griffin</h3>
                <p>Today at 9.29 AM</p>
              </div>
              <IoEllipsisHorizontal size="1.5rem" color="#333" />
            </div>

            <div className="card-content">
              <p>Travelling to Australia</p>
              <div className="sec-image">
                <img
                  src="./uploads/cover/cover_profil.jpg"
                  alt="content user cover"
                />
              </div>
            </div>

            <div className="card-footer">
              <div className="icons-card">
                <div className="like">
                  <IoHeartOutline size="1.8rem" color="#8c8c8c" />
                  <span>25</span>
                </div>

                <div className="comment">
                  <IoChatbubblesOutline size="1.8rem" color="#8c8c8c" />
                  <span>25</span>
                </div>

                <div className="share">
                  <IoArrowRedoOutline size="1.8rem" color="#8c8c8c" />
                  <span>25</span>
                </div>
              </div>
            </div>
          </>
        )}
      </li>
    </>
  );
}

export default Card;
