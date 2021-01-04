<template>
	<list-scroll class="list-scroll" @loadMore="loadMore">
		<view>
			<list-card :cardMsg="item" v-for="(item,index) in cardMsgList" :key="item._id"></list-card>
		</view>

		<uni-load-more v-if="cardMsgList.length===0||cardMsgList.length>9" iconType="snow" :status="load.status || 'loading'"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			cardMsgList: {
				type: Array,
				default () {
					return []
				}
			},
			load: {
				type: Object,
				default () {
					return {
						status: 'loading'
					}
				}
			}
		},
		methods: {
			loadMore() {
				this.$emit('loadMore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
