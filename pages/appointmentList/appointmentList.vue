<template>
	<view class="content">
		<u-toast ref="toast"></u-toast>
		<u-modal 
		v-model="modalShow" 
		:mask-close-able="true" 
		:show-cancel-button="true" 
		title="取消确认" 
		:content="alarmText" 
		@confirm="confirm" 
		@cancel="modalShow=false" 
		:async-close="true"
		></u-modal>
		<u-sticky>
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="current" @change="tabsChange" :is-scroll="false"
			swiperWidth="750"></u-tabs-swiper>
		</u-sticky>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" :style="{height:swiperHeight+'px'}">
			<swiper-item>
				<u-empty text="无未进行预约" mode="list" v-if="upcoming.length === 0"></u-empty>
				<scroll-view scroll-y v-else enable-flex show-scrollbar :style="{height:swiperHeight+'px' }">
					<appointment-card
					v-for="(item, index) in upcoming"  :key="item.id"
					:ID="item.id"
					:UUID="item.uuid"
					:problemType="item.problemType"
					:status="item.status"
					:name="item.name"
					:stuNO="item.stuNO"
					:timeSlot="item.timeSlot"
					@startCancel="preCancel"
					></appointment-card>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<u-empty text="无正在进行预约" mode="list" v-if="doing.length === 0 "></u-empty>
				<scroll-view scroll-y v-else enable-flex show-scrollbar :style="{height:swiperHeight+'px' }">
					<appointment-card
					v-for="(item, index) in doing"  :key="item.id"
					:ID="item.id"
					:UUID="item.uuid"
					:problemType="item.problemType"
					:status="item.status"
					:name="item.name"
					:stuNO="item.stuNO"
					:timeSlot="item.timeSlot"
					@startCancel="preCancel"
					></appointment-card>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<u-empty text="无已完成预约" mode="list" v-if="finish.length === 0"></u-empty>
				<scroll-view scroll-y v-else enable-flex show-scrollbar :style="{height:swiperHeight+'px' }">
					<appointment-card
					v-for="(item, index) in finish"  :key="item.id"
					:ID="item.id"
					:UUID="item.uuid"
					:problemType="item.problemType"
					:status="item.status"
					:name="item.name"
					:stuNO="item.stuNO"
					:timeSlot="item.timeSlot"
					@startCancel="preCancel"
					></appointment-card>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<u-empty text="您还没有进行过预约" mode="list" v-if="all.length === 0"></u-empty>
				<scroll-view  scroll-y v-else enable-flex show-scrollbar :style="{height:swiperHeight+'px' }">
					<appointment-card 
					v-for="(item, index) in all"  :key="item.id"
					:ID="item.id"
					:UUID="item.uuid"
					:problemType="item.problemType"
					:status="item.status"
					:name="item.name"
					:stuNO="item.stuNO"
					:timeSlot="item.timeSlot"
					@startCancel="preCancel"
					></appointment-card>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import appointmentCard from "../../component/appointmentCard.vue";
	export default {
		components:{
			appointmentCard,
		},
		data() {
			return {
				modalShow:false,
				alarmText:"",
				cancelUUID:"",
				tabList:[
					{
						name:"待服务",
					},
					{
						name:"正在服务",
					},
					{
						name:"已完成",
					},
					{
						name:"全部",
					},
				],
				swiperCurrent:0,
				current:0,
				upcoming:[],
				doing:[],
				finish:[],
				all:[],
				swiperHeight:0,
			};
		},
		onShow() {
			this.swiperHeight = uni.getSystemInfoSync().windowHeight - 40
			this.loadList()
		},
		methods:{
			tabsChange(index){
				this.swiperCurrent = index
			},
			transition(e){
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx)
			},
			animationfinish(e){
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.current = current;
			},
			loadList(){
				this.$u.api.getAppointmentList().then(res=>{
					if(res.code === 200){
						this.upcoming = []
						this.doing = []
						this.finish = []
						this.all = res.data
						for(let item of res.data){
							if(item.status === 1){
								this.upcoming.push(item)
							}else if(item.status === 2||item.status === 3){
								this.doing.push(item)
							}else if(item.status === 4){
								this.finish.push(item)
							}
						}
					}
					console.log(this.all)
				})
			},
			preCancel(uuid,timeSlot,problemType){
				this.modalShow = true
				this.alarmText = `您正在取消\n${timeSlot}  \n${problemType}\n的预约`
				this.cancelUUID = uuid
			},
			confirm(){
				this.$u.api.cancelAppointment(this.cancelUUID).then(res=>{
					this.loadList()
					this.modalShow = false
					this.$refs.toast.show({
						title:"取消成功",
						type: "success",
					})
				})
			},
			showToast(title,type){
				this.$refs.toast.show({
					title:title,
					type: type,
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #F3F4F6;
	}
</style>
