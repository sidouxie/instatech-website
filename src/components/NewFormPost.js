import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import { IoImageOutline } from "react-icons/io5";

function NewFormPost() {
  const [isLoad, setIsLoad] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState(null);

  const userData = useSelector((state) => state.userReducer);

  const handlePicture = () => {};

  const handlePost = () => {};

  const cancelPost = () => {
    setMessage("");
    setVideo("");
    setPostPicture(null);
    setFile(null);
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoad(false);
  }, [userData]);
  return (
    <div className="form-post-main">
      <div className="container">
        {isLoad ? (
          <i
            style={{ width: "100%" }}
            className="fa fa-spinner fa-spin fa-3x fa-fw"
          ></i>
        ) : (
          <div className="card-form">
            <div className="card-header">
              <NavLink exact to="/profil">
                <div className="profile">
                  <img src={userData.picture} alt="user profile" />
                </div>
              </NavLink>
            </div>
            <div className="card-content">
              <textarea
                name="message"
                id="message"
                placeholder="Quoi de neuf ?"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></textarea>
              <div className="ligne"></div>
              <div className="icones">
                <div className="icon-img">
                  <label>
                    <IoImageOutline
                      size="2rem"
                      color="#4f259e"
                      cursor="pointer"
                    />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </label>
                </div>
                {message || postPicture || video.length > 20 ? (
                  <button onClick={cancelPost}>Annuler</button>
                ) : null}
                <button onClick={handlePost}>Tweeter</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewFormPost;
