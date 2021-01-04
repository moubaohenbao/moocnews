<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :tabList="tabList" :tabActiveIndex="tabActiveIndex" @tab="tab"></tab>
		<list-swiper :style="{height:swiperHeight+'px'}" :tabList="tabList" :swiperActiveIndex="swiperActiveIndex"
		 @swiperChange="swiperChange"></list-swiper>


	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {

		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabActiveIndex: 0,
				swiperActiveIndex: 0,
				swiperHeight: 0
			}
		},
		computed: {
			...mapState(['userObj'])
		},
		watch: {
			userObj(newVal) {
				this.getLable()
			}
		},
		onLoad() {
			const info = uni.getSystemInfoSync()
			this.swiperHeight=info.windowHeight-91
			//主页接收来自home-label自定义事件
			uni.$on('LabelChange', (res) => {
				this.tabList = []
				this.tabActiveIndex = 0
				this.swiperActiveIndex = 0
				this.getLable()
			})
			uni.$on('navbarEndHight', (res) => {
				this.swiperHeight = res
				console.log('aaaaaaaa')
				console.log(this.swiperHeight)
			})
			// this.getLable()
		},
		methods: {
			tab({
				data,
				index
			}) {
				this.swiperActiveIndex = index
			},
			swiperChange(current) {
				this.tabActiveIndex = current
				this.swiperActiveIndex = current
			},
			getLable() {
				// 调用云函数方法
				// uniCloud.callFunction({
				// 	name: 'get_index_tab_label'
				// }).then((res) => {
				// 	console.log(res)
				// 	const {
				// 		result
				// 	} = res
				// 	console.log(result)
				// 	this.tabList = result.data
				// })

				//调用云函数方法
				this.$api.get_index_tab_label().then((res) => {
					const {
						data
					} = res
					data.unshift({
						name: '全部'
					})
					this.tabList = data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
	}
</style>
