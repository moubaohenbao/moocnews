'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event


	const userInfo = await db.collection('user').doc(user_id).get()
	const thumbs_up_article_ids = userInfo.data[0].thumbs_up_article_ids
	let SetCmd = null

	if (thumbs_up_article_ids.includes(article_id)) {
		return {
			code: 200,
			msg: '您已经点过赞了'
		}
	} else {
		SetCmd = dbCmd.addToSet(article_id)
	}

	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids: SetCmd
	})
	await db.collection('article').doc(article_id).update({
		//inc原子操作，减少一次请求
		thumbs_up_count: dbCmd.inc(1)
	})

	//返回数据给客户端
	return {
		code: 200,
		msg: '点赞成功'
	}
};
