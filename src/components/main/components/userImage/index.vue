<template>
  <div class="header_user">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          个人中心
          <!-- <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge> -->
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<style lang="less">
.header_user {
    float: right;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    margin-right: 50px;
}

</style>
<script>
import { mapActions } from 'vuex'
import Cookies from 'js-cookie'
export default {
    data(){
        return{
            messageUnreadCount:0,
            userAvatar:""
        }
    },
    created(){
      let userNew=JSON.parse(Cookies.get("user"));
      this.userAvatar=userNew.avatar;
    },
    methods:{
      ...mapActions([
        'handleLogOut'
      ]),
      handleClick(name){
          switch (name) {
              case 'logout': this.logout()
              break
              case 'message': this.message()
              break
          }
      },
      logout () {
          this.handleLogOut().then(() => {
              this.$router.push({
              name: 'login'
              })
          })
      },
      message () {
          // this.$router.push({
          //     name: 'message_page'
          // })
      }
    }
}
</script>

