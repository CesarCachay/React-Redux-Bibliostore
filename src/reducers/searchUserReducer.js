import { SEARCH_USER } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        first_name: action.user.first_name,
        last_name: action.user.last_name,
        code: action.user.code,
        career: action.user.career
      };
    default:
      return state;
  }
}
