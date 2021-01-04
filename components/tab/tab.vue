<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x>
			<view class="tab-scroll-box">
				<view class="tab-scroll-item" :class="{active:activeIndex===index}" v-for="(item,index) in tabList" :key="index"
				 @click="clickTab(item,index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icon" @click="openHomeLabel">
			<text class="iconfont iconshezhi" style="font-size: 20px;"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabList: {
				type: Array,
				default () {
					return []
				}
			},
			tabActiveIndex: {
				type: Number,
				default: 0
			}
		},
		watch: {
			tabActiveIndex(newVal) {
				this.activeIndex = newVal
			}
		},
		data() {
			return {
				activeIndex: 0
			};
		},
		methods: {
			openHomeLabel(){
				uni.navigateTo({
					url:'/pages/home-label/home-label'
				})
			},
			clickTab(item, index) {
				// console.log(item, index)
				this.activeIndex = index
				this.$emit('tab', {
					data: item,
					index: index
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/css/icons.css';

	.tab {
		display: flex;
		width: 100%;
		border-bottom: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;

		.tab-scroll {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;

			.tab-scroll-box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				height: 45px;
				box-sizing: border-box;

				.tab-scroll-item {
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;

					&.active {
						color: $mk-base-color;
					}
				}
			}
		}

		.tab-icon {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;

			&::after {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>
