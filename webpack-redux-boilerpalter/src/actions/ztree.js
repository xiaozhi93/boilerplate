/**
 * 获取部门列表
 */
const requestDepartment = () => ({
  type: 'REQUEST_CONTACTDEPARTMENT',
  text: '请求部门列表'
});

const receiveDepartment = obj => {
  return {
    type: 'RECEIVE_CONTACTDEPARTMENT_SUCCESS',
    text: '部门列表请求成功',
    obj: obj
  };
};

const fetchDepartment = params => dispatch => {
  dispatch(requestDepartment());
  //处理url
  let cx = '';
  for (var i in params) {
    cx += i +'='+ params[i] +'&';
  };
  return fetch('/api/departemt?'+ cx)
    .then(response => response.json())
    .then(data => {
      const data1 = data[0]; ////////////////////TODO
      if (data1.success) {
        dispatch(receiveDepartment(data1.obj));
      } else {
        dispatch({
          type: 'RECEIVE_CONTACTDEPARTMENT_FAIL',
          text: '部门列表请求失败'
        });
      };
    })
    .catch(error => {
      dispatch({
        type: 'RECEIVE_CONTACTDEPARTMENT_FAIL',
        text: '网络不通或程序出错',
        error: error
      });
    });
};

module.exports = {
  fetchDepartment
};


