<template>
	<div class="shoppingcart">

	  	<div class='car-body'>
		    <!--不可用小区开始-->
		    <div v-for="(item,area) in shoppingCartList" class='car-area clearfix'>
		      	<div class="area-name" :class="{'active':item.isActive}">
			        <div class='area-name-wrap'>
			          	<img :src="item.isActive?'./static/images/area_active.png':'./static/images/area.png'"/>
			          	<span>{{item.areaNm}}</span>
			        </div>
		      	</div>
		      	<div v-for="(shop,shopidx) in item.list" @click="jumpShop" :shopid="shop.shopId" 
		        :mchid="shop.mchId" :active="{'active':item.isActive}" class='car-order active clearfix'>
			        <div class='car-name'>
				        <img src="./nearby.png"/>
				        <span class='s-name'>{{shop.shopNm}}</span>
				        <span class='gt'>></span>
			        </div>
		        	<div class='car-goods-list clearfix'>

		          		<div v-for="(good,goodidx) in shop.list" class="car-container"
		          			:class="{'touch-move-active':good.isTouchMove}"
			                :index="area+'#'+shopidx+'#'+goodidx" 
			                bindtouchstart="touchstart" bindtouchmove="touchmove" >
		            		<div class="car-good" :class="{'expired':good.isExpire==0}">
		              			<!-- <img src="{{imgPre+good.goodsImgLogo}}"/> -->
		              			<img src="./good.png"/>
		              			<span class="car-good-name">{{good.goodsNm}}</span>
				              	<div class='car-good-info'>
				                	<span class='car-good-price'>￥{{good.goodsAmt?good.goodsAmt/100:0}}</span>
				                	<span class='car-good-num'>X{{good.orderNum}}</span>
				              	</div>
		            		</div>
		            		<div class="del" catchtap="del" :index="area+'#'+shopidx+'#'+goodidx">删除</div>
		          		</div>

		        	</div>
		      	</div>

		    </div>
		    <!--不可用小区结束-->
		    <div v-show="noCartShow" class="clear-invalid"
				:class="{'disbaled':!expiredId.length}">
		      	<button @click="clearInvalid">清空失效商品</button>
		    </div>
		</div>
	  	<div class='padding-100'></div>

		<div v-show="noCartFlag" class='cart-empty'>
		  	<img src='./cart-empty.png'/>
		  	<span>购物车空空如也...</span>
		</div>

		<Foot :curTable="1"></Foot>
	</div>
