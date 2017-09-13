webpackJsonp([0],[,,,,function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t){n(10)}function s(t){n(12)}function a(t){n(11)}function c(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function l(t){n(14)}function u(t){n(15)}function d(t){n(13)}function h(t){n(9)}function f(t){n(17)}function m(t){n(18)}function v(t){n(16)}function p(t){n(19)}function g(t){n(6)}Object.defineProperty(e,"__esModule",{value:!0});var b,y,x=n(2),w=n(1),z=Object.freeze({INIT:0,GAME_SETUP:1,GAME_READY:1.5,CREATOR:2,CREATOR_READY:2.5}),M=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.includes(t)}},_=(M(z.GAME_SETUP,z.GAME_READY),M(z.CREATOR,z.CREATOR_READY)),C=z,E=Object.freeze(["#3a1a2f","#A3658C","#e7cbdd","#ff7187","#8db0e1"]),X=function(t){return Array.from(new Array(t),function(t,e){return e})},S=function(t,e){return X(e-t).map(function(e){return e+t})},F=function(t,e){return X(t).map(function(n){return X(t).map(function(t){return e(n,t)})})},L=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(t,e){return t===e};return t&&e&&t.length===e.length&&t.every(function(t,r){return n(t,e[r])})},A=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){return t};return t.filter(e).length},D=function(t){return{undone:!0,tile:t.tile,next:t.curr,curr:t.next}},R=function(t){return t.reverse().map(D)},O=function(t,e){return e.reduce(function(t,e){var n=e.tile,r=n.x,o=n.y,i=e.next;return t[r][o]=i,t},t.slice())},k=function(t){return F(t,function(t){return 0})},T=function(t){t.history={past:[],future:[],staged:[]}},j=(b={},r(b,"start-game",function(t,e){var n=e.size,r=e.rules,o=e.colors,i=e.scheme,s=void 0===i?E.slice():i,a=e.board,c=void 0===a?k(n):a;t.rules=r,t.colorScheme=s,t.colorNum=o,t.mode=C.GAME_SETUP,t.board=c,T(t)}),r(b,"start-editor",function(t,e){var n=e.size,r=e.colors,o=e.scheme,i=void 0===o?E.slice():o;t.colorScheme=i,t.colorNum=r,t.rules={column:X(n).map(function(t){return[]}),row:X(n).map(function(t){return[]})},t.board=k(n),T(t)}),r(b,"change-mode",function(t,e){t.mode=e}),r(b,"change-colors",function(t,e){t.colorScheme=e.slice()}),r(b,"change-color",function(t,e){var n=e.index,r=e.value;t.colorScheme.splice(n,1,r)}),r(b,"reset-colors",function(t){t.colorScheme=E}),r(b,"reset-board",function(t){t.board=k(t.board.length),T(t)}),r(b,"update-rules",function(t,e){t.rules=e}),r(b,"set-tile",function(t,e){t.board=O(t.board,[e])}),r(b,"stage-move",function(t,e){t.history.future=[],t.history.staged.push(e)}),r(b,"commit-moves",function(t){t.history.past.push(t.history.staged),t.history.staged=[]}),r(b,"undo-move",function(t){var e=R(t.history.past.pop());t.board=O(t.board,e),t.history.future.push(e)}),r(b,"redo-move",function(t){var e=R(t.history.future.pop());t.board=O(t.board,e),t.history.past.push(e)}),r(b,"anchor-color",function(t,e){t.colorAnchor=e}),r(b,"unanchor-color",function(t,e){t.colorAnchor=null}),r(b,"reverse-color",function(t,e){t.colorReverse=e}),b),N=n(3),$=n.n(N),G=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return n?-1===t?e:t-1:t===e?-1:t+1},P=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t?t.reduce(function(t,e){var n=t.length-1;return e===t[n].val?t[n].count++:t.push({val:e,count:1}),t},[{val:null,count:0}]).filter(function(t){return t.val>0&&t.count>0}):[]},V=$()(500,function(t){t("commit-moves")}),I=(y={},o(y,"action:set-tile",function(t,e){var n=t.commit;e.next!==e.curr&&(n("set-tile",e),n("stage-move",e),V(n))}),o(y,"action:toggle-tile",function(t,e){var n=(t.commit,t.dispatch),r=t.state,o=r.board[e.x][e.y],i=void 0;r.colorAnchor?(i=G(o===r.colorAnchor?1:o>0?0:o,1,r.colorReverse),i=1===i?r.colorAnchor:i):i=G(o,r.colorNum,r.colorReverse),n("action:set-tile",{tile:e,curr:o,next:i}),n("action:rules-match-board")}),o(y,"action:rules-match-board",function(t){var e=t.commit,n=t.state;_(n.mode)&&e("update-rules",{row:n.board.map(function(t){return P(t)}),column:X(n.board.length).map(function(t){return P(n.board.map(function(e){return e[t]}))})})}),o(y,"action:start-game",function(t,e){var n=t.commit;n("change-mode",C.GAME_SETUP),n("start-game",e),x.a.nextTick(function(t){return n("change-mode",C.GAME_READY)})}),o(y,"action:start-editor",function(t,e){var n=t.commit;n("change-mode",C.CREATOR),n("start-editor",e),x.a.nextTick(function(t){return n("change-mode",C.CREATOR_READY)})}),o(y,"action:anchor-color",function(t,e){var n=t.commit,r=t.state;null==e?n("unanchor-color"):r.anchor!==e&&r.colorNum>=e&&n("anchor-color",e)}),o(y,"action:reverse-color",function(t,e){var n=t.commit;t.state.colorReverse!==e&&n("reverse-color",e)}),o(y,"action:undo-move",function(t,e){var n=t.commit,r=t.dispatch;t.state.history.past.length&&n("undo-move",e),r("action:rules-match-board")}),o(y,"action:redo-move",function(t,e){var n=t.commit,r=t.dispatch;t.state.history.future.length&&n("redo-move",e),r("action:rules-match-board")}),y),H=function(t){return"{"+t.val+","+t.count+"}"},W=function(t){return"["+t.map(H).join("")+"]"},Y=function(t){return"["+t.map(W).join("|")+"]"},U=function(t){var e=t.width,n=t.height,r=t.colors,o=t.column,i=t.row,s=t.colorScheme,a=void 0===s?[]:s;return btoa([e,n,r,Y(o),Y(i),a.join("?")].join("//"))},J=function(t){var e=t.replace(/[\{\}\[\]]/g,"").split(",").map(function(t){return parseInt(t)});return{val:e[0],count:e[1]}},Z=function(t){return t.split("}{").map(J).filter(function(t){var e=t.count,n=t.val;return e&&n})},B=function(t){return t.split("|").map(Z)},q=function(t){var e=atob(t).split("//");return{width:parseInt(e[0]),height:parseInt(e[1]),colors:parseInt(e[2]),column:B(e[3]),row:B(e[4]),colorScheme:e[5]&&e[5].split("?")}};x.a.use(w.a);var Q={mode:C.INIT,colorScheme:[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(E)),colorNum:3,colorAnchor:null,colorReverse:!1,board:[],rules:{column:[],row:[]},history:{staged:[],past:[],future:[]}},K={serialization:function(t){var e=t.board,n=t.colorNum,r=t.colorScheme,o=t.rules;return U({width:e.length,height:e.length,colors:n,column:o.column,row:o.row,colorScheme:r})},colorsUsed:function(t){var e=t.colorNum;return t.colorScheme.slice(0,e)}},tt=new w.a.Store({state:Q,getters:K,mutations:j,actions:I}),et={props:{title:String,disabled:{type:Boolean,default:!1},closed:{type:Boolean,default:!0}},computed:{reallyClosed:function(){return this.disabled||this.closed}},methods:{toggleHidden:function(){this.$emit("toggle",this.closed)}}},nt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar-section-container",class:{disabled:t.disabled}},[n("h2",{staticClass:"sidebar-section-header",domProps:{textContent:t._s(t.title)},on:{click:t.toggleHidden}}),n("section",{staticClass:"sidebar-section",class:{closed:t.reallyClosed}},[t._t("default")],2)])},rt=[],ot={render:nt,staticRenderFns:rt},it=ot,st=n(0),at=i,ct=st(et,it,at,null,null),lt=ct.exports,ut={props:{name:String}},dt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"form-field"},[t.name?n("span",{staticClass:"label",domProps:{textContent:t._s(t.name)}}):t._e(),t._t("default")],2)},ht=[],ft={render:dt,staticRenderFns:ht},mt=ft,vt=n(0),pt=s,gt=vt(ut,mt,pt,null,null),bt=gt.exports,yt={components:{FormField:bt},props:{value:Number,name:String,min:{type:Number,default:0},max:Number,step:{default:1,type:Number}},computed:{prettyValue:function(){return Math.floor(this.value)===this.value?this.value:this.value.toFixed(2)}},data:function(){return{innerValue:this.value,snapValue:$()(150,function(){this.innerValue=this.value})}},watch:{value:function(){this.snapValue()}},methods:{updateRange:function(t){var e=Number(t);if(!Number.isNaN(e)){this.innerValue=e;var n=Math.round(e/this.step)*this.step;this.$emit("input",n)}}}},xt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form-field",{staticClass:"form-range",attrs:{name:t.name}},[n("input",{staticClass:"input-range",attrs:{type:"range",min:t.min,max:t.max,step:"any"},domProps:{value:t.innerValue},on:{input:function(e){t.updateRange(e.target.value)},mouseup:t.snapValue}}),n("input",{staticClass:"input-text input",attrs:{type:"number",min:t.min,max:t.max,step:t.step},domProps:{value:t.prettyValue},on:{input:function(e){t.updateRange(e.target.value)}}})])},wt=[],zt={render:xt,staticRenderFns:wt},Mt=zt,_t=n(0),Ct=a,Et=_t(yt,Mt,Ct,null,null),Xt=Et.exports,St=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Math.floor(Math.random()*((e-t)/n+1))*n+t},Ft=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var s,a=t[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),Lt=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},At=function(t){return X(t).sort(function(t){return Math.random()-.5})},Dt=function(t){return{x:St(0,t-1),y:St(0,t-1)}},Rt=function(t,e,n){return[Math.max(0,t-e),Math.min(n,t+e)]},Ot=function(t,e,n){var r=F(t,function(t,e){return Math.random()<n?1:0});if(1===e)return r;var o=Math.ceil(t/e)*e,i=!0,s=!1,a=void 0;try{for(var l,u=At(o).entries()[Symbol.iterator]();!(i=(l=u.next()).done);i=!0){var d=l.value,h=Ft(d,2),f=h[0],m=h[1],v=m%e+1,p=Dt(t),g=Math.ceil(Math.max(t-f,2)/2),b=S.apply(void 0,c(Rt(p.x,g,t))),y=S.apply(void 0,c(Rt(p.y,g,t))),x=!0,w=!1,z=void 0;try{for(var M,_=b[Symbol.iterator]();!(x=(M=_.next()).done);x=!0){var C=M.value,E=!0,X=!1,L=void 0;try{for(var A,D=y[Symbol.iterator]();!(E=(A=D.next()).done);E=!0){var R=A.value;Lt(p,{x:C,y:R})<=g&&(r[C][R]=r[C][R]?v:0)}}catch(t){X=!0,L=t}finally{try{!E&&D.return&&D.return()}finally{if(X)throw L}}}}catch(t){w=!0,z=t}finally{try{!x&&_.return&&_.return()}finally{if(w)throw z}}}}catch(t){s=!0,a=t}finally{try{!i&&u.return&&u.return()}finally{if(s)throw a}}return r},kt={components:{RangeField:Xt},data:function(){return{size:St(5,20),density:St(.6,.95,.05),colors:St(1,5),code:"",closed:!1}},methods:{randomize:function(){this.size=St(5,20),this.density=St(.6,.95,.05),this.colors=St(1,5)},start:function(){var t=Ot(this.size,this.colors,this.density),e={column:X(this.size).map(function(e){return P(t.map(function(t){return t[e]}))}),row:X(this.size).map(function(e){return P(t[e])})};this.$store.dispatch("action:start-game",{size:this.size,colors:this.colors,rules:e})},startWithCode:function(){var t=void 0;try{t=q(this.code)}catch(t){this.code="FAULTY CODE"}this.$store.dispatch("action:start-game",{size:t.width,rules:{row:t.row,column:t.column},colors:t.colors,scheme:t.colorScheme}),this.code=""}}},Tt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"start-game"}},[n("form",{on:{submit:function(e){e.preventDefault(),t.start(e)}}},[n("fieldset",[n("legend",[t._v("Options")]),n("range-field",{attrs:{name:"Size",min:2,max:20},model:{value:t.size,callback:function(e){t.size=t._n(e)},expression:"size"}}),n("range-field",{attrs:{name:"Colors",min:1,max:5},model:{value:t.colors,callback:function(e){t.colors=t._n(e)},expression:"colors"}}),n("range-field",{attrs:{name:"Density",min:.6,max:.95,step:.05},model:{value:t.density,callback:function(e){t.density=t._n(e)},expression:"density"}}),n("div",{staticClass:"buttons"},[n("button",{staticClass:"secondary",on:{click:function(e){e.preventDefault(),t.randomize(e)}}},[t._v("Randomize")]),t._v(" "),n("button",[t._v("Start New Game")])])],1)]),n("form",{on:{submit:function(e){e.preventDefault(),t.startWithCode(e)}}},[n("fieldset",[n("legend",[t._v("Load Game")]),n("small",[t._v("paste code below")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{spellcheck:"false",onclick:"this.focus();this.select()",rows:"5"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),n("button",[t._v("Load")])])])])},jt=[],Nt={render:Tt,staticRenderFns:jt},$t=Nt,Gt=n(0),Pt=Gt(kt,$t,null,null,null),Vt=Pt.exports,It={components:{RangeField:Xt},data:function(){return{size:St(5,11),colors:St(1,5),closed:!0}},methods:Object(w.b)({start:"action:start-editor"})},Ht=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"create-game"}},[n("form",{on:{submit:function(e){e.preventDefault(),t.start({size:t.size,colors:t.colors})}}},[n("fieldset",[n("legend",[t._v("Options")]),n("range-field",{attrs:{name:"Size",min:2,max:20},model:{value:t.size,callback:function(e){t.size=t._n(e)},expression:"size"}}),n("range-field",{attrs:{name:"Colors",min:1,max:5},model:{value:t.colors,callback:function(e){t.colors=t._n(e)},expression:"colors"}}),n("button",[t._v("Start")])],1)])])},Wt=[],Yt={render:Ht,staticRenderFns:Wt},Ut=Yt,Jt=n(0),Zt=Jt(It,Ut,null,null,null),Bt=Zt.exports,qt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Qt={computed:qt({},Object(w.e)({anchor:"colorAnchor"}),Object(w.c)({colors:"colorsUsed"})),methods:Object(w.d)({changeColors:"change-color",resetColors:"reset-colors"})},Kt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("fieldset",[n("legend",[t._v("Color Scheme")]),n("ul",{staticClass:"color-scheme"},t._l(t.colors,function(e,r){return n("li",{staticClass:"color-box",class:{highlighted:r+1==t.anchor},style:"--color:"+e},[n("label",[n("span",{domProps:{textContent:t._s(r+1)}}),n("input",{attrs:{type:"color"},domProps:{value:t.colors[r]},on:{change:function(e){t.changeColors({index:r,value:e.target.value})}}})])])})),n("button",{on:{click:function(e){e.preventDefault(),t.resetColors(e)}}},[t._v("revert colors")])])},te=[],ee={render:Kt,staticRenderFns:te},ne=ee,re=n(0),oe=l,ie=re(Qt,ne,oe,null,null),se=ie.exports,ae=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},ce={computed:Object(w.e)({past:function(t){return t.history.past},future:function(t){return t.history.future}}),methods:ae({},Object(w.b)({undo:"action:undo-move",redo:"action:redo-move"}),Object(w.d)({clear:"reset-board"}))},le=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("fieldset",[n("legend",[t._v("History")]),n("div",{staticClass:"history-buttons"},[n("button",{attrs:{disabled:0==t.past.length,"data-shortcut":"ctrl+z"},on:{click:t.undo}},[t._v("Undo")]),n("button",{attrs:{disabled:0==t.future.length,"data-shortcut":"ctrl+shift+z"},on:{click:t.redo}},[t._v("Redo")]),n("button",{staticClass:"secondary restart-level",attrs:{"data-shortcut":"ctrl+c"},on:{click:t.clear}},[t._v("Restart Level")])])])},ue=[],de={render:le,staticRenderFns:ue},he=de,fe=n(0),me=u,ve=fe(ce,he,me,null,null),pe=ve.exports,ge={components:{GameHistory:pe,ColorScheme:se},data:function(){return{disabled:!0,closed:!0,shortcuts:!1}},computed:Object(w.c)({code:"serialization"})},be=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:{shortcuts:t.shortcuts},attrs:{id:"game-options"}},[n("color-scheme"),n("game-history"),n("fieldset",[n("legend",[t._v("Level Code")]),n("small",[t._v("copy this code to share this level with others.")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{readonly:"readonly",onclick:"this.focus();this.select()",rows:"8"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}})]),n("fieldset",[n("legend",[t._v("Other")]),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.shortcuts,expression:"shortcuts"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.shortcuts)?t._i(t.shortcuts,null)>-1:t.shortcuts},on:{__c:function(e){var n=t.shortcuts,r=e.target,o=!!r.checked;if(Array.isArray(n)){var i=t._i(n,null);r.checked?i<0&&(t.shortcuts=n.concat(null)):i>-1&&(t.shortcuts=n.slice(0,i).concat(n.slice(i+1)))}else t.shortcuts=o}}}),t._v("Toggle Shortcut Guide")])])],1)},ye=[],xe={render:be,staticRenderFns:ye},we=xe,ze=n(0),Me=d,_e=ze(ge,we,Me,null,null),Ce=_e.exports,Ee={components:{SidebarSection:lt,StartGame:Vt,GameOptions:Ce,CreateGame:Bt},computed:Object(w.e)(["mode"]),watch:{mode:function(t){t===C.INIT?this.section=[!0,!1,!1]:this.section=[!1,!1,!0]}},data:function(){return{section:[!0,!1,!1]}},methods:{toggle:function(t){this.section=this.section.map(function(e,n){return n===t&&!e})}}},Xe=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"sidebar page-section",attrs:{id:"sidebar"}},[t._m(0),n("sidebar-section",{attrs:{title:"Play",closed:!t.section[0]},on:{toggle:function(e){t.toggle(0)}}},[n("start-game")],1),n("sidebar-section",{attrs:{title:"Level Editor",closed:!t.section[1]},on:{toggle:function(e){t.toggle(1)}}},[n("create-game")],1),n("sidebar-section",{attrs:{title:"Options",closed:!t.section[2],disabled:0==t.mode},on:{toggle:function(e){t.toggle(2)}}},[n("game-options")],1),t._t("default")],2)},Se=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{staticClass:"game-title"},[t._v("NonoChill"),n("sup",[t._v("v.2")])])}],Fe={render:Xe,staticRenderFns:Se},Le=Fe,Ae=n(0),De=h,Re=Ae(Ee,Le,De,null,null),Oe=Re.exports,ke=function(t,e){return null!=t&&t===e},Te={data:function(){return{highlight:{}}},methods:{clearHighlight:function(){this.highlight={}},setHighlight:function(t){this.highlight=t},isHighlighted:function(t){var e=t.x,n=t.y;return ke(this.highlight.x,e)||ke(this.highlight.y,n)}}},je={props:{state:Number},computed:{hasData:function(){return this.$slots.default}}},Ne=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"game-tile",attrs:{"data-state":t.state}},[t.hasData?n("div",{staticClass:"game-tile-contents"},[t._t("default")],2):t._e()])},$e=[],Ge={render:Ne,staticRenderFns:$e},Pe=Ge,Ve=n(0),Ie=f,He=Ve(je,Pe,Ie,null,null),We=He.exports,Ye={props:{width:Number,clues:Array,vertical:{type:Boolean,default:!1}},computed:{clueGap:function(){return this.clues?this.width-this.clues.length:0},sparse:function(){return this.clues&&this.clues.length<this.width}}},Ue=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"clues",class:{sparse:t.sparse,vertical:t.vertical,horizontal:!t.vertical},style:"--clue-gap: "+t.clueGap},t._l(t.clues,function(e){return n("li",{staticClass:"clue",attrs:{"data-state":e.val},domProps:{textContent:t._s(e.count)}})}))},Je=[],Ze={render:Ue,staticRenderFns:Je},Be=Ze,qe=n(0),Qe=m,Ke=qe(Ye,Be,Qe,null,null),tn=Ke.exports,en=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},nn=function(t,e){return t.val===e.val&&t.count===e.count},rn=function(t,e){return L(t,e,nn)},on=function(t){return function(e){e.preventDefault(),t(e)}},sn=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments[1];return function(n){t[n]=e}},an={mixins:[Te],components:{GameTile:We,GameClueList:tn},data:function(){return{highlight:{},activeTile:{x:0,y:0}}},computed:en({keymap:function(){var t=this,e={"`":{keydown:function(e){return t.reverseColor(!0)},keyup:function(e){return t.reverseColor(!1)}},up:function(e){return t.moveActiveTile({dx:-1})},down:function(e){return t.moveActiveTile({dx:1})},left:function(e){return t.moveActiveTile({dy:-1})},right:function(e){return t.moveActiveTile({dy:1})},enter:function(e){return t.toggle(t.activeTile)}};return[1,2,3,4,5].forEach(sn(e,{keydown:function(e){return t.anchorColor(e.keyCode-48)},keyup:function(e){return t.anchorColor(null)}})),["ctrl+z","meta+z"].forEach(sn(e,on(this.undo))),["ctrl+shift+z","meta+shift+z"].forEach(sn(e,on(this.redo))),["ctrl+c","meta+c"].forEach(sn(e,on(this.clear))),e},solved:function(){var t=this;return{row:this.rows.map(function(e,n){return rn(P(e),t.rules.row[n])}),column:this.columns.map(function(e,n){return rn(P(e),t.rules.column[n])})}},win:function(){return A(this.solved.column)===this.size&&A(this.solved.row)===this.size}},Object(w.e)({board:"board",rules:"rules",size:function(t){return t.board.length},rows:"board",columns:function(t){var e=t.board;return X(e.length).map(function(t){return e.map(function(e){return e[t]})})}})),watch:{win:function(t){t&&this.$emit("win")},activeTile:function(t){this.setHighlight(t)}},methods:en({enterTile:function(t,e){this.setHighlight(t),1===e.buttons&&this.setTile(t)},moveActiveTile:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=t.dx,n=void 0===e?0:e,r=t.dy,o=void 0===r?0:r,i=this.board.length,s=Math.max(0,Math.min(i-1,this.activeTile.x+n)),a=Math.max(0,Math.min(i-1,this.activeTile.y+o));this.activeTile={x:s,y:a}},setTile:function(t){this.activeTile=t,this.toggle(t)}},Object(w.b)({toggle:"action:toggle-tile",undo:"action:undo-move",redo:"action:redo-move",anchorColor:"action:anchor-color",reverseColor:"action:reverse-color"}),Object(w.d)({clear:"reset-board"}))},cn=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"hotkey",rawName:"v-hotkey",value:t.keymap,expression:"keymap"}],staticClass:"board-game",style:"--board-size:"+t.size+";--clue-size:"+t.size+";"},[n("div",{staticClass:"vertical clue-list",attrs:{id:"section-clues-vertical"},on:{mouseleave:t.clearHighlight}},t._l(t.rules.column,function(e,r){return n("game-clue-list",{key:r,class:{solved:t.solved.column[r],highlighted:t.isHighlighted({y:r})},attrs:{vertical:!0,clues:e,width:t.size},nativeOn:{mouseenter:function(e){t.setHighlight({y:r})}}})})),n("div",{staticClass:"horizontal clue-list",attrs:{id:"section-clues-horizontal"},on:{mouseleave:t.clearHighlight}},t._l(t.rules.row,function(e,r){return n("game-clue-list",{key:r,class:{solved:t.solved.row[r],highlighted:t.isHighlighted({x:r})},attrs:{clues:e,width:t.size},nativeOn:{mouseenter:function(e){t.setHighlight({x:r})}}})})),n("div",{staticClass:"board",class:{win:t.win},attrs:{id:"section-board-game"},on:{mouseleave:t.clearHighlight}},t._l(t.board,function(e,r){return n("div",{key:r,staticClass:"game-row"},t._l(e,function(e,o){return n("game-tile",{key:"`${x}-${y}`",class:{highlighted:t.isHighlighted({x:r,y:o})},attrs:{state:t.board[r][o]},nativeOn:{mouseenter:function(e){t.enterTile({x:r,y:o},e)},mousedown:function(e){t.setTile({x:r,y:o})}}})}))}))])},ln=[],un={render:cn,staticRenderFns:ln},dn=un,hn=n(0),fn=v,mn=hn(an,dn,fn,null,null),vn=mn.exports,pn={props:{href:{type:String,required:!0}}},gn=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"github-corner",staticStyle:{position:"absolute",top:"0",border:"0",right:"0"},attrs:{href:t.href,"aria-label":"View source on Github"}},[n("svg",{attrs:{width:"50",height:"50",viewBox:"0 0 250 250","aria-hidden":"true"}},[n("path",{attrs:{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}}),n("path",{staticClass:"octo-arm",staticStyle:{"transform-origin":"130px 106px"},attrs:{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor"}}),n("path",{staticClass:"octo-body",attrs:{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor"}})])])},bn=[],yn={render:gn,staticRenderFns:bn},xn=yn,wn=n(0),zn=p,Mn=wn(pn,xn,zn,null,null),_n=Mn.exports,Cn={data:function(){return{serialization:"MTcvLzE3Ly8zLy9bW118W3szLDF9ezEsM317MSwzfV18W3sxLDF9ezEsMX17MSwxfXszLDF9XXxbezIsMX17MSwzfXsxLDF9ezEsMX1dfFt7MywxfV18W3syLDF9ezEsM317MSwzfXsyLDF9XXxbezEsMX17MSwxfXsxLDF9ezIsMX17MiwxfV18W3sxLDF9ezEsM317MSwzfXsyLDF9XXxbezEsMX1dfFt7MSwxfXsxLDN9ezEsM317MiwxfV18W3sxLDF9ezIsMn17MiwxfV18W3syLDF9ezEsM317MSwzfXsyLDF9XXxbezEsMX17MywxfV18W3syLDF9ezEsM31dfFt7MSwxfXsxLDF9ezEsM317MywxfV18W3szLDF9ezEsM317MSwxfV18W11dLy9bW118W3szLDF9ezIsMX17MiwxfXsxLDF9ezEsMX17MiwxfXsyLDF9ezMsMX1dfFtdfFt7MSwzfXsxLDN9ezEsM317MSwzfV18W3sxLDF9ezEsMX17MSwxfXsxLDF9ezEsMX17MSwxfXsxLDF9ezEsMX1dfFt7MSwxfXsxLDF9ezEsM317MSwxfXsxLDF9ezEsM31dfFtdfFt7MSwzfXsxLDF9ezEsMX17MSwxfXsxLDF9ezEsMX1dfFt7MSwxfXsxLDN9ezEsMX17MSwxfXsxLDF9XXxbezEsM317MSwxfXsxLDF9ezEsMX17MSwyfXsxLDJ9XXxbXXxbezIsMX17MiwxfXsyLDJ9XXxbezIsMX17MiwyfV18W118W3szLDF9ezMsMX17MiwxfXsxLDF9ezIsMX17MywxfXszLDF9XXxbXXxbXV0vLyMzYTFhMmY/I0EzNjU4Qz8jZTdjYmRkPyNmZjcxODc/IzhkYjBlMQ==",contents:"00000000000000000\n03020201010202030\n00000000000000000\n01110111011101110\n01010101010101010\n01010111010101110\n00000000000000000\n01110101010100100\n01000111010100100\n01110101010110110\n00000000000000000\n00000202022000000\n00000020002200000\n00000000000000000\n00303020102030300\n00000000000000000\n00000000000000000".split(/\s+/g).map(function(t){return t.split("").map(function(t){return parseInt(t)})})}},created:function(){var t=q(this.serialization);this.$store.commit("start-game",{size:t.width,rules:{row:t.row,column:t.column},board:this.contents,colors:t.colors})}},En={store:tt,name:"app",computed:Object(w.e)({reverse:"colorReverse",anchor:"colorAnchor",maxColor:"colorNum",board:"board",state:"mode",colorStyling:function(t){return""+t.colorScheme.map(function(t,e){return"--state-"+(e+1)+":"+t+";"}).join("")}}),components:{Sidebar:Oe,GameBoard:vn,GithubCornerLink:_n},mixins:[Cn]},Xn=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"whole",style:t.colorStyling,attrs:{id:"app"}},[n("section",{staticClass:"main page-section",attrs:{id:"main"}},[n("game-board")],1),n("sidebar",{staticClass:"sidebar",attrs:{id:"sidebar"}},[n("footer",[t._v("Created by "),n("a",{staticClass:"author",attrs:{href:"https://github.com/JZumun"}},[n("img",{attrs:{src:"https://avatars3.githubusercontent.com/u/10479613"}}),t._v("JZumun")]),t._v(" using "),n("a",{attrs:{href:"https://vuejs.org/"}},[t._v("Vue JS")]),t._v(".\nHosted on "),n("a",{attrs:{href:"https://github.com/JZumun/nonochill-v2"}},[t._v("Github")]),t._v(".")])]),n("github-corner-link",{attrs:{id:"github-link",href:"https://github.com/JZumun/nonochill-v2"}})],1)},Sn=[],Fn={render:Xn,staticRenderFns:Sn},Ln=Fn,An=n(0),Dn=g,Rn=An(En,Ln,Dn,null,null),On=Rn.exports,kn=n(20),Tn=n.n(kn);x.a.use(Tn.a),new x.a({el:"#app",render:function(t){return t(On)}})},,function(t,e){},,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){}],[4]);
//# sourceMappingURL=build.js.map