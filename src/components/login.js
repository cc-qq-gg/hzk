import React, { Component } from 'react'
import { Flex, NavBar, Button, WingBlank, List, Toast, InputItem } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import './login.css'
import axios from '../http'
import { lstat } from 'fs'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // 受控组建输入框，
  changeInputValue = (key, val) => {
    this.setState({
        [key]: val
    })
}
// 登录处理，
  handleLogin = async () => {
    const {
      data,
      meta: { status, msg }
    } = await axios.post(`/users/login`, {
      uname: this.state.uname,
      pwd: this.state.pwd
    })
    if (status === 200) {
      localStorage.setItem('token', data.token)
      // 进入首页->改标识->js改->编程式导航-> 如果组件是路由匹配到的,此时props
      // console.log(this.props)
      const { history } = this.props
      history.push('/')
    } else {
      // 提示->
      Toast.fail(msg, 3)
    }
  }
  render() {
    return (
      <div>
        <WingBlank size='sm'>
          <Flex direction={'column'} justify={'center'}>
            <Flex.Item>
              <NavBar>登录</NavBar>
            </Flex.Item>
            <Flex.Item>
              <List>
                <InputItem value={this.state.uname}
                  onChange={val => {
                    this.changeInputValue('uname', val)
                  }}>姓名</InputItem>
                <InputItem value={this.state.pwd}
                  onChange={val => {
                    this.changeInputValue('pwd', val)
                  }}>密码</InputItem>
              </List>
              <Button type="primary" onClick={this.handleLogin}>
                登录
              </Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Login