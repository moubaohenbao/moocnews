<template>
	<view>
		<view class="comments-content" v-for="item in commentList" :key="item.comment_id">
			<comment-box :comment="item"></comment-box>
		</view>
		<uni-load-more v-if="commentList.length===0||commentList.length>5" iconType="snow" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_id: '',
				commentList: [],
				pageSize: 5,
				page: 1,
				loading: 'loading'
			}
		},
		methods: {
			GetComments() {
				this.$api.get_comments({
					article_id: this.article_id,
					pageSize: this.pageSize,
					page: this.page
				}).then(res => {
					const {
						data
					} = res
					if (data.length === 0){
						this.loading='noMore'
						return
					} 
					let oldData = JSON.parse(JSON.stringify(this.commentList))
					oldData.push(...data)
					this.commentList = oldData
				})
			},
		},
		onLoad(query) {
			this.article_id = query._id
			this.GetComments()
		},
		onReachBottom() {
			if(this.loading='noMore') return
			this.page++
			this.GetComments()
		}
	}
</script>

<style lang="scss">
	.comments-content {
		padding: 0 15px;
	}
</style>
