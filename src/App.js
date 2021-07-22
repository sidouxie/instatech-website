import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Linked from "./routes/Linked";
import Layout from "./components/Layout";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { getUser } from "./actions/user.actions";
import Cookies from "js-cookie";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const token = Cookies.get("_GO");

  useEffect(() => {
    if (token) {
      const fetchToken = async () => {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/jwtid`,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "/",
            "Cache-Control": "no-cache",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            setUid(res.data);
          })
          .catch((err) => console.log(err));
      };
      fetchToken();
    }

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch, token]);
  return (
    <UidContext.Provider value={uid}>
      <Layout>
        <Linked />
      </Layout>
    </UidContext.Provider>
  );
}

export default App;
