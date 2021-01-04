<template>
	<view class="content" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373" :type="likeStatus?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			article: {
				type: Object,
				default () {
					return {}
				}
			},
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				likeStatus: false
			};
		},
		watch: {
			article(newVal) {
				this.likeStatus = this.article.is_like
			}
		},
		created() {
			this.likeStatus = this.article.is_like
		},
		methods: {
			likeTap() {
				this.likeStatus = !this.likeStatus
				this.updateLike()
			},
			updateLike() {
				uni.showLoading()
				this.$api.update_like({
					user_id: '5fd1cd96ee98e300013cdb87',
					article_id: this.article._id,
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title:this.likeStatus?'收藏成功':'取消收藏',
						icon:'none'
					})
					uni.$emit('update_like',this.types)
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
	}
</style>
