<template>
	<view class="content" :style="{ height : windowHeight+'px'}">
		<view class="top">
			<view class="title">
				目前进程
			</view>
			<u-steps :list="stepList" mode="number" :current="appointmentDetail.status - 1" class="steps" un-active-color="#606266"></u-steps>
			<view class="tips">{{tipsText}}</view>
		</view>
		<view class="qrcode">
			<qrcode ref="qrcode"></qrcode>
		</view>
	</view>
</template>

<script>
	import qrcode from "../../uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue"
	export default {
		components:{
			qrcode
		},
		onShow() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight
		},
		onLoad(params) {
			if(!params||!params['uuid']){
				uni.navigateBack({
					delta:1,
				})
				return;
			}
			this.uuid = params['uuid']
			this.$u.api.getAppointmentDetail(params['uuid']).then(res=>{
				// console.log(res)
				this.appointmentDetail = res.data
			})
			this.$refs.qrcode.make({
				size:200,
				text:this.uuid
			})
		},
		computed:{
			tipsText(){
				switch(this.appointmentDetail.status){
					case 1:
						return `请于${this.appointmentDetail.timeSlot}到达后勤楼319出示二维码签到`;
					case 2:
						return `请等待工作人员扫码并开始处理`;
					case 3:
						return `请耐心等待工作人员处理`;
					case 4:
						return `服务已完成,欢迎下次光临`;
				}
			}
		},
		data() {
			return {
				uuid:null,
				appointmentDetail:null,
				stepList:[
					{
						name:"预约成功"
					},
					{
						name:"签到成功"
					},
					{
						name:"正在处理"
					},
					{
						name:"处理完成"
					},
				],
				windowHeight:750,
			}

		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: $u-bg-color;
		display: flex;
		flex-direction: column;
		.top{
			flex-direction: column;
			justify-content: center;
			align-items: center;
			display: flex;
			margin: 60rpx 0;
			.title{
				text-align: center;
				color: $u-main-color;
				font-size: large;
				font-weight: bold;
			}
			.steps{
				width: 100%;
				margin: 40rpx;
			}
			.tips{
				margin: 0 40rpx;
				text-align: center;
				color: $u-tips-color;
				font-size: small;
			}
		}
		.qrcode{
			display: flex;
			justify-content: center;
		}
	}
</style>
