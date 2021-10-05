<template>
	<view class="content" :style="{height:windowHeight+'px'}">
		<view class="form">
			<u-form :model="form" ref="uForm" label-width="150" label-align="left">
				<u-form-item label="姓名" prop="name" left-icon="account">
					<u-input v-model="form.name" placeholder="请输入姓名"></u-input>
				</u-form-item>
				<u-form-item label="学号" prop="stuNO" left-icon="info">
					<u-input v-model="form.stuNO" placeholder="请输入学号"></u-input>
				</u-form-item>
				<u-form-item label="手机号" prop="phone" left-icon="phone">
					<u-input v-model="form.phone" placeholder="请输入手机号"></u-input>
				</u-form-item>
				<u-form-item label="专业" prop="major" left-icon="edit-pen">
					<u-input v-model="form.major" placeholder="请输入专业"></u-input>
				</u-form-item>
			</u-form>
		</view>
		<u-button shape="circle" type="primary" @click="save" :custom-style="btnCustomStyle">保存并返回</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: "",
					stuNO: "",
					phone: "",
					major: "",
				},
				rules: {
					stuNO: [{
							required: true,
							message: "请输入学号/工号",
							trigger: ["change", "blur"]
						},
						{
							min: 10,
							max: 10,
							message: "请输入正确的学号或工号",
							trigger: "blur"
						}
					],
					name: [{
						required: true,
						message: "请输入姓名",
						trigger: ["change", "blur"]
					}],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						},
					],
				},
				id: -1,
				allInfo: [],
				windowHeight: 0,
				btnCustomStyle: {
					marginTop: "20rpx",
					width: "500rpx"
				}
			};
		},
		onLoad(params) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			this.allInfo = uni.getStorageSync("personalInfo")
			if(!(this.allInfo instanceof Array)){
				this.allInfo = []
			}
			this.$refs.uForm.setRules(this.rules)
			if (params.id && params.id != -1) {
				this.id = Number.parseInt(params.id)
				this.form = this.allInfo[this.id]
			}
		},
		methods: {
			save() {
				this.$refs.uForm.validate((res) => {
					console.log(res)
					if (!res) {
						return;
					}
					
					if (this.id != -1) {
						this.allInfo[this.id] = this.form
					} else {
						this.allInfo.push(this.form)
					}
					console.log(this.allInfo)
					uni.setStorageSync("personalInfo", this.allInfo)
					uni.navigateBack({
					})
				})


			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: $u-bg-color;
		.form {
			padding: 0 20rpx;
		}
	}
</style>
