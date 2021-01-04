<template>
	<view class="comment-box">
		<view class="comment-box-header">
			<view class="header-loge">
				<image :src="comment.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="header-info">
				<view v-if="!comment.is_reply" class="info-title">{{comment.author.author_name}}</view>
				<view v-else class="info-title">{{comment.author.author_name}}<text class="call-text">回复</text>{{comment.to}}</view>
				<view>{{comment.create_time|formatTime}}</view>
			</view>
		</view>
		<view class="comment-box-content">
			<view>{{comment.comment_content}}</view>
			<view class="content-call">
				<view class="content-call-button" @click="CommentCall({comment,is_call:commentCall})">回复 </view>
			</view>
			<view class="content-call-content" v-for="item in comment.replys" :key="item.comment_id">
				<comment-box :commentCall="true" :comment="item" @click="CommentCall"></comment-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentBox from '@/components/comment-box/comment-box.vue'
	import {
		parseTime
	} from '@/utils/index.js'
	export default {
		name: "comment-box",
		components: {
			commentBox
		},
		props: {
			comment: {
				type: Object,
				default () {
					return {}
				}
			},
			commentCall: {
				type: Boolean,
				default: false
			}
		},
		filters:{
			formatTime(time){
				return parseTime(time)
			}
		},
		data() {
			return {

			};
		},
		methods: {
			CommentCall(obj) {
				//为了区分主次回复
				if (obj.is_call) {
					obj.comment.reply_id = obj.comment.comment_id
					obj.comment.comment_id = this.comment.comment_id
				}
				// console.log(obj)
				// return
				this.$emit('click', obj)
			}
		}
	}
</script>

<style lang="scss">
	.comment-box {
		margin: 15px 0;

		.comment-box-header {
			display: flex;

			.header-loge {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.header-info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;

				.info-title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;

					.call-text {
						margin: 0 10px;
						font-weight: bold;
						color: #000;
					}
				}
			}
		}

		.comment-box-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;

			.content-call {
				margin-top: 15px;
				display: flex;

				.content-call-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px #ccc solid;
				}
			}

			.content-call-content {
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px #eee solid;
			}
		}
	}
</style>
