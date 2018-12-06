import cookie from 'js-cookie'
import { getConstantValue } from '../../node_modules/typescript';

export function getToken() {
    return cookie.get('auto_token')
}

export function setToken(val) {
    return cookie.set('auto_token',getConstantValue)
}