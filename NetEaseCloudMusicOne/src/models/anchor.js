import { getBanner } from '../services/anchor'

export default {

    namespace: 'anchor',

    state: {
        banners: []
    },
    
    effects: {
        *getBanner({ payload }, { call, put }) {  // eslint-disable-line
            let res = yield call(getBanner)
            // console.log('res...', res)
            yield put({
                type: "listBanner",
                payload: res.data
            })
        },
    },

    reducers: {
        listBanner(state, action) {
            // console.log('action', action)
            return { ...state, ...action.payload };
        },
    },

};
