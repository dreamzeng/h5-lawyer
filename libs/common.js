;(function(w){
    var cityList = [];
    var v="v3.1.1";
    var appVer = "311";
    var _token = "";
    var http = location.protocol;
    var _http = "http:";
    var _https = "https:";
    var ip = location.hostname;
    var lport = location.port;
    var port = "7080";
    var newPort = "9812";
    var platform="";
    var locationUserRoot = http+"//"+ip+":"+location.port+"/h5-user/templates";
    var locationLawyerRoot = http+"//"+ip+":"+location.port+"/h5-lawyer/templates";
    /*服务器IP地址*/
    var devIP = "192.168.10.224";//开发环境IP
    var yuIP = "192.168.12.24";//预演环境IP
    var testIP217 = "192.168.10.217";//测试环境217IP
    var testIP52 = "183.62.174.52";//测试环境52IP
    var produceIPhao = "hao13322.com";//生产环境IP1
    var produceIP32 = "119.147.144.32";//生产环境IP2
    var produceIPfy = "fy13322.com";//生产环境IP3
    var uatFy = "uat.lawyer.fy13322.com";//用户预演
    var uatLawyerIP="uat_h5lawyer.fy13322.com";//UAT环境
    var uatUserIP="uat_h5user.fy13322.com";//UAT环境

    /*api接口地址*/
    var api = http+"//192.168.10.224:"+port;//API默认开发环境
    var apiDev = http+"//192.168.10.224:"+port;//API开发环境
    var apiTest = http+"//192.168.10.217:"+port;//API测试环境
    var apiProduceHao = http+"//api.hao13322.com";//API生产环境1
    var apiProduce32 = http+"//119.147.144.32:8177";//API生产环境2
    var api24 = http+"//192.168.12.24:7080";//预演环境
    var apiProducefy = http+"//api.fy13322.com";//API生产环境3
    var apiUatFy = http+"//uat.api.fy13322.com";//API用户预演
    var uatApi= http+"//"+"uat_api.fy13322.com";//UAT环境API
    /*H5默认页面地址*/
    var userRoot = http+"//192.168.10.224/static/h5user/"+v+"/templates";//用户端默认开发环境地址
    var lawyerRoot = http+"//192.168.10.224/static/h5lawyer/"+v+"/templates";//律师端默认开发环境地址
    var iosRoot = "http://uat_ioslawyer.fy13322.com";
    /*H5开发页面地址*/
    var devUserRoot = http+"//192.168.10.224/static/h5user/"+v+"/templates";//用户端开发环境
    var devLawyerRoot = http+"//192.168.10.224/static/h5lawyer/"+v+"/templates";//律师端开发环境
    /*H5测试页面地址217*/
    var testUserRoot217 = http+"//192.168.10.217:1080/static/h5user/"+v+"/templates";//用户端测试环境217
    var testLawyerRoot217 = http+"//192.168.10.217:1080/static/h5lawyer/"+v+"/templates";//律师端测试环境217
    /*H5测试页面地址52*/
    var testUserRoot52 = http+"//183.62.174.52:1080/static/h5user/"+v+"/templates";//用户端测试环境52
    var testLawyerRoot52 = http+"//183.62.174.52:1080/static/h5lawyer/"+v+"/templates";//律师端测试环境52

    /*预演页面地址42*/
    var yuUserRoot42 = http+"//192.168.12.24:1080/static/h5user/"+v+"/templates";//用户端预演环境42
    var yuLawyerRoot42 = http+"//192.168.12.24:1080/static/h5lawyer/"+v+"/templates";//律师端预演环境42

    /*用户预演UAT*/
    var uatUserRootHao = http+"//uat.lawyer.fy13322.com/h5user/"+v+"/templates";//用户端生产环境1
    var uatLawyerRootHao = http+"//uat.lawyer.fy13322.com/h5lawyer/"+v+"/templates";//律师端生产环境1

    var uatUserRoot = http+"//"+"uat_h5user.fy13322.com/h5user/"+v+"/templates";//预演环境用户端
    var uatLawyerRoot = http+"//"+"uat_h5lawyer.fy13322.com/h5lawyer/"+v+"/templates";//预演环境律师端

    /*H5生产页面地址域名访问*/
    var produceUserRootHao = http+"//h5user.hao13322.com/h5user/"+v+"/templates";//用户端生产环境1
    var produceLawyerRootHao = http+"//h5lawyer.hao13322.com/h5lawyer/"+v+"/templates";//律师端生产环境1
    /*H5生产页面地址IP访问*/
    var produceUserRoot32 = http+"//119.147.144.32/static/h5user/"+v+"/templates";//用户端生产环境2
    var produceLawyerRoot32 = http+"//119.147.144.32/static/h5lawyer/"+v+"/templates";//律师端生产环境2

    var produceLawyerRootfy = http+"//h5lawyer.fy13322.com/h5lawyer/"+v+"/templates";//用户端生产环境3
    if(!!location.href.match(uatFy)){//用户预演
        api = apiUatFy;
        userRoot = uatUserRootHao;
        lawyerRoot = uatLawyerRootHao;
        iosRoot = "http://uat_ioslawyer.fy13322.com";
    }else if(!!location.href.match(uatLawyerIP)){//预演环境UAT
        api = uatApi;
        userRoot = uatUserRoot;
        lawyerRoot = uatLawyerRoot;
    }else if(!!location.href.match(produceIPhao)){//生产环境1
        api = apiProduceHao;
        userRoot = produceUserRootHao;
        lawyerRoot = produceLawyerRootHao;
        iosRoot = "http://ioslawyer.fy13322.com";
    }else if(!!location.href.match(produceIP32)){//生产环境2
        api = apiProduce32;
        userRoot = produceUserRoot32;
        lawyerRoot = produceLawyerRoot32;
        iosRoot = "http://ioslawyer.fy13322.com";
    }else if(!!location.href.match(produceIPfy)){//生产环境3
        api = apiProducefy;
        lawyerRoot = produceLawyerRootfy;
        iosRoot = "http://ioslawyer.fy13322.com";
    }else if(!!location.href.match(testIP217)){//测试环境1
        api = apiTest;
        userRoot = testUserRoot217;
        lawyerRoot = testLawyerRoot217;
    }else if(!!location.href.match(testIP52)){//测试环境2
        api = apiTest;
        userRoot = testUserRoot52;
        lawyerRoot = testLawyerRoot52;
    }else if(!!location.href.match(devIP)){//开发环境
        api = apiDev;
        userRoot = devUserRoot;
        lawyerRoot = devLawyerRoot;
    }else if(!!location.href.match(yuIP)){//预演环境
        api = api24;
        userRoot = yuUserRoot42;
        lawyerRoot = yuLawyerRoot42;
    }else{
        api = http+"//"+ip+":"+ newPort;
        userRoot = http+"//"+ip+":"+ newPort + "/static/h5user/"+v+"/templates";
        lawyerRoot = http+"//"+ip+":"+ newPort + "/static/h5lawyer/"+v+"/templates";
    }


    window.lz = {
        init:function () {
            if(typeof LYUserHandle !="undefined"){
                /*调用原生token*/
                LYUserHandle.getToken(function (obj){
                    if(!!obj){
                        var obj = JSON.parse(obj);
                        _token = obj.token;
                        lz.core.token = _token;
                    }
                });
                /*调用原生获取平台*/
                LYUserHandle.getBaseInfo(function (obj){
                    var obj = JSON.stringify(obj);
                    platform = obj.platform;
                });
            }
        },
        test:{
            imgbase64 : ''
        },
        ui:{
            openTouchMove:function () {
                $("body").off("touchmove");
            },
            closeTouchMove:function () {
                $("body").on("touchmove",function(event){
                    event.preventDefault;
                }, false);
            },
            scrollTop:function () {
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
            }
        },
        registerObj:{
            cityList:cityList,
            addImgs:[],
            deleteImgs:[],
            orderState_type:{
                "9":"未支付",
                "10":"未支付",
                "11":"已支付",
                "12":"已交付",
                "13":"已交付",
                "14":"交易完成",
                "15":"已取消",
                "16":"已取消",
                "20":"已取消"
            },
            orderState_type1:{
                "9":"待付款",
                "10":"待付款",
                "11":"待交付",
                "12":"待验收",
                "13":"待验收",
                "14":"",
                "15":"",
                "16":"",
                "20":""
            }
        },
        registerFn:{

        },
        util:{
			run:function (callFn) {
                if(typeof callFn ==="function"){
                    setTimeout(function () {
                        callFn();
                    },400);
                }
            },
            platformUser:function(btnCode,pageCode){
                if(lz.util.appJs()){
                    // 按钮点击统计
                    LYRouterHandle.openNative(JSON.stringify({
                        'type': 'push',
                        'page': 'LYLawyerPlatformLawyer://touchEvent',
                        'params': { 'code': btnCode  }
                    }));
                    // 页面打开统	计
                    LYRouterHandle.openNative(JSON.stringify({
                        'type': 'push',
                        'page': 'LYLawyerPlatformLawyer://jumpToModule',
                        'params': { 'code': pageCode }
                    }));
                }
            },
            getQueryString:function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(r[2]);
                }
                return null;
            },
            appBack:function (url,params) {

            },
            appJs:function () {
                if(typeof LYRouterHandle!="undefined"){
                    return true;
                }else{
                    return false;
                }
            },
            browser:{
                isIfr:false,
                iframe:"plugIn_downloadAppPlugIn_loadIframe",
                navigator:navigator.userAgent,
                bind:function (dom, event, fun) {
                    if (dom.addEventListener) {
                        dom.addEventListener(event, fun, !1);
                    }else if (dom.attachEvent){
                        dom.attachEvent(event, fun);
                    }else{
                        throw new Error('不存在的方法');
                    }
                }
            },
            ios:function () {
                return this.browser.navigator.match(/iPhone|iPad|iPd/i) ? true : false;
            },
            iosVersion:function () {
                var iosVersion = this.browser.navigator.match(/OS\s*(\d+)/);
                iosVersion = iosVersion ? (iosVersion[1] || 0) : 0;
                return iosVersion;
            },
            iosSafari:function () {
                var ifIos = this.ios();
                return ifIos && this.browser.navigator.match(/Safari/);
            },
            android:function () {
                return (this.browser.navigator.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
            },
            androidVersion:function () {
                var androidVersion = this.browser.navigator.match(/Android\s*(\d+)/);
                androidVersion = androidVersion ? (androidVersion[1] || 0) : 0;
                return androidVersion;
            },
            ipad:function () {
                return (this.browser.navigator.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
            },
            ipadIos:function () {
                var ifiPad = this.ipad();
                return (!ifiPad && this.browser.navigator.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
            },
            weixin:function () {
                return this.browser.navigator.indexOf("MicroMessenger") >= 0;
            },
            formatUrl:function (url, params) {
                var arr = [];
                for (var p in params) {
                    if (p && params[p]) {
                        arr.push(p + '=' + encodeURIComponent(params[p]));
                    }
                }
                arr = arr.join('&');
                var u = url.split("?");
                var newUrl = null;
                if (u.length == 2) {
                    newUrl = u[0] + "?" + u[1] + "&" + arr;
                } else {
                    newUrl = u[0] + "?" + arr;
                }
                return newUrl;
            },
            openApp:function (option,isAutoLaunchApp) {
                var openLink = null,
                    downloadUrl = null;
                if (this.ios()){
                    openLink = option.iosLink || null;
                    // 开启应用宝跳转
                    downloadUrl = (option.iosYyb || false) ? (option.yybDownloadUrl || null) : (option.iosDownloadUrl || null);
                }else if (this.android()){
                    openLink = option.androidLink || null;
                    // 开启应用宝跳转
                    downloadUrl = (option.androidYyb || false) ? (option.yybDownloadUrl || null) : (option.androidDownloadUrl || null);
                }
                var params = option.params || [];
                openLink = this.formatUrl(openLink,params); //格式化url 加参数
                // android5 及以上的高版本
                if (this.android() && this.androidVersion() >= 5) {
                    // 延后50毫秒
                    setTimeout(function() {
                        // 如果为自动跳转直接用应用宝链接
                        if (isAutoLaunchApp) {
                            openLink = (option.yybDownloadUrl || null);
                        }
                        location.href = openLink;
                    }, 50);
                }
                // 设备是ios9 及以上的版本
                if (this.ios() && this.iosVersion() >= 9){
                    // 如果是自动跳转或者未开启Universal Link 用之前的链接 否则用 Universal Link
                    var iosUniversalLinkEnabled = (option.iosUniversalLinkEnabled || false) ? false : true;
                    openLink = isAutoLaunchApp || iosUniversalLinkEnabled ? openLink : (option.ios9Link || null);
                    document.location.href = openLink;
                    if (isAutoLaunchApp) {
                        return;
                    }
                }
                var checkOpen = function (cb){
                    var _clickTime = +(new Date());
                    function check(elsTime) {
                        if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
                            cb(1);
                        } else {
                            cb(0);
                        }
                    }
                    //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
                    var _count = 0, intHandle;
                    intHandle = setInterval(function(){
                        _count++;
                        var elsTime = +(new Date()) - _clickTime;
                        if (_count>=100 || elsTime > 3000 ) {
                            clearInterval(intHandle);
                            check(elsTime);
                        }
                    }, 20);
                };
                var that=this;
                checkOpen(function(opened){
                    // APP没有打开成功  并且开启自动跳转到下载页
                    if(opened === 0 && option.autoRedirectToDownloadUrl&&that.android()){
                        location.href = downloadUrl;
                    }
                });
            },
            link:function (option) {
                var that = lz.util;
                function init(option) {
                    if (option.button){
                        option.button.setAttribute('href','javascript:void(0)');
                        that.browser.bind(option.button, 'click', function () {
                            if (!that.browser.isIfr){
                                var ifr = document.createElement("iframe");
                                ifr.id = that.browser.iframe;
                                document.body.appendChild(ifr);
                                document.getElementById(that.browser.iframe).style.display = "none";
                                document.getElementById(that.browser.iframe).style.width = "0px";
                                document.getElementById(that.browser.iframe).style.height = "0px";
                                that.browser.isIfr = true;
                            }
                            // 打开APP
                            that.openApp(option,false);
                        })
                    }
                    // 如果开启自动打开
                    if (option.autoLaunchApp){
                        // 打开APP
                        that.openApp(option,true);
                    }
                }
                init(option);
            }
        },
        core:{
            version:v,
            locationUserRoot:locationUserRoot,
            locationLawyerRoot:locationLawyerRoot,
            devUserRoot:devUserRoot,
            devLawyerRoot:devLawyerRoot,
            userRoot:userRoot,
            lawyerRoot:lawyerRoot,
            iosRoot:iosRoot,
            apiDev:apiDev,
            api:api,
            "app-ver":appVer,
            platform:platform,
            token:_token,
            debug: false,
            ajax: function (url, params, success, error) {
                var reqUrl;
                if(!params){
                    params = {};
                }
                if(url&&url.debug){
                    if(url.local){
                        reqUrl = url.local+ '?rnd=' + new Date().getTime();
                    }else{
                        reqUrl = lz.core.api + '?rnd=' + new Date().getTime();
                    }
                    $.ajax(reqUrl,
                        {
                            data: JSON.stringify(params),
                            success:success,
                            // headers: {token:lz.core.token},
                            error:error,
                            complete: function (XMLHttpRequest, textStatus) {
                                var test = $.extend(true, {}, params);
                                if(lz.core.debug){
                                    alert(reqUrl + "\n\n [本地发送]\n" + JSON.stringify(test) + "\n\n [本地返回]\n" + XMLHttpRequest.responseText);
                                }else{
                                    if(url.console){
                                        console.log(reqUrl + "\n\n [本地发送]\n" + JSON.stringify(test) + "\n\n [本地返回]\n" + XMLHttpRequest.responseText);
                                    }
                                }
                            }
                        }
                    );
                    return;
                }else{
                    if(url && url.server){
                        reqUrl = lz.core.api+url.server+ '?rnd=' + new Date().getTime();
                    }else{
                        reqUrl = lz.core.api+url+ '?rnd=' + new Date().getTime();
                    }
                }
                console.log("参数:",params,"token-------------------:",lz.core.token);
                var headersParams={
                    token:lz.core.token,
                    "app-ver":lz.core["app-ver"]
                };
                var options = {
                    type:  'POST',
                    cache:  false,
                    headers: headersParams,
                    data:params,
                    dataType: 'json',
                    timeout: 19900,
                    success: function (data, textStatus, jqXHR) {
                        lz.device.LYUIHandle.hideHUD();
                        if (typeof success === 'function') {
                            if(data.code==10){
                                $("#sectionOverlay").hide();
                                $("#pageContainer").hide();
                                if(lz.util.appJs()){
                                    /*调用原生登录接口*/
                                    LYUserHandle.checkLoginState(JSON.stringify({"removeCookie":true}),function (arg) {
                                        var arg = JSON.parse(arg);
                                        console.log(arg,arg.loginState);
                                        if(arg.loginState){
                                            //LYRouterHandle.openUrl(JSON.stringify({'type':'push','url':lawyerRoot+"/templates/lawyer-order.html",'params':{}}));
                                        }else{

                                        }
                                    });
                                }else{

                                }
                                return;
                            }else if(data.code==0){
                                $("#sectionOverlay").hide();
                                layer.closeAll();
                                var msg = data.msg||"操作失败!";
                                layer.open({
                                    content: msg,
                                    skin: 'msg',
                                    time: 2
                                });
                            }else{
                                success(data);
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus) {
                        lz.device.LYUIHandle.hideHUD();
                        if (typeof error === 'function') {
                            error(XMLHttpRequest,textStatus);
                        }else{

                        }
                    },
                    complete: function (XMLHttpRequest, textStatus) {
                        if (lz.core.debug) {
                            var test = $.extend(true, {}, params);
                            alert(url + "\n\n [发送]\n" + JSON.stringify(test) + "\n\n [返回]\n" + XMLHttpRequest.responseText);
                        }
                    }
                };
                if(url && url.type){
                    options.type = url.type;
                    if(options.type == "get" || options.type == "GET"){
                        options.data = params;
                    }
                }
                if(url && url.contentType){
                    options.contentType = url.contentType;
                }
                if(url && url["app-ver"]){
                    options.headers["app-ver"] = url["app-ver"];
                }
                if(typeof LYUserHandle !="undefined"){
                    /*调用原生token*/
                    LYUserHandle.getToken(function (obj){
                        if(!!obj){
                            var obj = JSON.parse(obj);
                            _token = obj.token;
                            lz.core.token = _token;
                            if(!!_token){
                                options.headers.token=_token;
                            }
                            $.ajax(reqUrl, options);
                        }
                    })
                }else{
                    $.ajax(reqUrl, options);
                }
            },
            init: function (callback){

            },
        },
        device:{
            LYRouterHandle:{
                openNative: function (obj,onError) {
                    try {
                        LYRouterHandle.openNative(JSON.stringify(obj));
                    }
                    catch (e) {

                    }
                },
                openUrl: function (obj,onError) {
                    try {
                        LYRouterHandle.openUrl(JSON.stringify(obj));
                    }
                    catch (e) {

                    }
                },
                assign: function (obj,onError) {
                    try {
                        LYRouterHandle.assign(JSON.stringify(obj));
                    }
                    catch (e) {

                    }
                },
                pop: function (obj,onError) {
                    try {
                        LYRouterHandle.pop(JSON.stringify(obj))
                    }
                    catch (e) {

                    }
                },
                dismiss: function (obj,onError) {
                    try {
                        LYRouterHandle.dismiss(JSON.stringify(obj))
                    }
                    catch (e) {

                    }
                },
                getParams: function (obj,onError) {
                    try {
                        LYRouterHandle.getParams(function(obj){
                            return obj;
                        });
                    }
                    catch (e) {

                    }
                },
            },
            LYUIHandle:{
                loading:function (callFn) {
                    try{
                        if(lz.util.appJs()){
                            LYUIHandle.loading();
                        }else{
                            if(typeof callFn == "function"){
                                callFn();
                            }
                        }
                    }catch (e){
                        if(typeof callFn == "function"){
                            callFn();
                        }
                    }
                },
                hideHUD:function (callFn) {
                    try{
                        if(lz.util.appJs()){
                            LYUIHandle.hideHUD();
                        }else{
                            if(typeof callFn == "function"){
                                callFn();
                            }
                        }
                    }catch (e){
                        if(typeof callFn == "function"){
                            callFn();
                        }
                    }
                },
                title:function (obj,onError) {
                    try{
                        LYUIHandle.title(JSON.stringify(obj))
                    }catch (e){

                    }
                },
                setRightButton:function (obj,onError) {
                    try{
                        LYUIHandle.setRightButton(JSON.stringify(obj,function(arg){
                            return arg;
                        }));
                    }catch (e){

                    }
                },
                refresh:function (obj,onError) {
                    try{
                        LYUIHandle.refresh();
                    }catch (e){

                    }
                }
            },
            LYPhotoAlbumHandle:{
                showPhotoAlbum: function (obj,onError) {
                    try {
                        LYPhotoAlbumHandle.showPhotoAlbum(JSON.stringify(obj));
                    }
                    catch (e) {

                    }
                },
                showPickerAlbum:function (obj,onError) {

                }
            },
            LYPaymentHandle:{
                payment:function(obj, onError){
                    try{
                        /*LYPaymentHandle.payment(JSON.stringify(some params),function(obj){});*/
                    }catch (e){

                    }
                }
            },
            LYUserHandle:{
                checkLoginState:function(obj, onError){
                    try{
                        LYUserHandle.checkLoginState(function (obj){
                            var _obj = JSON.stringify(obj);
                            return _obj.oginState;
                        })
                    }catch (e){

                    }
                },
                getToken:function(obj,onError){
                    try{
                        LYUserHandle.getToken(function (obj){
                            return obj;
                        })
                    }catch (e){

                    }
                }
            }
        }
    };
    lz.init();
})(window);
