import {getToken, removeToken, setToken} from '../../utils/auth'
import {default as api} from '../../utils/api'
import store from '../../store'
import router from '../../router'

const user = {
  state: {
    username: "",
    userId: "",
    role: '',
    menus: [],
    permissions: [],
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.username = userInfo.username;
      state.userId = userInfo.userId;
      state.role = userInfo.roleName;
      state.menus = userInfo.menuList;
      state.permissions = userInfo.permissionList;
    },
    RESET_USER: (state) => {
      state.username = "";
      state.userId = "";
      state.role = '';
      state.menus = [];
      state.permissions = [];
    }
  },
  actions: {
    // 登录
    Login({commit, state}, LoginForm) {
      console.log(LoginForm)
      return new Promise((resolve, reject) => {
        api({
          url: "/api/login",
          method: "post",
          data: LoginForm
        }).then(data => {
          if (data.result === "success") {
            //cookie中保存前端登录状态
            setToken();
          }
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/getInfo',
          method: 'post'
        }).then(data => {
          console.log('++++++++++')
          console.log(data)
          //储存用户信息
          commit('SET_USER', data.userPermission);
          //cookie保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
          setToken();
          //生成路由
          let userPermission = data.userPermission ;
          console.log(userPermission)
          store.dispatch('GenerateRoutes', userPermission).then(() => {
            //生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
            router.addRoutes(store.getters.addRouters)
          })
          console.log('done 1')
          resolve(data)
        }).catch(error => {
          console.log('done 2')
          reject(error)
        })
      })
    },
    //注册
    Register({commit, state}, registerForm) {
      console.log(registerForm)
      return new Promise((resolve, reject) => {
        api({
          url: "/api/register",
          method: "post",
          data: registerForm
        }).then(data => {
          if (data.result === "success") {
            //cookie中保存前端登录状态
            setToken();
          }
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 登出
    LogOut({commit}) {
      return new Promise((resolve) => {
        api({
          url: "/api/logout",
          method: "post"
        }).then(data => {
          commit('RESET_USER')
          removeToken()
          console.log("wo remove lema")
          resolve(data);
        }).catch(() => {
          console.log("womeiyou remove lema")
          commit('RESET_USER')
          removeToken()
        })
      })
    },
    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
