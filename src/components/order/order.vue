<template>
	<div class="order">
		<div class="order-head">
		    <div @click="changeTab(0)" class="not-used " :class="activeTab==0?'active':''">待付款</div>
		    <div @click="changeTab(1)" class="used" :class="activeTab==1?'active':''">待配送</div>
		    <div @click="changeTab(2)" class="expired" :class="activeTab==2?'active':''">待取货</div> 
		    <div @click="changeTab(3)" class="expired" :class="activeTab==3?'active':''">已完成</div> 
		</div>
  		<!--padding-->
  		<div class='padding-20'></div>

  		<!--order body-->
	  	<div v-if="orderList.length>0" class='order-body'>
		    <div v-for="item in orderList" class='shop-order clearfix'>

		      	<div class='shop-name'>
		        	<img src="./nearby.png"/>
		        	<span class='s-name'>{{item.shopNm}}</span>
		        	<span class='gt'>></span>
		        	<span v-show="activeTab==0 || activeTab==2" class='order-success'>{{activeTab==3?'交易完成':'待配送'}}</span>
		      	</div>

		      	<div class='shop-goods-list clearfix'>
			        <div v-for="good in item.orderGoods" class='shop-good'>
			          	<!--<img :src="imgPre+good.goodsImgLogo"/>-->
			          	<img src="./good.png"/>
			          	<span class="shop-good-name">{{good.goodsNm}}</span>
			          	<div class='shop-good-info'>
			            	<span class='shop-good-price'>￥{{good.goodsAmt?good.goodsAmt/100:0}}</span>
			            	<span class='shop-good-num'>X{{good.orderNum}}</span>
			          	</div>
			        </div>
		      	</div>

		      	<div v-if="item.couponAmt>0" class='shop-order-info'>
		        	<div class='shop-order-coupon-used'>{{item.couponAmt>0?'已使用:满'+item.couponAmtMin/100+'减'+item.couponAmt/100:'未使用优惠券'}}</div>
		      	</div>
		      	<div class='shop-order-info'>
		        	<div class='shop-order-price'>共{{item.goodsNum}}件商品，实际支付￥<span>{{item.orderAmt/100}}</span>
		        	(配送费：{{item.distAmt/100}}元)</div>
		      	</div>
		    </div>
	  	</div>
  		<div v-else class="no-order">
    		<span>你还没有相关订单哦</span>
  		</div>
  		<div class='padding-100'></div>

		<div v-if="showPayModel" class='pay-info-wrapper'>
		  	<div class="pay-info">
			    <div bindtap="closePayModel" class='close'>X</div>
			    <div class='pay-info-title'>支付</div>
			    <div class='pay-info-body'>
			      	<div class='pay-info-company'>上海富友电子商务有限公司</div>
			      	<div class='pay-info-money'>500</div>
			    </div>
			    <div class='pay-info-pay'>
			      	<span bindtap="topay" class="topay" :class="{'disabled':!clickable}">确认支付</span>
			    </div>
		  	</div>
		</div>
		<Foot :curTable="2"></Foot>
	</div>
