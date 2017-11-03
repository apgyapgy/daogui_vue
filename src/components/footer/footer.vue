<template>
	<div class="footer">
		<div class="weui-tab">
		  	<div class="weui-tabbar">
		  		<a @click="jump(0)" data-to="/index" class="weui-tabbar__item" :class="{'weui-bar__item--on':curTable==0}">
			      	<div class="weui-tabbar__icon">
			      		<img v-if="curTable==0" src="./home_active.png" alt="">
			        	<img v-else src="./home.png" alt="">
			      	</div>
			      	<p class="weui-tabbar__label">首页</p>
			    </a> 
			    <a @click="jump(1)" data-to="/cart" class="weui-tabbar__item" :class="{'weui-bar__item--on':curTable==1}">
			      	<span v-show="cartsNum>0" class="weui-badge" style="position: absolute;top: -.4em;right: 1em;">{{cartsNum>99?'99+':cartsNum}}</span>
			      	<div class="weui-tabbar__icon">
			      		<img v-if="curTable==1" src="./car_active.png" alt="">
			        	<img v-else src="./car.png" alt="">
			      	</div>
			      	<p class="weui-tabbar__label">购物车</p>
			    </a> 
			    <a @click="jump(2)" data-to="/order" class="weui-tabbar__item" :class="{'weui-bar__item--on':curTable==2}">
			      	<div class="weui-tabbar__icon">
			      		<img v-if="curTable==2" src="./order_active.png" alt="">
			        	<img v-else src="./order.png" alt="">
			      	</div>
			      	<p class="weui-tabbar__label">订单</p>
			    </a> 
			    <a @click="jump(3)" data-to="/my" class="weui-tabbar__item" :class="{'weui-bar__item--on':curTable==3}">
			      	<div class="weui-tabbar__icon">
			      		<img v-if="curTable==3" src="./my_active.png" alt="">
			        	<img v-else src="./my.png" alt="">
			      	</div>
			      	<p class="weui-tabbar__label">我的</p>
			    </a> 
		  	</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			curTable:Number
		},
		data(){
			return {
				cartsNum:0
			}
		},
		methods:{
			jump:function(n){
				var _jumpUrl = ['/index','/cart','/order','/my'];
				this.$router.push({
					path:_jumpUrl[n]
				});
			},
			getCartNums:function(){
				this.cartsNum = this.$store.state.cartsNum;
			}
		},
		mounted(){
			this.$store.commit("getCartNums");
			this.getCartNums();
		}
	}
</script>
<style scoped>
	.footer{
		position:fixed;
		left:0;
		bottom:0;
		width:100%;
		height:1rem;
	}
	.weui-tabbar__item.weui-bar__item--on .weui-tabbar__label{
		color:#6ab3fe;
	}
</style>