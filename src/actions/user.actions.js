import axios from "axios";
import instance from "../helpers/axiosInstance";

export const GET_USER = "GET_USER";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPLOAD_COVER = "UPLOAD_COVER";

export const getUser = (uid) => {
  return (dispatch) => {
    return instance({
      url: `/api/user/${uid}`,
      method: "get",
    })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/follow/${followerId}`,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: idToFollow });
      })
      .catch((err) => console.log(err));
  };
};

export const unfollowUser = (followerId, idToUnFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/unfollow/${followerId}`,
      data: { idToUnFollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: idToUnFollow });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, uid) => {
  return (dispatch) => {
    return instance
      .post("/api/user/uploaded", data)
      .then((res) => {
        return instance.get(`/api/user/${uid}`).then((res) => {
          dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
        });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadCover = (data, uid) => {
  return (dispatch) => {
    return instance.post("/api/user/cover/uploaded", data).then((res) => {
      return instance.get(`/api/user/${uid}`).then((res) => {
        dispatch({ type: UPLOAD_COVER, payload: res.data.cover });
      });
    });
  };
};
