import { GET_POST_ERROR } from "../actions/post.actions";

const initialState = { postError: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERROR:
      return {
        postError: action.payload,
      };
    default:
      return state;
  }
}
