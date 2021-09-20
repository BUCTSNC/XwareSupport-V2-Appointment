<template>
	<view class="content">
		<view class="list" v-if="allInfo&&allInfo.length!=0">
			<personalInfoCard v-for="(item,index) in allInfo" :info="item" :key="index" :index="index" @delete="del"
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
				allInfo: [],
				windowHeight: 0,
			};
		},
		onShow() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			this.allInfo = uni.getStorageSync("personalInfo")
		},
		methods: {
			addMore() {
				uni.navigateTo({
					url: `../editInfoCard/editInfoCard`
				})
			},
			select(index){
				console.log(index)
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
