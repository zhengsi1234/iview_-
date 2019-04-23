import { setToken, getToken,setUserNew} from '@/libs/util'
import Cookies from 'js-cookie'
export default {
    state:{
        userName: '',
        userId: '',
        avatarImgPath: '',
        token: getToken(),
        access: '',
        hasGetInfo: false
    },
    mutations:{
        setAvatar (state, avatarPath) {
            state.avatarImgPath = avatarPath
        },
        setUserId (state, id) {
            state.userId = id
        },
        setUserName (state, name) {
            state.userName = name
        },
        setAccess (state, access) {
            state.access = access
        },
        setToken (state, token) {
            state.token = token
            setToken(token)
        },
        setHasGetInfo (state, status) {
            state.hasGetInfo = status
        },
    },
    actions:{
        // 登录
        handleLogin ({ commit }, { userName, password }) {
            userName = userName.trim()
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    //模拟请求成功的token值
                    const token ="EEKNHS5855FLM25394111RTYIHGG33222";
                    commit('setToken', token);
                    resolve(token);
                },3000)

            // login({
            //     userName,
            //     password
            // }).then(res => {
            //     const data = res.data
            //     commit('setToken', data.token)
            //     resolve()
            // }).catch(err => {
            //     reject(err)
            // })
            })
        },
        // 退出登录
        handleLogOut ({ state, commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    Cookies.remove('token')
                    commit('setAccess', [])
                    Cookies.remove('user')
                    resolve()
                },500);

            // logout(state.token).then(() => {
            //     commit('setToken', '')
            //     commit('setAccess', [])
            //     resolve()
            // }).catch(err => {
            //     reject(err)
            // })


            // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
            // commit('setToken', '')
            // commit('setAccess', [])
            // resolve()
            })
        },
        // 获取用户相关信息
        getUserInfo ({ state, commit }) {
            return new Promise((resolve, reject) => {
                try {
                    //
                    setTimeout(()=>{
                        //模拟请求成功的user数据
                        const data ={
                            avatar:"https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png",
                            name:"超级管理员",
                            user_id:1,
                            access:"测试access"
                        }
                        setUserNew(data);
                        commit('setAvatar', data.avatar)
                        commit('setUserName', data.name)
                        commit('setUserId', data.user_id)
                        commit('setAccess', data.access)
                        commit('setHasGetInfo', true)
                        resolve(data)
                    },500);
                    // getUserInfo(state.token).then(res => {
                    //     const data = res.data
                    //     commit('setAvatar', data.avatar)
                    //     commit('setUserName', data.name)
                    //     commit('setUserId', data.user_id)
                    //     commit('setAccess', data.access)
                    //     commit('setHasGetInfo', true)
                    //     resolve(data)
                    // }).catch(err => {
                    // reject(err)
                    // })
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}