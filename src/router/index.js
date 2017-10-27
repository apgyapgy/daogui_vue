import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Front from '@/components/Front/Front'
import Index from '@/components/Index/Index'
import ShoppingCart from '@/components/shoppingCart/shoppingCart'
import Order from '@/components/order/order'
import My from '@/components/my/my'
import Shop from '@/components/shop/shop'
import Coupon from '@/components/coupon/coupon'
import CheckOrder from '@/components/checkOrder/checkOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Front',
      component: Front,
      meta:{
      	title:'到柜'
      }
    },{
    	path:'/front',
    	name:'Front',
    	component:Front,
    	meta:{
    		title:'到柜'
    	}
    },{
    	path:'/index',
    	name:'Index',
    	component:Index,
    	meta:{
    		title:'首页'
    	}
    },{
    	path:'/cart',
    	name:'Cart',
    	component:ShoppingCart,
    	meta:{
    		title:'购物车'
    	}
    },{
    	path:'/order',
    	name:'Order',
    	component:Order,
    	meta:{
    		title:'我的订单'
    	}
    },{
    	path:'/my',
    	name:'My',
    	component:My,
    	meta:{
    		title:'我的'
    	}
    },{
    	path:'/shop',
    	name:'Shop',
    	component:Shop,
    	meta:{
    		title:'收件宝商圈'
    	}
    },{
    	path:'/coupon',
    	name:'Coupon',
    	component:Coupon,
    	meta:{
    		title:'我的优惠券'
    	}
    },{
        path:'/checkOrder',
        name:'CheckOrder',
        component:CheckOrder,
        meta:{
            title:'确认订单'
        }
    }
  ]
})
