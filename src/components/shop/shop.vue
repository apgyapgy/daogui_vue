<template>
	<div class="shop-container">
		
	  	<div class="shop-head">
	    	<img src="./shop-icon.png"/>
	    	<div class="shop-name">{{shop.shopNm}}</div>
	  	</div>

	  	<div class="goods-wrapper clearfix">
		    <div class="wrapper-title">
		      	<span>商品</span>
		    </div>
		    <div class='goods clearfix'>
		      	<div v-for="(item,idx) in goodsList" class='good'>
		        	<img src="./good.png"/>
		        	<div class='good-info'>
		          		<span class='good-name'>{{item.goodsNm}}</span>
		          		<span class='good-price'>￥{{item.goodsAmt?item.goodsAmt/100:0}}</span>
		        	</div>
			        <div class='add-sub'>
			          	<img v-show="item.cartGoodsNum>0" @click="addsub(item.goodsNo)" class='sub' src="./sub.png"/>
			          	<span v-show="item.cartGoodsNum>0" class='num'>{{item.cartGoodsNum}}</span>
			          	<img @click="saveCart(item.goodsNo)" class='add' src="./add.png"/>
			        </div>
		      	</div>
		    </div>
	    	<div v-show="goodsList.length<=0" class='nogood'>
	      		暂无商品
	    	</div>
	  	</div>
		<div class='padding-86'></div>


		<!--底部购物车-->
		<div @click="showCarInfo" class='car-bar'>
		  	<div class="car-icon" :class="{'active':selectIds.length>0}">
		    	<span v-show="cartInfo.orderNums>0" class='car-num'>{{getCartNums}}</span>
		    	<img src="./shop-car.png"/>
		  	</div>
		  	<div class='car-money'>
		    	<span class='car-total-money'>合计金额:<span>{{shop.distAmt>=0&&selectInfo.selectAmt>0?(selectInfo.selectAmt+shop.distAmt)/100:0}}</span>元</span>
		    	<span class='delivery-money'>配送费:{{shop.distAmt?shop.distAmt/100:0}}元,起送费{{shop.distAmtMin?shop.distAmtMin/100:0}}元</span>
		  	</div>
		  	<div @click.stop="topay" class="to-pay" :class="{'disabled':!(selectIds.length>0&&selectInfo.selectAmt>=shop.distAmtMin)}">去结算</div>
		</div>

		<!--购物车详情-->
		<div class='car-info-wrapper' v-show="showCarInfoFlag" @click.stop="hideCarInfo">
		  	<div class='car-info-content clearfix' @click.stop="preventTapParent">
			    <div @click.stop="hideCarInfo" class="car-icon" :class="{'active':cartList.length>0}">
			      	<span v-show="cartInfo.orderNums>0" class='car-num'>{{cartInfo.orderNums>99?'99+':cartInfo.orderNums}}</span>
			      	<img src="./shop-car.png"/>
			    </div>

		   
		      	<div class='goods clearfix'>

			        <div v-for="item in cartList" class='good'>
			          	<div @click.stop="selectGood(item.goodsNo)"
			            class="select-icon" :class="{'active':selectIds.indexOf(item.goodsNo)!=-1}">
			            	<img src="./success.png"/>
			          	</div>
			          	<img src="./good.png"/>
			          	<div class='good-info'>
			            	<span class='good-name'>{{item.goodsNm}}</span>
			            	<span class='good-price'>￥{{item.goodsAmt?item.goodsAmt/100:0}}</span>
			          	</div>
			          	<div class='add-sub'>
			            	<img v-show="item.orderNum>0" @click.stop="addsub(item.goodsNo)"  class='sub' src="./sub.png"/>
			            	<span v-show="item.orderNum>0" class='num'>{{item.orderNum}}</span>
			            	<img @click.stop="saveCart(item.goodsNo)" class='add' src="./add.png"/>
			          	</div>
			        </div>

			        <div v-for="item in expireList" class='good expired'>
			          	<div class='ex-tip'>失效</div>
			          	<img :src="imgPre+item.goodsImgLogo"/>
			          	<div class='good-info'>
			            	<span class='good-name'>{{item.goodsNm}}</span>
			            	<span class='good-price'>￥{{item.goodsAmt?item.goodsAmt/100:0}}</span>
			          	</div>
			          	<div class='add-sub'>
			            	<span v-show="item.orderNum>0" class='num'>{{item.orderNum}}</span>
			          	</div>
			        </div>

		      	</div>
		    

		    	<div class='car-info-head'> 
		      		<div v-show="cartList.length>0" class='select' @click.stop="selectAll"> 
		        		<div class="select-icon" :class="{'active':selectIds.length == cartList.length}">
		          			<img src="./success.png"/>
		        		</div>
		        		<div class='has-selected'>全选<span>(已选{{selectInfo.selectNums}}件)</span></div>
		      		</div>
		      		<div @click.stop="emptyCart" class='clear-car'>
		        		<img src="./clear.png"/>
		        		<span>清空购物车</span>
		      		</div>
		    	</div>

			    <div @click="showCarInfo" class='car-bar'>
			      	<div class='car-money'>
			        	<span class='car-total-money'>合计金额:<span>{{selectInfo.selectAmt>0&&shop.distAmt>=0?(selectInfo.selectAmt+shop.distAmt)/100:0}}</span>元</span>
			        	<span class='delivery-money'>配送费:{{shop.distAmt?shop.distAmt/100:0}}元,起送费{{shop.distAmtMin?shop.distAmtMin/100:0}}元</span>
			      	</div>
			      	<div @click.stop="topay" class="to-pay" :class="{'disabled':!(selectIds.length>0&&selectInfo.selectAmt>=shop.distAmtMin)}">去结算</div>
			    </div>
		  	</div>
		</div>
		<Top :backTopIconShowFlag="backTopIconShowFlag"></Top>
	</div>
