import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "../components/Utils";

function Search() {
  const [search, setSearch] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  console.log(usersData);
  return (
    <>
      <main className="search-main">
        <h2 className="title">Recherche : </h2>
        <input
          type="text"
          name="search"
          placeholder="Rechercher un utilisateur"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {search && !isEmpty(search) && <h4 className="title">Utilisateur :</h4>}
        <ul className="list-user">
          {search &&
            usersData
              .filter((user) => {
                if (user.pseudo.toLowerCase().includes(search.toLowerCase()))
                  return user;
                else return null;
              })
              .map((user, key) => (
                <Link to={`/user/${user._id}`}>
                  <li className="user" key={key}>
                    <img src={user.picture} alt="user avatar" />
                    <h3>{user.pseudo}</h3>
                  </li>
                </Link>
              ))}
        </ul>
      </main>
    </>
  );
}

export default Search;
