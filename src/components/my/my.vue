<template>
	<div class="my">
		<div class="my-container">
		  <div class="user-info">
		    <img class="user-icon" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKOk2pqOp3fxM8cfE804Q55oZ8WuqRlZW6WlricfC1v3dSkapH9aX2MohMtKINvibxL2ND3K044DjkQ/0"/>
		    <span class="user-phone">咿呀咿呀</span>
		  </div>
		  <div class="my-list">
		    <div @click="toCoupon" class="list">
		      <img class="my-coupon" src="./my-coupon.png"/>
		      <span>我的优惠券</span>
		    </div>
		    <div @click="showConcat" class="list">
		      <img class="my-concat" src="./my-concat.png"/>
		      <span>联系客服</span>
		    </div>
		  </div>
		</div>
		<Foot :curTable="3"></Foot>
		<div class="shadow" :class="{'active':concatShowFlag==true}">
		    <div class="concat-wrapper">
		      <div @click="concat" class="concat-phone">{{concatPhone}}</div>
		      <div @click="hideConcat" class="concat-cancel">取消</div>
		    </div>
		</div>
	</div>
</template>
<script>
	import Foot from '@/components/footer/footer'
	export default{
		data(){
			return{
				concatPhone:95138,
				concatShowFlag:false
			}
		},
		components:{
			Foot
		},
		methods:{
			showConcat:function(){
				this.concatShowFlag = true;
			},
			hideConcat:function(){
				this.concatShowFlag = false;
			},
			concat:function(){},
			toCoupon:function(){
				this.$router.push({
					path:'/coupon'
				});
			}
		}
	}
</script>
<style scoped>
	.my-container{
	  width:100%;
	  height:6.1rem;
	  background:#f2f2f2;
	}
	.my-container .user-info{
	  padding-top:.8rem;
	  width:100%;
	  height:4rem;
	}
	.my-container .user-info .user-icon{
	  display:block;
	  margin:0 auto;
	  width:2rem;
	  height:2rem;
	  border-radius:50%;
	}
	.my-container .user-info .user-phone{
	  display:block;
	  width:100%;
	  height:.56rem;
	  font-size:.30rem;
	  line-height:.56rem;
	  text-align:center;
	}
	.my-list{
	  width:100%;
	  border-top:1px solid #e5e5e5;
	}
	.my-list .list{
	  width:100%;
	  height:.86rem;
	  border-bottom:1px solid #e5e5e5;
	  background:#fff;
	}

	.my-list .list img{
	  float:left;
	  margin-left:.30rem;
	  margin-right:.10rem;
	  margin-top:.32rem;
	  width:.30rem;
	  height:.30rem;
	}
	.my-list .list span{
	  float:left;
	  height:.86rem;
	  font-size:.32rem;
	  line-height:.86rem;
	}

	.shadow{
	  display:none;
	  position:fixed;
	  top:0;
	  left:0;
	  width:100%;
	  height:100%;
	  background:rgba(0,0,0,0.4);
	}
	.shadow.active{
	  display:block;
	}
	.shadow .concat-wrapper{
	  margin-top:4rem;
	  width:100%;
	  height:1.76rem;
	  background:#fff;
	  border-top:2px solid #e5e5e5;
	  border-bottom:2px solid #e5e5e5;
	  font-size:.30rem;
	  line-height:.86rem;
	  text-align:center;
	}
	.shadow .concat-wrapper .concat-cancel{
	  border-top:2px solid #e5e5e5;
	  color:#43bbfe;
	}
</style>