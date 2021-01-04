//时间格式化

export const parseTime = (time) => {
	let date = null
	let formatStr = '{y}-{m}-{d} {h}:{i}:{s}'
	if (typeof(time) === 'string') {
		time = parseInt(time)
	}
	date = new Date(time)
	let formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds()
	}
	// console.log(formatObj)

	let strTime = formatStr.replace(/{(y|m|d|h|i|s)+}/g, (res, key) => {
		// console.log(res,key)
		let value = formatObj[key]
		if (res.length > 0 && value < 10) {
			value = '0' + value
		}
		return value
	})

	return strTime
}
