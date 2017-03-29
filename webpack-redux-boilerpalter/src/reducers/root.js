const initialState = {
  isFetching: true,
  obj: {},
};

const rootData = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_ROOTDATA':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_ROOTDATA_SUCCESS':
      return {
        ...state,
        obj: action.obj,
        success: true,
        isFetching: false
      };
    case 'RECEIVE_ROOTDATA_FAIL':
      return {
        ...state,
        error: action.error,
        success: false,
        isFetching: false
      };
    default:
      return state;
  };
};

module.exports = {
  rootData
};
