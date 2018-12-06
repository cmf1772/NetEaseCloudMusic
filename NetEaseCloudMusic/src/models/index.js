import { routerRedux } 　from 'dva/router'
import { getToken, setToken } from '../utils/user'
import {login} from '../services/login'

export default {

    namespace: 'index',

    state: {},

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname }) => {
                if (pathname = '/login') {
                    if (!getToken()) {
                        dispatch(routerRedux.replace({
                            pathname: '/login'
                        }))
                    }
                }
            })
        },
    },

    effects: {
        *login({ payload }, { call, put }) {  // eslint-disable-line
            let response = yield call(login, payload)
            console.log(response.data.account.id)
            setToken(response.data.account.id)
            yield  put({
                type: 'uodatastate',
                payload:response.data
            })
            yield put(routerRedux.replace({
                pathname: '/'
            }))
        },
    },

    reducers: {
        uodatastate(state, action) {
            return { ...state, ...action.payload };
        },
    },
};
