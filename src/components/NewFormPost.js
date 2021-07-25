import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import { IoImageOutline } from "react-icons/io5";
import { addPost, getPosts } from "../actions/post.actions";

function NewFormPost() {
  const [isLoad, setIsLoad] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.appand("file", file);
      data.append("video", video);

      await dispatch(addPost(data));
      dispatch(getPosts());

      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setVideo("");
    setPostPicture(null);
    setFile(null);
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoad(false);
    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (findLink[i].includes("https://www.yout")) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);
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

              {/* PREVISU */}
              {message || postPicture || video.length > 20 ? (
                <div className="pre-visuel">
                  {video && (
                    <iframe
                      src={video}
                      frameBorder="0"
                      marginHeight="0"
                      marginWidth="0"
                      scrolling="no"
                      allow="accelerometre; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video}
                    ></iframe>
                  )}
                  {postPicture && (
                    <img src={postPicture} alt="previsuel user tof" />
                  )}
                </div>
              ) : null}

              {/* Footer Card */}
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
