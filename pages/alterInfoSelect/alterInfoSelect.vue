<template>
	<view class="content">
		<view class="list" v-if="allInfo&&allInfo.length!=0">
			<u-card
			:show-head="false" :show-foot="false" margin="0"
			:head-border-bottom="false" v-for="(item,index) in allInfo" :info="item" :key="index" :index="index" @click="select">
				<view slot="body" class="body">
					<view class="left">
						<u-avatar bg-color="#ecf5ff" :text="info.name[0]"></u-avatar>
					</view>
					<view class="right">
						<view class="top">
							<view class="name">{{info.name}}</view>
							<view class="phone">{{info.phone}}</view>
						</view>
						<view class="bot">
							<view>{{info.stuNO}}</view>
						</view>
					</view>
				</view>
			</u-card>
		</view>
		<view class="empty" v-else :style="{height:windowHeight+'px'}">
			<u-empty text="无预约人信息" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				allInfo:[],
				windowHeight: 0,
			};
		},
		onShow() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			this.allInfo = uni.getStorageSync("personalInfo")
			console.log(this.allInfo)
		},
		methods: {
			select(index){
				uni.navigateTo({
					url:`../alterinfoSelect/alterInfoSelect?personalInfo=${this.allInfo[index]}`,
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: $u-bg-color;
		.body{
			display: flex;
			flex-direction: row;
			align-items: center;
			.right{
				margin-left: 30rpx;
				.top{
					margin-bottom: 4rpx;
					display: flex;
					flex-direction: row;
					align-items: flex-end;
					.name{
						margin-right: 8rpx;
						font-size: medium;
						color: $u-main-color;
					}
					.phone{
						font-size: small;
						color: $u-tips-color;
					}
				}
				.bot{
					color: $u-main-color;
				}
			}
		}
	}
</style>
