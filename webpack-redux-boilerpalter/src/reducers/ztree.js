const initialState = {
  isFetching: true,
  obj: [],
};

const departmentList = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_CONTACTDEPARTMENT':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_CONTACTDEPARTMENT_SUCCESS':
      return {
        ...state,
        obj: action.obj,
        success: true,
        isFetching: false
      };
    case 'RECEIVE_CONTACTDEPARTMENT_FAIL':
      return {
        ...state,
        success: false,
        isFetching: false
      };
    default:
      return state;
  };
};

module.exports = {
  departmentList
};
