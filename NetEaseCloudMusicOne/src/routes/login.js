import React from 'react';
import { connect } from 'dva'
import style from './login.scss'

@connect(state => {
  return {}
}, dispatch => {
  return {
    login: payload => {
      dispatch({
        type: 'index/login',
        payload
      })
    }
  }
})

class Loginpage extends React.PureComponent {
  constructor(props) {
    super(props),
      this.state = {
        user: '17718445587',
        password: '147852.'
      }
  }

  clickItem(e) {
    let {
      user,
      password
    } = this.state;
    // console.log(this.props)
    if (!(/^1[34578]\d{9}$/.test(user))) {
      alert("手机号码有误，请重填");
      return;
    }

    //校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
    var patrn = /\S{6,20}/;
    if (!patrn.test(password)) {
      alert("密码有误，请重填");
      return;
    }

    this.props.login({
      user: user,
      password: password
    })
  }

  render() {
    let {
      user,
      password
    } = this.state
    return (
      <div className="loginPage">
        <div className="login-item">
          <input type="text" value={user} onChange={e => { this.setState({ user: e.target.value }) }}  className="ipt"/>
          <p>输入用户电话</p>
          <input type="password" value={password} onChange={e => { this.setState({ password: e.target.value }) }} />
          <p>输入密码</p>
          <button onClick={() => {
            this.clickItem()
          }}>登陆</button>
        </div>
      </div>
    )
  }
}

export default Loginpage;
