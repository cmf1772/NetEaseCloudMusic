import React from 'react';
import { connect } from 'dva';
import style from './detail.scss'
import { formatTime } from '../utils/time'

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
    },
    getListDetail: payload => {
      dispatch({
        type: 'detail/changePlay',
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
    let progress = this.refs.audio.currentTime / this.refs.audio.duration * 100
    this.setState({
      progress
    })
  }

  currentTime() {
    if (this.refs.audio && this.refs.audio.currentTime) {
      return formatTime(this.refs.audio.currentTime)
    }
    return '00:00'
  }

  duration() {
    if (this.refs.audio && this.refs.audio.duration) {
      return formatTime(this.refs.audio.duration)
    }
    return '00:00'
  }

  changePlay() {
    this.setState({
      isplay: !this.state.isplay
    }, () => {
      this.state.isplay ? this.refs.audio.play() : this.refs.audio.pause()
    })
  }

  touchStart() {
    this.setState({
      isplay: false
    }, () => {
      this.refs.audio.pause()
    })
  }

  touChMove(e) {
    // console.log('触发',e)
    let touch = e.touches[0],
      progressle = this.refs.progress; 
    // console.log(progressle)
    // console.log(progressEle.offsetWidth) 
    let progress = (touch.pageX - progressle.offsetLeft) / progressle.offsetWidth;
    // console.log(progress)
    if (progress > 1) {
      progress = 1
    }
    if (progress < 0) {
      progress = 0
    }

    this.setState({
      progress: progress * 100
    }, () => {
      this.refs.audio.currentTime = progress * this.refs.audio.duration
    })
  }

  touchEnd() {
    this.setState({
      isplay: true
    }, () => {
      this.refs.audio.play()
    })
  }

  changeMuse(tyle) {
    this.props.getListDetail(tyle)
  }

  render() {
    // console.log(this.props)
    let {
      songs,
      url,
      result
    } = this.props;
    // console.log(result.songs)
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
          <div className="streak"
            onTouchStart={() => { this.touchStart() }}
            onTouchMove={(e) => { this.touChMove(e) }}
            onTouchEnd={() => { this.touchEnd() }}
            ref="progress"
          >
            <p className="red" style={{ width: this.state.progress + '%' }}></p>
          </div>
          <span>{this.duration()}</span>
        </div>
        <div className="footer">
          <div onClick={() => {
              this.changeMuse('prev')
            }}>上一首</div>
          <div className="center">
            <div show='true' onClick={() => {
              this.changePlay()
            }}>{this.state.isplay ? '暂停' : '播放'}</div>
          </div>
          <div onClick={() => {
              this.changeMuse('next')
            }}>下一首</div>
        </div>
        {url ? <audio src={url} autoPlay ref="audio" onTimeUpdate={() => this.timeChange()}></audio> : null}
      </div>
    )
  }
}

export default Detail;
