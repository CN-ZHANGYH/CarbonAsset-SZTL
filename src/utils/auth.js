import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserKey = "User-Key"
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setUserKey(userKey){
  return Cookies.set(UserKey,userKey)
}

export function getUserKey(){
  return Cookies.get(UserKey)
}

export function removeUserKey(){
  return Cookies.remove(UserKey)
}


export function removeToken() {
  return Cookies.remove(TokenKey)
}
