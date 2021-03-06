import http from '../http.js'

/* 登录 */
export function login(loginInfo) {
  return http.post("login", loginInfo)
}

/* 左侧菜单权限 */
export function getMenuData() {
  return http.get("menus")
}

/* 获取用户数据列表 */
export function getUsers(queryInfo) {
  return http.get("users", {
    params: queryInfo
  })
}

/* 更改用户状态 */
export function changeUserState(id,state){
  return http.put(`users/${id}/state/${state}`)
}

//* 根据ID查询用户 */
export function searchUser(userId){
  return http.get(`users/${userId}`)
  }

export default http
