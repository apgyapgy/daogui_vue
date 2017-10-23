<template>
	<div class="main">
		<div class="banner">
			<img src="./banner.png" alt="">
		</div>
		<Foot :curTable="0"></Foot>
	</div>
</template>
<script>
	import Foot from '@/components/footer/footer'
	export default{
		components:{
			Foot
		},
		created:function(){

			console.log(this.$route.matched)
		}
	}
</script>
<style scoped>
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
</style>