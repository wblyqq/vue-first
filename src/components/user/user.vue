<template>
  <div class="user">
    <form class="container" @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email" placeholder="Email" v-model="user.email"/>
      </div>
        <div class="form-group">
        <label for="password">password</label>
        <input type="password" class="form-control" id="password" placeholder="password" v-model="user.password"/>
      </div>
      <input type="submit" class="btn btn-primary btn-lg btn-block" value="登陆">
    </form>
    <button @click="logout">退出</button>
    <div><p>{{showUser}}</p></div>
    <button @click="vueSetUser">设置</button>
  </div>
</template>

<script>
import types from '../../store/types'
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      token: ''
    }
  },
  computed: mapGetters([
    'showUser'
  ]),
  mounted() {
    this.$store.commit(types.TITLE, 'Login')
    console.log(this)
  },
  methods: {
    login() {
      if (this.token) {
        this.$store.commit(types.LOGIN, this.token)
        let redirect = decodeURIComponent(this.$route.query.redirect || '/')
        this.$router.push({
          path: redirect
        })
      } else {
        var that = this
        axios.get('/api/login').then(resp => {
          // eslint-disable-next-line camelcase
          let check_data = resp.data.data
          if (that.user.email === check_data.email && that.user.password === check_data.password) {
            this.$store.commit(types.LOGIN, check_data)
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            } else {
              this.$router.push('/rank')
            }
          } else {
            return false
          }
        })
      }
    },
    logout() {
      this.$store.commit(types.LOGOUT, this.token)
      this.$router.push('/rank')
    },
    vueSetUser() {
      alert(111)
      mapActions(['setUser'])
    }
  }
}
/*
this.$router 和 this.$route对象的区别
this.$route是当前路由跳转对象，包含当前路由的name,path,query,params属性
this.$router 是路由当导航对象，使用它跳转到其他不同url地址
 */
</script>
<style scoped  rel="stylesheet/scss" type="text/css">

</style>
