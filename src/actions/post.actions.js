import axios from "axios";
import instance from "../helpers/axiosInstance";

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POSTS = "LIKE_POSTS";
export const UNLIKE_POSTS = "UNLIKE_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// ERRORS
export const GET_POST_ERROR = "GET_POST_ERROR";

export const getPosts = (num) => {
  return (dispatch) => {
    return instance({
      url: "/api/post",
      method: "get",
    })
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return instance
      .post(`${process.env.REACT_APP_API_URL}/api/post`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERROR, payload: res.data.errors });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/like-post/${postId}`,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POSTS, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/unlike-post/${postId}`,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POSTS, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
      data: { message },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      url: `${process.env.REACT_APP_API_URL}/api/post/comment-post/${postId}`,
      method: "patch",
      data: {
        commenterId,
        text,
        commenterPseudo,
      },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      url: `${process.env.REACT_APP_API_URL}/api/post/edit-comment-post/${postId}`,
      method: "patch",
      data: {
        commentId,
        text,
      },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      url: `${process.env.REACT_APP_API_URL}/api/post/delete-comment-post/${postId}`,
      method: "patch",
      data: {
        commentId,
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};
