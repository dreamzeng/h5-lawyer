function pageInit(){
    var fontObj = {
        "_debug" : false,
        "_locallink":"../data-mocks/serverDetial.json",
        "_orderId":""
    };
    var serviceIntroduce ={
        _vm : Vue.extend({
            data:function(){
                return{
                    pageObj:{
                        defalutFix:true,
                        detailPage:false,
                        serverId:""

                    },
                    debug:fontObj._debug,
                    url:fontObj._locallink,
                    data:[]
                }
            },
            computed:{
                //服务名称
                serverName:function () {
                    var that = this.data;
                    var str = that.name;
                    return str;
                },
                //参考价
                proposedPrice:function () {
                    var that = this.data;
                    var str;
                    if(that.categoryId==0){
                        str = that.priceStart;
                    }else{
                        str = that.priceStart+"~"+"<em>￥</em>"+that.priceEnd;
                    }
                    return str;
                },
                //市场价
                marketPrice:function () {
                    var that = this.data;
                    var str = that.originalPrice;
                    return str;
                }
            },
            mounted: function() {
                var that = this;
                if(lz.util.appJs()){
                    LYUIHandle.title(JSON.stringify({"title":"服务详情"}));
                    lz.device.LYUIHandle.hideHUD();
                    LYRouterHandle.getParams(function(obj){
                        if(obj){
                            var _obj = JSON.parse(obj);
                            that.pageObj.serverId = _obj.serverId;
                            that.init();
                        }
                    });
                }else{
                    that.pageObj.serverId= lz.util.getQueryString("serverId");
                    that.pageObj.serverId=3;
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
                        server: "/legal/service/"+that.pageObj.serverId,
                        type: "get",
                        debug: fontObj._debug
                    };
                    lz.ui.closeTouchMove();
                    //请求服务详情内容
                    lz.core.ajax(url, data, function (data) {
                        lz.ui.openTouchMove();
                        $("#defaultFix").hide();
                        if (data.code == 1) {
                            that.data = data.data;
                            that.pageObj.defalutFix=false;
                            that.pageObj.detailPage=true;
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
                }
            }
        })
    };
    lz.registerObj.vm = new serviceIntroduce._vm().$mount("#pageContainer");
}
lz.util.run(pageInit);