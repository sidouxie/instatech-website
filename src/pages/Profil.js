import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBio } from "../actions/user.actions";
import { dateParser } from "../components/Utils";
import { IoPeople, IoPerson } from "react-icons/io5";

function Profil({ uid }) {
  const userData = useSelector((state) => state.userReducer);
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
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
          <img src="./uploads/cover/cover_profil.jpg" alt="cover profil" />
        </div>
        <div className="avatar-profil">
          <img src="./uploads/profil/avatar_user.jpg" alt="avatar-profil" />
        </div>
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
            <div className="followers">
              <div className="first">
                <IoPeople size="2.5rem" color="#333" />
                <h4>8</h4>
              </div>
              <h3>Abonnées</h3>
            </div>

            <div className="following">
              <div className="first">
                <IoPerson size="2rem" color="#333" />
                <h4>12</h4>
              </div>
              <h3>Abonnements</h3>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profil;
