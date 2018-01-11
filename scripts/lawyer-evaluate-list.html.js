function pageInit(){

    var fontObj = {
        "_debug" : false,
        "_locallink1":"../data-mocks/lawyer-evaluate-list-all1.json",
        "_locallink2":"../data-mocks/lawyer-evaluate-list-all2.json",
        "_locallink3":"../data-mocks/lawyer-evaluate-list-all3.json",
        "_locallink4":"../data-mocks/lawyer-evaluate-list-all4.json",
        "_locallinkNull":"../data-mocks/lawyer-evaluate-list-null.json",
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
                        tabIndex:0,
                        listType:0,
                        pageNum:1,
                        limit:10
                    },
                    debug:fontObj._debug,
                    url:fontObj._locallink1,
                    dataTab:{},
                    dataList:{}
                }
            },
            computed:{

            },
            mounted: function() {
                var that = this;
                if(lz.util.appJs()){
                    LYUIHandle.title(JSON.stringify({"title":"评价详情"}));
                    lz.device.LYUIHandle.hideHUD();
                    LYRouterHandle.getParams(function(obj){
                        if(obj){
                            var _obj = JSON.parse(obj);
                            that.pageObj.lawyerId = _obj.lawyerId;
                            that.init();
                        }
                        //下拉刷新
                        LYUIHandle.setHeaderRefresh(function(obj){
                            LYUIHandle.endHeaderRefresh();
                            //请求后台下拉接口拿数据
                            that.init();
                        });
                        //上拉加载
                        LYUIHandle.setFooterRefresh(function(obj){
                            //请求后台接口拿数据
                            that.getMoreData();
                        });
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
                    that.pageObj.pageNum=1;
                    var data = {
                        type:that.pageObj.listType,
                        limit:that.pageObj.limit,
                        page:that.pageObj.pageNum
                    };
                    if(fontObj._debug){
                        if(that.pageObj.listType==0){
                            that.url=fontObj._locallink1;
                        }else if(that.pageObj.listType==1){
                            that.url=fontObj._locallink2;
                        }else if(that.pageObj.listType==2){
                            that.url=fontObj._locallink3;
                        }else if(that.pageObj.listType==3){
                            that.url=fontObj._locallink4;
                        }
                    }
                    var url = {
                        local: this.url,
                        server: "/order/comment/lawyer/all",
                        type: "get",
                        debug: fontObj._debug
                    };
                    //请求评价列表内容
                    lz.core.ajax(url, data, function (data) {
                        if (data.code == 1) {
                            if(that.pageObj.pageNum==1){
                                that.dataTab = data.data.count;
                            }
                            that.dataList = data.data.comments;
                            if(that.dataList.length===0){
                                that.pageObj.nullPage=true;
                            }else{
                                that.pageObj.listPage=true;
                            }
                            that.pageObj.defalutFix=false;
                        } else if (data.code == 0) {
                            var msg = data.msg || "操作失败!";
                            mui.alert(msg, '提示', function () {
                            });
                        }
                        if(lz.util.appJs()){
                            LYUIHandle.endFooterRefresh(JSON.stringify({'footstate':1}));
                        }else{
                            //setTimeout(function(){
                            //    that.initMuiRefresh();
                            //    mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.data.comments.items==null||data.data.comments.items.length==0)?true:false);
                            //},10);
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
                getMoreData:function(){
                    var that = this;
                    that.pageObj.pageNum++
                    var data = {
                        type:that.pageObj.listType,
                        limit:that.pageObj.limit,
                        page:that.pageObj.pageNum
                    };
                    if(fontObj._debug){
                        if(that.pageObj.listType==0){
                            that.url=fontObj._locallink1;
                        }else if(that.pageObj.listType==1){
                            that.url=fontObj._locallink2;
                        }else if(that.pageObj.listType==2){
                            that.url=fontObj._locallink3;
                        }else if(that.pageObj.listType==3){
                            that.url=fontObj._locallink4;
                        }
                    }
                    var url = {
                        local: this.url,
                        server: "/order/comment/lawyer/all",
                        type: "get",
                        debug: fontObj._debug
                    };
                    lz.core.ajax(url,data,function(data){
                        if(data.code == 1){
                            var newData = data.data.comments.items;
                            for(var t=0;t<newData.length;t++){
                                that.dataList.items.push(newData[t]);
                            }
                            if(lz.util.appJs() && newData.length>0){
                                //app且有数据的
                                LYUIHandle.endFooterRefresh(JSON.stringify({'footstate':1}));
                            }else if(!lz.util.appJs() && newData.length>0){
                                //非app且有数据的
                                //mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.data.comments.items==null||data.data.comments.items.length==0)?true:false);
                            }else if(lz.util.appJs() && newData.length<=0){
                                //app且无数据的
                                LYUIHandle.endFooterRefresh(JSON.stringify({'footstate':5}));
                            }else if(!lz.util.appJs() && newData.length<=0){
                                //非app且无数据的
                                //mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.data.comments.items==null||data.data.comments.items.length==0)?true:false);
                            }
                        }
                        else if(data.code == 0){
                            var msg = data.msg||"操作失败!";
                            if(lz.util.appJs()){
                                //无数据的
                                LYUIHandle.endFooterRefresh(JSON.stringify({'footstate':5}));
                            }else{
                                //mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.data.comments.items==null||data.data.comments.items.length==0)?true:false);
                            }
                            mui.alert(msg, '提示', function() {
                            });
                        }
                    },function(arg,arg1){
                        $("#pageContainer").hide();
                        layer.open({
                            content: '网络异常!'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    });
                },
                //mui上拉加载初始化
                //initMuiRefresh:function(){
                //    var that=this;
                //    mui.init({
                //        pullRefresh: {
                //            container: '#pullrefresh',
                //            up: {
                //                height:50,
                //                contentrefresh : "正在加载...",
                //                callback:function(){
                //                    that.getMoreData();
                //                }
                //            },
                //            down:{
                //                height:50,
                //                callback:function(){
                //                    that.init();
                //                    mui('#pullrefresh').pullRefresh().endPulldownToRefresh(false);
                //                    mui('#pullrefresh').pullRefresh().refresh(true);
                //                }
                //            }
                //        }
                //    });
                //},
                selTab:function(index,arg){
                    //切换tab
                    var that = this;
                    that.pageObj.tabIndex=index;
                    that.pageObj.listType=arg;
                    that.pageObj.pageNum=1;
                    //mui('#pullrefresh').pullRefresh().scrollTo(0,10);
                    that.init();
                },
                go_severDetail:function(e){
                    var serverId = e.getAttribute("data-serverid");
                    /*查看服务详情*/
                    if(lz.util.appJs()){
                        LYRouterHandle.openUrl(JSON.stringify({'type':'push','url':lz.core.lawyerRoot+"/lawyer-server.html",'params':{'serverId':serverId}}));
                    }else{
                        if(location.href.match("8081")){
                            lz.core.lawyerRoot = "http://10.41.3.30:8081/h5-lawyer/templates";
                        }
                        window.location.href=lz.core.lawyerRoot+"/lawyer-server.html?serverId="+serverId;
                    }

                },
                getNum:function(val){
                    //字符转整型
                    return parseInt(val);
                }
            }
        })
    };
    lz.registerObj.vm = new serviceIntroduce._vm().$mount("#pageContainer");
}
lz.util.run(pageInit);