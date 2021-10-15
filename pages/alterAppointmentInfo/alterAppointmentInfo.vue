<template>
	<view class="content" :style="{height:windowHeight+'px'}">
		<u-top-tips ref="uTips"></u-top-tips>
		<u-toast ref="uToast" />
		<view class="cardContainer">
			<u-card :show-head="false" :show-foot="false" margin="0 30rpx" @click="alterInfo">
				<view slot="body" class="cardBody">
					<view class="left">
						<u-avatar bg-color="#ecf5ff" :text="alterPersonalInfo.name[0]"></u-avatar>
					</view>
					<view class="right">
						<view class="top">
							<view class="name">{{alterPersonalInfo.name}}</view>
							<view class="phone">{{alterPersonalInfo.phone}}</view>
						</view>
						<view class="bot">
							<view>{{alterPersonalInfo.stuNO}}</view>
						</view>
					</view>
				</view>
			</u-card>
		</view>
		<view class="form">
			<u-form :model="form" ref="uForm" label-position="top" label-width="auto">
				<u-form-item label="预计前来时间段" prop="timeSlotId">
					<u-input @click="timeSlotShow= (timeSlot !== [])" v-model="selectedTimeSlot" type="select"
						:disabled="emptyTimeSlot" :placeholder="emptyTimeSlot?'当前无可用时间段':'请选择时间段'"></u-input>
					<u-select v-model="timeSlotShow" mode="mutil-column-auto" :list="timeSlot"
						@confirm="timeSlotConfirm">
					</u-select>
				</u-form-item>
				<u-form-item label="故障类型" prop="problemType">
					<u-input @click="problemTypeShow=true" v-model="form.problemType" type="select"></u-input>
					<u-select v-model="problemTypeShow" mode="mutil-column-auto" :list="problemTypes"
						@confirm="problemTypeConfirm"></u-select>
				</u-form-item>
				<u-form-item label="故障详情与描述" prop="problemDetail">
					<u-input type="textarea" v-model="form.problemDetail"></u-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="btnGroup">
			<u-button form-type="reset" ripple @click="reset" :custom-style="btnStyle" shape="circle">重置</u-button>
			<u-button form-type="submit" ripple type="primary" @click="submit" :custom-style="btnStyle" shape="circle"
				:loading="uploading">
				提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appointmentDetail:null,
				form: {
					timeSlotId: "",
					problemType: "",
					problemDetail: "",
				},
				timeSlot: [],
				selectedTimeSlot: "",
				timeSlotShow: false,
				problemTypes: [],
				problemTypeShow: false,
				rules: {
					timeSlotId: [{
						required: true,
						type: "number",
						message: ' ',
						trigger: ['change', 'blur']
					}],
					problemType: [{
						required: true,
						message: "请选择问题类型",
						trigger: ['change', 'blur']
					}],
				},
				btnStyle: {
					width: "300rpx",
					margin: "20rpx 40rpx"
				},
				windowHeight: 0,
				uploading: false,
				emptyTimeSlot: true,
			};
		},
		computed: {
			alterPersonalInfo() {
				return this.$store.state.alterPersonalInfo
			},
			ProblemType() {
				if (this.$store.state.activeProblemType && this.$store.state.activeProblemType.length > 0) {
					return this.$store.state.activeProblemType
				} else {
					return this.$store.state.preSetProblemType
				}
			},
		},
		onLoad(params){
			if(!params||!params['uuid']){
				uni.navigateBack({
					delta:1,
				})
				return;
			}
			this.uuid = params['uuid']
			this.$u.api.getAppointmentDetail(params['uuid']).then(res=>{
				console.log(res)
				this.appointmentDetail = res.data
				this.selectedTimeSlot = res.data.timeSlot
				this.form.problemType = res.data.problemType
				this.form.problemDetail = res.data.describe
				this.form.timeSlotId = res.data.slot_id
				this.$store.commit("setAlterPersonalInfo",res.data.sourcesInfo)
			})
			this.loadTimeSlot()
			this.loadProblemTypes()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.windowHeight = uni.getSystemInfoSync().windowHeight
		},
		methods:{
			submit() {
				this.$refs.uForm.validate(finished => {
					if (!finished) {
						let msg = "您未填写完成信息"
						if (this.timeSlot.length === 0) {
							msg = "当前无可预约时间段"
						}
						this.$refs.uTips.show({
							title: msg,
							type: "error",
							duration: 2000
						})
					} else {
						this.uploading = true
						//console.log(this.form)
						//console.log(this.uuid)
						this.$u.api.alterAppointment({
							uuid: this.uuid,
							form: this.form,
							info: this.alterPersonalInfo
						}).then(res => {
							if (res.code === 200) {
								this.$refs.uToast.show({
									title: '修改成功',
									type: 'success',
									callback() {
										uni.reLaunch({
											url: '/pages/appointmentList/appointmentList'
										})
									},
								})
							} else {
								this.uploading = false
								this.$refs.uToast.show({
									title: res.msg,
									type: 'error',
								})
							}
						})
					}
				})
			},
			reset() {
				this.$store.commit("setSelectPersonalInfoId", -1)
				this.form = {
					timeSlotId: "",
					problemType: "",
					problemDetail: "",
				}
				this.$refs.uForm.resetFields()
			},
			timeSlotConfirm(res) {
				//console.log(res)
				this.form.timeSlotId = res[1].value
				this.selectedTimeSlot = res[1].extra
			},
			problemTypeConfirm(res) {
				if (res[0].extra) {
					console.log("弹提示")
				}
				this.form.problemType = res[1].extra
			},
			loadTimeSlot() {
				this.$u.api.timeSlotList().then(res => {
					//console.log(res)
					if(res.code != 200||res.data.length == 0){
						this.$refs.uTips.show({
							title: "当前无可预约时间段",
							type: "error",
							duration: 2000
						})
						this.emptyTimeSlot = true
						return
					}
					this.emptyTimeSlot = false
					let cache = {}
					for (let item of res.data) {
						if (!(item.date in cache)) {
							cache[item.date] = []
						}
						cache[item.date].push({
							value: item.id,
							label: item.slot,
							extra: item.date + " " + item.slot
						})
					}
					this.timeSlot = []
					
					for (let key in cache) {
						this.timeSlot.push({
							label: key,
							children: cache[key]
						})
					}
					//console.log(this.timeSlot)
				})
			},
			loadProblemTypes() {
				console.log(this.ProblemType)
				this.problemTypes = []
				for (let item of this.ProblemType) {
					let children = []
					for (let sitem of item.subs) {
						children.push({
							label: sitem,
							extra: item.type + "-" + sitem,
						})
					}
					this.problemTypes.push({
						label: item.type,
						children: children,
						extra: item.message,
					})
				}
			},
			alterInfo() {
				uni.navigateTo({
					url: "../personalInfoSelect/personalInfoSelect?page=alterAppointmentInfo"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100%;
		background-color: $u-bg-color;
		display: flex;
		flex-direction: column;
	
		.form {
			margin: 10rpx 30rpx;
			padding: 30rpx;
			background-color: #FFFFFF;
			border-radius: 16rpx;
		}
	
		.btnGroup {
			display: flex;
			flex-direction: row;
			justify-content: center;
		}
	
		.cardContainer {
			padding-top: 30rpx;
	
			.cardBody {
				display: flex;
				flex-direction: row;
				align-items: center;
	
				.right {
					margin-left: 30rpx;
	
					.top {
						margin-bottom: 4rpx;
						display: flex;
						flex-direction: row;
						align-items: flex-end;
	
						.name {
							margin-right: 8rpx;
							font-size: medium;
							color: $u-main-color;
						}
	
						.phone {
							font-size: small;
							color: $u-tips-color;
						}
					}
	
					.bot {
						color: $u-main-color;
					}
				}
	
				.tips {
					color: $u-main-color;
				}
			}
		}
	
	}
</style>
