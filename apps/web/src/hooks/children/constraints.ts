const API = {
  ALL_CHILDREN: {
    path: 'children/all',
    method: 'GET',
  },

  CREATE_CHILDREN: {
    path: 'children/create',
    method: 'POST',
  },
  FIND_ONE: {
    path: 'children/',
    method: 'GET',
  },
  SET_ATTRIBUTE: {
    path: 'children/set-attribute/',
    method: 'POST',
  },
};

export const REACT_QUERY_NAME = 'children';
export default API;
