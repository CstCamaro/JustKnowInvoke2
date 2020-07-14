webpackJsonp([4,11],{688:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),o=a(26),p=l(o),c=a(77),m=a(147),d=l(m);a(710);var f=a(335),u=a(333),y=function(e){function t(e){return r(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return n(t,e),i(t,[{key:"componentWillMount",value:function(){this.props.teams&&0==this.props.teams.length?this.props.init():this.props.teamClickHandler(this.props.selectIndex,this.props.teams[this.props.selectIndex].newTeamId)}},{key:"componentWillReceiveProps",value:function(e){this.props.teams!=e.teams&&this.props.teamClickHandler(this.props.selectIndex,e.teams[this.props.selectIndex].newTeamId)}},{key:"render",value:function(){var e=this;return p.default.createElement("div",{id:"ct-player-list",className:"container cf"},p.default.createElement("div",{id:"ct-teams"},p.default.createElement("p",{id:"title"},"\u7403\u961f"),p.default.createElement("ul",{id:"ls-teams2",className:"cf"},this.props.teams.map(function(t,a){return p.default.createElement("li",{key:t.newTeamId,className:"team line-"+(a%4==0||a%4==1?"even":"odd")+(a%2==0?" even":" odd")+(a==e.props.selectIndex?" on":""),onClick:function(){return e.props.teamClickHandler(a,t.newTeamId)}},p.default.createElement("img",{src:t.logoNew,alt:t.cnName,className:"logo"}),p.default.createElement("span",{className:"name"},t.cnName))}))),p.default.createElement("ul",{id:"ls-player"},p.default.createElement("li",{id:"title",className:"item"},p.default.createElement("span",{className:"name"},"\u59d3\u540d"),p.default.createElement("span",{className:"number"},"\u53f7\u7801"),p.default.createElement("span",{className:"location"},"\u4f4d\u7f6e"),p.default.createElement("span",{className:"age"},"\u5e74\u9f84")),this.props.players.map(function(e,t){return p.default.createElement("li",{className:"item player "+(t%2==0?"even":"odd"),key:e.playerId,"data-id":e.playerId},p.default.createElement("div",{to:"/player/"+e.playerId},p.default.createElement("span",{className:"name"},p.default.createElement("img",{src:e.logo?e.logo:"//mat1.gtimg.com/pingjs/ext2020/test2017/lnophoto_e0a338.jpg",alt:e.name,className:"portrait"}),e.name),p.default.createElement("span",{className:"number"},e.jerseyNum),p.default.createElement("span",{className:"location"},e.position),p.default.createElement("span",{className:"age"},e.age)))})))}}]),t}(p.default.Component);y.propTypes={teams:d.default.array,players:d.default.array,init:d.default.func,teamClickHandler:d.default.func,selectIndex:d.default.number};var h=function(e){return{teams:e.teams,players:e.players.playerList,selectIndex:e.players.selectIndex}},x=function(e){return{init:function(){e((0,u.loadTeams)())},teamClickHandler:function(t,a){e((0,f.selectTeam)(t)),e((0,f.loadPlayerList)(a))}}};t.default=(0,c.connect)(h,x)(y)},701:function(e,t,a){t=e.exports=a(686)(),t.push([e.i,"#ct-player-list{margin-top:20px;min-height:850px}#ct-player-list #title{font-size:14px;color:#606060;font-weight:700;height:38px;background-color:#f3f3f3;line-height:38px;text-align:center}#ct-player-list #ct-teams{border:1px solid #ebebeb;width:377px;float:left}#ct-player-list #ct-teams #ls-teams2 .team{float:left;cursor:pointer;height:38px;width:188px;border-bottom:1px solid #ebebeb;text-align:center;padding:20px 0}#ct-player-list #ct-teams #ls-teams2 .team .logo{vertical-align:middle;height:38px;width:44px}#ct-player-list #ct-teams #ls-teams2 .team .name{font-size:16px;color:#606060;padding:0 12px}#ct-player-list #ct-teams #ls-teams2 .team.on{background-color:#f2f2f2;border-left:3px solid #c4494b;width:185px}#ct-player-list #ct-teams #ls-teams2 .team.on .name{color:#c3494a}#ct-player-list #ct-teams #ls-teams2 .even{border-right:1px solid #ebebeb}#ct-player-list #ct-teams #ls-teams2 .line-odd{background-color:#fafafa}#ct-player-list #ls-player{margin-left:407px;border:1px solid #ebebeb}#ct-player-list #ls-player .item{text-align:center}#ct-player-list #ls-player .item .portrait,#ct-player-list #ls-player .item span{float:left}#ct-player-list #ls-player .item .name{width:276px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#ct-player-list #ls-player .item .number{width:180px}#ct-player-list #ls-player .item .location{width:225px}#ct-player-list #ls-player .item .stature{width:108px}#ct-player-list #ls-player .item .weight{width:100px}#ct-player-list #ls-player .item .age{width:90px}#ct-player-list #ls-player .item .birthday{width:100px}#ct-player-list #ls-player .player{height:49px;line-height:49px;border-top:1px solid #e8e8e8;border-left:1px solid #e8e8e8}#ct-player-list #ls-player .player.odd{background-color:#fafafa}#ct-player-list #ls-player .player .name{text-align:left}#ct-player-list #ls-player .player .portrait{height:49px;width:49px;margin-right:20px}",""])},710:function(e,t,a){var l=a(701);"string"==typeof l&&(l=[[e.i,l,""]]);a(687)(l,{});l.locals&&(e.exports=l.locals)}});
//# sourceMappingURL=4.09120ca95d2c32431b4f.js.map/*  |xGv00|4fd83e918015d96322ddfd8fa31eba09 */