import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Linked from "./routes/Linked";
import Layout from "./components/Layout";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { getUser } from "./actions/user.actions";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        credentials: {
          withCredentials: true,
          Credential: "include",
        },
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log(err));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);
  return (
    <UidContext.Provider value={uid}>
      <Layout>
        <Linked />
      </Layout>
    </UidContext.Provider>
  );
}

export default App;
