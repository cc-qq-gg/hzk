import React, { Component } from 'react'

import { SearchBar, Carousel, Grid } from 'antd-mobile'

import axios from '../../http'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swipeData: [],
      menuData: [],
      data: Array.from(new Array(8)).map((_val, i) => ({
        icon:
          'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `name${i}`
      })),

      imgHeight: 176
    }
  }

  // 请求main.js中所有的数据的方法
  getMainData = async path => {
    const {
      data,
      meta: { msg, status }
    } = await axios.post(path)

    if (status === 200) {
      return data.list
    }
  }

  async componentDidMount() {
    // this.autoFocusInst.focus()

    const swipeData = this.getMainData(`homes/swipe`)

    const menuData = this.getMainData(`homes/menu`)

    const mainData = await Promise.all([swipeData, menuData])

    this.setState(
      {
        swipeData: mainData[0],
        menuData: mainData[1]
      },
      () => {
        // console.log(this.state.menuData)
        // let temp = [...this.state.data]

        let temp = this.state.menuData.map((item, i) => {
          return {
            id: item.id,
            icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
            text: item.menu_name
          }
        })

        this.setState({
          data: temp
        })
      }
    )
  }
  render() {
    const carouselTemplate = this.state.swipeData.map((val, i) => (
      <a
        key={i}
        style={{
          display: 'inline-block',
          width: '100%',
          height: this.state.imgHeight
        }}
      >
        <img
          src={val.original}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'))
            this.setState({ imgHeight: 'auto' })
          }}
        />
      </a>
    ))
    return (
      <div>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入搜索内容"
          ref={ref => (this.autoFocusInst = ref)}
        />

        {/* 轮播图 */}
        <Carousel autoplay={true} infinite>
          {carouselTemplate}
        </Carousel>

        {/* 菜单 */}
        <Grid data={this.state.data} activeStyle={false} />
      </div>
    )
  }
}

export default Main