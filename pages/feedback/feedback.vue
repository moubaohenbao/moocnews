<template>
	<view class="feedback">
		<view class="feedback-title">
			意见反馈
		</view>
		<view class="feedback-content">
			<textarea class="feedback-content-textarea" v-model="content" placeholder="请输入您要反馈的问题"></textarea>
		</view>
		<view class="feedback-title">
			反馈截图
		</view>
		<view class="feedback-image-box">
			<view class="image-box-item" v-for="(item,index) in imageList" :key="index">
				<view class="close-icon" @click="DelImage(index)">
					<uni-icons type="closeempty" size="18" color=" #fff"></uni-icons>
				</view>
				<view class="item-image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="imageList.length<5" class="image-box-item" @click="AddImage">
				<view class="item-image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-buttom" type="primary" @click="Smbmit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
				imageNameList: [],
				content: ''
			}
		},
		methods: {
			AddImage() {
				let count = 5 - this.imageList.length
				uni.chooseImage({
					count,
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						let tempFiles = res.tempFiles
						tempFilePaths.forEach((item, index) => {
							//处理h5多选的状况
							if (index < count) {
								this.imageList.push({
									url: item
								})
							}
						})
						tempFiles.forEach((item, index) => {
							//处理h5多选的状况
							if (index < count) {
								this.imageNameList.push({
									name: item.name
								})
							}
						})
					}
				})
			},
			DelImage(index) {
				this.imageList.splice(index, 1)
			},
			async Smbmit() {
				let feedbackObj = {
					imagePath,
					content: this.content
				}
				let imagePath = []
				uni.showLoading()
				for (let i = 0; i < this.imageList.length; i++) {
					let filePath = this.imageList[i].url
					let fileName = this.imageNameList[i].name
					filePath = await this.uploadFiles({filePath, fileName})
					imagePath.push(filePath)
				}
				this.SetUpdateFeedback(feedbackObj)
			},
			async uploadFiles({filePath,fileName}) {
				let res = await uniCloud.uploadFile({
					filePath,
					cloudPath: fileName
				})
				return res.fileID
			},
			SetUpdateFeedback(feedbackObj) {
				this.$api.update_feedback({
					feedbackImages: feedbackObj.imagePath,
					content: feedbackObj.content
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '提交反馈成功',
						icon: 'none'
					})
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabbar/my/my'
						})
					}, 2000)
				}).catch(() => {
					uni.hideLoading()
					uni.showToast({
						title: '提交反馈成功',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback {
		.feedback-title {
			margin: 15px;
			margin-bottom: 0;
			font-size: 14px;
			color: #666;
		}

		.feedback-content {
			margin: 15px;
			padding: 10px;
			box-sizing: border-box;
			border: 1px #eee solid;

			.feedback-content-textarea {
				font-size: 12px;
				width: 100%;
				height: 100px;
			}
		}

		.feedback-image-box {
			display: flex;
			flex-wrap: wrap;
			padding: 10px;

			.image-box-item {
				position: relative;
				width: 33.33%;
				height: 0;
				padding-top: 33.33%;
				box-sizing: border-box;

				.close-icon {
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					top: 0;
					right: 0;
					width: 22px;
					height: 22px;
					border-radius: 50%;
					background-color: #ff5a5f;
					z-index: 2;
				}

				// border: 1px red solid;
				.item-image-box {
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					top: 5px;
					right: 5px;
					bottom: 5px;
					left: 5px;
					border: 1px #eee solid;
					border-radius: 5px;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}

				}
			}
		}

		.feedback-buttom {
			margin: 0 15px;
			background-color: $mk-base-color;
		}
	}
</style>
