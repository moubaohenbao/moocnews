<template>
	<!-- #ifndef MP-WEIXIN -->

	<!-- #endif -->
	<swiper class="swiper-content" :current="swiperActiveIndex" @change="swiperChange">
		<swiper-item class="swiper-item" v-for="(item,index) in tabList" :key="index">
			<list-swiper-item :cardMsgList="cardMsgListCache[index]" :load="load[index]" @loadMore="loadMore"></list-swiper-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listSwiperItem from './list-swiper-item.vue'
	export default {
		components: {
			listSwiperItem
		},
		props: {
			tabList: {
				type: Array,
				default () {
					return []
				}
			},
			swiperActiveIndex: {
				type: Number,
				default: 0
			}
		},
		watch: {
			tabList(newVal) {
				if (newVal.length === 0) return
				this.cardMsgListCache = {}
				this.load = {}
				this.getCardList(this.swiperActiveIndex)
			}
		},
		data() {
			return {
				cardMsgList: [],
				cardMsgListCache: {},
				load: {},
				pageSize: 5,
				swiperHight:0
			}
		},
		created() {
			uni.$on('update_like', (e) => {
				if (e === 'follow') {
					this.cardMsgListCache = {}
					this.load = {}
					this.getCardList(this.swiperActiveIndex)
				}
			})
		},
		methods: {
			loadMore() {
				//如果没有数据则不再发起数据请求
				if (this.load[this.swiperActiveIndex].status === 'noMore') return
				this.load[this.swiperActiveIndex].page++
				// console.log('当前页数',this.load[this.swiperActiveIndex].page)
				console.log('触发上拉')
				this.getCardList(this.swiperActiveIndex)
			},
			swiperChange(e) {
				const {
					current
				} = e.detail
				this.$emit('swiperChange', current)
				// 当数据不存在或者长度为0是才去请求数据
				if (!this.cardMsgListCache[current] || this.cardMsgListCache[current].length === 0) {
					this.getCardList(current)
				}
			},
			getCardList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						status: 'loading'
					}
				}
				this.$api.get_index_card_msg({
					tabName: this.tabList[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then((res) => {
					let {
						data
					} = res
					if (data.length === 0) {
						let oldLoad = {}
						oldLoad.page = this.load[current].page
						oldLoad.status = 'noMore'
						this.$set(this.load, current, oldLoad)
					}
					// this.cardMsgList = data
					// 缓存数据  懒加载
					// this.cardMsgListCache[current] = data
					let oldList = this.cardMsgListCache[current] || []
					oldList.push(...data)
					this.$set(this.cardMsgListCache, current, oldList)
				})
			},
		}
	}
</script>

<style lang="scss">
	.swiper-content {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
