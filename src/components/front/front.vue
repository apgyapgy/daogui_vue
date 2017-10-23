<template>
	<div class="front">
		<img class="front-text" src="./front-text.png" alt="">
		<img class="front-img" src="./front.png" alt="">
	</div>
</template>
<script>
	export default{
		created:function(){
			var _this = this;
			setTimeout(function(){
				_this.$router.push({ name: 'Index'})
			},1000);
		}
	}
</script>
<style scoped>
	.front{
		width:100%;
		height:2rem;
	}
	.front-text{
		margin:3rem auto 0;
  		width:4rem;
  		height:1.2rem;
	}
	.front-img{
		margin:1rem auto 0;
  		width:4.3rem;
  		height:4rem;
	}
</style>