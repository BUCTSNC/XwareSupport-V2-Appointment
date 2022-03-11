<template>
	<!-- <view class="content" :style="{ height : windowHeight+'px'}" >
		<view class="list">
			<u-button type="primary" ripple @click="startMakeAppointment">开始预约</u-button>
			<u-button type="primary" ripple @click="historyAppointment">预约记录</u-button>
			<u-button type="primary" ripple @click="personalInfomation">个人信息</u-button>
		</view>
	</view> -->
	<view class="main">
		<view class="head-bgm">
			<view class="head">
				<image src="../../static/notice.png" class="pic"></image>
				<div class="scroll">
					<span>欢迎使用学生网络中心X-ware服务，我们将竭诚为您服务！</span>
				</div>
			</view>
		</view>
		
		<view class="content-body1">
			<view class="body1-head">预约公告</view>
			<view class="body1-divide"></view>
			<view class="body1-content">
				<swiper duration="2000" circular="true" autoplay="true" indicator-dots="true" indicator-color="rgb(100,123,240)" style="height: 400rpx;" >
					<swiper-item v-for="(item,index) in swipers" :key="index">
						<image :src="item" class="body1-content-pic"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="content-body2">
			<view class="body2-head">预约功能</view>
			<view class="body2-divide"></view>
			<view class="inner-bigbox2">
				<view class="inner-box" @click="startMakeAppointment">
					<image src="../../static/reservation.png" class="inner-inner-img"></image>
					<view class="inner-inner-box">开始预约</view>
				</view>
				<view class="inner-box" @click="historyAppointment">
					<image src="../../static/record.png" class="inner-inner-img"></image>
					<view class="inner-inner-box">预约记录</view>
				</view>
				<view class="inner-box" @click="personalInfomation">
					<image src="../../static/pci3.png" class="inner-inner-img"></image>
					<view class="inner-inner-box">个人信息</view>
				</view>
			</view>
		</view>
		
		<view class="rear">
			<view class="rear-text">北京化工大学学生网络中心</view>
			<image src="../../static/modify.png" class="rear-ico"></image>
		</view>
		<view class="nonebox"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight:0,
				swipers:["../../static/test1.png"],
			}
		},
		onShow(){
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			let that = this
			uni.login({
				complete: (res) => {
					// console.log(res)
					that.$u.api.login(res.code).then(res=>{
					//	console.log(res)
					})
				},
				fail: (res) => {
					console.log("fail",res)
				}
			})
		},
		onShareAppMessage: function(e) {
			let title = '一个非常实用值得关注的小程序！！'
			return {
				title: title,
				path: 'pages/index/index'
			}
		},
		
		onShareTimeline() {
			let data = {
				title: "一个非常实用值得关注的小程序！！", // 默认是小程序的名称
				path: '/pages/index/index', // 页面路径，默认是当前页面，必须是以‘/’开头的完整路径
				// imageUrl: '', // 图片封面，本地文件路径、网络图片路，支持PNG及JPG，默认当前页面截图，显示图片长宽比是 5:4。
				success: res => {
					// 分享成功
					if (res.errMsg == 'shareAppMessage:ok') {}
				},
				fail: res => {
					// 用户取消
					if (res.errMsg == 'shareAppMessage:fail cancel') {}
					// 分享失败
					if (res.errMsg == 'shareAppMessage:fail') {}
				},
				complete: res => {}
			}
			return data
		},
		
		
		
		methods: {
			personalInfomation(){
				uni.redirectTo({
					url:"../personalInfoSelect/personalInfoSelect"
				})
			},
			startMakeAppointment(){
				uni.redirectTo({
					url:"../makeAppointment/makeAppointment"
				})
			},
			historyAppointment(){
				uni.redirectTo({
					url:"../appointmentList/appointmentList"
				})
			}
		}
	}
</script>

