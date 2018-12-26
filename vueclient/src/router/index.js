import Vue from 'vue'
import Router from 'vue-router'
import Chatroom from '@/components/Chatroom'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Game from '@/components/GameHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    }, {
      path: "/chatroom",
      name: "chatroom",
      component: Chatroom
    }
  ]
})
