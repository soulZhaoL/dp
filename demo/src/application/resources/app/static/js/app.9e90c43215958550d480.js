webpackJsonp([1],{100:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Home.vue",data:function(){return{}},methods:{logout:function(){var t=this;this.$confirm("Are you sure to logout?","Tips:",{confirmButtonText:"Yes",cancelButtonText:"No",type:"warning"}).then(function(){t.$router.push("/")})}},created:function(){this.$store.dispatch("addAc",this.$route.params.acc)}}},101:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(106),o=n(47);e.default={name:"login",data:function(){return{account:"",password:"",showControl1:!1,showControl2:!1,buttonControl:!0,describe:"",newAccount:""}},methods:{right:function(t){switch(this.showControl1=!0,this.showControl2=!1,t){case"Login":this.buttonControl=!0;break;case"New":this.buttonControl=!1}this.describe=t+":"},hide:function(){this.showControl1=!1,this.showControl2=!1,this.password=""},submit_login:function(){var t=this.account,e=this.password;this.password="";var n=this;astilectron.sendMessage({Name:"login.verify",Payload:{account:t,password:e}},function(e){e.payload?n.$router.push({name:"home",params:{acc:t}}):alert("account or password is wrong.")})},submit_new:function(){var t=this;astilectron.sendMessage({Name:"create.new.account",Payload:""},function(e){t.newAccount=e.payload,t.showControl1=!1,t.showControl2=!0})},submit_keystore:function(){var t=this.newAccount,e=this.password;this.password="";var n=this;astilectron.sendMessage({Name:"save.keystore",Payload:{account:t,password:e}},function(e){e.payload?n.$router.push({name:"home",params:{acc:t}}):alert("save account information failed.")})}},created:function(){this.account="",this.password="",this.newAccount="",this.describe="";var t=this;o.dl_db.init(this),o.mt_db.init(this),document.addEventListener("astilectron-ready",function(){a.lfg.listen(),astilectron.sendMessage({Name:"get.accounts",Payload:""},function(e){for(var n=0;n<e.payload.length;n++)t.$store.state.accounts.push({address:e.payload[n]})}),o.options.init(t)})}}},102:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"DataList.vue",data:function(){return{selectsDL:[]}},methods:{buy:function(){astilectron.sendMessage({Name:"buy",Payload:{buyer:this.account,ids:this.selectsDL}},function(t){t.payload?console.log("Buy data succeed."):alert("Buy data failed.")})},selectedChange:function(t){this.selectsDL=t}}}},103:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"MyTransaction.vue",data:function(){return{}}}},104:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(47);e.default={name:"PublishNewData",data:function(){return{data:{Title:"",Price:"",Keys:"",Description:"",Data:"",Proofs:[]}}},methods:{selFile:function(){var t=this.$refs.seldata,e=t.$refs.input.files[0],n=new FileReader,a=this;n.readAsDataURL(e),n.onload=function(t){a.data.Data=t.target.result}},selFiles:function(){for(var t=this.$refs.selproof,e=t.$refs.input.files,n=this,a=0;a<e.length;a++){var o=new FileReader;o.readAsDataURL(e[a]),o.onload=function(t){n.data.Proofs.push(t.target.result)}}},pub:function(){var t=this,e={};e.Title=this.data.Title,e.Price=this.data.Price,e.Keys=this.data.Keys,e.Description=this.data.Description,e.Owner=this.$store.state.account,astilectron.sendMessage({Name:"publish",Payload:this.data},function(n){if(n.payload){a.dl_db.write(e,"Qm462"),a.dl_db.init(t)}else alert("Publish data failed.")})}}}},105:function(t,e,n){"use strict";if(Object.defineProperty(e,"__esModule",{value:!0}),void 0===a)var a={};a.loader={hide:function(){document.getElementById("astiloader").style.display="none"},show:function(){document.getElementById("astiloader").style.display="block"}},a.modaler={close:function(){void 0!==a.modaler.onclose&&null!==a.modaler.onclose&&a.modaler.onclose(),a.modaler.hide()},hide:function(){document.getElementById("astimodaler").style.display="none"},setContent:function(t){document.getElementById("astimodaler-content").innerHTML="",document.getElementById("astimodaler-content").appendChild(t)},show:function(){document.getElementById("astimodaler").style.display="block"}},a.notifier={error:function(t){this.notify("error",t)},info:function(t){this.notify("info",t)},notify:function(t,e){var n=document.createElement("div");n.className="astinotifier-wrapper";var a=document.createElement("div");a.className="astinotifier-item "+t;var o=document.createElement("div");o.className="astinotifier-label",o.innerHTML=e;var s=document.createElement("div");s.className="astinotifier-close",s.innerHTML='<i class="fa fa-close"></i>',s.onclick=function(){n.remove()},a.appendChild(o),a.appendChild(s),n.appendChild(a),document.getElementById("astinotifier").prepend(n),setTimeout(function(){s.click()},5e3)},success:function(t){this.notify("success",t)},warning:function(t){this.notify("warning",t)}},e.asticode=a},106:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.lfg=void 0;var a=n(105),o={listen:function(){astilectron.onMessage(function(t){switch(t.name){case"about":case"about2":return o.about(t.payload),{payload:"payload"};case"welcome":a.asticode.notifier.info(t.payload)}})},about:function(t){var e=document.createElement("div");e.innerHTML=t,a.asticode.modaler.setContent(e),a.asticode.modaler.show()}};e.lfg=o},107:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var o=n(2),s=a(o),r=n(73),i=a(r),l=n(71),c=a(l);n(72);var u=n(74),d=a(u),f=n(70),p=a(f),h=n(45),m=a(h),v=n(69),b=a(v);s.default.use(c.default),s.default.use(d.default),s.default.use(m.default);var _=new d.default({routes:b.default});new s.default({router:_,store:p.default,render:function(t){return t(i.default)}}).$mount("#app")},159:function(t,e){},160:function(t,e){},161:function(t,e){},162:function(t,e){},163:function(t,e){},164:function(t,e){},165:function(t,e){},175:function(t,e,n){n(164);var a=n(7)(n(99),n(186),null,null);t.exports=a.exports},176:function(t,e,n){n(163);var a=n(7)(n(100),n(185),null,null);t.exports=a.exports},177:function(t,e,n){n(161);var a=n(7)(n(101),n(183),null,null);t.exports=a.exports},178:function(t,e,n){n(165);var a=n(7)(n(102),n(187),"data-v-70777acc",null);t.exports=a.exports},179:function(t,e,n){n(159);var a=n(7)(n(103),n(181),"data-v-242d0260",null);t.exports=a.exports},180:function(t,e,n){n(162);var a=n(7)(n(104),n(184),"data-v-3534bf8d",null);t.exports=a.exports},181:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("el-col",{staticStyle:{"padding-bottom":"0","background-color":"lightgrey"},attrs:{span:24}},[t._v("\n        tool bar.\n    ")]),t._v(" "),n("el-table",{attrs:{data:this.$store.state.mytransaction,"highlight-current-row":"",border:"",height:"400"}},[n("el-table-column",{attrs:{type:"selection",width:"50"}}),t._v(" "),n("el-table-column",{attrs:{prop:"Title",label:"Title","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"TransactionID",label:"TransactionID","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"Seller",label:"Seller","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"Buyer",label:"Buyer","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"State",label:"State","show-overflow-tooltip":""}})],1)],1)},staticRenderFns:[]}},182:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},183:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",{staticClass:"row"},[n("el-col",{attrs:{span:24}},[n("div",{staticClass:"top"},[t._v("My Astilectron demo")])]),t._v(" "),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"left"},[n("div",{staticClass:"left-explain"},[t._v("select account:")]),t._v(" "),n("el-select",{staticClass:"left-account",attrs:{placeholder:"select account"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}},t._l(this.$store.state.accounts,function(t){return n("el-option",{key:t.address,attrs:{value:t.address,label:t.address}})}),1),t._v(" "),n("div",[n("button",{staticClass:"left-button",on:{click:function(e){return t.right("Login")}}},[t._v("Login")])]),t._v(" "),n("div",[n("button",{staticClass:"left-button",on:{click:function(e){return t.right("New")}}},[t._v("Create New Account")])])],1)]),t._v(" "),n("el-col",{attrs:{span:16}},[t.showControl1?n("div",{staticClass:"right",attrs:{id:"show"}},[n("div",{staticClass:"right-show"},[t._v(t._s(t.describe)+"\n                    "),n("el-input",{staticClass:"right-pwd",attrs:{placeholder:"password",type:"password",clearable:!0},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),n("div",[n("button",{staticClass:"right-button",on:{click:t.hide}},[t._v("Back")]),t._v(" "),t.buttonControl?n("button",{staticClass:"right-button",on:{click:t.submit_login}},[t._v("Submit")]):t._e(),t._v(" "),t.buttonControl?t._e():n("button",{staticClass:"right-button",on:{click:t.submit_new}},[t._v("Submit")])])]):t._e(),t._v(" "),t.showControl2?n("div",{staticClass:"right",attrs:{id:"show_new"}},[n("div",[t._v("Your account is created :  "+t._s(t.newAccount)),n("br"),t._v("\n                    account information will saves at local :  keystore"),n("br"),t._v("\n                    please keep it properly."),n("br"),n("hr"),t._v("Do you want to save and login with this account?")]),t._v(" "),n("div",{staticClass:"right-pwd"},[n("button",{staticClass:"right-button",on:{click:t.hide}},[t._v("No")]),t._v(" "),n("button",{staticClass:"right-button",on:{click:t.submit_keystore}},[t._v("Yes")])])]):t._e()])],1)],1)},staticRenderFns:[]}},184:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-form",{staticClass:"pubForm",attrs:{model:t.data,"label-width":"15%"}},[n("el-form-item",{attrs:{label:"Title"}},[n("el-input",{model:{value:t.data.Title,callback:function(e){t.$set(t.data,"Title",e)},expression:"data.Title"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"Price"}},[n("el-input",{attrs:{placeholder:"Unit is DDD"},model:{value:t.data.Price,callback:function(e){t.$set(t.data,"Price",e)},expression:"data.Price"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"Keys"}},[n("el-input",{attrs:{placeholder:"Separate each tag with a comma or semicolon",type:"textarea",rows:2},model:{value:t.data.Keys,callback:function(e){t.$set(t.data,"Keys",e)},expression:"data.Keys"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"Description"}},[n("el-input",{attrs:{type:"textarea",rows:3},model:{value:t.data.Description,callback:function(e){t.$set(t.data,"Description",e)},expression:"data.Description"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"Data"}},[n("el-input",{ref:"seldata",attrs:{type:"file"},on:{change:t.selFile}})],1),t._v(" "),n("el-form-item",{attrs:{label:"Proofs"}},[n("el-input",{ref:"selproof",attrs:{type:"file",multiple:""},on:{change:t.selFiles}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.pub}},[t._v("Publish")])],1)],1)},staticRenderFns:[]}},185:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",[n("el-col",{staticClass:"top",attrs:{span:24}},[n("el-col",{attrs:{span:20}},[t._v("My Astilectron demo")]),t._v(" "),n("el-col",{attrs:{span:4}},[n("el-dropdown",{staticClass:"top-dropdown"},[n("span",[t._v(t._s(this.$store.state.account))]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",[t._v("Settings")]),t._v(" "),n("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(e){return t.logout(e)}}},[t._v("Logout")])],1)],1)],1)],1),t._v(" "),n("el-col",{attrs:{span:24}},[n("el-col",{attrs:{span:4}},[n("aside",{staticClass:"aside"},[n("el-menu",{attrs:{"default-active":t.$route.path,"unique-opened":"",router:""}},[t._l(t.$router.options.routes,function(e){return t._l(e.children,function(e){return e.hidden?t._e():n("el-menu-item",{key:e.path,staticClass:"el-menu-item",attrs:{index:e.path}},[t._v(t._s(e.name))])})})],2)],1)]),t._v(" "),n("el-col",{attrs:{span:20}},[n("section",{staticClass:"section"},[n("div",[n("el-col",{attrs:{span:24}},[n("router-view")],1)],1)])])],1)],1)],1)},staticRenderFns:[]}},186:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"page-container"},[t._v("\n    404: WebPage Not Found"),n("br"),t._v("\n    Redirect to login page after "+t._s(t.count)+" seconds.\n")])},staticRenderFns:[]}},187:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("el-col",{staticStyle:{"padding-bottom":"0","background-color":"lightgrey"},attrs:{span:24}},[n("el-button",{on:{click:t.buy}},[t._v("Buy")])],1),t._v(" "),n("el-table",{attrs:{data:this.$store.state.datalist,"highlight-current-row":"",border:"",height:"400"},on:{"selection-change":t.selectedChange}},[n("el-table-column",{attrs:{type:"selection",width:"50"}}),t._v(" "),n("el-table-column",{attrs:{prop:"Title",label:"Title","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"Price",label:"Price","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"Keys",label:"Keys","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"Description",label:"Description","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{prop:"Owner",label:"Owner","show-overflow-tooltip":""}})],1)],1)},staticRenderFns:[]}},47:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={init:function(t){a.getDatalist(t),a.getTransaction(t)},getDatalist:function(t){astilectron.sendMessage({Name:"get.datalist",Payload:""},function(e){for(var n=0;n<e.payload.length;n++){var a=e.payload[n],s={};s.Title=a.Title,s.Price=a.Price,s.Keys=a.Keys,s.Description=a.Description,s.Owner=a.Owner,o.write(s,a.ID)}o.init(t)})},getTransaction:function(t){astilectron.sendMessage({Name:"get.transaction",Payload:t.$store.state.account},function(e){for(var n=0;n<e.payload.length;n++){var a=e.payload[n],o={};o.Title=a.Title,o.Seller=a.Seller,o.Buyer=a.Buyer,o.State=a.State,s.write(o,a.TransactionID)}s.init(t)})}},o={init:function(t){this.db_name="Database",this.db_version="1",this.db_store_name="datalist";var e=indexedDB.open(this.db_name,this.db_version);e.onerror=function(t){alert("open failed with error code: "+t.target.errorCode)},e.onupgradeneeded=function(t){this.db=t.target.result,this.db.createObjectStore(o.db_store_name),this.db.createObjectStore("transaction")},e.onsuccess=function(e){t.$store.state.datalist=[],o.db=e.target.result,o.db.transaction(o.db_store_name,"readonly").objectStore(o.db_store_name).openCursor().onsuccess=function(e){var n=e.target.result;if(n){var a=n.value;a.ID=n.key,t.$store.dispatch("addDL",a),n.continue()}}}},write:function(t,e){o.db.transaction(o.db_store_name,"readwrite").objectStore(o.db_store_name).put(t,e).onerror=function(t){console.log(t)}}},s={init:function(t){this.db_name="Database",this.db_version="1",this.db_store_name="transaction";var e=indexedDB.open(this.db_name,this.db_version);e.onerror=function(t){alert("open failed with error code: "+t.target.errorCode)},e.onsuccess=function(e){t.$store.state.mytransaction=[],s.db=e.target.result,s.db.transaction(s.db_store_name,"readonly").objectStore(s.db_store_name).openCursor().onsuccess=function(e){var n=e.target.result;if(n){var a=n.value;switch(a.TransactionID=n.key,parseInt(n.State)){case 0:a.State="Created";break;case 1:a.State="Voted";break;case 2:a.State="Payed";break;case 3:a.State="ReadyForDownload";break;case 4:a.State="Closed"}t.$store.dispatch("addMT",a),n.continue()}}}},write:function(t,e){s.db.transaction(s.db_store_name,"readwrite").objectStore(s.db_store_name).put(t,e).onerror=function(t){console.log(t)}}};e.dl_db=o,e.mt_db=s,e.options=a},69:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(175),s=a(o),r=n(177),i=a(r),l=n(176),c=a(l),u=n(178),d=a(u),f=n(179),p=a(f),h=n(180),m=a(h),v=[{path:"/",component:i.default,name:"login",hidden:!0},{path:"/404",component:s.default,name:"not found",hidden:!0},{path:"/home",component:c.default,name:"home",children:[{path:"/dl",component:d.default,name:"Data list"},{path:"/mt",component:p.default,name:"My transaction"},{path:"/pd",component:m.default,name:"Publish new data"}]},{path:"*",redirect:{path:"/404"},hidden:!0}];e.default=v},70:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),s=a(o),r=n(45),i=a(r);s.default.use(i.default);var l={datalist:[],mytransaction:[],accounts:[{address:""}],account:""},c={dlAdd:function(t,e){t.datalist.push({ID:e.ID,Title:e.Title,Price:e.Price,Keys:e.Keys,Description:e.Description,Owner:e.Owner})},mtAdd:function(t,e){t.mytransaction.push({Title:e.Title,TransactionID:e.TransactionID,Seller:e.Seller,Buyer:e.Buyer,State:e.State})},accAdd:function(t,e){t.accounts.push({address:e.address})},accNew:function(t,e){t.account=e}},u={addDL:function(t,e){t.commit("dlAdd",e)},addMT:function(t,e){t.commit("mtAdd",e)},addAcc:function(t,e){t.commit("accAdd",e)},addAc:function(t,e){t.commit("accNew",e)}},d=new i.default.Store({state:l,mutations:c,actions:u});e.default=d},72:function(t,e){},73:function(t,e,n){n(160);var a=n(7)(n(98),n(182),null,null);t.exports=a.exports},98:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},99:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"notFound.vue",data:function(){return{count:5}},created:function(){var t=this,e=window.setInterval(function(){--t.count<0&&(window.clearInterval(e),t.count=5,t.$router.push({path:"/"}))},1e3)}}}},[107]);
//# sourceMappingURL=app.9e90c43215958550d480.js.map