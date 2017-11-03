<template>
	<div class="top">
		<img @click.stop="goTop" class="top" :class="{'active':backTopIconShowFlag==false}" src='./top.png'/>
	</div>
</template>

<script>
	export default{
		/*props:{
			backTopIconShowFlag:Boolean
		},*/
		data(){
			return{
				backTopIconShowFlag:false
			}
		},
		methods:{
			handleScroll:function(e){
				//var scrollTop = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
				if(window.scrollY > e.path[1].innerHeight){
					if(this.backTopIconShowFlag == false){
						this.backTopIconShowFlag = true;
					}
				}else{
					if(this.backTopIconShowFlag == true){

						this.backTopIconShowFlag = false;
					}
				}
			},
			goTop:function(){
				$("html,body").animate({"scrollTop":0},300);
			}
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
		}
	}
</script>

<style scoped>
	/*返回顶部*/
	.top{
	  display:block;
	  position:fixed;
	  bottom:2rem;
	  right:.30rem;
	  width:.8rem;
	  height:.8rem;
	  border-radius:50%;
	}
	.top.active{
	  display:none;
	}
</style>