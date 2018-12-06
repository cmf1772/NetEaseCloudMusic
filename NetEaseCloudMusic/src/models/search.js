import { getSearch } from '../services/search'

export default {

    namespace: 'search',

    state: {
        result: {
            songs: []
        }
    },

    effects: {
        *getList({ payload }, { call, put }) {// eslint-disable-line
            let res = yield call(getSearch, payload)
            yield put({
                type: 'sendJson',
                payload: res.data
            });
        },
    },

    reducers: {
        sendJson(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
