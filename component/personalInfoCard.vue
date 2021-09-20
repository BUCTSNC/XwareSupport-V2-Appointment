<template>
	<u-swipe-action :show="show" :options="options" @click="reflect" :index="index" @open="open">
		<u-card
		:show-head="false" :show-foot="false" margin="0"
		:head-border-bottom="false"
		@click="select"
		>
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
	</u-swipe-action>
</template>

<script>
	export default {
		props:{
			
			info:{
				type:Object,
				required:true,
			},
			index:{
				type:Number,
				required:true,
			}
		},
		data(){
			return{
				options:[
					{
						text: "修改",
						style:{
							backgroundColor: "#2979ff",
						}
					},
					{
						text: "删除",
						style:{
							backgroundColor: "#fa3534",
						}
					}
				],
				show:false
			}
		},
		methods:{
			reflect(index1, oprationIndex){
				this.show = false
				if(oprationIndex === 0)
				{
					uni.navigateTo({
							url:`../editInfoCard/editInfoCard?id=${this.index}`
						})
				}
				else if(oprationIndex === 1){
					this.$emit("delete",this.index)
				}
			},
			select(){
				this.$emit("click",this.index)
			},
			open(){
				this.show = true
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