</template>

<script>
	import Top from '@/components/top/top'
	export default{
		data(){
			return{
				goodsList:[],
				cartInfo:{
					"orderNums":"15",
					"totalAmt":"13755"
				},
				shop:{
					bmapLat:"31.23055",bmapLng:"121.55694",crtTs:"2017-10-23 16:19:52.885270000",
					distAmt:1,distAmtMin:0,distAmtMinYuan:"0",distAmtYuan:"0.01",distEndTs:"18:00",
					distRange:1000,distStartTs:"17:30",id:6,mchId:80001850,operator:"15821564899",
					remark:"",shopAddr:"中国上海市浦东新区民生路1399号",shopContract:"15821564899",
					shopId:60002260,shopLogo:"",shopNm:"我的么么",shopSt:1,
					updTs:"2017-10-24 14:48:31.524583000"
				},
				cartList:[],
				showCarInfoFlag:false,
			    options:{//url参数
			      mchId:"80001828",
			      shopId:"6000000545"
			    },
			    clickable:true,
			    selectInfo:{//已选中商品信息
			      selectAll:false,
			      selectNums:0,
			      selectAmt:0
			    },
			    selectIds:[],
			    expireList:[], //过期失效商品				
				imgPre:"https://static.fuiou.com/",
				backTopIconShowFlag:true
			}
		},
		methods:{
			hideCarInfo:function(){
				this.showCarInfoFlag = false;
			},
			preventTapParent:function(){},
			selectGood:function(goodsNo){
				var _ids = this.selectIds,
					_cartList = this.cartList;
				if(_ids.indexOf(goodsNo)==-1){
					_ids.push(goodsNo);
				}else{
					var _key = -1;
					for(var key in _cartList){
						if(_cartList[key].goodsNo == goodsNo){
							_key = key;
							break;
						}
					}
					_ids.splice(_ids.indexOf(goodsNo),1);
				}
				this.selectIds = _ids;
			},
			addsub:function(goodsNo){
				this.$store.commit('addsub',goodsNo);
			},
			selectAll:function(){//全选
				var _cartList = this.cartList;
				var _ids = this.selectIds;
				if(_cartList.length > _ids.length){
					_ids = [];
					for(var key in _cartList){
						_ids.push(_cartList[key].goodsNo);
					}
				}else{
					_ids = [];
				}
				this.selectIds = _ids;
			},
			showCarInfo:function(){
				if(this.cartList.length>0 || this.expireList.length>0){
					this.showCarInfoFlag = true;
				}
			},
			topay:function(){},
			saveCart:function(goodsNo){
				this.$store.commit("addUserCart",goodsNo);
			},
			getCartList:function(){
				this.cartList = this.$store.state.cartList;
			},
			getGoodsList:function(){
				this.goodsList = this.$store.state.goodsList;
			},
			emptyCart:function(){
				this.$store.commit("emptyCart");
				this.expireList = [];
				this.getCartList();
			}

		},
		computed:{
			getCartNums:function(){
				var _cartList = this.cartList;
				var _totalNum = 0;
				for(var key in _cartList){
					_totalNum+=_cartList[key].orderNum;
				}
				return _totalNum>99?'99+':_totalNum;
			}
		},
		created(){
			this.expireList = this.$store.state.expireList;
			this.getCartList();
			this.getGoodsList();
		},
		components:{
			Top
		}
	}