<style lang="scss">
	.main{
		background-image: linear-gradient(#00BFFF,#00BFFF,#AFEEEE,#F0FFFF,#F0FFFF,#F0FFFF,#F0FFFF,#F0FFFF,#F0FFFF);
		padding-top: 3%;
		// background-image: linear-gradient(to right, blueviolet, greenyellow, deepskyblue , yellow);
		.head-bgm{
			background-image: url("../../static/bgm.png");
			.head{
				margin-left: 7%;
				margin-right: 7%;
				// margin-top: 3%;
				display: flex;
				flex-direction: row;
				vertical-align:middle;
				//background-color: white;
				.pic{
					width: 50rpx;
					height: 50rpx;
					margin-right: 5rpx;
					padding: 0;
				}
				.scroll{
				      width: 88%;
				      height: 50rpx;
				      line-height: 50rpx;
				      white-space: nowrap;
				      overflow: hidden;
				      font-size: 35rpx;
					  color: #1C1C1C;
				    }
				    .scroll span{
				      display: inline-block;/*inline样式不能使用动画*/
				      animation: scroll 20s linear infinite;
				    }
				    @keyframes scroll {
				      from {
				        transform: translateX(200px)
				      }
				      to {
				        transform: translateX(-100%)
				      }
				    }
			}
		}
		.content-body1{
			margin-top: 10%;
			background-color: #E0FFFF;
			height: 500rpx;
			width: 92%;
			margin-left: 4%;
			margin-right: 4%;
			display: flex;
			flex-direction: column;
			border-radius: 40rpx;
			.body1-head{
				font-size: larger;
				font-weight: bolder;
				line-height: 100rpx;
				height: 20%;
				text-align: center;
				font-size: larger;
			}
			.body1-divide{
				border-bottom:1px solid #000;
				height: 1px;
				width:100%;
			}
			.body1-content{
				height: 400rpx;
				background-color: white;
				border-radius: 40rpx;
				.body1-content-pic{
					border-radius: 40rpx;
					height: 400rpx;
					width: 100%;
				}
				
			}
		}
		.content-body2{
			margin-top: 11%;
			margin-left: 4%;
			margin-right: 4%;
			width: 92%;
			height: 450rpx;
			background-color: #87CEFF;//#87CEFA;
			border-radius: 40rpx;
			.body2-head{
				font-size: larger;
				font-weight: bolder;
				line-height: 112.5rpx;
				height: 25%;
				text-align: center;	
				font-size: larger;
			}
			.body2-divide{
				border-bottom:1px solid #000;
				height: 1px;
				width:100%;
			}
			.inner-bigbox2{
				display: flex;
				flex-direction: row;
				.inner-box{
					display: flex;
					flex-direction: column;
					margin-top: 9%;
					text-align: center;
					margin-left: 3.5%;
					height: 200rpx;
					width: 29%;
					background-color: white;
					border-radius: 30rpx;
					.inner-inner-img{
						margin-top: 15%;
						margin-left: 25%;
						height: 100rpx;
						width: 100rpx;
					}
					.inner-inner-box{
						margin-top: 5rpx;
					}
				}
			}
		}
		
		.rear{
			display: flex;
			flex-direction: row;
			margin-top: 32%;
			.rear-text{
				margin-left: 30%;
				text-align: right;
				height: 30rpx;
			}
			.rear-ico{
				padding-top: 0.5%;
				margin-left: 10rpx;
				height: 30rpx;
				width: 30rpx;
			}
		}
		.nonebox{
			height: 20rpx;
			padding-top: 5%;
		}
	}
	// .content{
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: center;
	// 	align-items: center;
	// 	background-color: #F3F4F6;
	// 	.list{
	// 		width: 100%;
	// 		display: flex;
	// 		flex-direction: column;
	// 		align-items: center;
	// 		u-button{
	// 			width: 50%;
	// 			margin: 0 0 150rpx 0;
	// 		}
	// 	}
	// }
</style>
