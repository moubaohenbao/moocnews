'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		tabName,
		page = 1,
		pageSize = 10
	} = event

	let matchObj = {}
	if (tabName !== '全部') {
		matchObj = {
			classify: tabName
		}
	}

	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	// 使用聚合查询
	let list = await db.collection('article')
		.aggregate()
		//追加字段
		.addFields({
			is_like: $.in(['$_id', article_likes_ids])
		})
		.match(matchObj)
		.project({
			content: 0
		})
		//跳过多少条数据
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.end()


	// let list = await db.collection('article').field({
	// 	// true表示只返回这个字段,false表示排除
	// 	content: false
	// }).get()

	//返回数据给客户端
	return {
		code: 200,
		msg: '获取信息成功',
		data: list.data
	}
};
