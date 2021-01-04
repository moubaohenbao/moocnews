<template>
	<view>
		<!-- 基础卡片 -->
		<view v-if="cardMsg.mode==='base'" class="list-card" @click="IntoDetails">
			<view class="list-card-image">
				<image :src="cardMsg.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-little">
					<text>{{cardMsg.title}}</text>
					<like :types="types" :article="cardMsg"></like>
				</view>
				<view class="list-card-content-des">
					<view class="list-card-content-des-label">
						<view class="list-card-content-des-label-item">{{cardMsg.classify}}</view>
					</view>
					<view class="list-card-content-des-brow">{{cardMsg.browse_count}}浏览</view>
				</view>
			</view>
		</view>

		<!-- 多图模式 -->
		<view v-if="cardMsg.mode==='images'" class="list-card mode-images" @click="IntoDetails">
			<view class="list-card-content">
				<view class="list-card-content-little">
					<text>{{cardMsg.title}}</text>
					<like :types="types" :article="cardMsg"></like>
				</view>
				<view class="list-card-image">
					<view class="list-card-image-item" v-if="index<3" v-for="(item,index) in cardMsg.cover" :key="item">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="list-card-content-des">
					<view class="list-card-content-des-label">
						<view class="list-card-content-des-label-item">{{cardMsg.classify}}</view>
					</view>
					<view class="list-card-content-des-brow">{{cardMsg.browse_count}}浏览</view>
				</view>
			</view>
		</view>

		<!-- 大图模式 -->
		<view v-if="cardMsg.mode==='image'" class="list-card mode-image" @click="IntoDetails">
			<view class="list-card-image">
				<image :src="cardMsg.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-little">
					<text>{{cardMsg.title}}</text>
					<like :types="types" :article="cardMsg"></like>
				</view>

				<view class="list-card-content-des">
					<view class="list-card-content-des-label">
						<view class="list-card-content-des-label-item">{{cardMsg.classify}}</view>
					</view>
					<view class="list-card-content-des-brow">{{cardMsg.browse_count}}浏览</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			cardMsg: {
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

			};
		},
		methods: {
			IntoDetails() {
				const cardMsg = this.cardMsg
				const params = {
					_id: cardMsg._id,
					title: cardMsg.title,
					author: cardMsg.author,
					create_time: cardMsg.create_time,
					thumbs_up_count: cardMsg.thumbs_up_count,
					browse_count: cardMsg.browse_count
				}
				// console.log('进入详情页', params)
				// 传参注意长度
				uni.navigateTo({
					url: '/pages/home-detail/home-detail?params=' + JSON.stringify(params)
				})
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.list-card {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;

		.list-card-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.list-card-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;

			.list-card-content-little {
				position: relative;
				padding-right: 30px;
				font-size: 14px;
				color: #333;
				font-weight: 400;
				line-height: 1.2;

				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}

			.list-card-content-des {
				display: flex;
				justify-content: space-between;
				font-size: 12px;

				.list-card-content-des-label {
					display: flex;

					.list-card-content-des-label-item {
						padding: 0 5px;
						margin-right: 5px;
						border-radius: 15px;
						color: $mk-base-color;
						border: 1px $mk-base-color solid;
					}
				}

				.list-card-content-brow {
					color: #999;
					line-height: 1.5;
				}
			}
		}

		&.mode-images {
			.list-card-content {
				width: 100%;
				padding-left: 0;
			}

			.list-card-image {
				display: flex;
				margin-top: 10px;
				width: 100%;
				height: 70px;

				.list-card-image-item {
					margin-left: 10px;
					width: 100%;
					border-radius: 5px;
					overflow: hidden;

					&:first-child {
						margin-left: 0;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.list-card-content-des {
				margin-top: 10px;
			}
		}

		&.mode-image {
			flex-direction: column;

			.list-card-image {
				width: 100%;
				height: 100px;
			}

			.list-card-content {
				padding-left: 0;
				margin-top: 10px;

				.list-card-content-des {
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}
		}
	}
</style>
