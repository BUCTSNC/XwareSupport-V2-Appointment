import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const config = {
    state:{//存放状态
        preSetProblemType:[
			{
				type:"硬件问题",
				message:"",
				subs:[
					"清灰",
				]
			},
			{
				type:"软件问题",
				message:"",
				subs:[
					"重装系统",
				]
			}
		],
		activeProblemType:[],
		selectPersonalInfoId:-1,
		alterPersonalInfo:{},
    },
	mutations:{
		setActiveProblemType(state,problemTypes){
			state.activeProblemType = problemTypes
		},
		setSelectPersonalInfoId(state,newId){
			state.selectPersonalInfoId = newId
		},
		setAlterPersonalInfo(state,alterInfo){
			state.alterPersonalInfo = alterInfo
		}
	}
}

export default new Vuex.Store(config)