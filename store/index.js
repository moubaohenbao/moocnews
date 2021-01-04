//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//数据源
	state: {
		userObj: uni.getStorageSync('__userObj') || {},
		historyList: uni.getStorageSync('__history') || []
	},
	mutations: {
		SetUserObj(state, userObj) {
			state.userObj = userObj
		},
		SetHistoryList(state, historyList) {
			state.historyList = historyList
		},
		ClearHistoryList(state) {
			state.historyList = []
		}
	},
	actions: {
		SetUser({
			commit
		}, userObj) {
			uni.setStorageSync('__userObj', userObj)
			commit('SetUserObj', userObj)
		},
		SetHistory({
			commit,
			state
		}, historyVal) {
			let list = state.historyList
			list.unshift(historyVal)
			uni.setStorageSync('__history', list)
			commit('SetHistoryList', list)
		},
		ClearHistory({
			commit
		}) {
			uni.removeStorageSync('__history')
			commit('ClearHistoryList')
		}
	}
})

export default store