</template>
<script>
	import Foot from '@/components/footer/footer'
	export default{
		data(){
			return{
				shoppingCartList:[
					{
						"areaNm":"上海小区",
						"hostId":"70000030",
						"isActive":true,
						"list":[{
							"mchId":"80001850","shopId":"60002260","shopNm":"我的么么",
							"list":[{
								"crtTs":"2017-10-23 16:49:35.495628000","goodsAmt":1,"goodsImgLogo":"test",
								"goodsNm":"1","goodsNo":"5200004379","goodsSt":"1","hostId":"70000032",
								"isExpire":"1","loginId":"15316117950","mchId":80001850,
								"operator":"15316117950","orderAmt":1,"orderNum":2,"remark":"",
								"updTs":"2017-10-24 08:58:37.205081000","userId":"15316117950","isTouchMove":false
							},{
								"crtTs":"2017-10-23 16:49:36.860873000","goodsAmt":1,"goodsImgLogo":"test",
								"goodsNm":"1","goodsNo":"5200004380","goodsSt":"1","hostId":"70000032",
								"isExpire":"1","loginId":"15316117950","mchId":80001850,
								"operator":"15316117950","orderAmt":1,"orderNum":4,"remark":"",
								"updTs":"2017-10-23 17:23:11.594328000","userId":"15316117950","isTouchMove":false
							},{
								"crtTs":"2017-10-23 18:02:29.012531000","goodsAmt":4,"goodsImgLogo":"test",
								"goodsNm":"名字","goodsNo":"5200004382","goodsSt":"1","hostId":"70000030",
								"isExpire":"1","loginId":"15316117950","mchId":80001850,
								"operator":"15316117950","orderAmt":4,"orderNum":2,"remark":"",
								"updTs":"2017-10-23 18:10:57.237138000","userId":"15316117950","isTouchMove":false
							}]
						}]
					},{
						"areaNm":"一品新筑","hostId":"70000032","isActive":false,
						"list":[{
							"mchId":"80001850","shopId":"60002260","shopNm":"我的么么",
							"list":[{
								"crtTs":"2017-10-23 16:49:35.495628000","goodsAmt":1,"goodsImgLogo":"test",
								"goodsNm":"1","goodsNo":"5200004379","goodsSt":"1","hostId":"70000032",
								"isExpire":"1","loginId":"15316117950","mchId":80001850,
								"operator":"15316117950","orderAmt":1,"orderNum":2,"remark":"",
								"updTs":"2017-10-24 08:58:37.205081000","userId":"15316117950","isTouchMove":false
							},{
								"crtTs":"2017-10-23 16:49:36.860873000","goodsAmt":1,"goodsImgLogo":"test",
								"goodsNm":"1","goodsNo":"5200004380","goodsSt":"1","hostId":"70000032",
								"isExpire":"1","loginId":"15316117950","mchId":80001850,
								"operator":"15316117950","orderAmt":1,"orderNum":4,"remark":"",
								"updTs":"2017-10-23 17:23:11.594328000","userId":"15316117950","isTouchMove":false
							},{
								"crtTs":"2017-10-23 18:02:29.012531000","goodsAmt":4,"goodsImgLogo":"test",
								"goodsNm":"名字","goodsNo":"5200004382","goodsSt":"1","hostId":"70000030",
								"isExpire":"0","loginId":"15316117950","mchId":80001850,
								"operator":"15316117950","orderAmt":4,"orderNum":2,"remark":"",
								"updTs":"2017-10-23 18:10:57.237138000","userId":"15316117950","isTouchMove":false
							}]
						}]
					}
				],
				backTopIconShowFlag: false,
    			scrollTop: 0, 
    			startX:0,
			    startY:0,
			    //测试左滑删除end,
			    expiredId:'',
			    jumpFlag:true,
			    clickable: true,//是否可点击，用于防止连续点击 
			    imgPre: 'https://static.fuiou.com/',
			    noCartFlag:false,
			    netDisconnectFlag:false
			}
		},
		components:{
			Foot
		},
		computed:{
			noCartShow:function(){
				if(this.shoppingCartList.length>0 && this.expiredId.length>0){
					return true;
				}else{
					return false;
				}
			}
		},
		methods:{
			clearInvalid:function(){
				//清空失效商品
			},
			jumpShop:function(){
				//跳转店铺
			},
			getExpiredIds:function(){//获取失效商品编号 
				var _str = "";
				var _cart = this.shoppingCartList;
				for(var k1 in _cart){
					var _areas = _cart[k1].list;
					for(var k2 in _areas){
						var _shops = _areas[k2].list;
						for(var k3 in _shops){
							var _good = _shops[k3];
							if(_good.isExpire == 0){
								_str += ","+_good.goodsNo;
							}
						}
					}
				}
				_str = _str.substring(1);
				this.expiredId = _str;
			}
		},
		created:function(){
			this.getExpiredIds();
		}
	}
