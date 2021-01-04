'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		value,
	} = event
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	// 使用聚合查询
	let list = await db.collection('article')
		.aggregate()
		//追加字段
		.addFields({
			is_like: $.in(['$_id', article_likes_ids])
		})
		.project({
			content: 0
		})
		.match({
			title: new RegExp(value)
		})
		.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '获取信息成功',
		data: list.data
	}
};
