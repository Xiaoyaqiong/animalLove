<template>
	<view >

		<!-- 头部导航 -->
		<u-navbar :fixed="true" :autoBack="true"  :safeAreaInsetTop="true" :bgColor="navColor" leftIconSize="40rpx">


	</u-navbar>
		
		
	<view>
		<u-list :enableBackToTop="true" :showScrollbar="false"  lowerThreshold="50" @scroll="scrollChangeNav">

			<u-list-item>
				<!-- 首页图（此处还是用swiper） -->
					<view class="swpier">
						<u-swiper v-if="isShop==0" imgMode="aspectFill" height="320" circular :list="ShopDetail.images"></u-swiper>
						<u-swiper v-if="isShop==1" imgMode="aspectFill" height="320" circular :list="[ShopDetail.shopImg]"></u-swiper>
						
					</view>
			</u-list-item>
			
			
			<u-list-item>
				<!-- 课程简介 -->
				<view class="content">
					<view class="greenbox" v-if="isShop==0">
						<span class="yen">&yen;</span>{{ShopDetail.price}}
					</view>
					<view class="rate" v-if="isShop==1">
						<u-rate gutter="3" :value="ShopDetail.rate" readonly active-color="#FF6900"></u-rate>
					</view>
					
					
					<u--text v-if="isShop==1" :lines="2" size="1.5rem" class="content-title" :text="ShopDetail.shopName"></u--text>
					<u--text v-if="isShop==0" :lines="2" size="1.5rem" class="content-title" :text="ShopDetail.title"></u--text>
					<view class="detail">
						<view class="d1">
							<span class="distance">
								{{ShopDetail.distance}}
							</span>
							<span class="positon">{{ShopDetail.address}}</span>
						</view>
						
						<view class="d2" v-if="isShop==0">
							<view class="d2box">
								<p class="black">{{ShopDetail.goodsStocks}}</p>
								<p class="gray">库存</p>
							</view>
							
							<view class="d2box">
								<p class="black">{{ShopDetail.totalQuantity}}</p>
								<p class="gray">总数量</p>
							</view>
							

							
							
						</view>
						<view class="d2" v-if="isShop==1">
							<view class="d2box">
								<p class="black">235</p>
								<p class="gray">人气</p>
							</view>
							
							<view class="d2box">
								<p class="black">3569</p>
								<p class="gray">月销</p>
							</view>
							
						
							
							
						</view>
					
					</view>
					
					
					<view class="tags" v-for="item in ShopDetail.tags">
						<u-tag class="tag" :text="item" plain borderColor="#999" color="#999"> </u-tag>
					</view>
				
						
					</view>
				
				
				
				
				
					
			</u-list-item>
			
			
			<!-- <u-list-item> -->
				<!-- 老师简介 -->
			<!-- 	<view class="teacherbox">
							<view class="teachers" v-for="teachers in ShopDetail.teacher">
							<u-avatar style="margin-right: 23rpx;" size="50" :src="teachers.userAvatar"></u-avatar>
							<view class="teacherDetail">
								<p class="t1">授课老师</p>
								<p class="Tname">{{teachers.userName}}</p>
							</view>
						</view>
				</view> -->
			<!-- </u-list-item> -->
		
		
			<u-list-item>
				<!-- 商家简介 -->
				<view class="institutebox">
					<u-avatar v-if="isShop==0" :src="ShopDetail.shopAvatar"></u-avatar>
					<u-avatar  v-if="isShop==1"  :src="ShopDetail.shopImg"></u-avatar>
					
							<view class="institue">
								<p style="margin-bottom: 0.4rem;">{{ShopDetail.shopName}}</p>
								<p v-if="isShop==1">{{ShopDetail.introduction}}</p>
								<p v-if="isShop==0">{{ShopDetail.introducation}}</p>
							</view>
				</view>
			</u-list-item>
			
			
			<u-list-item>
				<!-- 用户评论区 -->
				<view class="userComments" v-if="isShop==0">
								<p style="margin-bottom: 1vh;font-size: 1rem;">用户评论</p>
								<view class="uc" v-for="(item,index) in ShopDetail.goodComment" :key="index">
									<view class="UD">
										<u-avatar style="margin-right: 23rpx;"  :src="item.avatar"></u-avatar>
										<view class="">
											<p class="username">{{item.userName}}</p>
											<p class="date">2023年6月1日 23:56:49</p>
										</view>
									</view>
												<view>
													<p class="commentDetail">{{item.content}}</p>
												</view>
											
									
								</view>
							
				</view>
				
				<view class="userComments" v-if="isShop==1">
								<p style="margin-bottom: 1vh;font-size: 1rem;">用户评论</p>
								<view class="uc" v-for="(item,index) in ShopDetail.shopComment" :key="index">
									<view class="UD">
										<u-avatar style="margin-right: 23rpx;"  :src="item.avatar"></u-avatar>
										<view class="">
											<p class="username">{{item.userName}}</p>
											<p class="date">2023年6月1日 23:56:49</p>
										</view>
									</view>
												<view>
													<p class="commentDetail">{{item.content}}</p>
												</view>
											
									
								</view>
							
				</view>
			</u-list-item>
			
			
			<u-list-item>
				<!-- 商品图片区 -->
				<view class="shopPic" v-for="item in ShopDetail.courseDetail">
							<u--image width="100%" mode="scaleToFill" height="400rpx" :showLoading="true" :src="item.picture" @click="click"></u--image>
				</view>
			</u-list-item>
			
			
			
		</u-list>
		
	</view>
		
	
		<view class="book">
			<span>
				<span class="yen"></span>
				<span class="yennum"></span>
			</span>
			<view class="bookbtn">
				<u-button v-if="isShop==0" shape="circle" text="购买" color="linear-gradient(to right, #FD88DD, #549BFF)" @tap="CommitBook"></u-button>
				<u-button v-if="isShop==1" shape="circle" text="咨询" color="linear-gradient(to right, #FD88DD, #549BFF)" @tap="talk"></u-button>
			</view>
		</view>
			
	</view>
	
