/**
 * 获取人员列表
 */
const requestContactPerson = obj => ({
  type: 'REQUEST_CONTACTPERSON',
  text: '请求通讯录人员列表',
  obj: obj
});
const receiveContactPersonSuccess = obj => {
  return {
    type: 'RECEIVE_CONTACTPERSON_SUCCESS',
    text: '通讯录人员列表请求成功',
    obj: obj
  };
};

const fetchContactPerson = params => dispatch => {
  const argument = `departId=${params.departId || ''}&searchType=${params.searchType}&keyWord=${encodeURIComponent(params.keyWord || '')}&pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`;
  dispatch(requestContactPerson({
    ...params
  }));
  return fetch('/api/person?'+ argument)
    .then(response => response.json())
    .then(data => {
      const json = data[0]; ////////////////////TODO
      if (json.success) {
        dispatch(receiveContactPersonSuccess(json.obj));
      } else {
        dispatch({
          type: 'RECEIVE_CONTACTPERSON_FAIL',
          text: '通讯录人员列表请求失败',
          error: data
        });
      };
    })
    .catch(error => {
      dispatch({
        type: 'RECEIVE_CONTACTPERSON_FAIL',
        text: '请求通讯录人员列表时程序出错或网络不通',
        error: error
      });
    });
};

/**
 * 获取添加成员时的自定义字段
 */
const requestContactExtension = () => ({
  type: 'REQUEST_CONTACTEXTENSION',
  text: '请求添加成员时的自定义字段'
});
const receiveContactExtensionSuccess = obj => {
  return {
    type: 'RECEIVE_CONTACTEXTENSION_SUCCESS',
    text: '添加成员时的自定义字段请求成功',
    obj: obj
  }
};

const fetchContactExtension = () => dispatch => {
  dispatch(requestContactExtension());
  return fetch('/api/loadExtension')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        dispatch(receiveContactExtensionSuccess(data.obj));
      } else {
        dispatch({
          type: 'RECEIVE_CONTACTEXTENSION_FAIL',
          text: '添加成员时的自定义字段请求失败',
          error: data
        });
      };
    })
    .catch(error => {
      dispatch({
        type: 'RECEIVE_CONTACTEXTENSION_FAIL',
        text: '请求添加成员时的自定义字段时程序出错或网络不通',
        error: error
      });
    });
};

/**
 * [处理自定义字段]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
const handleContactExtension = params => dispatch => {
  const { type } = params;
  let argument = '';
  let param = {};
  if (type === 'add') {
    param = {
      method: 'POST',
      body: 'name='+ encodeURIComponent(params.name)
    }
  } else if (type === 'delete') {
    argument = '?id=' +params.id; ////TODO
    param = {
      method: 'POST'
    }
  } else {
    //showType: 0--noShow;1--show
    //whereShow: 0--PC;1--weChat
    argument = '?extendId='+ params.id +'&showType='+ params.showType +'&whereShow='+ params.whereShow;
  }
  ////TODO
  return fetch('/api/loadExtensionPost'+ argument, param)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log(params)
      };
      if (type === 'add') {
        dispatch({
          type: 'ADD_CONTACTEXTENSION',
          obj: {
            id: 111111,
            name: params.name
          },
          text: '添加自定义字段',
        })
      } else if (type === 'delete') {
        dispatch({
          type: 'DELETE_CONTACTEXTENSION',
          id: params.id,
          text: '删除自定义字段',
        })
      } else {
        dispatch({
          type: 'SHOW_CONTACTEXTENSION',
          obj: {
            ...params
          },
          text: '修改自定义字段显隐',
        })
      }
    })
    .catch(error => {
      dispatch({
        type: 'RECEIVE_CONTACTEXTENSION_FAIL',
        text: '请求处理自定义字段时程序出错或网络不通-Type:'+ type,
        error: error
      });
    });
};


module.exports = {
  fetchContactPerson,
  fetchContactExtension,
  handleContactExtension
};


