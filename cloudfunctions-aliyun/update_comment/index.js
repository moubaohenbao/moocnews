'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		comment,
		comment_id = '', //主评论id
		reply_id = '', //次评论id
		is_call = false
	} = event

	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	const article = await db.collection('article').doc(article_id).get()
	//获取文章下的所有评论
	const comments = article.data[0].comments

	let commentObj = {
		comment_id: getId(5),
		comment_content: comment,
		create_time: new Date().getTime(),
		is_reply: is_call, //区分主次回复
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar, //作者头像
			professional: user.professional //专业
		},
		replys: [] //回复
	}

	if (comment_id === '') { //评论文章
		commentObj.replys = []
		commentObj = dbCmd.unshift(commentObj)
	} else { //评论文章评论
		// 获取评论索引
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)


		let commentAuthor = ''
		if (is_call) {
			//次回复
			//获取回复作者name
			commentAuthor = comments[commentIndex].replys.find(item => item.comment_id === reply_id)
		} else {
			//主回复
			//获取评论作者name
			commentAuthor = comments.find(item => item.comment_id === comment_id)
		}
		commentAuthor = commentAuthor.author.author_name
		commentObj.to = commentAuthor

		//更新回复信息
		commentObj = {
			[commentIndex]: {
				replys: dbCmd.unshift(commentObj)
			}
		}



/* 		let obj = {
			arr: [{
				name: 1
			}, {
				name: 2
			}]
		}
		xxx.update({
			arr: {
				1: {
					name: 3
				}
			}
		}) */

	}

	await db.collection('article').doc(article_id).update({
		comments: commentObj
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据更新成功'
	}
};

function getId(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
