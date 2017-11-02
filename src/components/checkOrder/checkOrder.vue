<template>
	<div class="checkOrder">
		
		
	  	<div class="order-head">
	    	<div @click.stop="showArea" class='order-area'>
	      		<img src="./area_active.png"/>
	      		<span>{{shop.areaNm?shop.areaNm+' >>':''}}</span>
	    	</div>
	    	<div class='order-phone'>手机：{{loginId}}</div>
	    	<div @click.stop="showArea" class='order-cloth'>布放地：{{shop.hostAddrShort}}</div>
	  	</div>
		
	  	<div class="order-wrapper clearfix">
		    <div class='order-goods-list clearfix'>
		      	<div v-for="item in goods" class='order-good'>
	        		<img :src="imgPre+item.goodsImgLogo"/>
	        		<div class='order-good-right'>
		          		<span class="order-good-name">{{item.goodsNm}}</span>
		          		<div class='order-good-info'>
		            		<span class='order-good-price'>￥{{item.goodsAmt?item.goodsAmt/100:0}}</span>
		            		<span class='order-good-num'>X{{item.orderNum}}</span>
		          		</div>
	        		</div>
		      	</div>
		    </div>
		    <div class='arrive-time'>预计到达时间：{{popHopeTs}}</div>
		    <div @clcik.stop="showCoupon" class='discount'>
		      	<span>商家优惠</span>
		      	<div v-show="couponsList.length>0" class='discount-price'>
		      		{{couponAmt?-couponAmt/100:0}}元<span>></span>
		      	</div>
		      	<div v-show="couponsList.length<=0" class='discount-price disabled'>暂无优惠券</div>
		    </div>
	  	</div>
	  	<div class='padding-120'></div>

		<!--去结算-->
		<div class='car-bar'>
		  	<div class='car-money'>
		    	<span class='delivery-money'>配送费:{{goods[0].distAmt?goods[0].distAmt/100:0}}元</span>
		    	<span class='car-total-money'>实际支付金额:<span>{{(payPrice-couponAmt)>0?(payPrice-couponAmt)/100:0}}</span>元</span>
		  	</div>
		  	<div @click.stop="topay" class="to-pay" :class="{'active':isPayAble&&isOrderGetted}">去结算</div>
		</div>

		<!--优惠券-->
		<div @click.stop="hideCoupon" v-show="couponShowFlag" class="order-coupon clearfix">
		  	<div @click.stop="selectCoupon(idx)" v-for="(item,idx) in couponsList" class='coupon'>
			    <div class="coupon-left">
			      	<div class="select" :class="{'active':item.select}">
			        	<img src="./success.png"/>
			      	</div>
			      	<div class="coupon-price">￥{{item.couponAmt?item.couponAmt/100:0}}</div>
			      	<div class='coupon-condition'>满{{item.couponAmtMin?item.couponAmtMin/100:0}}元使用</div>
			      	<div class="coupon-vld">有效期到:{{item.expireDt}}</div>
			    </div>
			    <div class="coupon-right">
			      	<div class='coupon-name'>{{item.couponNm}}</div>
			    </div>
		  	</div>
		</div>

		<!--布放地-->
		<div @click.stop="hideArea" v-show="areaShowFlag" class="order-shop clearfix">
		  	<div @click.stop="selectShop(id)"  v-for="(item,id) in shopHost"  class='shop'>
			    <div class="select" :class="{'active':item.select}">
			      	<img src="./success.png"/>
			    </div>
			    <div class='shop-name'>{{item.areaNm}}</div>
		  	</div>
		</div>

		<div v-show="showPayModel" class='pay-info-wrapper'>
		  	<div class="pay-info">
		    	<div @click="closePayModel" class='close'>X</div>
		    	<div class='pay-info-title'>支付</div>
		    	<div class='pay-info-body'>
		      		<div class='pay-info-company'>上海富友电子商务有限公司</div>
		      		<div class='pay-info-money'>￥{{(payPrice-couponAmt)>0?(payPrice-couponAmt)/100:0}}</div>
		    	</div>
		    	<div class='pay-info-pay'>
		      		<span @click.stop="topay" class="pay" :class="{'disabled':!clickable}">确认支付</span>
		    	</div>
		  	</div>
		</div>


	</div>
