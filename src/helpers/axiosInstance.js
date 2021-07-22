import axios from "axios";
/* import Cookies from "js-cookie"; */

/* const token = Cookies.get("_GO"); */
const token = localStorage.getItem("_user");
let headers = {};

if (token)
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "/",
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${token}`,
  };
else {
  headers = {
    "Content-Type": "application/json",
  };
}
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: headers,
});

export default instance;
