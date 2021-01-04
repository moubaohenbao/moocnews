<template>
	<view class="list-author">
		<view class="list-author-image">
			<image :src="authorObj.avatar" mode="aspectFill"></image>
		</view>
		<view class="list-author-content">
			<view class="content-title">
				{{authorObj.author_name}}
			</view>
			<view class="content-des">
				<view class="content-des-label">
					{{authorObj.professional}}
				</view>
				<view class="content-des-info">
					<text>发帖 {{authorObj.article_ids.length}}</text>
					<text>粉丝 {{authorObj.follow_count}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			authorObj: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {

			};
		},
		created() {
			// console.log(this.authorObj)
		}
	}
</script>

<style lang="scss">
	.list-author {
		display: flex;
		padding: 10px 0;
		margin: 0 10px;
		border-radius: 5px;
		box-sizing: border-box;
		border-bottom: 1px #f5f5f5 solid;

		.list-author-image {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.list-author-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;

			.content-title {
				position: relative;
				// padding-left: 30px;
				font-size: 14px;
				color: #333;
				font-weight: bold;
				line-height: 1.2;
			}

			.content-des {
				display: flex;
				justify-content: space-between;
				font-size: 12px;

				.content-des.label {
					color: #666;
				}

				.content-des-info {
					color: #999;
					line-height: 1.2;

					text:first-child {
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>
