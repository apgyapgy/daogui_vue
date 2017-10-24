<template>
	<div class="main">
		
	    <!--banner-->
	    <div v-for="item in banners" class="banner">
			<img :src="item" alt="">
		</div>

	    <!--定位-->
	    <div @click="chooseLocation" class="location">
	      	<img class="location-icon" src="./location.png"/>
	      	<span class="location-name">{{location.areaNm?location.areaNm:'点击定位'}}</span>
	      	<img class="location-down-icon" src="./down.png"/>
	    </div>

	    <!--title-->
	    <div class="con-title">
	      	<div class="title-wrapper">
	        	<img src='./nearby.png'/>
	        	<span>附近的商户</span>
	      	</div>
	    </div>

	    <!--店铺-->
	    <div v-if="shopList.length>0" class='shops'>
	      	<div v-for="item in shopList" class="shop" :shopid="item.shopId" :mchid="item.mchId" @click="jumpShopInfo">
		        <div class='shop-left'>
		          	<img src="./shop-icon.png"/>
		        </div>
		        <div class='shop-right'>
		          	<div class='shop-top'>
		            	<div class='brand'>品牌</div>
		            	<div class='name'>{{item.shopNm}}</div>
		          	</div>
		          	<div class='shop-intro-wrapper'>
		          		<span class='shop-intro'>{{item.shopAddr}}</span>
		          	</div>
		          	<span class='shop-send'>{{item.distAmtMinYuan}}元起送，{{item.distAmtYuan}}元配送费</span>
		          	<span class='enter'>立即进入 ></span>
		        </div>
	      	</div>     
	    </div>

	    <!--暂无商铺-->
	    <div v-show="noshop" class="no-shop">
	      	<img src="./no-shop.png"/>
	      	<span>该小区附近暂无商铺(收件宝快递柜）</span>
	      	<span>请尝试切换其他小区</span>
	    </div>
    
    	<div class='padding-100'></div>

		
		<Foot :curTable="0"></Foot>
	</div>
</template>

<script>
	import Foot from '@/components/footer/footer'
	export default{
		data(){
			return{
				"banners":["http://n3-q.mafengwo.net/s5/M00/8D/61/wKgB3FCgixKAVSKEACodGZ2qxEQ49.jpeg?imageMogr2%2Fthumbnail%2F%21310x207r%2Fgravity%2FCenter%2Fcrop%2F%21310x207%2Fquality%2F90%7Cwatermark%2F1%2Fimage%2FaHR0cDovL3AzLXEubWFmZW5nd28ubmV0L3M4L00wMC82Mi82MC93S2dCcFZodUN3NkFKR1MxQUFBSk5QeGl2RTQ2MzEucG5n%2Fgravity%2FNorthWest%2Fdx%2F10%2Fdy%2F11"],
				"location":{
					"areaNm":"上海小区",
					"bmapLat":"31.228522821982",
					"bmapLng":"121.56115068654",
					"cellCd":"A2100224063",
					"hostAddrShort":"508",
					"hostId":"70000030"
				},
				"shopList":[{
					"bmapLat":"31.23055",
					"bmapLng":"121.55694",
					"distAmt":0,
					"distAmtMin":1,
					"distAmtMinYuan":"0.01",
					"distAmtYuan":"0",
					"distRange":6000,
					"distance":1500,
					"mchId":80001850,
					"shopAddr":"中国上海市浦东新区民生路1399号",
					"shopId":60002252,
					"shopLogo":"test img",
					"shopNm":"我的么么"
				}],
				noShop:false
			}
		},
		methods:{
			jumpShopInfo:function(){
				//跳转店铺
			},
			chooseLocation:function(){
				//选择地理定位
			}
		},
		components:{
			Foot
		},
		created:function(){

			console.log(this.$route.matched)
		}
	}
</script>
<style scoped>
	.padding-100{
		width:100%;
		height:1.2rem;
	}
	.main{
		width:100%;
	}
	.banner{
		width:100%;
	}
	.banner img{
		width:100%;
		height:100%;
	}
	.banner{
	  width:100%;
	  height:150px;
	}
	.banner .slide-image{
	  width:100%;
	  height:150px;
	}
	.scrollview{
	  position:absolute; 
	  top:0; 
	  left:0; 
	  right:0; 
	  bottom:0;
	}

	/*定位*/
	.location{
	  position:absolute;
	  top:.50rem;
	  left:50%;
	  transform:translateX(-50%);
	  min-width:2.50rem;
	  height:.50rem;
	  line-height:.50rem;
	  background:#eaf7ff;
	  border-radius:.25rem;
	}
	.location .location-icon{
	  float:left;
	  margin:.12rem 0 0 .30rem;
	  width:.26rem;
	  height:.30rem;
	}
	.location .location-down-icon{
	  float:left;
	  margin-top:.20rem;
	  margin-right:.30rem;
	  width:.18rem;
	  height:.16rem;
	}
	.location .location-name{
	  float:left;
	  padding-left:.10rem;
	  padding-right:.10rem;
	  font-size:.28rem;
	  color:#57aafe;
	}

	/*附近的商户标题*/
	.con-title{
	  display:flex;
	  margin-top:.20rem;
	  width:100%;
	  height:.64rem;
	  background:#f2f2f2;
	  border-top:2px solid #e5e7e2;
	  border-bottom:2px solid #e5e7e2;
	}
	.con-title .title-wrapper{
	  position:relative;
	  padding-left:.15rem;
	  padding-right:.15rem;
	  margin:.10rem auto 0;
	  height:.45rem;
	}
	.con-title .title-wrapper:before,.con-title .title-wrapper:after{
	  content:"";
	  position:absolute;
	  top:.20rem;
	  background:#787878;
	  width:.80rem;
	  height:1px;
	}
	.con-title .title-wrapper:before{
	  left:-.80rem;
	}
	.con-title .title-wrapper:after{
	  right:-.80rem;
	}
	.con-title .title-wrapper img{
	  float:left;
	  width:.45rem;
	  height:.45rem;
	}
	.con-title .title-wrapper span{
	  float:left;
	  margin-left:.1rem;
	  height:.45rem;
	  color:#333;
	  line-height:.45rem;
	  font-size:.30rem;
	}

	/*暂无商户*/
	.no-shop{
	  width:100%;
	}
	.no-shop img{
	  display:block;
	  margin:1.80rem auto 30rem;
	  width:1.65rem;
	  height:1.65rem;
	}
	.no-shop span{
	  display:block;
	  height:.32rem;
	  line-height:.32rem;
	  text-align:center;
	  font-size:.24rem;
	  color:#8f8f8f;
	}

	/*商铺们*/
	.shops{
	  width:100%;
	}
	.shops .shop{
	  margin-left:.10rem;
	  width:7.30rem;
	  height:1.80rem;
	  border-bottom:1px dashed #666;
	}
	.shop-left{
	  float:left;
	  margin-top:.30rem;
	  width:1.60rem;
	}
	.shop-left img{
	  margin-left:.20rem;
	  width:1.16rem;
	  height:1.16rem;
	  border-radius:.03rem;
	  border:2px solid #e5e7e2;
	}
	.shop-right{
	  position:relative;
	  float:left;
	  margin-top:.30rem;
	  width:5.70rem;
	}
	.shop-right .shop-top{
	  height:.50rem;
	}
	.shop-right .shop-top .brand{
	  float:left;
	  width:.56rem;
	  height:.30rem;
	  background:#f5d44b;
	  border-radius:.03rem;
	  font-size:.20rem;
	  color:#6f3f15;
	  text-align:center;
	}
	.shop-right .shop-top .name{
	  float:left;
	  margin-left:.10rem;
	  font-size:.30rem;
	  font-weight:bold;
	  line-height:.30rem;
	}
	.shop-right .shop-intro-wrapper{
	  margin-bottom:.06rem;
	  height:.30rem;
	}
	.shop-right .shop-intro-wrapper .shop-intro{
	  padding-left:.16rem;
	  padding-right:.16rem;
	  float:left;
	  height:.30rem;
	  color:#85581e;
	  border:1px solid #bea687;
	  border-radius:.10rem;
	  line-height:.30rem;
	  font-size:.24rem;
	}
	.shop:nth-child(2n) .shop-right .shop-intro-wrapper .shop-intro{
	  color:#1c81e8;
	  border:1px solid #77c3ff;
	}
	.shop-right .shop-send{
	  display:block;
	  text-align:left;
	  font-size:.24rem;
	  color:#999;
	}
	.shop-right .enter{
	  position:absolute;
	  bottom:0;
	  right:.24rem;
	  color:#fc5f4e;
	  font-size:.24rem;
	}

</style>