</script>

<style scoped>
	.padding-86{
		width:100%;
		height:.86rem;
	}
	/*清除浮动*/
	.clearfix:after{
	  clear:both;
	  content:'';
	  display:block;
	  visibility:hidden;
	  width:0;
	  height:0;
	}
	.shop-container{
		background:#fff;
	}
	.shop-head{
	  padding-top:.10rem;
	  width:100%;
	  height:1.50rem;
	  background:#665754;
	}
	.shop-head img{
	  display:block;
	  margin:0 auto;
	  width:.80rem;
	  height:.80rem;
	  border:2px solid #bebcb7;
	  border-radius:.05rem;
	}
	.shop-head .shop-name{
	  display:block;
	  width:100%;
	  height:.52rem;
	  line-height:.52rem;
	  font-size:.3rem;
	  font-weight:bold;
	  text-align:center;
	  color:#fff;
	}
	/*goods wrapper*/
	.goods-wrapper{
	  width:100%;
	  min-height:100%;
	}
	.goods-wrapper .wrapper-title{
	  width:100%;
	  height:.74rem;
	  border-bottom:2px solid #e5e7e2;
	}
	.wrapper-title span{
	  float:left;
	  margin-left:.30rem;
	  margin-top:.20rem;
	  height:.50rem;
	  line-height:.50rem;
	  font-size:.32rem;
	  color:#26b1fe;
	  font-weight:bold;
	  border-bottom:.05rem solid #26b1fe;
	}
	/*good*/
	.car-info-head .goods{
	  padding-top:.80rem;
	}
	.good{
	  position:relative;
	  height:1.95rem;
	  border-bottom:2px solid #e5e7e2;
	}
	.good img{
	  float:left;
	  margin-top:.22rem;
	  margin-left:.28rem;
	  margin-right:.22rem;
	  width:1.45rem;
	  height:1.45rem;
	  border:2px solid #e5e7e2;
	  border-radius:.10rem;
	}
	.good .good-info{
	  float:left;
	  width:5.30rem;
	  text-align:left;
	}
	.good .good-info span{
	  display:block;
	  font-weight:bold;
	}
	.good .good-info .good-name{
	  margin-top:.22rem;
	  line-height:.42rem;
	  font-size:.30rem;
	  height:1.08rem;
	  color:#000;
	}
	.good .good-info .good-price{
	  height:.48rem;
	  font-size:.28rem;
	  line-height:.48rem;
	  color:#fa3e2d;
	}
	.good .add-sub{
	  position:absolute;
	  right:.30rem;
	  bottom:.28rem;
	}
	.good .add-sub span{
	  float:left;
	  font-size:.34rem;
	}
	.good .add-sub .add,
	.good .add-sub .sub{
	  margin:0;
	  float:left;
	  width:.50rem;
	  height:.50rem;
	  border-radius:50%;
	}
	.ex-tip{/*失效*/
	  float:left;
	  margin-top:.22rem;
	  margin-left:.15rem;
	  width:.70rem;
	  height:.30rem;
	  font-size:.24rem;
	  line-height:.30rem;
	  text-align:center;
	  border-radius:.10rem;
	  background:#ccc;
	  color:#fff;
	}
	.good .add-sub .num{
	  width:.60rem;
	  height:.50rem;
	  line-height:.50rem;
	  color:#333;
	  text-align:center;
	}
	.good.expired .add-sub .num{
	  margin-right:.50rem;
	}
	.nogood{
	  margin-top:4.00rem;
	  width:100%;
	  height:.32rem;
	  line-height:.32rem;
	  text-align:center;
	  font-size:.30rem;
	  color:#8f8f8f;
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
	  box-shadow: rgba(0,0,0,0.2) 0 -1px .10rem;
	}
	.car-icon .car-num{
	  position:absolute;
	  left:.60rem;
	  top:-.10rem;
	  background:#f12c20;
	  height:.40rem;
	  width:.40rem;
	  line-height:.40rem;
	  color:#fff;
	  font-size:.20rem;
	  text-align:center;
	  border-radius:50%;
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
	  top:-1.80rem;
	}
	.car-money{
	  margin-left:1.20rem;
	  float:left;
	  width:4.40rem;
	  text-align:left;
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
	  margin-top:.10rem;
	  height:.40rem;
	  line-height:.40rem;
	  font-size:.30rem;
	  font-weight:bold;
	}
	.car-money .delivery-money{
	  height:.34rem;
	  line-height:.34rem;
	  font-size:.24rem;
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
	  background:#26b1fe;
	}
	.to-pay.disabled{
	  background:#999;
	}
	/*购物车详情*/
	.car-info-wrapper{
	  position:fixed;
	  left:0;
	  top:0;
	  width:100%;
	  height:100%;
	  background:rgba(0,0,0,.3);
	}
	.car-info-content{
	  position:absolute;
	  left:0;
	  bottom:.86rem;
	  width:100%;
	  height:60%;
	  background:#fff;
	}
	.car-info-wrapper .car-bar .car-money{
	  margin-left:.30rem;
	}
	.car-info-content .goods{
		height:100%;
		overflow-y:scroll;
	}
	.car-info-wrapper img{
	  margin-left:.15rem;
	}
	.car-info-wrapper .car-icon img{
	  margin-left:0;
	}
	.car-info-wrapper .good .good-info{
	  width:4.70rem;
	}
	.car-info-head{
	  position:absolute;
	  left:0;
	  top:-.8rem;
	  width:100%;
	  height:.80rem;
	  background:#fff;
	  border-bottom:2px solid #e5e7e2
	}
	.car-info-head .select{
	  float:left;
	  width:4.00rem;
	}
	.select-icon{
	  float:left;
	  width:.38rem;
	  height:.38rem;
	  border-radius:50%;
	  border:1px solid #26b1fe;
	}
	.select-icon img{
	  display:none;
	  float:left;
	  margin-top:.05rem;
	  margin-left:.03rem;
	  width:.30rem;
	  height:.26rem;
	  border:0;
	}
	.select .select-icon img{
	  margin-left:3px;
	}
	.select-icon.active img{
	  display:block;
	}
	.select-icon.active{
	  background:#26b1fe;
	}
	.good .select-icon{
	  margin-left:.26rem;
	  margin-top:.77rem;
	}
	.car-info-head .select .select-icon{
	  margin-left:.29rem;
	  margin-top:.25rem;
	  margin-right:.10rem;
	}
	.car-info-head .select .has-selected{
	  float:left;
	  margin-top:.08rem;
	  height:.72rem;
	  line-height:.72rem;
	  font-size:.28rem;
	  color:#000;
	}
	.car-info-head .select .has-selected span{
	  color:#666;
	}
	/*清空购物车*/
	.car-info-head .clear-car{
	  float:right;
	  width:2.20rem;
	  height:.80rem;
	  margin-right:.30rem;
	}
	.car-info-head .clear-car img{
	  float:left;
	  margin-top:.26rem;
	  width:.34rem;
	  height:.34rem;
	}
	.car-info-head .clear-car span{
	  float:left;
	  padding-left:.10rem;
	  margin-top:.10rem;
	  height:.70rem;
	  line-height:.70rem;
	  color:#666;
	  font-size:.30rem;
	}
</style>