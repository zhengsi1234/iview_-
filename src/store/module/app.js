import {
    getBreadCrumbList,
    getHomeRoute,
    getTagNavListFromLocalstorage,
    setTagNavListInLocalstorage,
    routeEqual,
    getNextRoute,
    getRouteTitleHandled,
    routeHasExist,
    getMenuByRouter,
} from '@/libs/util.js'
import config from '@/config/index'
const { homeName } = config
import router from '@/router/index'

const closePage = (state, route) => {
    const nextRoute = getNextRoute(state.tagNavList, route)
    state.tagNavList = state.tagNavList.filter(item => {
      return !routeEqual(item, route)
    })
    router.push(nextRoute)
}

export default {
    state :{
        Menu: [
            {
                name:"表格",
                order:"1",
                icon:"ios-apps-outline",
                pathNmae:"",
                list:[
                    {
                        name:"简单表格",
                        order:"1-1",
                        icon:"logo-apple",
                        pathNmae:"simple"
                    },
                    {
                        name:"特定样式",
                        order:"1-2",
                        icon:"logo-apple",
                        pathNmae:"given"
                    },
                    {
                        name:"固定表头",
                        order:"1-3",
                        icon:"logo-apple",
                        pathNmae:"fixed"
                    },
                    {
                        name:"单选/多选",
                        order:"1-5",
                        icon:"logo-apple",
                        pathNmae:"Choice"
                    },
                    {
                        name:"排序/筛选",
                        order:"1-6",
                        icon:"logo-apple",
                        pathNmae:"sort"
                    },
                    {
                        name:"自定义列模板",
                        order:"1-7",
                        icon:"logo-apple",
                        pathNmae:"custom"
                    }
                ]
            },
            {
                name:"表单",
                order:"2",
                icon:"md-clipboard",
                pathNmae:"formTab",
                list:[]
            },
            {
                name:"导航",
                order:"3",
                icon:"ios-apps",
                list:[
                    {
                        name:"导航菜单",
                        order:"3-1",
                        icon:"ios-menu",
                        pathNmae:"menu"
                    },
                    {
                        name:"Tabs标签页",
                        order:"3-2",
                        icon:"ios-menu",
                        pathNmae:"tabs"
                    },
                    {
                        name:"下拉菜单",
                        order:"3-3",
                        icon:"ios-arrow-down",
                        pathNmae:"dropDown"
                    },
                    {
                        name:"面包屑",
                        order:"3-4",
                        icon:"ios-boat",
                        pathNmae:"Crumbs"
                    }
                ]
            },
            {
                name:"视图",
                order:"4",
                icon:"ios-cafe",
                pathNmae:"",
                list:[
                    {
                        name:"Tree树形控件",
                        order:"4-1",
                        icon:"logo-apple",
                        pathNmae:"tree"
                    },
                    {
                        name:"Poptip气泡提示",
                        order:"4-2",
                        icon:"logo-apple",
                        pathNmae:"poptip"
                    },
                    {
                        name:"Notice通知提醒",
                        order:"4-3",
                        icon:"logo-apple",
                        pathNmae:"notice"
                    }
                ]
            },
        ],
        breadCrumbList: [],
        homeRoute: {},
        tagNavList: []
    },
    getters: {
        menuList: (state, getters, rootState) => getMenuByRouter(router.options.routes),
    },
    mutations:{
        setBreadCrumb(state, route){
            state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
        },
        setHomeRoute (state, routes) {
            state.homeRoute = getHomeRoute(routes, homeName)
        },
        setTagNavList (state, list) {
            let tagList = []
            if (list) {
                tagList = [...list]
            } else tagList = getTagNavListFromLocalstorage() || []
            if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
            let homeTagIndex = tagList.findIndex(item => item.name === homeName)
            if (homeTagIndex > 0) {
                let homeTag = tagList.splice(homeTagIndex, 1)[0]
                tagList.unshift(homeTag)
            }
            state.tagNavList = tagList
            setTagNavListInLocalstorage([...tagList])
        },
        closeTag (state, route) {
            let tag = state.tagNavList.filter(item => routeEqual(item, route))
            route = tag[0] ? tag[0] : null
            if (!route) return
            closePage(state, route)
        },
        addTag (state, { route, type = 'unshift' }) {
            let router = getRouteTitleHandled(route)
            if (!routeHasExist(state.tagNavList, router)) {
                if (type === 'push') state.tagNavList.push(router)
                else {
                if (router.name === homeName) state.tagNavList.unshift(router)
                else state.tagNavList.splice(1, 0, router)
                }
                setTagNavListInLocalstorage([...state.tagNavList])
            }
        }
    }
}