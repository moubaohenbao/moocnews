'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		//区分关注作者和文章
		follow = 0
	} = event

	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]

	let list = []
	if (follow === 0) {
		list = await db.collection('article')
			.aggregate()
			.addFields({
				is_like: $.in(['$_id', user.article_likes_ids])
			})
			.project({
				content: 0
			})
			.match({
				is_like: true
			})
			.end()
	} else {
		list = await db.collection('user')
			.aggregate()
			.addFields({
				is_like: $.in(['$id', user.author_likes_ids])
			})
			.match({
				is_like: true
			})
			.end()
	}

	//返回数据给客户端
	return {
		code: 200,
		msg: '获取信息成功',
		data: list.data
	}
};
