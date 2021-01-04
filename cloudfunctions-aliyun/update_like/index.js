'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event

	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	let cmdFuc = null

	if (article_likes_ids.includes(article_id)) {
		cmdFuc = dbCmd.pull(article_id)
	} else {
		cmdFuc = dbCmd.addToSet(article_id)
	}
	await db.collection('user').doc(user_id).update({
		article_likes_ids: cmdFuc
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据更新成功',
		data: userInfo.data[0]
	}
};