</template>
<script>
	import Foot from '@/components/footer/footer'
	export default{
		data(){
			return{
				activeTab:0,
				cliclable:true,
				orderList:[],
				imgPre:'https://static.fuiou.com/',
				orderList:[
					{
						"canRefund":false,"couponAmt":0,"couponAmtYuan":"0.00","couponNo":"",
						"crtTs":"2017-10-20 13:53:23.466166000","distAmt":0,"distAmtYuan":"0.00",
						"goodsNum":4,"hostId":"70000030","id":"528","loginId":"15316117950",
						"mchId":80001850,"mchNm":"么么","openId":"otaoJ0feuOdupdC2wf-Nh7q2LdNw","operator":"",
						"orderAmt":400,"orderAmtOrg":400,"orderAmtOrgYuan":"4.00","orderAmtStr":"400",
						"orderAmtYuan":"4.00","orderDt":20171020,
						"orderGoods":[
							{
								"boxNo":"","couponAmt":0,"couponAmtYuan":"0.00","couponNo":"",
								"crtTs":"2017-10-20 13:53:23.482149000","distId":159,"goodsAmt":100,
								"goodsAmtYuan":"1.00","goodsImgLogo":"test","goodsNm":"商品1",
								"goodsNo":"5200004201","hostId":"70000030","id":255,"ip":"","mchId":80001850,
								"operator":"","orderAmt":400,"orderAmtOrg":400,"orderAmtOrgYuan":"4.00",
								"orderAmtYuan":"4.00","orderDt":20171020,"orderNo":"200121710200000000218",
								"orderNum":4,"orderSt":0,"orderStDesc":"待支付 ","remark":"","shopId":60002252,
								"shopNm":"我的么么","updTs":"2017-10-20 13:53:23.482149000"
							}
						],
						"orderNo":"200121710200000000218","orderSrc":3,"orderSrcDesc":"用户小程序，线上店铺",
						"orderSt":0,"orderStDesc":"待支付 ","orderTp":1,"orderTpDesc":"线上预售","payMode":2,
						"payModeDesc":"微信小程序支付","payModeShortDesc":"微信支付","payOrderNo":"",
						"payTs":"1900-01-01 00:00:00","remark":"","shopNm":"我的么么","showCoupon":false,
						"uniNotifyUrl":"http://192.168.8.46:14630/ds-callback-notify/o2o/wx","uniOrderNo":"",
						"updTs":"2017-10-20 13:53:23.466166000","userId":""
					},
					{
						"canRefund":false,"couponAmt":0,"couponAmtYuan":"0.00","couponNo":"",
						"crtTs":"2017-10-20 13:53:23.466166000","distAmt":0,"distAmtYuan":"0.00",
						"goodsNum":4,"hostId":"70000030","id":"528","loginId":"15316117950",
						"mchId":80001850,"mchNm":"么么","openId":"otaoJ0feuOdupdC2wf-Nh7q2LdNw","operator":"",
						"orderAmt":400,"orderAmtOrg":400,"orderAmtOrgYuan":"4.00","orderAmtStr":"400",
						"orderAmtYuan":"4.00","orderDt":20171020,
						"orderGoods":[
							{
								"boxNo":"","couponAmt":0,"couponAmtYuan":"0.00","couponNo":"",
								"crtTs":"2017-10-20 13:53:23.482149000","distId":159,"goodsAmt":100,
								"goodsAmtYuan":"1.00","goodsImgLogo":"test","goodsNm":"商品1",
								"goodsNo":"5200004201","hostId":"70000030","id":255,"ip":"","mchId":80001850,
								"operator":"","orderAmt":400,"orderAmtOrg":400,"orderAmtOrgYuan":"4.00",
								"orderAmtYuan":"4.00","orderDt":20171020,"orderNo":"200121710200000000218",
								"orderNum":4,"orderSt":0,"orderStDesc":"待支付 ","remark":"","shopId":60002252,
								"shopNm":"我的么么","updTs":"2017-10-20 13:53:23.482149000"
							}
						],
						"orderNo":"200121710200000000218","orderSrc":3,"orderSrcDesc":"用户小程序，线上店铺",
						"orderSt":0,"orderStDesc":"待支付 ","orderTp":1,"orderTpDesc":"线上预售","payMode":2,
						"payModeDesc":"微信小程序支付","payModeShortDesc":"微信支付","payOrderNo":"",
						"payTs":"1900-01-01 00:00:00","remark":"","shopNm":"我的么么","showCoupon":false,
						"uniNotifyUrl":"http://192.168.8.46:14630/ds-callback-notify/o2o/wx","uniOrderNo":"",
						"updTs":"2017-10-20 13:53:23.466166000","userId":""
					}
				],
				showPayModel:false
			}
		},
		components:{
			Foot
		},
		methods:{
			changeTab:function(n){
				this.activeTab = n;
			}
		}
	}
