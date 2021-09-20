<template>
	<view class="content" :style="{ height : windowHeight+'px'}" >
		<view class="list">
			<u-button type="primary" ripple @click="startMakeAppointment">开始预约</u-button>
			<u-button type="primary" ripple @click="historyAppointment">预约记录</u-button>
			<u-button type="primary" ripple @click="personalInfomation">个人信息</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight:0
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
		methods: {
			personalInfomation(){
				console.log("跳转个人信息页")
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
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #F3F4F6;
		.list{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			u-button{
				width: 50%;
				margin: 0 0 150rpx 0;
			}
		}
	}
</style>