</template>

<script>
	export default{
		data(){
			return{
				scrollTop: 0,
			    couponShowFlag: false,//是否显示优惠券们
			    couponsList: [],//优惠券列表 
			    isPayAble:true,//判断是否可支付，用来决定去结算按钮状态 
			    showPayModel:false,//是否显示支付信息弹窗 
			    payPrice:3706,//支付的价格，未减去优惠券价格
			    couponAmt:0,//优惠券价格
			    couponNo:'',//已选 中的优惠券id
			    options:[],//页面参数
			    shop:[],//店铺信息
			    goods:[
				    {
			    		"crtTs":"2017-10-25 17:42:23.319579000","distAmt":100,"goodsAmt":1,
			    		"goodsImgLogo":"/sys/o2o2/2017/10/25/1508926287836.jpeg","goodsNm":"no1",
			    		"goodsNo":"5200000405","goodsNum":215,"hostId":"60262872","loginId":"15316117950",
			    		"mchId":80000195,"operator":"15316117950","orderAmt":1,"orderNum":4,"remark":"",
			    		"shopNm":"凯莉","updTs":"2017-10-25 21:31:52.460765000","userId":"15316117950"
			    	},{
			    		"crtTs":"2017-10-25 21:31:57.557974000","distAmt":100,"goodsAmt":1200,
			    		"goodsImgLogo":"non","goodsNm":"范冰冰被","goodsNo":"5200000410","goodsNum":27,
			    		"hostId":"60255406","loginId":"15316117950","mchId":80000195,"operator":"15316117950",
			    		"orderAmt":1200,"orderNum":3,"remark":"","shopNm":"凯莉","updTs":"2017-10-25 21:37:35.167500000","userId":"15316117950"
			    	},{
			    		"crtTs":"2017-10-25 21:37:27.748821000","distAmt":100,"goodsAmt":1,
			    		"goodsImgLogo":"/sys/o2o2/2017/10/25/1508939203335.jpeg",
			    		"goodsNm":"%253F%253F%253F%253F%253F%253F","goodsNo":"5200000426","goodsNum":23,
			    		"hostId":"60255406","loginId":"15316117950","mchId":80000195,"operator":"15316117950",
			    		"orderAmt":1,"orderNum":2,"remark":"","shopNm":"凯莉","updTs":"2017-10-26 09:25:32.912999000","userId":"15316117950"
			    	}
		    	],//订单商品
			    popHopeTs:"2017-10-28 18:00:00",
			    clickable:true,
			    payData: {},
			    isOrderGetted:false,  //判断订单信息有没有获取 
			    netDisconnectFlag: false,
			    shopHost:[
		    		{"areaNm":"富友508","bmapLat":"31.228531601501","bmapLng":"121.56106616894","cellCd":"A100000003","hostAddrShort":"508靠机房房间门口","hostId":"60255406"},
		    		{"areaNm":"富友508","bmapLat":"31.228541601501","bmapLng":"121.56106716894","cellCd":"A100000003","hostAddrShort":"富友502走道","hostId":"60261864"},
		    		{"areaNm":"天安花园-2","bmapLat":"31.230076","bmapLng":"121.561412","cellCd":"A100014243","hostAddrShort":"35号负一层","hostId":"60262872"},
		    		{"areaNm":"联洋花园3期中邦风雅颂","bmapLat":"31.233874","bmapLng":"121.562225","cellCd":"A100011953","hostAddrShort":"联洋花园物业管理处旁边","hostId":"60270932"},
		    		{"areaNm":"水清木华","bmapLat":"31.232143","bmapLng":"121.567906","cellCd":"A100012204","hostAddrShort":"28号楼架空层物业处","hostId":"60270963"},
		    		{"areaNm":"上海浦东世纪花园一期","bmapLat":"31.21724","bmapLng":"121.562609","cellCd":"A100012305","hostAddrShort":"梅花路通道","hostId":"60271075"},
		    		{"areaNm":"四季全景台花苑","bmapLat":"31.216906","bmapLng":"121.560042","cellCd":"A100008471","hostAddrShort":"物业大厅左侧走廊","hostId":"60266768"},
		    		{"areaNm":"建华新苑","bmapLat":"31.216762","bmapLng":"121.56084","cellCd":"A100009292","hostAddrShort":"大门进门右侧","hostId":"60269440"},
		    		{"areaNm":"陆家嘴中央公寓","bmapLat":"31.220737","bmapLng":"121.548428","cellCd":"A100002662","hostAddrShort":"17号架空层","hostId":"60255341"},
		    		{"areaNm":"精致小家","bmapLat":"31.210473","bmapLng":"121.555424","cellCd":"A100028220","hostAddrShort":"精致小家一楼大厅","hostId":"60266750"},
		    		{"areaNm":"锦绣苑","bmapLat":"31.210183","bmapLng":"121.549624","cellCd":"A100009291","hostAddrShort":"大门右侧门洞","hostId":"60269456"},
		    		{"areaNm":"新都花园二期","bmapLat":"31.218501","bmapLng":"121.539049","cellCd":"A100010046","hostAddrShort":"3号楼地下室2号","hostId":"60267260"},
		    		{"areaNm":"新都花园一期","bmapLat":"31.218362","bmapLng":"121.538444","cellCd":"A100010045","hostAddrShort":"3号楼地下室1号柜","hostId":"60267200"},
		    		{"areaNm":"名门河滨花园","bmapLat":"31.250998","bmapLng":"121.557341","cellCd":"A100005388","hostAddrShort":"物业办公室旁边通道","hostId":"60261289"},
		    		{"areaNm":"名门世家一期","bmapLat":"31.252015","bmapLng":"121.559675","cellCd":"A100008135","hostAddrShort":"大门进口右侧","hostId":"60266773"},
		    		{"areaNm":"中福公寓二号楼","bmapLat":"31.205351","bmapLng":"121.541813","cellCd":"A100004688","hostAddrShort":"2号楼大厅","hostId":"60266791"},
		    		{"areaNm":"中福公寓小区","bmapLat":"31.204677","bmapLng":"121.541634","cellCd":"A100001123","hostAddrShort":"物业办公室一楼大厅","hostId":"60256515"},
		    		{"areaNm":"繁荣昌盛D区","bmapLat":"31.234432","bmapLng":"121.527655","cellCd":"A100002005","hostAddrShort":"10号楼大厅","hostId":"60258717"},
		    		{"areaNm":"繁荣昌盛C区","bmapLat":"31.232518","bmapLng":"121.526914","cellCd":"A100002004","hostAddrShort":"C区9号楼大厅","hostId":"60258706"},
		    		{"areaNm":"繁荣昌盛A区","bmapLat":"31.234216","bmapLng":"121.52669","cellCd":"A100002002","hostAddrShort":"4号楼大厅","hostId":"60258714"},
		    		{"areaNm":"繁荣昌盛B区","bmapLat":"31.234216","bmapLng":"121.52669","cellCd":"A100002003","hostAddrShort":"繁荣昌盛B区7号大厅","hostId":"60258704"},
		    		{"areaNm":"澳丽花苑","bmapLat":"31.212605","bmapLng":"121.525616","cellCd":"A100015673","hostAddrShort":"十号楼一号柜","hostId":"60256701"},
		    		{"areaNm":"澳丽花苑","bmapLat":"31.212605","bmapLng":"121.525616","cellCd":"A100015673","hostAddrShort":"南区十号楼二号柜","hostId":"60266755"}
	    		],//所有可选择小区
			    areaShowFlag:false,  //判断布放地要不要显示 
			    hostId:'',
			    loginId:'',
			    imgPre:'https://static.fuiou.com/',
			    loginId:'15316117950'
			}
		},
		methods:{
			selectCoupon:function(_id){//选择优惠券
			},
			hideArea:function(){
				this.data.areaShowFlag = false;
			},
			showArea:function(){
				this.data.areaShowFlag = true;
			},
			selectShop:function(_id){//选择小区
			},
			closePayModel:function(){
				this.showPayModel = false;
			},
			hideCoupon:function(){//隐藏优惠券
				this.couponShowFlag = false;
			},
			showCoupon:function(){
				this.couponShowFlag = true;
			},
			topay:function(){
				//去结算
			}
		}
	}
