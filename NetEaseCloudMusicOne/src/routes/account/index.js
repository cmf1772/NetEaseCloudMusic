import React from 'react';
import {NavLink} from 'dva/router'
import styles from './index.scss'

import ReactView from '../../router/RouterVuew'
// import config from '../../router/index'

class Index extends React.PureComponent{
  render() {
    return (
        <div className="wrapper">
          <div className="topContent">
            <span>识别音乐</span>
            <NavLink to="/mainPage/search" className="input"><div>音乐</div></NavLink>
            <span>音频</span>
          </div>
          <div className="Tab-change">
            <p>
              <NavLink to="/mainPage/account/anchor">个性推荐</NavLink>
              <NavLink to="/mainPage/account/recommend">主播电台</NavLink>
            </p>
          </div>
          <ReactView routes = {this.props.routes}></ReactView>
        </div>
      )
  }
}

export default Index;
