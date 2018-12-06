import React from 'react';
import { Router } from 'dva/router';
// import IndexPage from './routes/IndexPage';

import config from './router/index'//路由
import RouterView from './router/RouterVuew'//编译路由

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <React-Fragement>
        <RouterView routes={config.routes}></RouterView>
      </React-Fragement>
    </Router>
  );
}

export default RouterConfig;
