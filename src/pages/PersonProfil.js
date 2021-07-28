import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { dateParser } from "../components/Utils";
import { IoPerson, IoPeople } from "react-icons/io5";
import { useSelector } from "react-redux";

function PersonProfil({ uid }) {
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

                <div className="timestamp">
                  <h5>Membre depuis le : {dateParser(person.createdAt)}</h5>
                </div>

                <div className="sec-follow">
                  <div
                    className="followers"
                    onClick={() => console.log("follower")}
                  >
                    <div className="first">
                      <IoPeople size="2.5rem" color="#63577b" />
                      <h4>{person.followers && person.followers.length}</h4>
                    </div>
                    <h3>Abonnées</h3>
                  </div>

                  <div
                    className="following"
                    onClick={() => console.log("following")}
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
        </>
      )}
    </>
  );
}

export default PersonProfil;
