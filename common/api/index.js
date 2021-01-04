// import {get_index_tab_label,get_list} from './list.js'

// export default {
// 	get_index_tab_label,
// 	get_list
// }

//批量导出文件
const requirApi = require.context(
	//api目录相对路径
	'.',
	//是否查询子目录
	false,
	//查询文件的一个后缀
	/.js$/
)

let module={}
requirApi.keys().forEach((key,index)=>{
	if(key==='./index.js') return
	Object.assign(module,requirApi(key))
})
export default module