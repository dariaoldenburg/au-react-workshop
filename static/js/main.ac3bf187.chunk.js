(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,,function(e,n,t){e.exports=t(23)},,,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(4),i=t.n(c),l=(t(18),t(19),t(5)),o=t(6),s=t(10),u=t(7),d=t(11),m=t(1),h=t(8),b=t.n(h);t(20);function f(e){return r.a.createElement("div",{className:b()("Cell",Object(m.a)({"Cell--header":e.header,"Cell--padded":e.padded,"Cell--scrollable":e.scrollable},"Cell--textAlign-".concat(e.textAlign),e.textAlign)),style:{width:"".concat(e.widthPercentage,"%"),height:e.height}},e.children)}f.defaultProps={header:!1,padded:!0,scrollable:!1,textAlign:"left"};var g=t(9),p=t(2),v=t(25),w=1,E=void 0,y=new v.a([]),O=new v.a([]);function k(e){O.next([].concat(Object(p.a)(O.value),[{id:++w,content:e.content,createdAt:(new Date).toString()}]))}function N(e){y.next([].concat(Object(p.a)(y.value),[e]))}setTimeout(function(){var e;N({id:++w,name:"geron"}),N({id:++w,name:"hit_fm",color:"pink",senior:!0}),N({id:++w,name:"kasienka2"}),N({id:++w,name:"Lady_Ann_"}),N({id:++w,name:"MalWINKaaa",color:"orange",senior:!0}),e={name:"~sylwusia",color:"red"},new Promise(function(n,t){setTimeout(function(){N(E=Object(g.a)({id:++w},e)),k({content:"** przychodzi ".concat(E.name,"...")}),n()},500)})},1e3);t(21);function j(e){return r.a.createElement("div",{className:"Row"},e.children)}t(22);function x(e){return r.a.createElement("div",{className:"UsersList"},e.users.map(function(e){return r.a.createElement("div",{key:e.id||e.name,className:"UsersList__item",style:{color:e.color||"black",fontWeight:e.senior?"bold":void 0}},e.name)}))}var A=function(e){function n(){var e,t;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=Object(s.a)(this,(e=Object(u.a)(n)).call.apply(e,[this].concat(r)))).state={channelName:"Sieradz - Nasze Radio",onlineUsers:[],onlineUsersLoading:!0},t._subscriptions=[],t}return Object(d.a)(n,e),Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;y.asObservable().subscribe(function(n){e.setState({onlineUsers:n,onlineUsersLoading:!1})})}},{key:"componentWillUnmount",value:function(){this._subscriptions.forEach(function(e){return e.unsubscribe()}),this._subscriptions.length=0}},{key:"render",value:function(){var e=this.state,n=e.channelName,t=e.onlineUsers,a=e.onlineUsersLoading;return r.a.createElement("div",{className:"Chat"},r.a.createElement(j,null,r.a.createElement(f,{header:!0,widthPercentage:70},r.a.createElement("strong",null,n)),r.a.createElement(f,{header:!0,widthPercentage:30,textAlign:"center"},"Obecni: [",a?"...":t.length,"]")),r.a.createElement(j,null,r.a.createElement(f,{widthPercentage:70,scrollable:!0,height:300},"here be chat"),r.a.createElement(f,{widthPercentage:30,scrollable:!0,height:300},r.a.createElement(x,{users:t}))),r.a.createElement(j,null,r.a.createElement(f,{header:!0,widthPercentage:70},"here be textarea")))}}]),n}(r.a.PureComponent);var P=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(A,null))};i.a.render(r.a.createElement(P,null),document.getElementById("root"))}],[[12,1,2]]]);
//# sourceMappingURL=main.ac3bf187.chunk.js.map