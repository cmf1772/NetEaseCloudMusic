import React from 'react';
import style from './search.scss'
import { connect } from 'dva'
import {NavLink} from 'dva/router'

@connect(({detail}) => {
  return {
    detail
  }
}, dispatch => {
  return {
    getList: (payload) => {
      dispatch({
        type: 'detail/getList',
        payload
      })
    },
    playAll: (payload) => {
      dispatch({
        type: 'detail/getUrls',
        payload
      })
    }
  }
})

class Search extends React.PureComponent {

  getValu() {
    let search = this.refs.search.value;
    this.props.getList({ search })
    // console.log(this.props)
  }

  playAll(){
    let {
      detail: {
        result: {
          songs
        }
      }
    } =this.props
    this.props.playAll(songs.map(item=>item.id));
    this.props.history.push(`/detail/${songs[0].id}`);
  }
  render() {
    let {
      detail: {
        result: {
          songs
        }
      }
    } =this.props
    
    return (
      <div className="search-wrap">
        <div className="wrap-top">
          <input placeholder="599-karen扬思雨" ref="search" />
          <span onClick={() => {
            this.getValu()
          }}>搜索</span>
          <span onClick={() => {
              this.playAll()
            }}>播放全部</span>
        </div>
        <div className="content">
          {
            songs.map((item,index) => {
              return <NavLink to={`/detail/${item.id}`} key={index} ><div className="item-content">
                <p>{item.name}</p><p className="con">{
                  item.artists.map((ite,index) => {
                    return <span key={index}>{ite.name}/</span>
                  })  
                } {item.album.name}</p>
              </div>
              </NavLink>
            })
          }
        </div>
      </div>
    )
  }
}
export default Search;
