<template>
	<view class="navbar">
		<view class="navbar-fixed ">
			<!-- 状态栏 -->
			<view :style="{height:statusBarHeight+'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content" :class="{searchActive:isSearch}" :style="{height:navBarHeight+'px',width:windowWidth+'px'}"
			 @click.stop="openSearchPage">
				<view v-if="isSearch" class="navbar-back-icon" @click="Back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view v-if="!isSearch" class="navbar-search">
					<!-- 非搜索页显示 -->
					<view class="navbar-search-icon">
						<text class="iconfont iconsearch"></text>
					</view>
					<view class="navbar-search-text">uni-app</view>
				</view>
				<view v-else class="navbar-search">
					<!-- 搜索页显示 -->
					<input class="navbar-search-text" type="text" value="" placeholder="请输入要搜索的内容" v-model="inputVal" @input="inputChange" />
				</view>
			</view>
		</view>
		<view :style="{height:statusBarHeight===0?45+'px':statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			isSearch: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				windowWidth: 375,
				inputVal: '',
				navbarEndHight:0
			};
		},
		watch: {
			value(newVal) {
				this.inputVal = newVal
				// console.log('行动值' + newVal)
			},
			navbarEndHight(newVal) {
				uni.$emit('navbarEndHight',newVal)
				// console.log('行动值' + newVal)
			}
		},
		created() {
			//获取手机系统信息
			const info = uni.getSystemInfoSync()
			//设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// #ifndef H5||APP-PLUS
			//获取胶囊位置
			const MenuButtoninfo = uni.getMenuButtonBoundingClientRect()
			//计算导航栏高度
			this.navBarHeight = (MenuButtoninfo.bottom - info.statusBarHeight) + (MenuButtoninfo.top - info.statusBarHeight) + 5
			this.windowWidth = MenuButtoninfo.left
			this.navbarEndHight=info.windowHeight-this.navBarHeight-this.statusBarHeight-46
			// #endif
		},
		methods: {
			Back() {
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				})
			},
			openSearchPage() {
				if (this.isSearch) return
				uni.navigateTo({
					url: "/pages/home-search/home-search"
				})
			},
			inputChange(e) {
				const {
					value
				} = e.detail
				this.$emit('input', value)
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/css/icons.css';

	.navbar {
		.navbar-fixed {
			position: fixed;
			left: 0;
			right: 0;
			z-index: 999;
			width: 100%;
			background-color: $mk-base-color;

			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 45px;
				padding: 0 15px;
				box-sizing: border-box;

				.navbar-search {
					display: flex;
					align-items: center;
					width: 100%;
					height: 30px;
					padding: 0 10px;
					background-color: #fff;
					border-radius: 30px;

					.navbar-search-icon {
						margin-right: 10px;
					}

					.navbar-search-text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}

				&.searchActive {
					padding-left: 0;

					.navbar-back-icon {
						margin-left: 10px;
						margin-right: 10px;
					}

					.navbar-search {
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>
