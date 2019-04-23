<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <LoginForm @on-success-valid="handleSubmit"></LoginForm>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
    <Spin fix v-if="spinShow">
        <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
            </svg>
        </div>
    </Spin>
    <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
  </div>
</template>
<style lang="less">
  .login{
    width: 100%;
    height: 100%;
    background-image: url('./../../assets/image/login-bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}
</style>
<script>
import LoginForm from './loginForm/loginForm'
import { mapActions } from 'vuex'
export default {
    data(){
        return{
            spinShow:false
        }
    },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.spinShow=true;
      this.handleLogin({ userName, password }).then(res => {
          this.spinShow=false;
        this.getUserInfo().then(res => {
            this.$router.push({
                name: "home"
            })
        })
      })
    }
  }
}
</script>
