import MainFooter from '@/components/MainFooter'

import home from '@/pages/home/index'
import hot from '@/pages/home/hot/index'
import will from '@/pages/home/will/index'

import movie from '@/pages/movie/index'

import video from '@/pages/video/index'
import shiping from '@/pages/video/selection/index'


import user from '@/pages/user/index'

import setting from '@/pages/setting'

import login from '@/pages/login/index'
import register from '@/components/register'
import detail from '@/components/detail'

import cart from '@/pages/cart/index'
import shop from '@/pages/shop/index'
import shoppingcart from '@/pages/shoppingcart/index'
import demo from  '@/pages/demo/index'
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path:'/demo',
    component:demo
  },
  {
    path: '/home',
    name: 'home',
    components: {
      content: home,
      footer: MainFooter
    },
    children: [
      {
        path: '',
        redirect: 'hot'
      },
      {
        path: 'hot',
        component: hot
      }, {
        path: 'will',
        component: will
      }
    ]

  },
  {
    path: '/movie',
    name: 'movie',
    components: {
      content: movie,
      footer: MainFooter
    }

  },
  {
    path: '/video',
    name: 'video',
    components: {
      content: video,
      footer: MainFooter
    },
    children:[
      {
        path: '',
        redirect: 'shiping'
      },
      {
        path:"shiping",
        component:shiping
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    components: {
      content: user,
      footer: MainFooter
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/shop',
    name: 'shop',
    component: shop
  },
  {
    path: '/shoppingcart',
    name: 'shoppingcart',
    component: shoppingcart
  }
]
export default routes