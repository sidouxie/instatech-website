import instance from "../helpers/axiosInstance";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return instance({
      url: "/api/user",
      method: "get",
    })
      .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};
