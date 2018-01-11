function page() {
    FastClick.attach(document.body);
    var strUrl2 = "../data-mocks/lawyer-get-order-details.json";
    var orderNo,_orderNo="15173910452714199628",_debug = false,_vm;
    var data ={
        Isshow:true,
        /*订单号*/
        orderNo:"",
        /*订单价格*/
        amount:null,
        /*官网价格*/
        govermentPrice:"",
        /*服务图片url*/
        goodsImageUrl:"",
        /*服务名称*/
        goodsName:"",
        /*商品服务ID*/
        goodsId:null,
        /*价格是否确定: 0.确定, 1. 不确定(等待律师确认价格)*/
        priceConfirm:null,
        /*服务起始价格 (如果价格确定, 订单价格以此字段为准)*/
        priceStart:null,
        /*订单价格*/
        amount:"",
        /*服务最高价格*/
        priceEnd:null,
        /*单位*/
        unit:null,
        /*订单状态: 9.待确定价格;10.待付款; 11.已付款; 12.用户确认交付; 13.律师确认交付; 14.已完成(交易成功), 15.支付失败; 16.已评价;17.已退款 20.已取消(交易失败)*/
        state:{
            code:null,
            value:null
        },
        /*用户id*/
        userId:"",
        /*用户名*/
        userName:"",
        /*用户头像*/
        userImageUrl:"",
        /*手机号*/
        userPhone:"",
        /*律师ID*/
        lawyerId:"",
        /*律师名称*/
        lawyerName:"",
        /*律师手机号*/
        lawyerPhone:"",
        /*律师头像*/
        lawyerImageUrl:"",
        /*律师所在公司*/
        lawyerCompany:"",
        /*下单时间*/
        createTime:"",
        /*支付时间*/
        payTime:"",
        /*用户确认时间*/
        userSureTime:"",
        /*是否可以催单(律师端使用此字段)*/
        urge:"",
        /*用户需求备注(律师端使用此字段)*/
        remark:"",
        /*订单用户上传的文件*/
        memberFiles:[],
        /*订单律师上传的文件*/
        lawyerFiles:[],
        specCombDesc:"",
        type:{
            code:"",
            value:""
        }
    };
    lz.registerFn.deleteImg = function (arg,arg1) {
         var index = arg.dataset.delid;
         var imgs = lz.registerObj.addImgs || [];   
         for(var i = 0,l = imgs.length;i<l;i++){
                if(imgs[i]['imgId'] == index){
                    lz.registerObj.addImgs.splice(i,1);
                     break;
                 }
          }
        $(arg).parent().remove();
        if($('.imgs-item').length<6){
            $('.imgs-item1').show();
        }
    }

    lz.registerFn.lawyerDeleteImg=function (arg,arg1) {
        var index = arg.dataset.delid;
        lz.registerObj.deleteImgs.push(index);
        $(arg).parent().remove();
         if($('.imgs-item').length<6){
            $('.imgs-item1').show();
        }
    }
    
    function pageInit() {
        _vm = Vue.extend({
            data:function(){
                return {
                    debug:_debug,
                    url:strUrl2,
                    imgId:0,
                    updateFlag:0,
                    data:data,
                    shadeClose:false
                };
            },
            computed:{
                /*弹出确认标题名称*/
                btnTitle:function () {
                    if(this.data.state.code==11){
                        return "确定交付吗?";
                    }else if(this.data.state.code==14||this.data.state.code==20){
                        return "确定删除?";
                    }else if(this.data.state==10){
                        return "确定支付?";
                    }
                },
                /*弹出确认按钮名称*/
                btnConfirm:function(){
                    if(this.data.state.code==14||this.data.state.code==20){
                        return "确定";
                    }else if(this.data.state.code==11){
                        return "确定";
                    }
                },
                /*弹出取消按钮名称*/
                btnCancle:function(){
                    if(this.data.state.code==11){
                        return "取消";
                    }else if(this.data.state.code==14||this.data.state.code==20){
                        return "取消";
                    }
                },
                 state:function () {
                    var that = this;
                    var str = lz.registerObj.orderState_type1[that.data.state.code]||"";
                    return str;
                },
                 /*订单状态显示*/
                state_type:function () {
                    var that = this;
                    var str = lz.registerObj.orderState_type[that.data.state.code]||"";
                    return str;
                },
                /*底部按钮名称显示*/
                btnText:function () {
                    if(this.data.type.value=='律师服务'||this.data.type.value=='知识产权'){
                        if(this.data.state.code==11){
                            return "交付订单";
                        }else {
                            //if(this.data.state.code==14||this.data.state.code==20){
                            //    return "删除订单";
                            //}
                            if(this.data.state.code==12||this.data.state.code==13){
                                $('.section5').hide()
                            }
                            if(typeof this.data.urge!='undefined'){
                                // return "确认";
                                $('.section5').hide()
                            }
                        }
                    }else{
                         $('.section5').hide()
                    }
                },
                /*价格*/
                price:function () {
                    var gove ='',gove_val='';
                    if(this.data.govermentPrice&&this.data.govermentPrice!= 0){
                         gove = '(含官费￥'+this.data.govermentPrice+')',
                         gove_val = this.data.govermentPrice;
                    }
                    if(this.data.state.code==9){
                       // var str =  "￥"+this.data.priceStart+"-"+"￥"+this.data.priceEnd;
                         var str = "￥"+this.data.amount+gove;
                         return str;
                    }else if(this.data.state.code==20){
                        if(this.data.priceConfirm==0){
                           // return "￥"+this.data.priceStart;
                            var str = "￥"+this.data.amount+gove;
                            return str;
                        }else if(this.data.priceConfirm==1){
                            //var str =  "￥"+this.data.priceStart+"-"+"￥"+this.data.priceEnd;
                            var str = "￥"+this.data.amount+gove;
                            return str;
                        }
                    }else{
                        //return "￥"+this.data.priceStart;
                        return "￥"+this.data.amount+gove;
                    }
                }
            },
            mounted: function() {
                this.init();
            },
            methods: {
                /*页面数据初始化*/
                init:function  (arg) {                  
                    var that = this;
                    var url = {
                        local: this.url,
                        server:"/order/get-order-details",
                        type: "get",
                        debug: _debug
                    };
                    /*订单状态:9.待确定价格; 10.待付款; 11.已付款; 12.用户确认交付; 13.律师确认交付; 14.已完成(交易成功), 15.支付失败; 16.已评价; 20.已取消(交易失败)*/
                    var data = {
                        orderNo:orderNo
                    };
                    lz.ui.closeTouchMove(); 
                    lz.core.ajax(url,data,function(data){
                        lz.ui.openTouchMove();
                        $("#defaultFix").hide();
                        if(data.code == 1){
                            lz.device.LYUIHandle.hideHUD();
                            that.$data.data = data.data;
                            //进度条状态
                            if(that.$data.data.type.value!='快速咨询'){
                                 if(that.$data.data.state.code == 9||that.$data.data.state.code == 10){
                                    $('.circle span:lt(1)').addClass('active');
                                    $('.progress li:lt(1)').addClass('active');
                                    $('.section1 state:eq(1)').html('待付款');
                                    $('.circle span:eq(0) b').css('background','#cecece');
                                }else if(that.$data.data.state.code == 11){
                                    $('.circle span:lt(2)').addClass('active');
                                    $('.progress li:lt(2)').addClass('active');
                                    $('.bar_wrap_cont').css('width','30%');
                                    $('.circle span:eq(1) b').css('background','#cecece');
                                }else if(that.$data.data.state.code == 12||that.$data.data.state.code == 13){
                                    $('.circle span:lt(3)').addClass('active');
                                    $('.progress li:lt(3)').addClass('active');
                                    $('.bar_wrap_cont').css('width','60%');
                                    $('.circle span:eq(2) b').css('background','#cecece');
                                }else if(that.$data.data.state.code == 14 ){
                                    $('.circle span:lt(4)').addClass('active');
                                    $('.progress li:lt(4)').addClass('active');
                                    $('.bar_wrap_cont').css('width','90%');
                                }else if(that.$data.data.state.code == 20||that.$data.data.state.code == 15){
                                    $('.progress').hide();
                                }
                            }else{
                                $('.progress').hide()
                            }
                            if(that.$data.data.state.code==14||that.$data.data.state.code==20){
                                if(that.$data.data.lawyerFiles&&that.$data.data.lawyerFiles.length>0){
                                    for(var i=0;that.$data.data.lawyerFiles[i];i++){
                                        that.allImg(that.$data.data.lawyerFiles[i]);
                                    }
                                }
                                if(that.$data.data.memberFiles&&that.$data.data.memberFiles.length>0) {
                                    for (var i = 0; that.$data.data.memberFiles[i]; i++) {
                                        that.allImg(that.$data.data.memberFiles[i]);
                                    }
                                }
                            }else{
                                if(that.$data.data.lawyerFiles&&that.$data.data.lawyerFiles.length>0){
                                    for(var i=0;that.$data.data.lawyerFiles[i];i++){
                                        that.lawyerImg(that.$data.data.lawyerFiles[i]);
                                    }
                                }
                                if(that.$data.data.memberFiles&&that.$data.data.memberFiles.length>0) {
                                    for (var i = 0; that.$data.data.memberFiles[i]; i++) {
                                        that.userImg(that.$data.data.memberFiles[i]);
                                    }
                                }
                            }
                            setTimeout(function () {
                                mui.previewImage();
                            },20);
                        }else if(data.code == 0){
                            lz.device.LYUIHandle.hideHUD();
                            var msg = data.msg||"操作失败!";
                            mui.alert(msg, '提示', function() {
                            });
                        }else{

                        }

                    },function(arg,arg1){
                        lz.ui.openTouchMove();
                        lz.device.LYUIHandle.hideHUD();
                        $("#pageContainer").hide();
                        layer.open({
                            content: '网络异常!'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    });
                },
                /*拨打电话*/
                callPhone:function () {
                    if(lz.util.appJs()){
                        LYUserHandle.phone(JSON.stringify({'phoneNum':this.data.realUserPhone}));
                    }else{

                    }
                },
                /*联系用户*/
                contactUser:function(){
                     var order_id = this.data.userId,
                       order_name = this.data.userName,
                       order_logo = this.data.userImageUrl;
                       console.log(order_id);
                   if(typeof LYRouterHandle != "undefined"){
                      LYRouterHandle.openNative(JSON.stringify({'type':'push','page':'LYLawyerPlatformLawyer://chatVC','params':{'userName':order_name,'userId':order_id,'logo':order_logo}}));
                   }
                },
                /*所有图片*/
                allImg:function (obj) {
                    var base64 =obj.url;
                    var id = obj.id;
                    var html = '<div class="imgs-item"><div style="display: inline-block;"><img  class="img"  src="'+base64+'" data-id="'+id+'" data-preview-src="" data-preview-group="1"></div></div>';
                    setTimeout(function () {
                        $("#imgsList").prepend(html);
                    },10);
                },
                /*律师上传图片显示*/
                lawyerImg:function (obj){
                    
                    var base64 =obj.url;
                    var id = obj.id;
                    var html = "";
                    if(typeof  this.data.lawyerSureTime!="undefined"){
                        html = '<div class="imgs-item"><div style="display: inline-block;"><img  class="img"  src="'+base64+'" data-id="'+id+'"></div></div>';
                    }else {
                        html = '<div class="imgs-item"><i class="fimg"  data-delid="'+id+'" onclick="lz.registerFn.lawyerDeleteImg(this,event)"></i><div style="display: inline-block;"><img  class="img"  src="'+base64+'" data-id="'+id+'" data-preview-src="" data-preview-group="1"></div></div>';
                    }
                    setTimeout(function () {
                        $("#imgsList").prepend(html);
                    },10);
                },
                /*用户上传图片显示*/
                userImg:function (obj) {
                    var base64 =obj.url;
                    var id = obj.id;
                    var html = '<div class="imgs-item" ><div style="display: inline-block;"><img  class="img"  src="'+base64+'" data-id="'+id+'" data-preview-src="" data-preview-group="1"></div></div>';
                    setTimeout(function () {
                        $("#imgsList").prepend(html);
                    },10);
                },
                /*获取选择图片*/
                selectImg:function () {
                    var that = this,options = [];
                    if(lz.util.appJs()) {
                        if(lz.registerObj.addImgs){
                            params={};
                            for( i in lz.registerObj.addImgs){
                                if(lz.registerObj.addImgs[i])
                               options.push(lz.registerObj.addImgs[i].option);
                            }
                        }else{
                                  lz.registerObj.addImgs=[];  
                        }
                        var params = {
                            'maxCount':6,
                            'options': options
                        };
                        LYPhotoAlbumHandle.showPickerAlbum(JSON.stringify(params),function (obj) {
                            lz.registerObj.addImgs=[];
                            $('.imgs-item').remove();
                            var imagesObj = JSON.parse(obj);
                            if (imagesObj.images && imagesObj.images.length > 0) {
                                for (var i = 0; imagesObj.images[i]; i++) {
                                    that.imgId=lz.registerObj.addImgs.length-1;
                                    // that.imgId++;
                                    var base64 = imagesObj.images[i].base64Str;
                                    var name = imagesObj.images[i].name;
                                    var option =imagesObj.images[i].option;
                                    var obj = {base64Str: base64, name: name,option:option,imgId:that.imgId };
                                    lz.registerObj.addImgs.push(obj);
                                    var imgId = "newImgId" + that.imgId;
                                    // (function (arg){$(arg).parent().remove();})(this)
                                    var html = '<div class="imgs-item"><i class="fimg" data-delid="' + that.imgId + '"  onclick="lz.registerFn.deleteImg(this,event)"></i><div style="display: inline-block;"><img id="' + imgId + '" class="img"    src="data:image/png;base64,' + base64 + '" data-id="' + that.imgId + '" data-preview-src="" data-preview-group="1"></div></div>';
                                    $(".imgs-item1").before(html);
                                    if($('.imgs-item').length>=6){
                                        $('.imgs-item1').hide();
                                        return; 
                                    }
                                   lz.ui.scrollTop();
                                }
                            }else{
                                  lz.registerObj.addImgs=[];
                            }

                        });
                    } else {
                        var that = this;
                        that.imgId = lz.registerObj.addImgs.length-1;
                        // that.imgId++;
                        var base64 = lz.test.imgbase64;
                        var obj = {base64Str: base64, name: that.imgId+".png",imgId:that.imgId };
                        lz.registerObj.addImgs.push(obj);
                        var imgId = "newImgId" + that.imgId;
                        var html = '<div class="imgs-item" ><i class="fimg" data-delid="' + that.imgId + '" onclick="lz.registerFn.deleteImg(this,event)"></i><div style="display: inline-block;"><img id="' + imgId + '" class="img"    src="data:image/png;base64,' + base64 + '"  data-id="' + that.imgId + '" data-preview-src="" data-preview-group="1"></div></div>';
                        $(".imgs-item1").before(html);
                        if($('.imgs-item').length>=6){
                            $('.imgs-item1').hide();
                            return;
                        }
                        lz.ui.scrollTop();
                    }

                },
                /*继续发布*/
                popupConfirm:function () {
                    var that = this;
                    // that.hide();
                    if(this.data.state.code==10){
                        /*state=10待付款*/
                    }else if(this.data.state.code==14||this.data.state.code==20){
                        if(this.data.cancleOrder==1){
                        /*删除订单*/
                        var url = {
                            local: this.url,
                            server: "/order/delete-order",
                            type: "POST",
                            debug: _debug
                        };
                        var data = {
                            orderNo:this.data.orderNo
                        };
                        lz.ui.closeTouchMove();
                        lz.device.LYUIHandle.loading();
                        lz.core.ajax(url,data,function(data){
                            lz.ui.openTouchMove();
                            layer.closeAll();
                            if(data.code == 1){
                                lz.device.LYUIHandle.hideHUD();
                                /*调原生接口返回到我的订单列表*/
                                if(lz.util.appJs()){
                                    /*调原生接口返回到我的订单列表*/
                                    LYRouterHandle.pop(JSON.stringify({'superRefresh':true}));
                                }else{
                                    location.href=lz.core.lawyerRoot+"lawyer-order.html";
                                }
                            }else{
                                 mui.alert('网络异常!', '提示', function() {});
                            }
                        },function(arg,arg1){
                            lz.ui.openTouchMove();
                            layer.closeAll();
                            lz.device.LYUIHandle.hideHUD();
                             mui.alert('网络异常!', '提示', function() {});
                        });
                      }
                    }else if(this.data.state.code==11){
                        /*确认交付*/
                        if(this.data.cancleOrder==1){
                        var url = {
                            local: this.url,
                            server: "/order/lawyer-finish-order",
                            type: "POST",
                            debug: _debug
                        };
                        var base64Str = lz.registerObj.addImgs;
                        var delId = lz.registerObj.deleteImgs.join(",")||"";
                        var data = {
                            orderNo:this.data.orderNo,
                            delFileId:delId,
                            uploadFiles:JSON.stringify(base64Str)
                        };
                        lz.ui.closeTouchMove();
                        lz.core.ajax(url,data,function(data){
                            lz.registerObj.addImgs=[];
                            lz.ui.openTouchMove();
                            layer.closeAll();
                            if(data.code == 1){
                                /*调原生接口返回到我的订单列表*/
                                if(lz.util.appJs()){
                                    LYRouterHandle.pop(JSON.stringify({'superRefresh':true}));
                                }else{
                                    location.href=lz.core.lawyerRoot+"lawyer-order.html";

                                }
                            }else{
                                mui.alert('网络异常!', '提示', function() {
                                    });
                            }
                        },function(arg,arg1){
                            lz.ui.openTouchMove();
                            layer.closeAll();
                            lz.device.LYUIHandle.hideHUD();
                            mui.alert('网络异常!', '提示', function() {
                                    });
                        });
                    }
                  }
                },
                /*弹出层显示禁止页面滚动*/
                del_dialog:function () {
                    var that = this;
                    var btnArray = ['取消', '确认'],
                    del_tit ='<div class="mui-popup-title mui-popup-title1">确定要删除该订单吗?</div>';
                    mui.confirm('', del_tit,btnArray, function(e) {
                        if (e.index == 1) {
                            that.data.cancleOrder=1;
                            that.popupConfirm();
                        }else{
                           that.data.cancleOrder=2;
                        }
                    })
                    lz.ui.closeTouchMove();
                },
                confirm_dialog:function(){
                    var that = this;
                    var btnArray = ['取消', '确认'],
                    del_tit ='<div class="mui-popup-title mui-popup-title2">确认交付订单吗?</div>';
                    mui.confirm('',del_tit, btnArray, function(e) {
                        if (e.index == 1) {
                           that.data.cancleOrder=1;
                           that.popupConfirm();
                        }else{
                           that.data.cancleOrder=2;
                        }
                    })
                    lz.ui.closeTouchMove();

                },
                go_severDetail:function(e){
                    /*查看服务详情*/
                    var that=this;
                    if(that.data.type.code==11){
                        return;
                    }
                    var serverId = e.getAttribute("data-sno");
                    if(lz.util.appJs()){
                        LYRouterHandle.openUrl(JSON.stringify({'type':'push','url':lz.core.lawyerRoot+"/lawyer-server.html",'params':{'serverId':serverId}}));
                    }else{
                        if(location.href.match("8081")){
                            lz.core.lawyerRoot = "http://10.41.3.30:8081/h5-lawyer/templates";
                        }
                        window.location.href=lz.core.lawyerRoot+"/lawyer-server.html?serverId="+serverId;
                    }
                },
                go_evaluateList:function(e,orderId){
                    /*查看该订单评价*/
                    //var orderId = e.getAttribute("orderId");
                    //alert(orderId);
                    if(lz.util.appJs()){
                        LYRouterHandle.openUrl(JSON.stringify({'type':'push','url':lz.core.lawyerRoot+"/lawyer-order-evaluate-list.html",'params':{'orderId':orderId}}));
                    }else{
                        if(location.href.match("8081")){
                            lz.core.lawyerRoot = "http://10.41.3.30:8081/h5-lawyer/templates";
                        }
                        window.location.href=lz.core.lawyerRoot+"/lawyer-order-evaluate-list.html?orderId="+orderId;
                    }
                }
            
            }
        });
        lz.registerObj.vm = new _vm().$mount("#pageContainer");
    }
    if(lz.util.appJs()){
        _debug = false;
        LYUIHandle.title(JSON.stringify({"title":"订单详情"}));
        LYRouterHandle.getParams(function(obj){
            if(!!obj){
                var obj = JSON.parse(obj);
                orderNo = obj.orderNo;
                pageInit();
            }
        });
    }else{
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
        _orderNo = getQueryString("orderNo");  
        _debug = true;
        orderNo = _orderNo;
        // orderNo = "15173910452714199628";
        var token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZWFsTmFtZSI6IuiClui_sOadvuOAgiIsInBob25lIjoiMTU5MTQxMDQ1MjAiLCJzZXgiOiJNYWxlIiwid2FzTG9naW4iOnRydWUsImxvZ28iOiJodHRwOi8vcmVzb3VyY2UuaGFvMTMzMjIuY29tL3VzZXIvdXNlci5wbmciLCJpZCI6MTkyNSwidXNlck5hbWUiOiIxNTkxNDEwNDUyMCIsInR5cGUiOiJVc2VyIiwiZXhwIjoxNTExOTQ4MTkyMjAwfQ.XjLjBpvGmgX-HxRJfUxGth8akE-9tfpmtMhHmgpiqZE";
        lz.core.token = token;
        pageInit();
    }
};
lz.util.run(page);
