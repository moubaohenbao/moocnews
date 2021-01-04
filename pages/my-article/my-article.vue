<template>
	<view>
		<uni-load-more v-if="loading" status="loading"></uni-load-more>
		<list-card v-for="item in myArticleList" :key="item.id" :cardMsg="item"></list-card>
		<view v-if="myArticleList.length===0&&!loading" class="no-data">当前没有数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myArticleList: [],
				loading: true
			}
		},
		methods: {
			GetMyArticle() {
				this.$api.get_my_article().then(res => {
					const {
						data
					} = res
					this.myArticleList = data
					this.loading = false
				})
			}
		},
		onLoad() {
			this.GetMyArticle()
		}
	}
</script>

<style lang="scss">
	.no-data {
		width: 100%;
		padding: 50px 0;
		font-size: 14px;
		color: #666;
		text-align: center;
	}
</style>
