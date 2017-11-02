<template>
	<div class="top">
		<img catchtap="goTop" class="top" :class="{'active':backTopIconShowFlag==true}" src='./top.png'/>
	</div>
</template>

<script>
	export default{
		props:{
			backTopIconShowFlag:Boolean
		},
		methods:{
			handleScroll:function(){
				console.log("滚动吧，小宝贝!");
			}
		},
		ready(){
			console.log("top:ready");
			window.addEventListener('scroll', this.handleScroll);
		}
	}
</script>

<style scoped>
	/*返回顶部*/
	.top{
	  display:none;
	  position:fixed;
	  bottom:2rem;
	  right:.30rem;
	  width:.8rem;
	  height:.8rem;
	  border-radius:50%;
	}
	.top.active{
	  display:block;
	}
</style>