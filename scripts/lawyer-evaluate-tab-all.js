function pageInit(){
    var fontObj = {
        "_debug" : false,
        "_locallink":"../data-mocks/lawyer-evaluate-all-Tab.json",
    };
    var serviceIntroduce ={
        _vm : Vue.extend({
            data:function(){
                return{
                    pageObj:{
                        defalutFix:true,
                        detailPage:false,
                        lawyerId:""
                    },
                    debug:fontObj._debug,
                    url:fontObj._locallink,
                    data:[]
                }
            },
            computed:{

            },
            mounted: function() {
                var that = this;
                if(lz.util.appJs()){
                    LYUIHandle.title(JSON.stringify({"title":"全部标签"}));
                    lz.device.LYUIHandle.hideHUD();
                    LYRouterHandle.getParams(function(obj){
                        if(obj){
                            that.pageObj.lawyerId = JSON.parse(obj).lawyerId;
                            that.init();
                        }
                    });
                }else{
                    that.pageObj.lawyerId= lz.util.getQueryString("lawyerId");
                    that.pageObj.lawyerId="1927";
                    var token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW5vVGltZSI6NTAwNjIxNzA4NDE4OTQyNiwiY2VsbHBob25lIjoiMTM3OTg0NTI0MzUiLCJ1c2VyaWQiOiIxOTI2IiwiYWNjb3VudCI6IjEzNzk4NDUyNDM1Iiwia2V5IjoidXNlcjpzZXNzaW9uX3VzZXI6MTkyNjo2RkIwRDA1MkEwRDNGNjE1QkIxOEU3MkU3NEY4RkMyOCIsInVzZXJuYW1lIjpudWxsfQ.rv-WU0mnWQtn_oN6KAwmeS4MoZh_Yz0FpaU7ne0zkyk-d89ab58022cd9175794b5c432d0341ff";
                    lz.core.token = token;
                    that.init();
                }
            },
            methods: {
                init: function () {
                    var that = this;
                    var data = {};
                    var url = {
                        local: this.url,
                        server: "/order/comment/lawyer/label",
                        type: "get",
                        debug: fontObj._debug
                    };
                    lz.ui.closeTouchMove();
                    //请求全部标签内容
                    lz.core.ajax(url, data, function (data) {
                        lz.ui.openTouchMove();
                        $("#defaultFix").hide();
                        if (data.code == 1) {
                            that.data = data.data;
                            that.pageObj.defalutFix=false;
                            that.pageObj.detailPage=true;
                        } else if (data.code == 0) {
                            var msg = data.msg || "操作失败";
                            mui.alert(msg, '提示', function () {
                            });
                        }

                    }, function (arg, arg1) {
                        lz.ui.openTouchMove();
                        $("#pageContainer").hide();
                        layer.open({
                            content: '网络异常'
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                    });
                }
            }
        })
    };
    lz.registerObj.vm = new serviceIntroduce._vm().$mount("#pageContainer");
}
lz.util.run(pageInit);