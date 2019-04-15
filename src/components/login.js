import React, { Component } from 'react'
import { Flex, NavBar, Button, WingBlank, List, InputItem } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import './login.css'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
                <InputItem value="">姓名</InputItem>
                <InputItem value="">密码</InputItem>
              </List>
              <Button type="primary">登录</Button>
            </Flex.Item>
          </Flex>
      </WingBlank>
    </div>
    )
  }
}

export default Login