const requestRootData = () => ({
  type: 'REQUEST_ROOTDATA',
  text: '请求基础数据'
});

const receiveRootData = obj => {
  return {
    type: 'RECEIVE_ROOTDATA_SUCCESS',
    text: '基础数据请求成功',
    obj: obj
  };
};

const fetchRootData = () => dispatch => {
  dispatch(requestRootData());
  return fetch('/api/index')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        dispatch(receiveRootData(data.obj));
      } else {
        dispatch({
          type: 'RECEIVE_ROOTDATA_FAIL',
          text: '基础数据请求失败'
        });
      };
    })
    .catch(error => {
      dispatch({
        type: 'RECEIVE_ROOTDATA_FAIL',
        text: '请求基础数据时，程序出错或网络不通',
        error: error
      });
    });
};

module.exports = {
  fetchRootData
};
