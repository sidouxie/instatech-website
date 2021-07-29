import React, { useState, useEffect } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import { dateParser } from "../components/Utils";
import { IoPerson, IoPeople, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import FollowHandler from "../components/FollowHandler";

function PersonProfil({ uid }) {
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [followersPopup, setFollowersPopup] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const { id } = useParams();
  const usersData = useSelector((state) => state.usersReducer);

  useEffect(() => {
    const handlePerson = () => {
      usersData.map((user) => {
        if (user._id === id) return setPerson(user);
        setIsLoading(false);
        return null;
      });
    };

    handlePerson();
  }, [id, usersData, uid]);

  if (id === uid) return <Redirect to="/profil" />;

  return (
    <>
      {isLoading ? (
        <i
          style={{ width: "100%" }}
          className="fa fa-spinner fa-spin fa-3x fa-fw"
        ></i>
      ) : (
        <>
          <main className="profil-main">
            <div className="head-cover">
              <img src={person.cover} alt="cover profil" />
            </div>
            <div className="avatar-profil">
              <img src={person.picture} alt="avatar-profil" />
            </div>
            <div className="container">
              <div className="sec-info">
                <h2> {person.pseudo} </h2>

                <div className="section-bio">
                  <p> {person.bio} </p>
                </div>
                <div className="btn-follow">
                  <FollowHandler idTofollow={person._id} />
                </div>

                <div className="timestamp">
                  <h5>Membre depuis le : {dateParser(person.createdAt)}</h5>
                </div>

                <div className="sec-follow">
                  <div
                    className="followers"
                    onClick={() => setFollowersPopup(!followersPopup)}
                  >
                    <div className="first">
                      <IoPeople size="2.5rem" color="#63577b" />
                      <h4>{person.followers && person.followers.length}</h4>
                    </div>
                    <h3>Abonnées</h3>
                  </div>

                  <div
                    className="following"
                    onClick={() => setFollowingPopup(!followingPopup)}
                  >
                    <div className="first">
                      <IoPerson size="2rem" color="#63577b" />
                      <h4>{person.following && person.following.length}</h4>
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
                      for (let i = 0; i < person.followers.length; i++) {
                        if (user._id === person.followers[i]) {
                          return (
                            <>
                              <li key={user._id}>
                                <Link to={`/user/${user._id}`}>
                                  <img src={user.picture} alt="user avatar" />
                                </Link>
                                <Link to={`/user/${user._id}`}>
                                  <h5>{user.pseudo}</h5>
                                </Link>
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
                      for (let i = 0; i < person.following.length; i++) {
                        if (user._id === person.following[i]) {
                          return (
                            <>
                              <li key={user._id}>
                                <Link to={`/user/${user._id}`}>
                                  <img src={user.picture} alt="user avatar" />
                                </Link>
                                <Link to={`/user/${user._id}`}>
                                  <h5>{user.pseudo}</h5>
                                </Link>
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
      )}
    </>
  );
}

export default PersonProfil;
