(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/follow/follow"],{"3ce1":function(t,n,e){"use strict";e.r(n);var o=e("a24d"),i=e.n(o);for(var l in o)"default"!==l&&function(t){e.d(n,t,(function(){return o[t]}))}(l);n["default"]=i.a},"6f33":function(t,n,e){"use strict";var o=e("e753"),i=e.n(o);i.a},"791e":function(t,n,e){"use strict";(function(t){e("4bbf");o(e("66fd"));var n=o(e("e1f3"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},a24d:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{activeIndex:0,followList:[],loading:"",noDataShow:!1,follow:0}},methods:{SwiperChange:function(t){this.activeIndex=t.detail.current,this.GetFollow(this.activeIndex)},ClickTab:function(t){this.activeIndex=t},GetFollow:function(t){var n=this;this.$api.get_follow({follow:t}).then((function(t){var e=t.data;n.followList=e,n.noDataShow=0===n.followList.length}))}},onLoad:function(){var n=this;t.$on("update_like",(function(){n.GetFollow(n.activeIndex)})),t.$on("update_author",(function(){n.GetFollow(n.activeIndex)})),this.GetFollow(this.activeIndex)}};n.default=e}).call(this,e("543d")["default"])},cadf:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return l})),e.d(n,"a",(function(){return o}));var o={listScroll:function(){return e.e("components/list-scroll/list-scroll").then(e.bind(null,"4157"))},uniLoadMore:function(){return e.e("components/uni-load-more/uni-load-more").then(e.bind(null,"d21e"))},listCard:function(){return e.e("components/list-card/list-card").then(e.bind(null,"f905"))},listAuthor:function(){return e.e("components/list-author/list-author").then(e.bind(null,"7d86"))}},i=function(){var t=this,n=t.$createElement;t._self._c},l=[]},e1f3:function(t,n,e){"use strict";e.r(n);var o=e("cadf"),i=e("3ce1");for(var l in i)"default"!==l&&function(t){e.d(n,t,(function(){return i[t]}))}(l);e("6f33");var u,a=e("f0c5"),c=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);n["default"]=c.exports},e753:function(t,n,e){}},[["791e","common/runtime","common/vendor"]]]);