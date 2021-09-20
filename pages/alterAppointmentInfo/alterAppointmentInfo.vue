<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appointmentDetail:null
			};
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
			})
		}
	}
</script>

<style lang="scss">

</style>
