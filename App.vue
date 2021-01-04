<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//模拟登陆成功
			this.$api.get_user({
				user_id: '5fd1cd96ee98e300013cdb87'
			}).then(res => {
				const {
					data
				} = res
				// console.log(data)
				this.$store.dispatch('SetUser',data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/gaoyia-parse/parse.css';
</style>
