<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active:activeIndex===0}" @click="ClickTab(0)">
					文章
				</view>
				<view class="follow-tab-item" :class="{active:activeIndex===1}" @click="ClickTab(1)">
					作者
				</view>
			</view>
		</view>
		<view class="follow-content">
			<swiper class="follow-content-swiper" :current="activeIndex" @change="SwiperChange">
				<swiper-item>
					<list-scroll>
						<uni-load-more v-if="followList.length===0&&!noDataShow" iconType="snow" status="loading"></uni-load-more>
						<list-card types="follow" v-for="item in followList" :key="item._id" :cardMsg="item"></list-card>
						<view class="no-data" v-if="noDataShow">没有数据了</view>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<list-scroll>
						<uni-load-more v-if="followList.length===0&&!noDataShow" iconType="snow" status="loading"></uni-load-more>
						<list-author v-for="item in followList" :key="item._id" :authorObj="item"></list-author>
						<view class="no-data" v-if="noDataShow">没有数据了</view>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				followList: [],
				loading: '',
				noDataShow: false,
				follow: 0,
			}
		},
		methods: {
			SwiperChange(e) {
				this.activeIndex = e.detail.current
				this.GetFollow(this.activeIndex)
			},
			ClickTab(index) {
				this.activeIndex = index
			},
			GetFollow(follow) {
				this.$api.get_follow({
					follow
				}).then(res => {
					const {
						data
					} = res
					// console.log(res)
					this.followList = data
					this.noDataShow = this.followList.length === 0 ? true : false
				})
			}
		},
		onLoad() {
			uni.$on('update_like', () => {
				this.GetFollow(this.activeIndex)
			})
			uni.$on('update_author', () => {
				this.GetFollow(this.activeIndex)
			})
			this.GetFollow(this.activeIndex)
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.follow {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		border: 1px red soild;
		box-sizing: border-box;

		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border-bottom: 1px #f5f5f5 solid;

			.follow-tab-box {
				display: flex;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px $mk-base-color solid;

				.follow-tab-item {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					color: #666;
					font-size: 14px;

					&:first-child {
						border-right: 1px $mk-base-color solid;
					}

					&.active {
						color: $mk-base-color;
					}
				}
			}
		}

		.follow-content {
			flex: 1;
			// border: 1px red solid;

			.follow-content-swiper {
				height: 100%;
			}
		}
	}

	.no-data {
		padding: 20px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
