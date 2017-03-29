/*jshint esversion: 6*/
import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';
//外层框架
import Layout from '../layouts';
/**
 * 通讯录
 */
import Contact from './Contact'; //通讯录框架
import ContactHome from './Contact/Home/'; //通讯录首页
import ContactEdit from './Contact/Edit'; //通讯录部门编辑
import ImportAndExport from './Contact/ImportAndExportPanel'; //导入导出
import Sync from './Contact/SyncContactPanel'; //同步成员

//demo
import UploadDemo from './Demo/UploadDemo';
import ModalDemo from './Demo/ModalDemo';
import PaginationDemo from './Demo/PaginationDemo';
import FormListHorizontal from '../components/FormList/FormListHorizontal';
import FormListVertical from '../components/FormList/FormListVertical';


const RouteConfig = (
  <Route path="/" component={Layout}>
    <IndexRedirect to="/contact" />
    {/*<IndexRoute component={Contact} />*/}
    <Route path="contact" component={Contact}>
      <IndexRoute component={ContactHome} />
      <Route path="edit" component={ContactEdit} />
      <Route path="import" component={ImportAndExport} />
      <Route path="sync" component={Sync} />
    </Route>

    <Route path="demo" >
        <Route path="upload" component={UploadDemo}/>
        <Route path="modal" component={ModalDemo}/>
        <Route path="page" component={PaginationDemo}/>
        <Route path="FormListHorizontal" component={FormListHorizontal}/>
        <Route path="FormListVertical" component={FormListVertical}/>
    </Route>
  </Route>
);

export default RouteConfig;
