import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBio } from "../actions/user.actions";
import { dateParser } from "../components/Utils";
import { IoPeople, IoPerson, IoCloseOutline } from "react-icons/io5";
import FollowHandler from "../components/FollowHandler";
import UploadImage from "../components/UploadImage";
import UploadCover from "../components/UploadCover";

function Profil({ uid }) {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  if (uid === null) {
    return <Redirect to="/signin" />;
  }
  return (
    <>
      <main className="profil-main">
        <div className="head-cover">
          <img src={userData.cover} alt="cover profil" />
          <UploadCover uid={uid} />
        </div>
        <div className="avatar-profil">
          <img src={userData.picture} alt="avatar-profil" />
          <UploadImage uid={uid} />
        </div>
        <div className="container">
          <div className="sec-info">
            <h2> {userData.pseudo} </h2>

            <div className="section-bio">
              {!updateForm ? (
                <>
                  <p>{userData.bio}</p>
                  <button
                    className="btn-style"
                    onClick={() => setUpdateForm(true)}
                  >
                    modifier bio
                  </button>
                </>
              ) : (
                <>
                  <textarea
                    type="text"
                    id="bio"
                    onChange={(e) => setBio(e.target.value)}
                    defaultValue={userData.bio}
                  ></textarea>
                  <div id="the-count">
                    <span id="current">{bio ? bio.length : 0}</span>
                    <span id="maximum">/ 300</span>
                  </div>
                  <button className="btn-style" onClick={handleUpdate}>
                    valider modification
                  </button>
                </>
              )}
            </div>

            <div className="timestamp">
              <h5>Membre depuis le : {dateParser(userData.createdAt)}</h5>
            </div>

            <div className="sec-follow">
              <div
                className="followers"
                onClick={() => setFollowersPopup(!followersPopup)}
              >
                <div className="first">
                  <IoPeople size="2.5rem" color="#63577b" />
                  <h4>{userData.followers && userData.followers.length}</h4>
                </div>
                <h3>Abonnées</h3>
              </div>

              <div
                className="following"
                onClick={() => setFollowingPopup(!followingPopup)}
              >
                <div className="first">
                  <IoPerson size="2rem" color="#63577b" />
                  <h4>{userData.following && userData.following.length}</h4>
                </div>
                <h3>Abonnements</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
      {followersPopup && (
        <>
          <div className="modal-popup">
            <div className="followers-popup">
              <IoCloseOutline
                onClick={() => setFollowersPopup(!followersPopup)}
                size="2rem"
                color="#333"
              />
              <br />
              <h1>Abonnées :</h1>

              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i < userData.followers.length; i++) {
                    if (user._id === userData.followers[i]) {
                      return (
                        <>
                          <li key={user._id}>
                            <img src={user.picture} alt="user avatar" />
                            <h5>{user.pseudo}</h5>
                            <FollowHandler idTofollow={user._id} />
                          </li>
                        </>
                      );
                    }
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        </>
      )}

      {followingPopup && (
        <>
          <div className="modal-popup">
            <div className="followers-popup">
              <IoCloseOutline
                onClick={() => setFollowingPopup(!followingPopup)}
                size="2rem"
                color="#333"
              />
              <br />
              <h1>Abonnements :</h1>

              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i < userData.following.length; i++) {
                    if (user._id === userData.following[i]) {
                      return (
                        <>
                          <li key={user._id}>
                            <img src={user.picture} alt="user avatar" />
                            <h5>{user.pseudo}</h5>
                            <div className="follow-handler">
                              <FollowHandler idTofollow={user._id} />
                            </div>
                          </li>
                        </>
                      );
                    }
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profil;
