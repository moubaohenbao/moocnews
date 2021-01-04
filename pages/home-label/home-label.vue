<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-little">我的标签</view>
				<view class="label-edit" @click="EditLabel">{{!is_edit?'编辑':'完成'}}</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content-item" v-for="(item,index) in user_label" :key="item._id">
					{{item.name}}
					<uni-icons @click="DelLabel(index)" v-if="is_edit" class="incons-close" type="clear" size="20" color="red"></uni-icons>
				</view>
				<view v-if="user_label.length===0&&!loading" class="no-data">当前没有数据</view>
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-little">推荐标签</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content-item" @click="AddLabel(index)" v-for="(item,index) in other_label" :key="item._id">{{item.name}}</view>
				<view v-if="other_label.length===0&&!loading" class="no-data">当前没有数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				user_label: [],
				other_label: [],
				loading: true
			}
		},
		onLoad() {
			this.GetLabelList()
		},
		methods: {
			EditLabel() {
				// this.is_edit = !this.is_edit
				if (this.is_edit) {
					this.is_edit = false
					this.SetUpadateLabel(this.user_label)
				} else {
					this.is_edit = true
				}
			},
			GetLabelList() {
				this.loading = true
				this.$api.get_index_tab_label({
					type: 'all'
				}).then(res => {
					const {
						data
					} = res
					this.user_label = data.filter(item => item.current)
					this.other_label = data.filter(item => !item.current)
					this.loading = false
				})
			},
			DelLabel(index) {
				this.other_label.push(this.user_label[index])
				this.user_label.splice(index, 1)
			},
			AddLabel(index) {
				if (!this.is_edit) return
				this.user_label.push(this.other_label[index])
				this.other_label.splice(index, 1)
			},
			SetUpadateLabel(label) {
				let upLabelArr = []
				label.forEach(item => {
					upLabelArr.push(item._id)
				})
				uni.showLoading()
				// console.log(upLabelArr)
				this.$api.update_label({
					label: upLabelArr
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '更新成功'
					})
					// console.log(res)
					// 自定义事件,只能在已打开的页面中接收
					uni.$emit('LabelChange')
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;

				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content-item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;

					.incons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: %50;
					}
				}
			}
		}
	}

	.no-data {
		width: 100%;
		padding: 50px 0;
		font-size: 14px;
		color: #666;
		text-align: center;
	}
</style>
