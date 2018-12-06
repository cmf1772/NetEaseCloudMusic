import React from 'react'
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import style from './anchor.scss'
import { connect } from 'dva'
import {NavLink} from 'dva/router'

@connect(({ anchor }) => {
    return anchor
}, dispatch => {
    return {
        getBanner: () => {
            dispatch({
                type: 'anchor/getBanner'
            })
        }
    }
})

class Anchor extends React.PureComponent {

    componentDidMount() {
        this.props.getBanner()
    }
    render() {
        let {
            banners
        } = this.props
        return (
            <div>
                <div className="autoChange">
                    <Carousel autoplay>
                        {
                            banners.map((item, ind) => {
                                return <div  key={ind}>
                                    <h3><img src={item.imageUrl}/></h3>
                                </div>
                        })
                        }
                    </Carousel>
                </div>
                <div className="banner">
                    <dl>
                        <dd></dd>
                        <dt>私人FM</dt>
                    </dl>
                    <dl>
                        <dd></dd>
                        <dt><NavLink to='/mainPage/everyDay'>每日推荐</NavLink></dt>
                    </dl>
                    <dl>
                        <dd></dd>
                        <dt>歌单</dt>
                    </dl>
                    <dl>
                        <dd></dd>
                        <dt>排行榜</dt>
                    </dl>
                </div>
            </div>
        )
    }
}

export default Anchor