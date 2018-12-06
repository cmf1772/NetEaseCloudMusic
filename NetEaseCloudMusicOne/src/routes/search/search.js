import React from 'react';
import style from './search.scss'
import { connect } from 'dva'
import {NavLink} from 'dva/router'

@connect(({search}) => {
  return {
    search
  }
}, dispatch => {
  return {
    getList: (payload) => {
      dispatch({
        type: 'search/getList',
        payload
      })
    }
  }
})

class Search extends React.PureComponent {
  getValu() {
    let search = this.refs.search.value;
    this.props.getList({ search })
  }
  render() {
    let {
      search: {
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
