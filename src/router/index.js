import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import iView from 'iview'
import store from '@/store/index'
import Main from './../components/main/main'
import { setToken, getToken, setTitle } from '@/libs/util'
/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
const LOGIN_PAGE_NAME = 'login';
const HOME_NAME= 'home';

const routers=new Router({
    // mode: 'history',
    routes: [
      {
        path: '/login',
        name: 'login',
        meta: {
          title: 'Login - 登录',
          hideInMenu: true
        },
        component: () => import('@/components/login/login.vue')
      },
      {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Main,
        meta: {
          hideInMenu: true,
          notCache: true
        },
        children: [
          {
            path: '/home',
            name: 'home',
            meta: {
              hideInMenu: true,
              title: '首页',
              notCache: true,
              icon: 'md-home'
            },
            component: () => import('@/view/home/home')
          }
        ]
      },
      {
        path:"/table",
        name:"table",
        component:Main,
        meta: {
          icon: 'ios-cut-outline',
          title: '表格'
        },
        children: [
          {
            path: 'simple',
            name: 'simple',
            meta: {
              icon: 'ios-apps',
              title: '简单表格'
            },
            component: () => import('@/view/table/jiandan.vue')
          },
          {
            path: 'fixed',
            name: 'fixed',
            meta: {
              icon: 'ios-apps-outline',
              title: '固定表格'
            },
            component: () => import('@/view/table/guding.vue')
          },
          {
            path: 'given',
            name: 'given',
            meta: {
              icon: 'md-analytics',
              title: '自定义样式'
            },
            component: () => import('@/view/table/teding.vue')
          },
          {
            path: 'Choice',
            name: 'Choice',
            meta: {
              icon: 'md-alarm',
              title: '单选/多选'
            },
            component: () => import('@/view/table/xuanze.vue')
          },
          {
            path: 'sort',
            name: 'sort',
            meta: {
              icon: 'logo-android',
              title: '排序'
            },
            component: () => import('@/view/table/paixu.vue')
          },
          {
            path: 'custom',
            name: 'custom',
            meta: {
              icon: 'md-construct',
              title: '自定义'
            },
            component: () => import('@/view/table/zidingyi.vue')
          }
        ]
      },
      {
        path:"/form",
        name:"form",
        component:Main,
        meta: {
          hideInBread: true
        },
        children: [
          {
            path: 'formTab',
            name: 'formTab',
            meta: {
              icon: 'ios-cube',
              title: '表单列表'
            },
            component: () => import('@/view/form/form.vue')
          }
        ]
      },
      {
        path:"/navigation",
        name:"navigation",
        meta: {
          icon: 'logo-buffer',
          title: '导航'
        },
        component:Main,
        children: [
          {
            path: 'menu',
            name: 'menu',
            meta: {
              icon: 'md-arrow-dropdown-circle',
              title: '导航菜单'
            },
            component: () => import('@/view/navigation/menu.vue')
          },
          {
            path: 'tabs',
            name: 'tabs',
            meta: {
              icon: 'md-arrow-dropdown-circle',
              title: '标签页'
            },
            component: () => import('@/view/navigation/tabs.vue')
          },
          {
            path: 'dropDown',
            name: 'dropDown',
            meta: {
              icon: 'md-arrow-dropdown-circle',
              title: '下拉菜单'
            },
            component: () => import('@/view/navigation/dropDown.vue')
          },
          {
            path: 'Crumbs',
            name: 'Crumbs',
            meta: {
              icon: 'md-arrow-dropdown-circle',
              title: '面包屑'
            },
            component: () => import('@/view/navigation/Crumbs.vue')
          }
        ]
      },
      {
        path:"/view",
        name:"view",
        meta: {
          icon: 'logo-buffer',
          title: '视图'
        },
        component:Main,
        children: [
          {
            path: 'tree',
            name: 'tree',
            meta: {
              icon: 'logo-buffer',
              title: '树形图'
            },
            component: () => import('@/view/view/tree.vue')
          },
          {
            path: 'poptip',
            name: 'poptip',
            meta: {
              icon: 'logo-buffer',
              title: '文字提示'
            },
            component: () => import('@/view/view/poptip.vue')
          },
          {
            path: 'notice',
            name: 'notice',
            meta: {
              icon: 'logo-buffer',
              title: '通知提醒'
            },
            component: () => import('@/view/view/notice.vue')
          }
        ]
      }
    ]
  });

routers.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: HOME_NAME // 跳转到homeName页
    })
  } else {
    if (store.state.user.hasGetInfo) {
      next();
      // turnTo(to, store.state.user.access, next)
    } else {
      next();
      // store.dispatch('getUserInfo').then(user => {
      //   // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
      //   turnTo(to, user.access, next)
      // }).catch(() => {
      //   setToken('')
      //   next({
      //     name: 'login'
      //   })
      // })
    }
  }
})

routers.afterEach(to => {
  setTitle(to, routers.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
export default routers;
