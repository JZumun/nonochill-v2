webpackJsonp([0],[,,,,function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t){n(11)}function s(t){n(13)}function a(t){n(12)}function c(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function l(t){n(15)}function u(t){n(16)}function d(t){n(14)}function h(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function f(t){n(17)}function m(t){n(10)}function v(t){n(24)}function p(t){n(25)}function g(t){n(23)}function y(t){n(26)}function b(t){n(6)}Object.defineProperty(e,"__esModule",{value:!0});var x,w,z=n(2),M=n(1),_=Object.freeze({INIT:0,GAME_SETUP:1,GAME_READY:1.5,CREATOR:2,CREATOR_READY:2.5}),C=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.includes(t)}},E=(C(_.GAME_SETUP,_.GAME_READY),C(_.CREATOR,_.CREATOR_READY)),S=_,X=Object.freeze(["#3a1a2f","#A3658C","#e7cbdd","#ff7187","#8db0e1"]),F=function(t){return Array.from(new Array(t),function(t,e){return e})},A=function(t,e){return F(e-t).map(function(e){return e+t})},L=function(t,e){return F(t).map(function(n){return F(t).map(function(t){return e(n,t)})})},D=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(t,e){return t===e};return t&&e&&t.length===e.length&&t.every(function(t,r){return n(t,e[r])})},T=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){return t};return t.filter(e).length},k=function(t){return{undone:!0,tile:t.tile,next:t.curr,curr:t.next}},R=function(t){return t.reverse().map(k)},O=function(t,e){return e.reduce(function(t,e){var n=e.tile,r=n.x,o=n.y,i=e.next;return t[r][o]=i,t},t.slice())},N=function(t){return L(t,function(t){return 0})},j=function(t){t.history={past:[],future:[],staged:[]}},$=(x={},r(x,"start-game",function(t,e){var n=e.size,r=e.rules,o=e.colors,i=e.scheme,s=void 0===i?X.slice():i,a=e.board,c=void 0===a?N(n):a;t.rules=r,t.colorScheme=s,t.colorNum=o,t.mode=S.GAME_SETUP,t.board=c,j(t)}),r(x,"start-editor",function(t,e){var n=e.size,r=e.colors,o=e.scheme,i=void 0===o?X.slice():o;t.colorScheme=i,t.colorNum=r,t.rules={column:F(n).map(function(t){return[]}),row:F(n).map(function(t){return[]})},t.board=N(n),j(t)}),r(x,"change-mode",function(t,e){t.mode=e}),r(x,"change-colors",function(t,e){t.colorScheme=e.slice()}),r(x,"change-color",function(t,e){var n=e.index,r=e.value;t.colorScheme.splice(n,1,r)}),r(x,"reset-colors",function(t){t.colorScheme=X}),r(x,"reset-board",function(t){t.board=N(t.board.length),j(t)}),r(x,"update-rules",function(t,e){t.rules=e}),r(x,"set-tile",function(t,e){t.board=O(t.board,[e])}),r(x,"stage-move",function(t,e){t.history.future=[],t.history.staged.push(e)}),r(x,"commit-moves",function(t){t.history.past.push(t.history.staged),t.history.staged=[]}),r(x,"undo-move",function(t){var e=R(t.history.past.pop());t.board=O(t.board,e),t.history.future.push(e)}),r(x,"redo-move",function(t){var e=R(t.history.future.pop());t.board=O(t.board,e),t.history.past.push(e)}),r(x,"anchor-color",function(t,e){t.colorAnchor=e}),r(x,"unanchor-color",function(t,e){t.colorAnchor=null}),r(x,"reverse-color",function(t,e){t.colorReverse=e}),x),I=n(3),G=n.n(I),P=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return n?-1===t?e:t-1:t===e?-1:t+1},V=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t?t.reduce(function(t,e){var n=t.length-1;return e===t[n].val?t[n].count++:t.push({val:e,count:1}),t},[{val:null,count:0}]).filter(function(t){return t.val>0&&t.count>0}):[]},W=function(t){return"{"+t.val+","+t.count+"}"},H=function(t){return"["+t.map(W).join("")+"]"},B=function(t){return"["+t.map(H).join("|")+"]"},Y=function(t){var e=t.width,n=t.height,r=t.colors,o=t.column,i=t.row,s=t.colorScheme,a=void 0===s?[]:s;return btoa([e,n,r,B(o),B(i),a.join("?")].join("//"))},Z=function(t){var e=t.replace(/[\{\}\[\]]/g,"").split(",").map(function(t){return parseInt(t)});return{val:e[0],count:e[1]}},U=function(t){return t.split("}{").map(Z).filter(function(t){var e=t.count,n=t.val;return e&&n})},J=function(t){return t.split("|").map(U)},q=function(t){var e=atob(t).split("//");return{width:parseInt(e[0]),height:parseInt(e[1]),colors:parseInt(e[2]),column:J(e[3]),row:J(e[4]),colorScheme:e[5]&&e[5].split("?")}},Q=G()(500,function(t){t("commit-moves")}),K=(w={},o(w,"action:set-tile",function(t,e){var n=t.commit;e.next!==e.curr&&(n("set-tile",e),n("stage-move",e),Q(n))}),o(w,"action:toggle-tile",function(t,e){var n=(t.commit,t.dispatch),r=t.state,o=r.board[e.x][e.y],i=void 0;r.colorAnchor?(i=P(o===r.colorAnchor?1:o>0?0:o,1,r.colorReverse),i=1===i?r.colorAnchor:i):i=P(o,r.colorNum,r.colorReverse),n("action:set-tile",{tile:e,curr:o,next:i}),n("action:rules-match-board")}),o(w,"action:rules-match-board",function(t){var e=t.commit,n=t.state;E(n.mode)&&e("update-rules",{row:n.board.map(function(t){return V(t)}),column:F(n.board.length).map(function(t){return V(n.board.map(function(e){return e[t]}))})})}),o(w,"action:start-game",function(t,e){var n=t.commit;if("string"==typeof e){var r=q(e);e={size:r.width,rules:{row:r.row,column:r.column},colors:r.colors,scheme:r.colorScheme}}n("change-mode",S.GAME_SETUP),n("start-game",e),z.a.nextTick(function(t){return n("change-mode",S.GAME_READY)})}),o(w,"action:start-editor",function(t,e){var n=t.commit;n("change-mode",S.CREATOR),n("start-editor",e),z.a.nextTick(function(t){return n("change-mode",S.CREATOR_READY)})}),o(w,"action:anchor-color",function(t,e){var n=t.commit,r=t.state;null==e?n("unanchor-color"):r.anchor!==e&&r.colorNum>=e&&n("anchor-color",e)}),o(w,"action:reverse-color",function(t,e){var n=t.commit;t.state.colorReverse!==e&&n("reverse-color",e)}),o(w,"action:undo-move",function(t,e){var n=t.commit,r=t.dispatch;t.state.history.past.length&&n("undo-move",e),r("action:rules-match-board")}),o(w,"action:redo-move",function(t,e){var n=t.commit,r=t.dispatch;t.state.history.future.length&&n("redo-move",e),r("action:rules-match-board")}),w);z.a.use(M.a);var tt={mode:S.INIT,colorScheme:[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(X)),colorNum:3,colorAnchor:null,colorReverse:!1,board:[],rules:{column:[],row:[]},history:{staged:[],past:[],future:[]}},et={serialization:function(t){var e=t.board,n=t.colorNum,r=t.colorScheme,o=t.rules;return Y({width:e.length,height:e.length,colors:n,column:o.column,row:o.row,colorScheme:r})},colorsUsed:function(t){var e=t.colorNum;return t.colorScheme.slice(0,e)}},nt=new M.a.Store({state:tt,getters:et,mutations:$,actions:K}),rt={props:{title:String,disabled:{type:Boolean,default:!1},closed:{type:Boolean,default:!0}},computed:{reallyClosed:function(){return this.disabled||this.closed}},methods:{toggleHidden:function(){this.$emit("toggle",this.closed)}}},ot=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar-section-container",class:{disabled:t.disabled}},[n("h2",{staticClass:"sidebar-section-header",domProps:{textContent:t._s(t.title)},on:{click:t.toggleHidden}}),n("section",{staticClass:"sidebar-section",class:{closed:t.reallyClosed}},[t._t("default")],2)])},it=[],st={render:ot,staticRenderFns:it},at=st,ct=n(0),lt=i,ut=ct(rt,at,lt,null,null),dt=ut.exports,ht={props:{name:String}},ft=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"form-field"},[t.name?n("span",{staticClass:"label",domProps:{textContent:t._s(t.name)}}):t._e(),t._t("default")],2)},mt=[],vt={render:ft,staticRenderFns:mt},pt=vt,gt=n(0),yt=s,bt=gt(ht,pt,yt,null,null),xt=bt.exports,wt={components:{FormField:xt},props:{value:Number,name:String,min:{type:Number,default:0},max:Number,step:{default:1,type:Number}},computed:{prettyValue:function(){return Math.floor(this.value)===this.value?this.value:this.value.toFixed(2)}},data:function(){return{innerValue:this.value,snapValue:G()(150,function(){this.innerValue=this.value})}},watch:{value:function(){this.snapValue()}},methods:{updateRange:function(t){var e=Number(t);if(!Number.isNaN(e)){this.innerValue=e;var n=Math.round(e/this.step)*this.step;this.$emit("input",n)}}}},zt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form-field",{staticClass:"form-range",attrs:{name:t.name}},[n("input",{staticClass:"input-range",attrs:{type:"range",min:t.min,max:t.max,step:"any"},domProps:{value:t.innerValue},on:{input:function(e){t.updateRange(e.target.value)},mouseup:t.snapValue}}),n("input",{staticClass:"input-text input",attrs:{type:"number",min:t.min,max:t.max,step:t.step},domProps:{value:t.prettyValue},on:{input:function(e){t.updateRange(e.target.value)}}})])},Mt=[],_t={render:zt,staticRenderFns:Mt},Ct=_t,Et=n(0),St=a,Xt=Et(wt,Ct,St,null,null),Ft=Xt.exports,At=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Math.floor(Math.random()*((e-t)/n+1))*n+t},Lt=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var s,a=t[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),Dt=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},Tt=function(t){return F(t).sort(function(t){return Math.random()-.5})},kt=function(t){return{x:At(0,t-1),y:At(0,t-1)}},Rt=function(t,e,n){return[Math.max(0,t-e),Math.min(n,t+e)]},Ot=function(t,e,n){var r=L(t,function(t,e){return Math.random()<n?1:0});if(1===e)return r;var o=Math.ceil(t/e)*e,i=!0,s=!1,a=void 0;try{for(var l,u=Tt(o).entries()[Symbol.iterator]();!(i=(l=u.next()).done);i=!0){var d=l.value,h=Lt(d,2),f=h[0],m=h[1],v=m%e+1,p=kt(t),g=Math.ceil(Math.max(t-f,2)/2),y=A.apply(void 0,c(Rt(p.x,g,t))),b=A.apply(void 0,c(Rt(p.y,g,t))),x=!0,w=!1,z=void 0;try{for(var M,_=y[Symbol.iterator]();!(x=(M=_.next()).done);x=!0){var C=M.value,E=!0,S=!1,X=void 0;try{for(var F,D=b[Symbol.iterator]();!(E=(F=D.next()).done);E=!0){var T=F.value;Dt(p,{x:C,y:T})<=g&&(r[C][T]=r[C][T]?v:0)}}catch(t){S=!0,X=t}finally{try{!E&&D.return&&D.return()}finally{if(S)throw X}}}}catch(t){w=!0,z=t}finally{try{!x&&_.return&&_.return()}finally{if(w)throw z}}}}catch(t){s=!0,a=t}finally{try{!i&&u.return&&u.return()}finally{if(s)throw a}}return r},Nt={components:{RangeField:Ft},data:function(){return{size:At(5,20),density:At(.6,.95,.05),colors:At(1,5),code:"",closed:!1}},methods:{randomize:function(){this.size=At(5,20),this.density=At(.6,.95,.05),this.colors=At(1,5)},start:function(){var t=Ot(this.size,this.colors,this.density),e={column:F(this.size).map(function(e){return V(t.map(function(t){return t[e]}))}),row:F(this.size).map(function(e){return V(t[e])})};this.$store.dispatch("action:start-game",{size:this.size,colors:this.colors,rules:e})},startWithCode:function(){var t=void 0;try{t=q(this.code)}catch(t){this.code="FAULTY CODE"}this.$store.dispatch("action:start-game",{size:t.width,rules:{row:t.row,column:t.column},colors:t.colors,scheme:t.colorScheme}),this.code=""}}},jt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"start-game"}},[n("form",{on:{submit:function(e){e.preventDefault(),t.start(e)}}},[n("fieldset",[n("legend",[t._v("Options")]),n("range-field",{attrs:{name:"Size",min:2,max:20},model:{value:t.size,callback:function(e){t.size=t._n(e)},expression:"size"}}),n("range-field",{attrs:{name:"Colors",min:1,max:5},model:{value:t.colors,callback:function(e){t.colors=t._n(e)},expression:"colors"}}),n("range-field",{attrs:{name:"Density",min:.6,max:.95,step:.05},model:{value:t.density,callback:function(e){t.density=t._n(e)},expression:"density"}}),n("div",{staticClass:"buttons"},[n("button",{staticClass:"secondary",on:{click:function(e){e.preventDefault(),t.randomize(e)}}},[t._v("Randomize")]),t._v(" "),n("button",[t._v("Start New Game")])])],1)]),n("form",{on:{submit:function(e){e.preventDefault(),t.startWithCode(e)}}},[n("fieldset",[n("legend",[t._v("Load Game")]),n("small",[t._v("paste code below")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{spellcheck:"false",onclick:"this.focus();this.select()",rows:"5"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),n("button",[t._v("Load")])])])])},$t=[],It={render:jt,staticRenderFns:$t},Gt=It,Pt=n(0),Vt=Pt(Nt,Gt,null,null,null),Wt=Vt.exports,Ht={components:{RangeField:Ft},data:function(){return{size:At(5,11),colors:At(1,5),closed:!0}},methods:Object(M.b)({start:"action:start-editor"})},Bt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"create-game"}},[n("form",{on:{submit:function(e){e.preventDefault(),t.start({size:t.size,colors:t.colors})}}},[n("fieldset",[n("legend",[t._v("Options")]),n("range-field",{attrs:{name:"Size",min:2,max:20},model:{value:t.size,callback:function(e){t.size=t._n(e)},expression:"size"}}),n("range-field",{attrs:{name:"Colors",min:1,max:5},model:{value:t.colors,callback:function(e){t.colors=t._n(e)},expression:"colors"}}),n("button",[t._v("Start")])],1)])])},Yt=[],Zt={render:Bt,staticRenderFns:Yt},Ut=Zt,Jt=n(0),qt=Jt(Ht,Ut,null,null,null),Qt=qt.exports,Kt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},te={computed:Kt({},Object(M.e)({anchor:"colorAnchor"}),Object(M.c)({colors:"colorsUsed"})),methods:Object(M.d)({changeColors:"change-color",resetColors:"reset-colors"})},ee=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("fieldset",[n("legend",[t._v("Color Scheme")]),n("ul",{staticClass:"color-scheme"},t._l(t.colors,function(e,r){return n("li",{staticClass:"color-box",class:{highlighted:r+1==t.anchor},style:"--color:"+e},[n("label",[n("span",{domProps:{textContent:t._s(r+1)}}),n("input",{attrs:{type:"color"},domProps:{value:t.colors[r]},on:{change:function(e){t.changeColors({index:r,value:e.target.value})}}})])])})),n("button",{on:{click:function(e){e.preventDefault(),t.resetColors(e)}}},[t._v("revert colors")])])},ne=[],re={render:ee,staticRenderFns:ne},oe=re,ie=n(0),se=l,ae=ie(te,oe,se,null,null),ce=ae.exports,le=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},ue={computed:Object(M.e)({past:function(t){return t.history.past},future:function(t){return t.history.future}}),methods:le({},Object(M.b)({undo:"action:undo-move",redo:"action:redo-move"}),Object(M.d)({clear:"reset-board"}))},de=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("fieldset",[n("legend",[t._v("History")]),n("div",{staticClass:"history-buttons"},[n("button",{attrs:{disabled:0==t.past.length,"data-shortcut":"ctrl+z"},on:{click:t.undo}},[t._v("Undo")]),n("button",{attrs:{disabled:0==t.future.length,"data-shortcut":"ctrl+shift+z"},on:{click:t.redo}},[t._v("Redo")]),n("button",{staticClass:"secondary restart-level",attrs:{"data-shortcut":"ctrl+c"},on:{click:t.clear}},[t._v("Restart Level")])])])},he=[],fe={render:de,staticRenderFns:he},me=fe,ve=n(0),pe=u,ge=ve(ue,me,pe,null,null),ye=ge.exports,be={components:{GameHistory:ye,ColorScheme:ce},data:function(){return{disabled:!0,closed:!0,shortcuts:!1}},computed:Object(M.c)({code:"serialization"})},xe=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:{shortcuts:t.shortcuts},attrs:{id:"game-options"}},[n("color-scheme"),n("game-history"),n("fieldset",[n("legend",[t._v("Level Code")]),n("small",[t._v("copy this code to share this level with others.")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{readonly:"readonly",onclick:"this.focus();this.select()",rows:"8"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}})]),n("fieldset",[n("legend",[t._v("Other")]),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.shortcuts,expression:"shortcuts"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.shortcuts)?t._i(t.shortcuts,null)>-1:t.shortcuts},on:{__c:function(e){var n=t.shortcuts,r=e.target,o=!!r.checked;if(Array.isArray(n)){var i=t._i(n,null);r.checked?i<0&&(t.shortcuts=n.concat(null)):i>-1&&(t.shortcuts=n.slice(0,i).concat(n.slice(i+1)))}else t.shortcuts=o}}}),t._v("Toggle Shortcut Guide")])])],1)},we=[],ze={render:xe,staticRenderFns:we},Me=ze,_e=n(0),Ce=d,Ee=_e(be,Me,Ce,null,null),Se=Ee.exports,Xe=n(18),Fe=n.n(Xe),Ae=(n(19),function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var s,a=t[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()),Le={data:function(){var t=this;return{game:"NC8vNC8vMi8vW1t7MSwxfXsxLDF9ezIsMX1dfFt7MSwyfXsyLDF9XXxbezEsMX17MSwxfV18W3sxLDF9ezEsMn1dXS8vW1t7MSw0fV18W3sxLDF9XXxbezEsMX17MSwxfV18W3syLDJ9ezEsMn1dXS8vIzNhMWEyZj8jQTM2NThDPyNlN2NiZGQ/I2ZmNzE4Nz8jOGRiMGUx",step:0,driver:new Fe.a({animate:!1,stageBackground:"var(--translucent-white)",onHighlighted:function(){window.setTimeout(function(){var e=window.document.querySelector("#driver-popover-item"),n=window.document.body.clientHeight,r=window.document.body.clientWidth,o=window.getComputedStyle(e),i=o.top,s=o.left,a=o.height,c=o.width,l=[i,s].map(function(t){return parseInt(t)}),u=Ae(l,2),d=u[0],h=u[1];d<0?e.style.top="0px":d>n-a&&(e.style.top=n-a+"px"),h<0?e.style.left="0px":h>r-c&&(e.style.left=r-c+"px"),(t.steps[t.step].action||function(){}).apply(t),t.step++,t.driver.hasNextStep()||t.highlightAll()},100)}}),steps:[{stageBackground:"var(--background)",element:".game-title",popover:{title:"Welcome to Nonochill!",description:"This guide will show you the basics of solving nonogram puzzles."}},{stageBackground:"var(--background)",element:"#main",popover:{title:"The Board",description:"Nonograms are a puzzle that's made up of a grid of cells,\n\t\t\t\t\t\t\tsurrounded by clues that help determine how the cells should be filled."}},{element:"#section-board-game",popover:{title:"Clicking on a cell cycles it through its states.",description:"A cell can be empty, filled with color (black, pink, etc.), or intentionally marked empty (X)"},action:function(){this.setTiles([[0,0,1],[0,0,2],[0,0,-1],[0,0,0],[0,0,1],[0,1,1],[0,2,1],[0,3,1],[1,0,2],[1,1,-1]])}},{element:"#section-clues-vertical",popover:{title:"Each row and column has a corresponding clue.",description:"A clue is a list of numbers that say how many cells in that row or column have that color\n\t\t\t\t\t\t\tand in what order they appear (from top to bottom or left to right)"}},{element:"#section-clues-horizontal",popover:{title:"If a clue is greyed out, it means the row or column is 'solved'.",description:"Once all the clues are solved, then you've solved the puzzle!"}},{element:"#main",stageBackground:"var(--background)",popover:{title:"The End",description:"Try solving the provided puzzle. If you're up to the challenge, create a new puzzle in the\n\t\t\t\t\t\t\tPlay section in the sidebar."}}]}},methods:{setTile:function(t,e,n){return this.$store.dispatch("action:set-tile",{tile:{x:t,y:e},curr:n?0:1,next:n})},setTiles:function(t){var e=this;t.reverse().reduce(function(t,n){return function(){return setTimeout(function(){e.setTile.apply(e,h(n)),t()},n[3]||500)}},function(){})()},start:function(){this.step=0,this.$store.dispatch("action:start-game",this.game),this.$nextTick(function(){this.driver.defineSteps(this.steps),this.driver.start()})},highlightColumn:function(t){document.querySelectorAll(".board .game-tile").forEach(function(t){return t.style.opacity=.1}),document.querySelectorAll(".game-tile:nth-child("+(t+1)+")").forEach(function(t){return t.style.opacity=1})},highlightAll:function(){document.querySelectorAll(".board .game-tile").forEach(function(t){return t.style.opacity=1})}}},De=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"tutorial"}},[n("form",{on:{submit:function(e){e.preventDefault(),t.start(e)}}},[t._m(0)])])},Te=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("fieldset",[n("legend",[t._v("Tutorial")]),n("small",[t._v("This tutorial will teach you the basics of solving nonograms.")]),n("button",[t._v("Play Tutorial")])])}],ke={render:De,staticRenderFns:Te},Re=ke,Oe=n(0),Ne=f,je=Oe(Le,Re,Ne,null,null),$e=je.exports,Ie={components:{SidebarSection:dt,StartGame:Wt,GameOptions:Se,CreateGame:Qt,TutorialSection:$e},computed:Object(M.e)(["mode"]),watch:{mode:function(t){t===S.INIT?this.section=[!0,!1,!1]:this.section=[!1,!1,!0]}},data:function(){return{section:[!0,!1,!1]}},methods:{toggle:function(t){this.section=this.section.map(function(e,n){return n===t&&!e})}}},Ge=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"sidebar page-section",attrs:{id:"sidebar"}},[t._m(0),n("sidebar-section",{attrs:{title:"Play",closed:!t.section[0]},on:{toggle:function(e){t.toggle(0)}}},[n("start-game"),n("tutorial-section")],1),n("sidebar-section",{attrs:{title:"Level Editor",closed:!t.section[1]},on:{toggle:function(e){t.toggle(1)}}},[n("create-game")],1),n("sidebar-section",{attrs:{title:"Options",closed:!t.section[2],disabled:0==t.mode},on:{toggle:function(e){t.toggle(2)}}},[n("game-options")],1),t._t("default")],2)},Pe=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{staticClass:"game-title"},[t._v("NonoChill"),n("sup",[t._v("v.2")])])}],Ve={render:Ge,staticRenderFns:Pe},We=Ve,He=n(0),Be=m,Ye=He(Ie,We,Be,null,null),Ze=Ye.exports,Ue=function(t,e){return null!=t&&t===e},Je={data:function(){return{highlight:{}}},methods:{clearHighlight:function(){this.highlight={}},setHighlight:function(t){this.highlight=t},isHighlighted:function(t){var e=t.x,n=t.y;return Ue(this.highlight.x,e)||Ue(this.highlight.y,n)}}},qe={props:{state:Number},computed:{hasData:function(){return this.$slots.default}}},Qe=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"game-tile",attrs:{"data-state":t.state}},[t.hasData?n("div",{staticClass:"game-tile-contents"},[t._t("default")],2):t._e()])},Ke=[],tn={render:Qe,staticRenderFns:Ke},en=tn,nn=n(0),rn=v,on=nn(qe,en,rn,null,null),sn=on.exports,an={props:{width:Number,clues:Array,vertical:{type:Boolean,default:!1}},computed:{clueGap:function(){return this.clues?this.width-this.clues.length:0},sparse:function(){return this.clues&&this.clues.length<this.width}}},cn=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"clues",class:{sparse:t.sparse,vertical:t.vertical,horizontal:!t.vertical},style:"--clue-gap: "+t.clueGap},t._l(t.clues,function(e){return n("li",{staticClass:"clue",attrs:{"data-state":e.val},domProps:{textContent:t._s(e.count)}})}))},ln=[],un={render:cn,staticRenderFns:ln},dn=un,hn=n(0),fn=p,mn=hn(an,dn,fn,null,null),vn=mn.exports,pn=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},gn=function(t,e){return t.val===e.val&&t.count===e.count},yn=function(t,e){return D(t,e,gn)},bn=function(t){return function(e){e.preventDefault(),t(e)}},xn=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments[1];return function(n){t[n]=e}},wn={mixins:[Je],components:{GameTile:sn,GameClueList:vn},data:function(){return{highlight:{},activeTile:{x:0,y:0}}},computed:pn({keymap:function(){var t=this,e={"`":{keydown:function(e){return t.reverseColor(!0)},keyup:function(e){return t.reverseColor(!1)}},up:function(e){return t.moveActiveTile({dx:-1})},down:function(e){return t.moveActiveTile({dx:1})},left:function(e){return t.moveActiveTile({dy:-1})},right:function(e){return t.moveActiveTile({dy:1})},enter:function(e){return t.toggle(t.activeTile)}};return[1,2,3,4,5].forEach(xn(e,{keydown:function(e){return t.anchorColor(e.keyCode-48)},keyup:function(e){return t.anchorColor(null)}})),["ctrl+z","meta+z"].forEach(xn(e,bn(this.undo))),["ctrl+shift+z","meta+shift+z"].forEach(xn(e,bn(this.redo))),["ctrl+c","meta+c"].forEach(xn(e,bn(this.clear))),e},solved:function(){var t=this;return{row:this.rows.map(function(e,n){return yn(V(e),t.rules.row[n])}),column:this.columns.map(function(e,n){return yn(V(e),t.rules.column[n])})}},win:function(){return T(this.solved.column)===this.size&&T(this.solved.row)===this.size}},Object(M.e)({board:"board",rules:"rules",size:function(t){return t.board.length},rows:"board",columns:function(t){var e=t.board;return F(e.length).map(function(t){return e.map(function(e){return e[t]})})}})),watch:{win:function(t){t&&this.$emit("win")},activeTile:function(t){this.setHighlight(t)}},methods:pn({enterTile:function(t,e){this.setHighlight(t),1===e.buttons&&this.setTile(t)},moveActiveTile:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=t.dx,n=void 0===e?0:e,r=t.dy,o=void 0===r?0:r,i=this.board.length,s=Math.max(0,Math.min(i-1,this.activeTile.x+n)),a=Math.max(0,Math.min(i-1,this.activeTile.y+o));this.activeTile={x:s,y:a}},setTile:function(t){this.activeTile=t,this.toggle(t)}},Object(M.b)({toggle:"action:toggle-tile",undo:"action:undo-move",redo:"action:redo-move",anchorColor:"action:anchor-color",reverseColor:"action:reverse-color"}),Object(M.d)({clear:"reset-board"}))},zn=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"hotkey",rawName:"v-hotkey",value:t.keymap,expression:"keymap"}],staticClass:"board-game",style:"--board-size:"+t.size+";--clue-size:"+t.size+";"},[n("div",{staticClass:"vertical clue-list",attrs:{id:"section-clues-vertical"},on:{mouseleave:t.clearHighlight}},t._l(t.rules.column,function(e,r){return n("game-clue-list",{key:r,class:{solved:t.solved.column[r],highlighted:t.isHighlighted({y:r})},attrs:{vertical:!0,clues:e,width:t.size},nativeOn:{mouseenter:function(e){t.setHighlight({y:r})}}})})),n("div",{staticClass:"horizontal clue-list",attrs:{id:"section-clues-horizontal"},on:{mouseleave:t.clearHighlight}},t._l(t.rules.row,function(e,r){return n("game-clue-list",{key:r,class:{solved:t.solved.row[r],highlighted:t.isHighlighted({x:r})},attrs:{clues:e,width:t.size},nativeOn:{mouseenter:function(e){t.setHighlight({x:r})}}})})),n("div",{staticClass:"board",class:{win:t.win},attrs:{id:"section-board-game"},on:{mouseleave:t.clearHighlight}},t._l(t.board,function(e,r){return n("div",{key:r,staticClass:"game-row"},t._l(e,function(e,o){return n("game-tile",{key:"`${x}-${y}`",class:{highlighted:t.isHighlighted({x:r,y:o})},attrs:{state:t.board[r][o]},nativeOn:{mouseenter:function(e){t.enterTile({x:r,y:o},e)},mousedown:function(e){t.setTile({x:r,y:o})}}})}))}))])},Mn=[],_n={render:zn,staticRenderFns:Mn},Cn=_n,En=n(0),Sn=g,Xn=En(wn,Cn,Sn,null,null),Fn=Xn.exports,An={props:{href:{type:String,required:!0}}},Ln=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"github-corner",staticStyle:{position:"absolute",top:"0",border:"0",right:"0"},attrs:{href:t.href,"aria-label":"View source on Github"}},[n("svg",{attrs:{width:"50",height:"50",viewBox:"0 0 250 250","aria-hidden":"true"}},[n("path",{attrs:{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}}),n("path",{staticClass:"octo-arm",staticStyle:{"transform-origin":"130px 106px"},attrs:{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor"}}),n("path",{staticClass:"octo-body",attrs:{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor"}})])])},Dn=[],Tn={render:Ln,staticRenderFns:Dn},kn=Tn,Rn=n(0),On=y,Nn=Rn(An,kn,On,null,null),jn=Nn.exports,$n={data:function(){return{serialization:"MTcvLzE3Ly8zLy9bW118W3szLDF9ezEsM317MSwzfV18W3sxLDF9ezEsMX17MSwxfXszLDF9XXxbezIsMX17MSwzfXsxLDF9ezEsMX1dfFt7MywxfV18W3syLDF9ezEsM317MSwzfXsyLDF9XXxbezEsMX17MSwxfXsxLDF9ezIsMX17MiwxfV18W3sxLDF9ezEsM317MSwzfXsyLDF9XXxbezEsMX1dfFt7MSwxfXsxLDN9ezEsM317MiwxfV18W3sxLDF9ezIsMn17MiwxfV18W3syLDF9ezEsM317MSwzfXsyLDF9XXxbezEsMX17MywxfV18W3syLDF9ezEsM31dfFt7MSwxfXsxLDF9ezEsM317MywxfV18W3szLDF9ezEsM317MSwxfV18W11dLy9bW118W3szLDF9ezIsMX17MiwxfXsxLDF9ezEsMX17MiwxfXsyLDF9ezMsMX1dfFtdfFt7MSwzfXsxLDN9ezEsM317MSwzfV18W3sxLDF9ezEsMX17MSwxfXsxLDF9ezEsMX17MSwxfXsxLDF9ezEsMX1dfFt7MSwxfXsxLDF9ezEsM317MSwxfXsxLDF9ezEsM31dfFtdfFt7MSwzfXsxLDF9ezEsMX17MSwxfXsxLDF9ezEsMX1dfFt7MSwxfXsxLDN9ezEsMX17MSwxfXsxLDF9XXxbezEsM317MSwxfXsxLDF9ezEsMX17MSwyfXsxLDJ9XXxbXXxbezIsMX17MiwxfXsyLDJ9XXxbezIsMX17MiwyfV18W118W3szLDF9ezMsMX17MiwxfXsxLDF9ezIsMX17MywxfXszLDF9XXxbXXxbXV0vLyMzYTFhMmY/I0EzNjU4Qz8jZTdjYmRkPyNmZjcxODc/IzhkYjBlMQ==",contents:"00000000000000000\n03020201010202030\n00000000000000000\n01110111011101110\n01010101010101010\n01010111010101110\n00000000000000000\n01110101010100100\n01000111010100100\n01110101010110110\n00000000000000000\n00000202022000000\n00000020002200000\n00000000000000000\n00303020102030300\n00000000000000000\n00000000000000000".split(/\s+/g).map(function(t){return t.split("").map(function(t){return parseInt(t)})})}},created:function(){var t=q(this.serialization);this.$store.commit("start-game",{size:t.width,rules:{row:t.row,column:t.column},board:this.contents,colors:t.colors})}},In={store:nt,name:"app",computed:Object(M.e)({reverse:"colorReverse",anchor:"colorAnchor",maxColor:"colorNum",board:"board",state:"mode",colorStyling:function(t){return""+t.colorScheme.map(function(t,e){return"--state-"+(e+1)+":"+t+";"}).join("")}}),components:{Sidebar:Ze,GameBoard:Fn,GithubCornerLink:jn},mixins:[$n]},Gn=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"whole",style:t.colorStyling,attrs:{id:"app"}},[n("section",{staticClass:"main page-section",attrs:{id:"main"}},[n("game-board")],1),n("sidebar",{staticClass:"sidebar",attrs:{id:"sidebar"}},[n("footer",[t._v("Created by "),n("a",{staticClass:"author",attrs:{href:"https://github.com/JZumun"}},[n("img",{attrs:{src:"https://avatars3.githubusercontent.com/u/10479613"}}),t._v("JZumun")]),t._v(" using "),n("a",{attrs:{href:"https://vuejs.org/"}},[t._v("Vue JS")]),t._v(".\nHosted on "),n("a",{attrs:{href:"https://github.com/JZumun/nonochill-v2"}},[t._v("Github")]),t._v(".")])]),n("github-corner-link",{attrs:{id:"github-link",href:"https://github.com/JZumun/nonochill-v2"}})],1)},Pn=[],Vn={render:Gn,staticRenderFns:Pn},Wn=Vn,Hn=n(0),Bn=b,Yn=Hn(In,Wn,Bn,null,null),Zn=Yn.exports,Un=n(27),Jn=n.n(Un);z.a.use(Jn.a),new z.a({el:"#app",render:function(t){return t(Zn)}})},,function(t,e){},,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){}],[4]);
//# sourceMappingURL=build.js.map