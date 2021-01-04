(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tab/tab"],{"670e":function(t,e,n){},"6b52":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}));var u=function(){var t=this,e=t.$createElement;t._self._c},c=[]},b3fd:function(t,e,n){"use strict";n.r(e);var a=n("6b52"),u=n("cfd8");for(var c in u)"default"!==c&&function(t){n.d(e,t,(function(){return u[t]}))}(c);n("ef07");var i,r=n("f0c5"),f=Object(r["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=f.exports},cfd8:function(t,e,n){"use strict";n.r(e);var a=n("d168"),u=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=u.a},d168:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{tabList:{type:Array,default:function(){return[]}},tabActiveIndex:{type:Number,default:0}},watch:{tabActiveIndex:function(t){this.activeIndex=t}},data:function(){return{activeIndex:0}},methods:{openHomeLabel:function(){t.navigateTo({url:"/pages/home-label/home-label"})},clickTab:function(t,e){this.activeIndex=e,this.$emit("tab",{data:t,index:e})}}};e.default=n}).call(this,n("543d")["default"])},ef07:function(t,e,n){"use strict";var a=n("670e"),u=n.n(a);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tab/tab-create-component',
    {
        'components/tab/tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b3fd"))
        })
    },
    [['components/tab/tab-create-component']]
]);
