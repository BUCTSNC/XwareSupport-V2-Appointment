<template>
	<view class="content" :style="{ height : windowHeight+'px'}">
		<view class="top">
			<view class="title">
				目前进程
			</view>
			<u-steps :list="stepList" mode="number" :current="appointmentDetail.status - 1" class="steps" un-active-color="#606266"></u-steps>
			<view class="tips">{{tipsText}}</view>
		</view>
		<!-- <view class="qrcode">
			<qrcode ref="qrcode"></qrcode>
		</view> -->
		<view class="qrcode">
			<canvas id="qrcode" canvas-id="qrcode" :style="{'width': `${size}px`, 'height': `${size}px`}" />
		</view>
	</view>
</template>

<script>
	import qrcode from "../../uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue"
	import uQRCode from "../../uni_modules/Sansnn-uQRCode/components/uqrcode/common/uqrcode.js"
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
			//console.log(this.uuid)
			this.$u.api.getAppointmentDetail(params['uuid']).then(res=>{
				//console.log(res)
				this.appointmentDetail = res.data
			})
			
			// this.$refs.qrcode.make({
			// 	size:50,
			// 	text:this.uuid
			// })
		},
		onReady() {
		    let modules = uQRCode.getModules({
		      text: this.uuid,
		      errorCorrectLevel: uQRCode.errorCorrectLevel.H
		    })
		    let tileSize = (this.size - this.margin * 2) / modules.length
		    // 获取绘图所需的上下文
		    let ctx = uni.createCanvasContext('qrcode', this)
		    // 开始绘制
		    ctx.setFillStyle(this.backgroundColor)
		    ctx.fillRect(0, 0, this.size, this.size)
		    for (var row = 0; row < modules.length; row++) {
		      for (var col = 0; col < modules.length; col++) {
		        // 计算每一个小块的位置
		        var x = col * tileSize + this.margin
		        var y = row * tileSize + this.margin
		        var w = tileSize
		        var h = tileSize
		
		        var style = modules[row][col] ? this.foregroundColor : this.backgroundColor
		        ctx.setFillStyle(style)
		        ctx.fillRect(x, y, w, h)
		      }
		    }
		    ctx.draw()
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
			},
		},
		data() {
			return {
				uuid:null,
				size: 256,
			    margin: 10,
			    backgroundColor: '#FFFFFF',
			    foregroundColor: '#000000',
				appointmentDetail:{status:null},
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
		// .qrcodebg canvas {
		//         margin-left: 25upx;
		//         width: 170upx;
		//         height: 170upx;
		//         border: #BBBBBB solid 5upx;
		// }
	}
</style>
