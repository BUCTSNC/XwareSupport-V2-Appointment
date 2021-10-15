<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$u.api.problemTypeList().then(res=>{
				this.$store.commit("setActiveProblemType",res.data)
				// console.log(this.$store.state.activeProblemType)
			})
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import "uview-ui/index.scss";
</style>