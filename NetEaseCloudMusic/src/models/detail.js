import { detail, getUrl, getSearch } from '../services/detail'
import Item from '../../node_modules/antd/lib/list/Item';

export default {

    namespace: 'detail',

    state: {
        songs: [],
        url: '',
        info: {},
        result: {
            songs: []
        },
        detail: {},
        current: 0,
        playList: [],
        id: 0,
    },

    effects: {
        *getdetail({ payload }, { call, put }) {  // eslint-disable-line
            let res = yield call(detail, payload)
            // console.log(res)
            yield put({
                type: "getDetailList",
                payload: res.data
            })
        },
        *getUrl({ payload }, { call, put }) {  // eslint-disable-line
            let res = yield call(getUrl, payload)
            // console.log('res...', )
            let obj = { info: res.data.data[0] };
            obj.id = payload;
            obj.url = res.data.data[0].url
            yield put({
                type: "getDetailList",
                payload: obj
            })
        },
        *getList({ payload }, { call, put }) {// eslint-disable-line
            let res = yield call(getSearch, payload)
            yield put({
                type: 'getDetailList',
                payload: res.data
            });
        },

        * getUrls({ payload }, { call, put }) {// eslint-disable-line
            console.log('payload', payload)
            let responses = yield call(getUrl, payload.join(','))
            let details = yield call(detail, payload.join(','))
            responses = responses.data.data;
            details = details.data.songs;
            let playList = [];
            details.forEach(item => {
                playList.push({
                    detail: item,
                    info: responses.filter(value => value.id == item.id)[0]
                })
            })
            window.localStorage.setItem('playList', JSON.stringify(playList));
            yield put({
                type: 'getDetailList',
                payload: { playList }
            })
        },
    },

    reducers: {
        getDetailList(state, action) {
            // console.log('action...', action)
            return { ...state, ...action.payload };
        },
        changePlay(state, { payload }) {
            console.log(payload,state)
            let newState = {...state};
            if (!state.playList.length || state.mode == 1){
              return newState;
            }
            if (state.mode == 2){
              let index = Math.floor(Math.random()*(state.playList.length-1));
              newState.current = index;
            }else{
              if (payload == 'prev'){
                if (state.current == 0){
                  newState.current = state.playList.length-1;
                }else{
                  newState.current--;
                }
              }else{
                if (state.current == state.playList.length-1){
                  newState.current = 0;
                }else{
                  newState.current++;
                }
              }
            }
            newState.id = state.playList[newState.current].info.id;
            newState.url = state.playList[newState.current].info.url;
            newState.info = state.playList[newState.current].info;
            newState.songs = state.playList[newState.current].detail;
      
            return newState;
        }
    },
};





