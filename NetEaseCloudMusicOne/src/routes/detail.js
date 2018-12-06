import React from 'react';
import { connect } from 'dva';
import style from './detail.scss'
import {formatTime} from '../utils/time'

@connect(({ detail }) => {
  return detail
}, dispatch => {
  return {
    getDetail: payload => {
      dispatch({
        type: 'detail/getdetail',
        payload
      })
    },
    getUrl: payload => {
      dispatch({
        type: 'detail/getUrl',
        payload
      })
    }
  }
})

class Detail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = ({
      currentTime: '',
      duration: '',
      progress: '',
      isplay: true
    })
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getDetail(id)
    this.props.getUrl(id)
  }

  timeChange() {
    let progress = this.refs.audio.currentTime/this.refs.audio.duration*100
    this.setState({
      progress
    })
  }
 
  currentTime() {
    if(this.refs.audio && this.refs.audio.currentTime) {
      return formatTime(this.refs.audio.currentTime)
    }
    return '00:00'
  }

  duration() {
    if(this.refs.audio && this.refs.audio.duration) {
      return formatTime(this.refs.audio.duration)
    }
    return '00:00'
  }

  changePlay() {
    this.setState({
      isplay: !this.state.isplay
    },() => {
      this.state.isplay? this.refs.audio.play() : this.refs.audio.pause()
    })
  }

  touchStart() {
    this.setState({
      isplay: false
    }, () => {
      this.refs.audio.pause()
    })
  }

  touChMove(even) {
    console.log('触发',even)
  }

  touchEnd() {
    this.setState({
      isplay: true
    }, () => {
      this.refs.audio.play()
    })
  }

  render() {
    let {
      songs,
      url 
    } = this.props;
    return (
      <div className='detailPage'>
        <div className="detail-top"> 
          { 
            songs.map((item, index) => {
              return <div key={index} className="top-comtent">
                <img src={item.al.picUrl} />
                <h5>{item.name}</h5>
                <p>{item.al.name}></p>
              </div>
            })
          }
        </div>
        <div className="center-content">
          <span>{this.currentTime()}</span>
          <div className="streak">
            <p className="red" style={{width: this.state.progress + '%'}}
                ref="progress"
                onTouchStart={() => {this.touchStart()}}
                onTouchMove={() => {this.touChMove()}}
                onTouchEnd={() => {this.touchEnd()}}
            ></p>
          </div>
          <span>{this.duration()}</span>
        </div>
        <div className="footer">
          <div>上一首</div>
          <div className="center">
            <div show='true' onClick={ () => {
                this.changePlay()
              }}>{this.state.isplay? '暂停' : '播放'}</div>
          </div>
          <div>下一首</div>
        </div>
        {url ? <audio src={url} autoPlay ref="audio" onTimeUpdate={() => this.timeChange()}></audio> : null}
      </div>
    )
  }
}

export default Detail;