</script>
<style scoped>
	/* pages/order/order.wxss */
	.clearfix:after{
	  clear:both;
	  content:'';
	  display:block;
	  visibility:hidden;
	  width:0;
	  height:0;
	}
	.padding-20{
		width:100%;
		height:.2rem;
	}
	.order-head{
	  display:flex;
	  width:100%;
	  border-bottom:1px solid #e5e5e5;
	  background:#fff;
	}
	.order-head div{
	  float:left;
	  flex:1;
	  height:1rem;
	  border-right:1px solid #ccc;
	  background:#fff;
	  text-align:center;
	  font-size:.3rem;
	  color:#333;
	  line-height:1rem;
	}
	.order-head div:last-child{
	  border-right:0;
	}
	.order-head div.active{
	  color:#24affd;
	  background:#f2f2f2;
	}
	/*没有订单*/
	.no-order span{
	  display:block;
	  margin-top:3rem;
	  width:100%;
	  height:.50rem;
	  line-height:.50rem;
	  font-size:.40rem;
	  color:#ccc;
	  text-align:center;
	}

	/*order body*/
	.order-body{
	  padding-bottom:.40rem;
	  background: #f2f2f2;
	}
	.shop-order{
	  background:#f2f2f2;
	}
	.shop-name{
	  float:left;
	  width:100%;
	  height:.88rem;
	  border-bottom:1px solid #e5e5e5;
	}
	.shop-order:first-of-type .shop-name{
	  border-top:1px solid #e5e5e5;
	}
	.shop-name img{
	  float:left;
	  margin:.25rem .10rem 0 .30rem;
	  width:.45rem;
	  height:.45rem;
	}
	.shop-name span{
	  float:left;
	  height:.88rem;
	  font-size:.30rem;
	  line-height:.88rem;
	}
	.shop-name span.s-name{
	  color:#333;
	}
	.shop-name span.gt{
	  margin-left:.15rem;
	  color:#9f9f9f;
	}
	.shop-name span.order-success{
	  margin-right:.30rem;
	  float:right;
	  color:#3fb8fc;
	}

	.shop-goods-list{
	  float:left;
	  width:100%;
	  background:#fff;
	}
	.shop-goods-list .shop-good{
	  width:100%;
	  height:1.96rem;
	  border-bottom:2px solid #e5e7e2;
	}
	.shop-goods-list .shop-good img{
	  float:left;
	  margin-top:.22rem;
	  margin-left:.28rem;
	  width:1.45rem;
	  height:1.45rem;
	  border-radius:.10rem;
	  border:2px solid #e5e7e2;
	}
	.shop-goods-list .shop-good .shop-good-name{
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
	.shop-good-info{
	  float:right;
	  margin-right:.10rem;
	  width:1.20rem;
	}
	.shop-good-info .shop-good-price{
	  display:block;
	  margin-top:.22rem;
	  width:1.20rem;
	  height:.40rem;
	  line-height:.40rem;
	  font-size:.30rem;
	  font-weight:bold;
	  color:#fa3e2d;
	  text-align:center;
	}
	.shop-good-info .shop-good-num{
	  margin-top:.60rem;
	  display:block;
	  width:1.20rem;
	  text-align:center;
	  font-size:.26rem;
	  color:#333;
	}

	.shop-order-info{
	  float:left;
	  width:100%;
	  height:.60rem;
	  background:#fff;
	  border-bottom:2px solid #e5e5e5;
	  font-size:.24rem;
	  line-height:.60rem;
	}
	.shop-order-info .shop-order-coupon-used{
	  margin-left:.30rem;
	  float:left;
	}
	.shop-order-info .shop-order-price{
	  float:right;
	  margin-right:.30rem;
	}
	.shop-order-price span{
	  font-size:.30rem;
	}

	.order-pay{
	  float:left;
	  width:100%;
	  height:.88rem;
	  border-bottom:2px solid #e5e5e5;
	  background:#fff;
	}
	.pay,.open-box{
	  float:right;
	  margin-top:.14rem;
	  margin-right:.30rem;
	  width:1.98rem;
	  height:.60rem;
	  line-height:.60rem;
	  color:#fff;
	  font-size:.28rem;
	  background:#0fa8ff;
	  border-radius:.10rem;
	}
	/*点击去支付的弹窗*/
	.pay-info-wrapper{
	  position:fixed;
	  left:0;
	  top:0;
	  bottom:0;
	  width:100%;
	  height:100%;
	  background:rgba(0,0,0,0.1);
	}
	.pay-info-wrapper .pay-info{
	  position:relative;
	  margin:4rem auto 0;
	  width:5rem;
	  height:3rem;
	  background:#fff;
	}
	.pay-info-wrapper .pay-info .close{
	  position:absolute;
	  top:.10rem;
	  left:.20rem;
	  width:.36rem;
	  height:.36rem;
	  border-radius:50%;
	  border:2px solid #676767;
	  font-size:.26rem;
	  text-align:center;
	  line-height:.36rem;
	  color:#676767;
	}
	.pay-info-title{
	  width:100%;
	  height:.60rem;
	  line-height:.60rem;
	  font-size:.30rem;
	  color:#333;
	  text-align:center;
	  border-bottom:1px solid #bcbcbc;
	}
	.pay-info-body{
	  width:100%;
	  height:1.40rem;
	  border-bottom:1px solid #bcbcbc;
	}
	.pay-info-body .pay-info-company,
	.pay-info-body .pay-info-money{
	  width:100%;
	  height:.70rem;
	  line-height:.70rem;
	  font-size:.30rem;
	  text-align:center;
	}
	.pay-info-body .pay-info-money{
	  line-height:.60rem;
	}
	.pay-info-pay{
	  width:100%;
	  height:1rem;
	}
	.pay-info-pay .topay{
	  display:block;
	  margin:.20rem auto;
	  width:1.80rem;
	  height:.50rem;
	  background:#26b1fe;
	  line-height:.50rem;
	  font-size:.30rem;
	  color:#fff;
	  border-radius:.05rem;
	  text-align:center;
	}
	.pay-info-pay .topay.disabled{
	  background:rgba(38,177,254,.5);
	}

</style>