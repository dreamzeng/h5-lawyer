function pageInit(){

    var fontObj = {
        "_debug" : false,
        "_localLaywer":"../data-mocks/lawyer-myEvaluate-info.json",
        "_locallink":"../data-mocks/lawyer-evaluate-list.json",
        "_locallinkNull":"../data-mocks/lawyer-evaluate-list-null.json"
    };
    var serviceIntroduce ={
        _vm : Vue.extend({
            data:function(){
                return{
                    pageObj:{
                        defalutFix:true,
                        nullPage:false,
                        listPage:false,
                        lawyerId:"",
                    },
                    debug:fontObj._debug,
                    urlLaywer:fontObj._localLaywer,
                    url:fontObj._locallink,
                    dataLawyer:{}
                }
            },
            computed:{
                //律师头像
                laywerImg:function(){
                    var that = this.dataLawyer;
                    var str = that.lawyerLogo;
                    return str;
                }
            },
            mounted: function() {
                var that = this;
                if(lz.util.appJs()){
                    LYUIHandle.title(JSON.stringify({"title":"我的评价"}));
                    lz.device.LYUIHandle.hideHUD();
                    LYUserHandle.getToken(function (obj){
                        if(obj) {
                            that.pageObj.lawyerId = JSON.parse(obj).token;
                            that.init();
                        }
                    });
                }else{
                    that.pageObj.lawyerId= lz.util.getQueryString("lawyerId");
                    that.pageObj.lawyerId="1927";
                    var token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW5vVGltZSI6NTA2NzEyODM1NTgxMDUyNCwiY2VsbHBob25lIjoiMTM3OTg0NTI0MzUiLCJ1c2VyaWQiOiIxOTI2IiwiYWNjb3VudCI6IjEzNzk4NDUyNDM1Iiwia2V5IjoidXNlcjpzZXNzaW9uX3VzZXI6MTkyNjo2RkIwRDA1MkEwRDNGNjE1QkIxOEU3MkU3NEY4RkMyOCIsInVzZXJuYW1lIjpudWxsfQ.FW-OwEhEWv-Ki5s-cMAiyvHnIYqnsq2rIX1lk3KjMrk-d89ab58022cd9175794b5c432d0341ff";
                    lz.core.token = token;
                    that.init();
                }
            },
            methods: {
                init: function () {
                    var that = this;
                    var dataLawyer = {};
                    var urlLaywer={
                        local: this.urlLaywer,
                        server: "/order/comment/lawyer",
                        type: "get",
                        debug: fontObj._debug
                    }
                    lz.ui.closeTouchMove();
                    //获取律师评价信息
                    lz.core.ajax(urlLaywer, dataLawyer, function (data) {
                        lz.ui.openTouchMove();
                        if (data.code == 1) {
                            if(data.data){
                                that.dataLawyer = data.data;

                                that.pageObj.listPage=true;
                            }else{
                                that.pageObj.nullPage=true;
                                document.getElementsByTagName("body")[0].className="null_h";
                                document.getElementsByTagName("html")[0].className="null_h";
                                document.getElementById("pageContainer").className="null_h";
                            }
                            that.pageObj.defalutFix=false;
                        } else if (data.code == 0) {
                            var msg = data.msg || "操作失败!";
                            mui.alert(msg, '提示', function () {
                            });
                        }
                    }, function (arg, arg1) {
                        lz.ui.openTouchMove();
                        $("#pageContainer").hide();
                        layer.open({
                            content: '网络异常!'
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                    });
                },
                getNum:function(val){
                    return parseInt(val);
                },
                go_allTabs:function(e){
                    /*查看全部标签页*/
                    var lawyerId = e.getAttribute("data-lno");
                    if(lz.util.appJs()){
                        LYRouterHandle.openUrl(JSON.stringify({'type':'push','url':lz.core.lawyerRoot+"/lawyer-evaluate-tab-all.html",'params':{'lawyerId':lawyerId}}));
                    }else{
                        if(location.href.match("8081")){
                            lz.core.lawyerRoot = "http://10.41.3.30:8081/h5-lawyer/templates";
                        }

                        window.location.href=lz.core.lawyerRoot+"/lawyer-evaluate-tab-all.html?lawyerId="+lawyerId;
                    }
                },
                go_evaluate_all:function(e){
                    /*查看全部评价页*/
                    var lawyerId = e.getAttribute("data-lno");
                    if(lz.util.appJs()){
                        LYRouterHandle.openUrl(JSON.stringify({'type':'push','url':lz.core.lawyerRoot+"/lawyer-evaluate-list.html",'params':{'lawyerId':lawyerId}}));
                    }else{
                        if(location.href.match("8081")){
                            lz.core.lawyerRoot = "http://10.41.3.30:8081/h5-lawyer/templates";
                        }
                        window.location.href=lz.core.lawyerRoot+"/lawyer-evaluate-list.html?lawyerId="+lawyerId;
                    }
                },
                go_severDetail:function(e){
                    /*查看服务详情*/
                    var serverId = e.getAttribute("data-serverid");
                    if(lz.util.appJs()){
                        LYRouterHandle.openUrl(JSON.stringify({'type':'push','url':lz.core.lawyerRoot+"/lawyer-server.html",'params':{'serverId':serverId}}));
                    }else{
                        if(location.href.match("8081")){
                            lz.core.lawyerRoot = "http://10.41.3.30:8081         /h5-lawyer/templates";
                        }
                        window.location.href=lz.core.lawyerRoot+"/lawyer-server.html?serverId="+serverId;
                    }
                }
            }
        })
    };
    lz.registerObj.vm = new serviceIntroduce._vm().$mount("#pageContainer");
}
lz.util.run(pageInit);