</script>
<style scoped>
	.padding-100{
		width:100%;
		height:1.2rem;
	}
	.car-area{
	  margin-top:.30rem;
	  width:100%;
	}
	.area-name{
	  width:100%;
	  height:.88rem;
	  background:#fff;
	  border-top:1px solid #e5e5e5;
	}
	.area-name-wrap{
	  float:left;
	  position:relative;
	  left:50%;
	}
	.area-name img{
	  position:relative;
	  right:50%;
	  float:left;
	  margin-top:.26rem;
	  margin-right:.14rem;
	  width:.30rem;
	  height:.37rem;
	}
	.area-name span{
	  position:relative;
	  right:50%;
	  float:left;
	  height:.88rem;
	  line-height:.88rem;
	  font-size:.28rem;
	  color:#000;
	}
	.area-name.active span{
	  color:#24affd;
	}
	/*car-order*/
	.car-order{
	  background:#f2f2f2;
	}
	.car-name{
	  float:left;
	  width:100%;
	  height:.88rem;
	  border-top:1px solid #e5e5e5;
	  border-bottom:1px solid #e5e5e5;
	}
	.car-name img{
	  float:left;
	  margin:.25rem .10rem 0 .30rem;
	  width:.45rem;
	  height:.45rem;
	}
	.car-name span{
	  float:left;
	  height:.88rem;
	  font-size:.30rem;
	  line-height:.88rem;
	}
	.car-name span.s-name{
	  color:#333;
	}
	.car-name span.gt{
	  margin-left:.15rem;
	  color:#9f9f9f;
	}
	.car-name span.order-success{
	  margin-right:.30rem;
	  float:right;
	  color:#3fb8fc;
	}

	.car-goods-list{
	  float:left;
	  background:#fff;
	}
	.car-goods-list .car-good{
	  width:100%;
	  height:1.96rem;
	  /*为测试左滑删除新加 begin*/
	  margin-right:0;
	  -webkit-transition: all 0.4s;
	  transition: all 0.4s;
	  -webkit-transform: translateX(1.80rem);
	  transform: translateX(1.80rem);
	  margin-left: -1.80rem
	}
	.car-container{
	  font-size: .30rem;
	  display: flex;
	  justify-content: space-between;
	  width: 100%;
	  overflow: hidden;
	  border-bottom:2px solid #e5e7e2;
	}
	.del {
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  background-color: orangered;
	  width: 1.80rem;
	  height:1.96rem;
	  display: flex;
	  color: #fff;
	  letter-spacing: .10rem;
	  -webkit-transform: translateX(1.80rem);
	  transform: translateX(1.80rem);
	  -webkit-transition: all 0.4s;
	  transition: all 0.4s;
	}
	.touch-move-active .car-good,
	.touch-move-active .del{
	  -webkit-transform: translateX(0);
	  transform: translateX(0);
	}
	/*为测试左滑删除新加 end*/

	.car-goods-list .car-good img{
	  float:left;
	  margin-top:.22rem;
	  margin-left:.28rem;
	  width:1.45rem;
	  height:1.45rem;
	  border-radius:.10rem;
	  border:2px solid #e5e7e2;
	}
	.car-goods-list .car-good .car-good-name{
	  float:left;
	  padding-left:.20rem;
	  margin-top:.22rem;
	  width:4.20rem;
	  height:1.74rem;
	  font-size:.30rem;
	  line-height:.40rem;
	  color:#000;
	  font-weight:bold;
	}
	.car-goods-list .car-good.expired .car-good-name{
	  color:rgba(0,0,0,.5);
	}
	.car-good-info{
	  float:right;
	  margin-right:.10rem;
	  width:1.20rem;
	}
	.car-good-info .car-good-price{
	  display:block;
	  margin-top:.22rem;
	  height:.40rem;
	  width:1.20rem;
	  text-align:center;
	  line-height:.40rem;
	  font-size:.30rem;
	  font-weight:bold;
	  color:#fa3e2d;
	}
	.car-good.expired .car-good-info .car-good-price{
	  color:rgba(250,62,45,.5);
	}
	.car-good-info .car-good-num{
	  margin-top:.60rem;
	  display:block;
	  width:1.20rem;
	  text-align:center;
	  font-size:.26rem;
	  color:#333;
	}
	.car-good.expired .car-good-info .car-good-num{
	  color:rgba(51,51,51,.5);
	}
	.clear-invalid{
	  margin-top:.30rem;
	  padding-top:.30rem;
	  width:100%;
	  height:1.14rem;
	  background:#fff;
	}
	.clear-invalid.disbaled button{
	  background:rgba(15,168,255,.5);
	}
	.clear-invalid button{
	  margin:0 auto;
	  width:94%;
	  height:.80rem;
	  text-align:center;
	  color:#fff;
	  font-size:.30rem;
	  line-height:.80rem;
	  border-radius:.10rem;
	  background:#0fa8ff;
	}
	.clearfix:after{
	  clear:both;
	  content:'';
	  display:block;
	  visibility:hidden;
	  width:0;
	  height:0;
	}
	/*购物车为空*/
	.cart-empty{
	  margin-top:3.00rem;
	  width:100%;
	}
	.cart-empty img,
	.cart-empty span{
	  display:block;
	  margin:.20rem auto 0;
	}
	.cart-empty img{
	  width:2.00rem;
	  height:1.90rem;
	}
	.cart-empty span{
	  width:100%;
	  height:.50rem;
	  text-align:center;
	  line-height:.50rem;
	  font-size:.40rem;
	  color:#ccc;
	}
</style>