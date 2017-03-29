/**
 * 通讯录人员列表及参数
 */
const initialState = {
  isFetching: true,
  departId: '',
  keyWord: '',
  searchType: '00',
  pageIndex: '1',
  pageSize: '25',
  list: []
};

const contactPerson = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_CONTACTPERSON':
      return {
        ...state,
        ...action.obj,
        isFetching: true
      };
    case 'RECEIVE_CONTACTPERSON_SUCCESS':
      return {
        ...state,
        ...action.obj,
        success: true,
        isFetching: false
      };
    case 'RECEIVE_CONTACTPERSON_FAIL':
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

/**
 * 通讯录字段列表
 */
const add = (state, object) => {
  const {obj} = state;
  obj.exten.push({
    "id": object.id,
    "name": object.name,
    "manageShow": false,
    "weChatShow": false
  });
  return obj;
};
const deleted = (state, id) => {
  const {obj} = state;
  const index = obj.exten.findIndex(item => (
    id === item.id
  ));
  obj.exten.splice(index, 1);
  return obj;
};
const show = (state, object) => {
  const {obj} = state;
  let cur = '';
  if (object.isExten) {
    cur = obj.exten.find(item => (
      object.id === item.id
    ));
  } else {
    cur = obj.fixed.find(item => (
      object.id === item.id
    ));
  };
  const showType = object.showType === '0' ? false : true;
  if (object.whereShow === '0') {
    cur.manageShow = showType;
  } else {
    cur.weChatShow = showType;
  };
  return obj;
};
const contactExtension = (state = {isFetching:true,obj:{}}, action) => {
  switch (action.type) {
    case 'REQUEST_CONTACTEXTENSION':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_CONTACTEXTENSION_SUCCESS':
      return {
        ...state,
        obj: action.obj,
        success: true,
        isFetching: false
      };
    case 'RECEIVE_CONTACTEXTENSION_FAIL':
      return {
        ...state,
        error: action.error,
        success: false,
      };
    case 'ADD_CONTACTEXTENSION':
      return {
        ...state,
        obj: add(state, action.obj),
        success: true,
      }
    case 'DELETE_CONTACTEXTENSION':
      return {
        ...state,
        obj: deleted(state, action.id),
        success: true,
      }
    case 'SHOW_CONTACTEXTENSION':
      return {
        ...state,
        obj: show(state, action.obj),
        success: true,
      }
    default:
      return state;
  };
};



module.exports = {
    contactPerson,
    contactExtension
};
