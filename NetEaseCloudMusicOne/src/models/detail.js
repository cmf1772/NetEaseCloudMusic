import { detail, getUrl} from '../services/detail'

export default {

    namespace: 'detail',

    state: {
        songs: [],
        url: '',
        info: {}
    },
    
    effects: {
        *getdetail({ payload }, { call, put }) {  // eslint-disable-line
            let res = yield call(detail,payload)
            // console.log(res)
            yield put({
                type: "getDetailList",
                payload: res.data
            })
        },
        *getUrl({ payload }, { call, put }) {  // eslint-disable-line
            let res = yield call(getUrl,payload)
            // console.log('res...', )
            let obj ={info: res.data.data[0]};
            obj.id = payload;
            obj.url = res.data.data[0].url
            yield put({
                type: "getDetailList",
                payload: obj
            })
        },
    },

    reducers: {
        getDetailList(state, action) {
            // console.log('action...', action)
            return { ...state, ...action.payload };
        },
    },

};
