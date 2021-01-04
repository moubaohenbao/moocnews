'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
	} = event

	let user = await db.collection('user').doc(user_id).get()
	user= user.data[0]
	// 使用聚合查询
	let list = await db.collection('article')
		.aggregate()
		//追加字段
		.addFields({
			is_like: $.in(['$_id', user.article_likes_ids])
		})
		.match({
			id:dbCmd.in(user.article_ids)
		})
		.end()
		
	//返回数据给客户端
	return {
		code: 200,
		msg: '获取信息成功',
		data: list.data
	}
};