</template>

<script>
	import MyBar from '@/components/MyNavbar.vue'
import { duration } from 'moment'
import myhttp from '../../../api/myhttp'
	
	export default{
		data(){
			return{
				navColor:'transparent',
				customBar:0,
				courseId:0,
				courseCover:[
					'../../../static/icon/discover/swiper/1.png'
				],
				isShop:0,
				ShopDetail:{
					
					price:"148",
					CourseName:"面向初中生的编程课",
					distance:'5km',
					coursePosition:'上海市黄浦区',
					courseStartTime:'2022.02.12',
					applicants:2679,
					courseTime:52,
					tags:[
						"课后督学","课后督学","课后督学"
					],
					teacherInfoVOList: [{
							teacherRole: 0,
							userAvatar: "https://picx.zhimg.com/v2-fec26ed51c078b163c77ee3760cb023f_xl.jpg?source=32738c0c",
							userName: "用户1"
						},
						{
							teacherRole: 1,
							userAvatar: "https://picx.zhimg.com/v2-fec26ed51c078b163c77ee3760cb023f_xl.jpg?source=32738c0c",
							userName: "用户2"
						}
					],
					institution:{
						userAvatar:'',
						name:'名师教育',
						desc:"关于uView的取名来由，首字母u来自于uni-app首字母，uni-app是基Vuejs，Vue和View(延伸为UI、视图之意)同音，同时view组件uni-app中最础最重要的组件，故取名uView，表达源于uni-app和Vue之意，同时在此也对它示感谢"
					},
					userComments:[
						{
							userName:'匿名',
							userAvatar:'https://picx.zhimg.com/v2-fec26ed51c078b163c77ee3760cb023f_xl.jpg?source=32738c0c',
							date:'2022.09.22',
							comment:'课程评价课程评价课程评价课程评价'
						},
						{
							userName:'匿名2',
							userAvatar:'https://picx.zhimg.com/v2-fec26ed51c078b163c77ee3760cb023f_xl.jpg?source=32738c0c',
							date:'2022.09.22',
							comment:'课程评价课程评价课程评价课程评价'
						},
						{
							userName:'匿名2',
							userAvatar:'https://picx.zhimg.com/v2-fec26ed51c078b163c77ee3760cb023f_xl.jpg?source=32738c0c',
							date:'2022.09.22',
							comment:'课程评价课程评价课程评价课程评价'
						},
						{
							userName:'匿名2',
							userAvatar:'https://picx.zhimg.com/v2-fec26ed51c078b163c77ee3760cb023f_xl.jpg?source=32738c0c',
							date:'2022.09.22',
							comment:'课程评价'
						}
						
					],
					shopImg:[
						'https://picx.zhimg.com/v2-fec26ed51c078b163c77ee3760cb023f_xl.jpg?source=32738c0c',
						'https://picx.zhimg.com/v2-fec26ed51c078b163c77ee3760cb023f_xl.jpg?source=32738c0c',
						'https://picx.zhimg.com/v2-fec26ed51c078b163c77ee3760cb023f_xl.jpg?source=32738c0c'
					]
				},
			}
		},
		
	methods:{
		// 滚动Nav变化
		scrollChangeNav(scrollTop){
			
			if(scrollTop < this.customBar){
				this.navColor = 'transparent'
			}
			if(scrollTop != 0){
				this.navColor ='#fff'
			}
		},
		talk(){
			
		},
		CommitBook(){
			myhttp.post('/users/orders/addOrder',{
				"count": 1,
				"goodId": this.ShopDetail.id,
				"orderRemark": "无",
				"shipAddressId": 0,
				"title": this.ShopDetail.title,
				"totalFee": this.ShopDetail.price
			}).then(res=>{
				
			})
			uni.showToast({
				title:'已加入订单！',
				duration:1000
			})
			setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/profile/SecondPages/MyOrder',
					
				})
			},1100)
			
		}
	},
		
	onLoad(data){
		console.log(data);
		if(data.shopId){
			// 商家详细初始化
			myhttp.get(`/users/goods/getShop/`+data.shopId).then(res=>{
				console.log(res);
				this.ShopDetail = res
				// this.ShopDetail.goodComment = res.goodComment
				// this.ShopDetail.goodComment.createTime = uni.$u.timeFormat(this.ShopDetail.goodComment.createTime,'yyyy年mm月dd日')
				this.isShop = 1;	// 是否点击商家 1为是 0为否
			})
		}else if (data.goodId){
			// 商品详细初始化
			myhttp.get(`/users/goods/getGood/`+data.goodId).then(res=>{
				console.log(res);
				this.ShopDetail = res.good
				this.ShopDetail.goodComment = res.goodComment
				this.ShopDetail.goodComment.createTime = uni.$u.timeFormat(this.ShopDetail.goodComment.createTime,'yyyy年mm月dd日')
				this.isShop = 0;
			})
		}
		
		
		
	
		
		
	}
	}
</script>


<style lang="scss">
	@import "ShopDetail.scss";
	
	// nav部分按钮
	.u-nav-slot{
		display: flex;
		gap: 3vw;
	}
	
	
</style>