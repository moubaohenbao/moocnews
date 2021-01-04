<template>
	<view class="detail">
		<view class="detail-title">{{fromData.title}}</view>
		<view class="detail-header">
			<view class="header-user-logo">
				<image :src="fromData.author.avatar"></image>
			</view>
			<view class="header-user-content">
				<view class="user-content-title">
					{{fromData.author.author_name}}
				</view>
				<view class="user-content-info">
					<text>{{fromData.create_time}}</text>
					<text>{{fromData.browse_count}} 浏览</text>
					<text>{{fromData.thumbs_up_count}} 点赞</text>
				</view>
			</view>
			<button class="header-user-look" type="default" @click="FollowAuthor(fromData.author.id)">
				{{fromData.is_author_like?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-content">
			<view class="content-html">
				<u-parse :content="fromData.content" :noData="noData"></u-parse>
				<!-- 内容 -->
			</view>
			<view class="content-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentList" :key="item.comment_id">
					<comment-box :comment="item" @click="CommentCall"></comment-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom-input" @click="OpenComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="icons-box">
					<uni-icons type="chat" size="22" color="#f07373" @click="OpenCommentsDetail"></uni-icons>
				</view>
				<view class="icons-box">
					<uni-icons :type="fromData.is_like?'heart-filled':'heart'" size="22" color="#f07373" @click="LikeTap(fromData._id)"></uni-icons>
				</view>
				<view class="icons-box">
					<uni-icons :type="fromData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup'" size="22" color="#f07373" @click="ThumbsUp(fromData._id)"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-wrap-header">
					<text class="header-item" @click="CloseComment">取消</text>
					<text class="header-item" @click="SubmitComment">发布</text>
				</view>
				<view class="popup-wrap-content">
					<textarea class="content-textarea" v-model="commenstVal" maxlength="200" fixed placeholder="请输入评论内容"></textarea>
					<view class="content-count">{{commenstVal.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				fromData: {},
				noData: '<p style="text-align:center;color:#666">数据正在加载中...</p>',
				commenstVal: '',
				commentList: [],
				commentCall: {}
			}
		},
		methods: {
			OpenCommentsDetail(){//打开全部评论
				uni.navigateTo({
					url:'/pages/comments-detail/comments-detail?id='+this.fromData._id
				})
			},
			ThumbsUp(article_id) { //点赞文章
				this.SetUpdateThumbsup(article_id)
			},
			SetUpdateThumbsup(article_id) {
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then(res => {
					uni.hideLoading()
					this.fromData.is_thumbs_up = true
					this.fromData.thumbs_up_count++
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				})
			},
			LikeTap(article_id) { //收藏文章
				this.SetUpdateLike(article_id)
			},
			SetUpdateLike(article_id) {
				uni.showLoading()
				this.$api.update_like({
					article_id
				}).then(res => {
					uni.hideLoading()
					this.fromData.is_like = !this.fromData.is_like
					uni.$emit('update_like','follow')
					uni.showToast({
						title: this.fromData.is_like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
				})
			},
			FollowAuthor(author_id) { //关注作者
				this.SetUpdateAuthor(author_id)
			},
			CommentCall(e) {
				this.commentCall = {
					"comment_id": e.comment.comment_id,
					"is_call": e.is_call
				}
				if (e.comment.reply_id) {
					this.commentCall.reply_id = e.comment.reply_id
				}
				// console.log(this.commentCall)
				// return
				this.OpenComment()
			},
			GetDetail() {
				this.$api.get_detail({
					article_id: this.fromData._id
				}).then(res => {
					const {
						data
					} = res
					this.fromData = data
				})
			},
			OpenComment() {
				this.$refs.popup.open()
			},
			CloseComment() {
				this.$refs.popup.close()
			},
			SubmitComment() {
				if (!this.commenstVal) {
					uni.showToast({
						title: '请输入评论内容',
						icon: "none"
					})
				}
				this.SetUpdateComment({
					comment: this.commenstVal,
					...this.commentCall
				})
			},
			SetUpdateComment(obj) {
				const commentObj = {
					article_id: this.fromData._id,
					...obj
				}
				console.log(commentObj)
				// return
				uni.showLoading()
				this.$api.update_comment(commentObj).then(res => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: '评论成功'
					})
					this.CloseComment()
					this.GetComments()
					this.commentCall = {}
					this.commenstVal = ''
				})
			},
			GetComments() {
				this.$api.get_comments({
					article_id: this.fromData._id
				}).then(res => {
					// console.log(res)
					const {
						data
					} = res
					this.commentList = data
				})
			},
			SetUpdateAuthor(author_id) { //关注作者
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res => {
					uni.hideLoading()
					this.fromData.is_author_like = !this.fromData.is_author_like
					uni.showToast({
						title: this.fromData.is_author_like ? '关注作者成功' : '取消关注',
						icon: 'none'
					})
					uni.$emit('update_author')
				})
			}
		},
		onLoad(query) {
			this.fromData = JSON.parse(query.params)
			this.GetDetail()
			this.GetComments()
		},
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;

		.detail-title {
			padding: 0 15px;
			font-size: 18px;
			font-weight: bold;
			color: #666;

		}

		.detail-header {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			margin-top: 10px;
			padding: 0 15px;

			.header-user-logo {
				flex-shrink: 0;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.header-user-content {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 100%;
				padding-left: 10px;
				font-size: 12px;

				.user-content-title {
					font-size: 14px;
					color: #333;
				}

				.user-content-info {
					color: #999;

					text {
						margin-right: 10px;
					}
				}
			}

			.header-user-look {
				flex-shrink: 0;
				height: 30px;
				font-size: 12px;
				color: #fff;
				background-color: $mk-base-color;
			}
		}

		.detail-content {
			margin-top: 20px;
			min-height: 500px;

			.content-html {
				padding: 0 15px;
			}

			.content-comment {
				margin-top: 30px;

				.comment-title {
					padding: 10px 15px;
					font-size: 14px;
					color: #666;
					border-bottom: 1px #f5f5f5 solid;
				}

				.comment-content {
					padding: 0 15px;
					border-top: 1px #eee solid;
				}
			}
		}

		.detail-bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 44px;
			border-top: 1px #f5f5f5 solid;
			background-color: #fff;
			box-sizing: border-box;

			.detail-bottom-input {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 10px;
				padding: 0 10px;
				width: 100%;
				height: 30px;
				border: 1px #ddd solid;
				border-radius: 5px;

				text {
					font-size: 14px;
					color: #999;
				}
			}

			.detail-bottom-icons {
				display: flex;
				flex-shrink: 0;
				padding: 0 10px;

				.icons-box {
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 44px;
				}
			}
		}

		.popup-wrap {
			background-color: #fff;

			.popup-wrap-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;

				.header-item {
					height: 50px;
					line-height: 50px;
					padding: 0 15px;
				}
			}

			.popup-wrap-content {
				width: 100%;
				padding: 15px;
				box-sizing: border-box;

				.content-textarea {
					width: 100%;
					height: 200px;

				}

				.content.count {
					display: flex;
					justify-content: flex-end;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
</style>
