<template>
	<view class="my">
		<view class="my-header">
			<view class="my-header-background">
				<image :src="userObj.avatar"></image>
			</view>
			<view class="my-header-logo">
				<view class="logo-box">
					<image :src="userObj.avatar"></image>
				</view>
				<view class="logo-name">
					{{userObj.author_name}}
				</view>
			</view>
			<view class="my-header-info">
				<view class="info-box">
					<text class="info-box-title">被关注</text>
					<text>{{userObj.follow_count}}</text>
				</view>
				<view class="info-box">
					<text class="info-box-title">粉丝</text>
					<text>{{userObj.fans_count}}</text>
				</view>
				<view class="info-box">
					<text class="info-box-title">积分</text>
					<text>{{userObj.integral_count||0}}</text>
				</view>
			</view>
		</view>
		<view class="my-content">
			<view class="content-list" @click="OpenMyArticle">
				<view class="content-list-title">
					<uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="24" color="#666"></uni-icons>
			</view>
			<view class="content-list" @click="OpenFeedback">
				<view class="content-list-title">
					<uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="24" color="#666"></uni-icons>
			</view>
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

			}
		},
		computed: {
			...mapState(['userObj'])
		},
		onLoad() {
			// console.log(this.userObj)
		},
		methods: {
			OpenMyArticle() {
				uni.navigateTo({
					url: '/pages/my-article/my-article'
				})
			},		
			OpenFeedback() {
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.my-header {
		position: relative;
		// border: 1px red solid;
		padding-bottom: 15px;

		.my-header-background {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			filter: blur(8px);
			opacity: 0.3;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.my-header-logo {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 30px;

			.logo-box {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.logo-name {
				margin-top: 15px;
				font-size: 16px;
				font-weight: bold;
			}
		}

		.my-header-info {
			margin-top: 15px;
			display: flex;

			.info-box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				font-size: 12px;
				color: #999;

				.info-box-title {
					font-size: 14px;
					color: #333;
				}
			}
		}
	}

	.my-content {
		.content-list {
			display: flex;
			justify-content: space-between;
			padding: 15px;
			margin-top: 10px;
			background-color: #fff;
			color: #333;
			font-size: 14px;

			.content-list-title {
				display: flex;
				align-items: center;

				.icons {
					margin-right: 5px;
				}
			}
		}
	}
</style>
