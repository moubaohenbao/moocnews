<template>
	<view class="content">
		<navbar :isSearch="true" @input="inputChange" v-model="value"></navbar>
		<view class="content-list">
			<view v-if="isHistory" class="content-list-label-box">
				<view class="content-list-label-box-header">
					<text class="content-list-label-box-header-little">搜索历史</text>
					<text class="content-list-label-box-header-clear" @click="ClearHistory">清空</text>
				</view>
				<view v-if="historyList.length>0" class="content-list-label-box-content">
					<view class="content-list-label-box-content-item" v-for="item in historyList" @click="openHistory(item)">{{item.name}}</view>
				</view>
				<view v-else class="content-list-label-box-noData">
					<text>没有搜索历史</text>
				</view>
			</view>
			<list-scroll v-else class="list-scroll">
				<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
				<view v-if="searchList.length>0">
					<list-card :cardMsg="item" v-for="(item,index) in searchList" :key="item._id" @click="SetHistory">{{item.name}}</list-card>
				</view>
				<view v-if="searchList.length===0&&!loading" class="content-list-label-box-noData">
					<text>没有搜索到相关数据</text>
				</view>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				// historyList: {}
				isHistory: true,
				searchList: [],
				value: '',
				loading: false
			}
		},
		computed: {
			...mapState(['historyList'])
		},
		onLoad() {
			// this.GetSearch()
		},
		methods: {
			ClearHistory() {
				this.$store.dispatch('ClearHistory')
				uni.showToast({
					title: "清空完成"
				})
			},
			openHistory(item) {
				//点击历史标签
				this.value = item.name
				this.GetSearch(this.value)
			},
			inputChange(value) {
				// console.log(value)
				if (!value) {
					//无搜索内容
					clearTimeout(this.timer)
					this.mark = false
					this.GetSearch(value)
					return
				}
				// 做标记
				if (!this.mark) {
					//有搜索内容
					this.mark = true
					this.timer = setTimeout(() => {
						this.mark = false
						this.GetSearch(value)
					}, 1000)
				}
			},
			GetSearch(value) {
				if (!value) {
					this.searchList = []
					this.isHistory = true
					return
				}
				this.isHistory = false
				this.loading = true
				this.$api.get_search({
					value
				}).then((res) => {
					let {
						data
					} = res
					console.log(res)
					this.loading = false
					this.searchList = data
				})
			},
			SetHistory() {
				this.$store.dispatch('SetHistory', {
					name: this.value
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		// border: 1px red solid;

		.content-list-label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.content-list-label-box-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;

				.content-list-label-box-header-little {
					color: $mk-base-color;
				}

				.content-list-label-box-header-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.content-list-label-box-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.content-list-label-box-content-item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border: 1px #666 solid;
					border-radius: 5px;
					font-size: 14px;
					color: #666;
				}
			}
		}
	}

	.content-list-label-box-noData {
		width: 100%;
		height: 200px;
		line-height: 200px;
		text-align: center;
		font-size: 14px;
		color: #666;
	}
</style>