</script>

<style scoped>
	/* pages/checkOrder/checkOrder.wxss */
	.clearfix::after {
		clear:both;
		content:'';
		display:block;
		visibility:hidden;
		width:0;
		height:0;
	}
	.padding-120{
		width:100%;
		height:1.2rem;
	}
	/*顶部订单信息*/
	.order-head{
	  padding-top:.26rem;
	  padding-bottom:.35rem;
	  width:100%;
	  height:2.60rem;
	  background:#f2f2f2;
	  border-top:1px solid #e5e5e5;
	  text-align:left;
	}
	.order-head .order-area,
	.order-head .order-cloth,
	.order-head .order-phone{
	  height:.87rem;
	  line-height:.87rem;
	  border-bottom:1px solid #e5e5e5;
	  background:#fff;
	}
	.order-head .order-area img{
	  float:left;
	  margin-top:.28rem;
	  margin-left:.30rem;
	  margin-right:.12rem;
	  width:.30rem;
	  height:.30rem;
	}
	.order-head .order-area span{
	  float:left;
	  height:.87rem;
	  line-height:.87rem;
	  font-size:.30rem;
	}
	.order-head .order-cloth,
	.order-head .order-phone{
	  padding-left:.70rem;
	  font-size:.26rem;
	  overflow:hidden;
	}

	/*底部购物车*/
	.car-bar{
	  position:fixed;
	  left:0;
	  bottom:0;
	  width:100%;
	  height:.86rem;
	  border-top:1px solid #eee;
	  background:#fff;
	}
	.car-icon{
	  position:absolute;
	  left:.20rem;
	  top:-.10rem;
	  width:.90rem;
	  height:.90rem;
	  background:#999;
	  text-align:center;
	  border-radius:50%;
	  box-shadow: rgba(0,0,0,0.2) 0 -1px 10px;
	}
	.car-icon img{
	  display:inline-block;
	  margin-top:.20rem;
	  width:.56rem;
	  height:.56rem;
	}
	.car-icon.active{
	  background:#26b1fe;
	}
	.car-info-wrapper .car-icon{
	  top:-1.00rem;
	}
	.car-money{
	  margin-left:.30rem;
	  float:left;
	  width:4.40rem;
	}
	.car-money .car-total-money,
	.car-money .delivery-money{
	  display:block;
	  color:#000;
	}
	.car-money .car-total-money span{
	  color:#f33;
	}
	.car-money .car-total-money{
	  height:.40rem;
	  line-height:.40rem;
	  font-size:.30rem;
	  font-weight:bold;
	}
	.car-money .delivery-money{
	  margin-top:.10rem;
	  height:.34rem;
	  line-height:.34rem;
	  font-size:.24rem;
	}
	.to-pay.active{
	  background:#26b1fe;
	}
	.to-pay{ 
	  float:right;
	  width:1.90rem;
	  height:.86rem;
	  line-height:.86rem;
	  text-align:center;
	  font-size:.30rem;
	  font-weight:bold;
	  color:#fff;
	  background:#999;
	}
	/*order-wrappper*/
	.order-wrapper{
	  background:#fff;
	}
	/*订单商品列表*/
	.order-goods-list{
	  float:left;
	  background:#fff;
	}
	/*商品*/
	.order-goods-list .order-good{
	  width:100%;
	  height:1.96rem;
	  border-top:2px solid #e5e7e2;
	}
	.order-good .order-good-right{
	  float:left;
	  width:5.40rem;
	}
	.order-good img{
	  float:left;
	  margin-top:.22rem;
	  margin-left:.15rem;
	  margin-right:.20rem;
	  width:1.45rem;
	  height:1.45rem;
	  border-radius:.10rem;
	  border:2px solid #e5e7e2;
	}
	.order-good-right .order-good-name{
	  float:left;
	  margin-top:.22rem;
	  width:4.90rem;
	  height:.80rem;
	  font-size:.30rem;
	  line-height:.40rem;
	  color:#000;
	  font-weight:bold;
	  word-break:break-all;
	  overflow:hidden;
	}
	.order-good-right .order-good-info{
	  margin-top:.30rem;
	  float:left;
	  width:5.50rem;
	  height:.50rem;
	}
	.order-good-right .order-good-info .order-good-price{
	  float:left;
	  height:.50rem;
	  line-height:.50rem;
	  font-size:.30rem;
	  font-weight:bold;
	  color:#fa3e2d;
	}
	.order-good-right .order-good-info .order-good-num{
	  float:right;
	  margin-right:05rem;
	  width:1.00rem;
	  height:.46rem;
	  line-height:.46rem;
	  text-align:center;
	  font-size:.26rem;
	  color:#414141;
	}
	/*到达时间*/
	.order-wrapper .arrive-time{
	  float:left;
	  padding-top:.18rem;
	  width:100%;
	  color:#26b1fe;
	  border-top:2px solid #e5e7e2;
	}
	.order-wrapper .arrive-time,
	.order-wrapper .discount span{
	  padding-left:.30rem;
	  height:.44rem;
	  font-size:.28rem;
	  line-height:.44rem;
	}
	/*商家优惠*/
	.order-wrapper .discount{
	  float:left;
	  width:100%;
	  height:.44rem;
	}
	.order-wrapper .discount span{
	  float:left;
	  color:#000;
	}
	.order-wrapper .discount .discount-price{
	  float:right;
	  margin-right:.30rem;
	  height:.44rem;
	  font-size:.28rem;
	  line-height:.44rem;
	  color:#fa3e2d;
	}
	.order-wrapper .discount .discount-price.disabled{
	  color:rgba(0,0,0,.5);
	}
	.order-wrapper .discount .discount-price span{
	  float:none;
	  font-weight:bold;
	  color:#000;
	}

	/*优惠券*/
	.order-coupon,.order-shop{
	  position:fixed;
	  left:0;
	  padding-top:.20rem;
	  bottom:0;
	  width:100%;
	  height:7.87rem;
	  background:rgba(0,0,0,0.7);
	}
	.order-coupon .coupon{
	  margin-bottom:.20rem;
	  margin-left:.30rem;
	  width:6.90rem;
	  height:2.06rem;
	  background:#fff;
	  border-radius:.10rem;
	}
	/*.order-coupon .coupon:first-of-type{
	  margin-top:20rem;
	}*/
	.coupon .coupon-left{
	  position:relative;
	  float:left;
	  width:3.30rem;
	  height:2.08rem;
	}
	.coupon .coupon-left .select{
	  position:absolute;
	  top:.14rem;
	  left:.12rem;
	  width:.36rem;
	  height:.36rem;
	  border-radius:50%;
	  border:2px solid #26b1fe;
	}
	.coupon .coupon-left .select.active{
	  background:#26b1fe;
	}
	.coupon .coupon-left .select img{
	  display:none;
	  float:left;
	  margin:.06rem auto 0;
	  width:.30rem;
	  height:.26rem;
	}
	.coupon .coupon-left .select.active img{
	  display:block;
	}
	.coupon .coupon-right{
	  float:left;
	  width:3.60rem;
	  height:2.08rem;
	  overflow-y:hidden;
	}
	.coupon-price{
	  margin-left:.75rem;
	  margin-top:.36rem;
	  height:.58rem;
	  line-height:.58rem;
	  font-size:.40rem;
	  color:#fa3e2d;
	}
	.coupon-condition{
	  margin-left:.48rem;
	  height:.38rem;
	  line-height:.38rem;
	  font-size:.24rem;
	  color:#666;
	}
	.coupon-vld{
	  margin-top:.10rem;
	  margin-left:.18rem;
	  height:.62rem;
	  line-height:.62rem;
	  color:#999;
	  font-size:.20rem;
	}
	.coupon-name{
	  margin-top:.24rem;
	  height:.44rem;
	  line-height:.44rem;
	  font-size:.30rem;
	  font-weight:bold;
	  color:#666;
	}
	.coupon-info{
	  height:.30rem;
	  line-height:.30rem;
	  font-size:.24rem;
	  color:#666;
	}
	/*布放地们*/
	.order-shop .shop{
	  position:relative;
	  margin-bottom:.20rem;
	  margin-left:.30rem;
	  width:6.90rem;
	  height:.60rem;
	  background:#fff;
	  border-radius:.10rem;
	}
	.order-shop .shop .select{
	  position:absolute;
	  top:.10rem;
	  left:.10rem;
	  width:.36rem;
	  height:.36rem;
	  border-radius:50%;
	  border:2px solid #26b1fe;
	}
	.order-shop .shop .select.active{
	  background:#26b1fe;
	}
	.order-shop .shop .select img{
	  display:none;
	  float:left;
	  margin:.06rem auto 0;
	  width:.30rem;
	  height:.26rem;
	}
	.order-shop .shop .select.active img{
	  display:block;
	}
	.order-shop .shop .shop-name{
	  padding-left:.60rem;
	  width:80%;
	  height:.60rem;
	  line-height:.60rem;
	  font-size:.30rem;
	  color:#666;
	}
	/*点击去支付的弹窗*/
	.pay-info-wrapper{
	  position:fixed;
	  left:0;
	  top:0;
	  bottom:0;
	  width:100%;
	  height:100%;
	  background:rgba(0,0,0,0.4);
	}
	.pay-info-wrapper .pay-info{
	  position:relative;
	  margin:4.00rem auto 0;
	  width:5.00rem;
	  height:3.40rem;
	  background:#fff;
	  border-radius: .10rem;
	}
	.pay-info-wrapper .pay-info .close{
	  position:absolute;
	  top:.20rem;
	  right:.20rem;
	  width:.40rem;
	  height:.40rem;
	  border-radius:50%;
	  border:2px solid #676767;
	  font-size:.30rem;
	  text-align:center;
	  line-height:.40rem;
	  color:#676767;
	}
	.pay-info-title{
	  width:100%;
	  height:.80rem;
	  line-height:.80rem;
	  font-size:.34rem;
	  color:#333;
	  text-align:center;
	  border-bottom:1px solid #bcbcbc;
	}
	.pay-info-body{
	  width:100%;
	  height:1.60rem;
	  border-bottom:1px solid #bcbcbc;
	}
	.pay-info-body .pay-info-company,
	.pay-info-body .pay-info-money{
	  width:100%;
	  height:.80rem;
	  line-height:.80rem;
	  font-size:.30rem;
	  text-align:center;
	}
	.pay-info-body .pay-info-money{
	  line-height:.60rem;
	}
	.pay-info-pay{
	  float:left;
	  width:100%;
	  height:1.00rem;
	}
	.pay-info-pay .pay{
	  display:block;
	  margin:.20rem auto;
	  width:2.00rem;
	  height:.60rem;
	  background:#26b1fe;
	  line-height:.60rem;
	  font-size:.30rem;
	  color:#fff;
	  border-radius:.10rem;
	  text-align:center;
	}
	.pay-info-pay .pay.disabled{
	  background:rgba(38,177,254,.5);
	}
</style>