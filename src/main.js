// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import '@/assets/css/Reset.css'
import 'iview/dist/styles/iview.css';
import {
  Row,
  Col,
  Button, 
  Table, 
  Icon, 
  Layout, 
  Sider, 
  Menu, 
  MenuItem, 
  Submenu, 
  Tooltip, 
  Poptip, 
  Breadcrumb, 
  BreadcrumbItem, 
  Dropdown, Badge, 
  Avatar, 
  DropdownMenu, 
  DropdownItem, 
  Tag,
  Card,
  Form,
  FormItem,
  Input,
  Spin,
  Page 
} from 'iview';
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Icon', Icon);
Vue.component('Layout', Layout);
Vue.component('Sider', Sider);
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('Submenu', Submenu);
Vue.component('Tooltip', Tooltip);
Vue.component('Poptip', Poptip);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.component('Dropdown', Dropdown);

Vue.component('Badge', Badge);
Vue.component('Avatar', Avatar);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Tag', Tag);
Vue.component('Card', Card);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Input', Input);
Vue.component('Spin', Spin);
Vue.component('Page', Page);
Vue.config.productionTip = false

import { getRequest } from '@/api/api.js'
import { postRequest } from '@/api/api.js'
import { deleteRequest } from '@/api/api.js'
import { putRequest } from '@/api/api.js'
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
