<template>
	<div class="coupon-container">
	  	<div class="coupon-head">
	    	<div @click="changeTab(0)" class="not-used" :class="{'active':activeTab==0}">未使用</div>
	    	<div @click="changeTab(1)" class="used" :class="{'active':activeTab==1}">已使用</div>
	    	<div @click="changeTab(2)" class="expired" :class="{'active':activeTab==2}">已过期</div> 
	  	</div>
  		<div class="padding-20"></div>
  		<div v-if="couponsList.length>0" class="coupon-body">

    		<div v-for="item in couponsList" class="coupon">
      			<div class="coupon-left">
        			<div class="coupon-price">￥{{item.couponAmt/100}}</div>
        			<div class='coupon-condition'>满{{item.couponAmtMin/100}}元使用</div>
        			<div class="coupon-vld">有效期到:{{item.expireDt}}</div>
      			</div>
      			<div class="coupon-right">
        			<div class='coupon-name'>{{item.couponNm}}</div>
      			</div>
    		</div>

  		</div>
  		<div v-show="noCouponFlag" class="no-coupons">
    		<span>暂无优惠券</span>
  		</div>
  		<Top></Top>
	</div>
</template>

<script>
	import Top from '@/components/top/top';
	export default{
		data(){
			return{
				coupons:[],
				activeTab:0,	
				couponsList:[],
				noCouponFlag:false
			}
		},
		created:function(){
			this.getCoupons();
			this.selectShowCoupon();
		},
		methods:{
			changeTab:function(n){
				this.activeTab = n;
				this.selectShowCoupon();
			},
			selectShowCoupon:function(){
				var _stArr = ['未使用','已使用','已过期']
				var _coupons = this.coupons;
				var _couponsList=[];
				for(var key in _coupons){
					if(_coupons[key].couponStDesc == _stArr[this.activeTab]){
						_couponsList.push(_coupons[key]);
					}
				}
				//console.log("couponsList:",_couponsList);
				this.couponsList = _couponsList;
				if(_couponsList.length > 0){
					this.noCouponFlag = false;
				}else{
					this.noCouponFlag = true;
				}
			},
			getCoupons:function(){
				this.coupons = this.$store.state.coupons;
			}
		},
		components:{
			Top
		}
	}
</script>

<style scoped>
	.coupon-container{
		width:100%;
		height:100%;
		background:#f2f2f2;
	}
	.padding-20{
		width:100%;
		height:.2rem;
		background:#fff;
	}
	.coupon-head{
	  display:flex;
	  width:100%;
	  border-bottom:1px solid #e5e5e5;
	  background:#fff;
	}
	.coupon-head div{
	  float:left;
	  flex:1;
	  height:.99rem;
	  border-right:1px solid #ccc;
	  background:#fff;
	  text-align:center;
	  font-size:.30rem;
	  color:#333;
	  line-height:.99rem;
	}
	.coupon-head div:last-child{
	  border-right:0;
	}
	.coupon-head div.active{
	  color:#24affd;
	  background:#f2f2f2;
	}
	/*优惠券内容*/
	.coupon-body{
	  padding-top:1px;
	  width:100%;
	  min-height:100%;
	  background:#f2f2f2;
	}
	.coupon{
	  margin:.30rem auto 0;
	  width:6.90rem;
	  height:2.08rem;
	  background:#fff;
	  border-radius:.20rem;
	  box-shadow:#e0dfe0 0 2px 10px;
	}
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
	.coupon .coupon-left .select image{
	  display:none;
	  float:left;
	  margin:.06rem auto 0;
	  width:.30rem;
	  height:.26rem;
	}
	.coupon .coupon-left .select.active image{
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
	.no-coupons span{
	  display:block;
	  margin-top:3.00rem;
	  height:.50rem;
	  width:100%;
	  line-height:.50rem;
	  font-size:.40rem;
	  color:#ccc;
	  text-align:center;
	}
	.coupon-vld{
		margin-top:.1rem;
		margin-left:.18rem;
		height:.62rem;
		line-height:.62rem;
		color:#999;
		font-size:.2rem;
	}
</style>