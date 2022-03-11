<template>
	<view class="content">
		<view class="list0">
			<u-button class="head"  shape="circle" size="mini" plain ripple>当前预约人信息</u-button>
		
			<view class="body">
				<view class="sub">
					<view class="left">
						<u-avatar bg-color="#ecf5ff" :text="personalInfos.name[0]"></u-avatar>
						<view class="name">{{personalInfos.name}}</view>
					</view>
					<view class="right" v-if="reserveID==100">
						<view class="top">
							<view class="phone">电话:</view>
							<view class="phone2">{{personalInfos.phone}}</view>
						</view>
						<view class="bot">
							<view>工学号:</view>
							<view class="idnum">{{personalInfos.stuNO}}</view>
						</view>
					</view>
				</view>
			</view>
		</u-card>
		</view>
		<view class="list1" v-if="allInfo&&allInfo.length!=0">
			<u-button class="head"  shape="circle" size="mini" plain ripple>可选择预约人信息</u-button>
			<personalInfoCard v-for="(item,index) in allInfo" :info="item" :key="index" :index="index" :reserveID="reserveID" @delete="del" 
			@click="select"
			>
			</personalInfoCard>
		</view>
		<view class="empty" v-else :style="{height:windowHeight+'px'}">
			<u-empty text="无预约人信息" mode="list"></u-empty>
		</view>
		<view class="addMore">
			<u-button type="primary" @click="addMore">添加新预约人</u-button>
		</view>
	</view>
</template>

<script>
	import personalInfoCard from "../../component/personalInfoCard.vue";
	export default {
		components: {
			personalInfoCard
		},
		data() {
			return {
				uid:'',
				allInfo: [],
				windowHeight: 0,
				reserveID: 99,
				personalInfos:{
					name:'',
					phone:'',
					stuNO:'',
				}
			};
		},
		onShow() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			this.allInfo = uni.getStorageSync("personalInfo")
			// this.getPersonalInfo()
		},
		methods: {
			onLoad(params){
				this.uid = params['uuid']
				this.personalInfos.name = params['name']
				this.personalInfos.phone = params['phone']
				this.personalInfos.stuNO = params['stuNO']
				console.log("this.uid:",this.uid,"this.personalinfos:",this.personalInfos)
				let that = this
				this.$u.api.getID().then(res=>{
					that.reserveID = res.data
				})
			},
			addMore() {
				uni.navigateTo({
					url: `../editInfoCard/editInfoCard`
				})
			},
			select(index){
				// console.log(index)
				this.$store.commit("setSelectPersonalInfoId",index)
				uni.navigateBack()
			},
			del(index){
				this.allInfo.splice(index,1);
				uni.setStorageSync("personalInfo",this.allInfo)
				if(this.$store.state.selectPersonalInfoId === index){
					this.$store.commit("setSelectPersonalInfoId",-1)
				}else if(this.$store.state.selectPersonalInfoId > index){
					this.$store.commit("setSelectPersonalInfoId",this.$store.state.selectPersonalInfoId - 1)
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: $u-bg-color;
		.list0{
			text-align: center;
			background-color: #ff55ff;
			.body{
				background-color: white;
				display: flex;
				flex-direction: row;
				align-items: center;
				.sub{
					margin-left: 200rpx;
					margin-top: 2%;
					.left{
						display: flex;
						flex-direction: row;
						margin-left: 22rpx;
						.name{
							margin-top: 20rpx;
							margin-left: 20rpx;
							font-size: large;
							color: $u-main-color;
						}
					}
					.right{
						margin-left: 30rpx;
						.top{
							margin-bottom: 4rpx;
							display: flex;
							flex-direction: row;
							align-items: flex-end;
							.phone{
								font-size: small;
								color: 	black;
								margin-top: 1%;
								margin-bottom: 1%;
								// color: $u-tips-color;
							}
							.phone2{
								margin-left: 4%;
								font-size: small;
								color: 	black;
								// color: $u-tips-color;
							}
						}
						.bot{
							color: $u-main-color;
							font-size: small;
							margin-bottom: 5%;
							color: 	black;
							display: flex;
							flex-direction: row;
							.idnum{
								
							}
						}
					}
				}
				
			}
		}
		.list1{
			text-align: center;
			background-color: #007AFF;
			
			.head{
				text-align: center;
				color: hotpink;
			}	
		}
		
		.addMore {
			position: fixed;
			left: 125rpx;
			bottom: 100rpx;
			z-index: 100;
			text-align: center;
			height: 50rpx;
			width: 500rpx;
		}
	}
</style>
