<template>
	<u-card padding="0" @head-click="jump" @body-click="jump">
		<view slot="head" class="head">
			<view class="left">{{problemType}}</view>
			<view class="right" v-if="status!=0">
				查看详情&ensp;>
			</view>
		</view>
		<view slot="body" class="body">
			<view class="info">
				<text class="title">预约号</text>
				<text class="detail">{{ID}}</text>
			</view>
			<view class="info">
				<text class="title">时间段</text>
				<text class="detail">{{timeSlot}}</text>
			</view>
			<view class="info">
				<text class="title">申请人</text>
				<text class="detail">{{stuNO}} - {{name}}</text>
			</view>
			<view class="info">
				<text class="title">预约状态</text>
				<text class="detail" :style="{color:statusColor}">{{statusText}}</text>
			</view>
		</view>
		<view slot="foot" class="foot">
			<u-button v-if="status==1" class="btn" type="error" shape="circle" size="mini" plain ripple @click="cancelConfirm">取消预约</u-button>
			<u-button v-if="status==1" class="btn" type="primary" shape="circle" size="mini" plain ripple @click="alterInfo" >修改信息</u-button>
			<u-button v-if="status==4" class="btn" type="primary" shape="circle" size="mini" plain ripple>评价</u-button>
		</view>
	</u-card>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			jump() {
				if(this.status>=5 || this.status<1){
					return;
				}
				uni.navigateTo({
					url: `../appointmentSteps/appointmentSteps?uuid=${this.UUID}`,
					fail(res) {
						console.log(res)
					}
				})
			},
			cancelConfirm(){
				this.$emit("startCancel",this.UUID,this.timeSlot,this.problemType)
			},
			alterInfo(){
				uni.navigateTo({
					url: `../alterAppointmentInfo/alterAppointmentInfo?uuid=${this.UUID}`,
				})
			}
		},
		props: {
			name: {
				type: String,
				required: true,
			},
			UUID: {
				type: String,
				required: true,
			},
			problemType: {
				type: String,
				required: true
			},
			status: {
				type: Number,
				required: true
			},
			stuNO: {
				type: String,
				required: true
			},
			timeSlot: {
				type: String,
				required: true,
			},
			ID: {
				type: Number,
				required: true,
			}
		},
		computed: {
			statusText() {
				switch (this.status) {
					case 0:
						return "预约取消";
					case 1:
						return "预约成功";
					case 2:
						return "签到成功";
					case 3:
						return "正在维修";
					case 4:
						return "维修完成";
					case 5:
						return "预约失效";
					default:
						return "undefined"
				}
			},
			statusColor() {
				switch (this.status) {
					case 0:
						return "#909099";
					case 1:
						return "#19be6b";
					case 2:
						return "#19be6b";
					case 3:
						return "#ff9900";
					case 4:
						return "#19be6b";
					case 5:
						return "#909099";
					default:
						return "#fa3534";
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	$leftPadding:40rpx;
	.head {
		background-color: rgb(255, 255, 255);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 10rpx 10rpx $leftPadding;

		.left {
			display: inline-block;
			color: #303133;
			font-size: medium;
			font-weight: 540;
		}

		.right {
			display: inline-block;
			font-weight: 200;
			font-size: smaller;
			color: #c0c4cc;
		}
	}

	.body {
		background-color: rgb(250, 250, 250);
		padding: 10rpx 0 10rpx $leftPadding;
		display: flex;
		flex-direction: column;

		.info {
			font-size: small;
			color: #909399;
			margin: 10rpx 0;

			.title {
				display: inline-block;
				text-align: justify;
				text-align-last: justify;
				width: 120rpx;

				margin-right: 10rpx:after {
					content: ":";
					width: 100%;
				}
			}
		}
	}
	.foot{
		background-color: rgb(250, 250, 250);
		padding: 10rpx 4rpx;
		display: flex;
		justify-content: flex-end;
		.btn{
			margin: 0 10rpx;
		}
		
	}
</style>
