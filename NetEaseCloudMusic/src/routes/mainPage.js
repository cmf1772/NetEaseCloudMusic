import React from 'react';
import ReactView from '../router/RouterVuew'
import {NavLink} from 'dva/router'
import styles from './mainPage.scss'

class MainPage extends React.PureComponent{
  render() {
    return (
        <React-Fragement>
          <ReactView routes = {this.props.routes}></ReactView>
          <div className="buttonContent">
              <NavLink to="/mainPage/account/anchor">发现</NavLink>
              <NavLink to="/mainPage/video">视屏</NavLink>
              <NavLink to="/mainPage/my">我的</NavLink>
              <NavLink to="/mainPage/friend">朋友</NavLink>
              <NavLink to="/mainPage/discover">账号</NavLink>
          </div>
        </React-Fragement>
      )
  }
}

export default MainPage;
