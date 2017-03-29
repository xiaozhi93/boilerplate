import { combineReducers } from 'redux';
import roots from './root';
import contact from './contact';
import ztree from './ztree';

module.exports = combineReducers({
  ...roots,
  ...contact,
  ...ztree,
});


