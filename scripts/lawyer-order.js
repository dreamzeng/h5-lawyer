var lawyer_api = lz.core.api +'/',
    lawyer_url =  lz.core.lawyerRoot +'/',
    page1,page2,data_len1,data_len2,data_len3,token,order_ul,state_val,order_centain,order_num,price,pay_tit,order_ul,order_no,amount,param={},api_pend,
    hoost = window.location.host;
if(hoost =='192.168.10.224'|| hoost =='192.168.10.217'|| hoost == 'hao13322.com'){
    api_pend = lawyer_api+ 'order/find-order-list';
}else{
     api_pend = lawyer_api+ 'order/find-order-list';
}
var HH_LZ = (function(LZ, $){
    LZ['data'] = {
        'startAjax' : function(type, url, data, callback) {
          $.ajax({
            type: type,
            timeout : 19000,
            headers: {
                "X-Requested-With":"XMLHttpRequest",
                "token":token   
            },
            xhrFields: {
                withCredentials: false
            },
            url: url+'?rnd=' + new Date().getTime(),
            data: data,
            dataType: 'json',
            async: true,
            success:function(json){
                if(callback) callback(json);
            },
            complete : function(XMLHttpRequest,status){ 
        　　　　if(status=='timeout'){
                    HH_LZ.data.closeTouch('body');
         　　　　　 mui.alert('网络错误', '信息提示', function(){
                    location.reload();
                  });
        　　　　}
        　　},
            error:function(XMLHttpRequest, textStatus){
                HH_LZ.data.closeTouch('body');
                mui.alert('网络错误', '信息提示', function(){
                 location.reload();
              });
            }
        });
       },
         'pendOrder' : function(page1,callback){
            var type = 'get',
              apiURL =  api_pend,
             param   = 'status=5&page='+page1+'&limit=20';
            LZ.data.startAjax(type, apiURL, param, function(json){
            callback(json);
         });
        },
        'allOrder' : function(page2,callback){
            var type = 'get',
              apiURL =  api_pend,  
             param   = 'status=1&page='+page2+'&limit=20';
            LZ.data.startAjax(type, apiURL, param, function(json){
            callback(json);
         });
        },
        'modifyOrder' : function(param,callback){
            var type = 'post',
             apiURL  = lawyer_api+ 'order/update-order-price',
             param   = param;
            LZ.data.startAjax(type, apiURL, param, function(json){
            callback(json);
         });
        },
        'delOrder' : function(order_no,callback){
            var type = 'post',
             apiURL  = lawyer_api+'order/delete-order', 
             param   = 'orderNo='+order_no;
            LZ.data.startAjax(type, apiURL, param, function(json){
            callback(json);
         });
        },
        'emptyOrder' : function(id){
            $( id+' '+'.no-order').show();
            $( id+' '+'.mui-loading').hide();
            $( id+' '+'.mui-pull-bottom-tips').hide()
        },
        'closeTouch' : function(id){
           $(id).on("touchmove",function(event){
                event.preventDefault;
            }, false);
        },
        'beginTouch' : function(){
           $("body").off("touchmove");
        }        
     };
     /**
     *@名称:  验证
     *@参数:  
     *@描述:  HH_LZ.validate.orderNum();
     */
    LZ['validate'] = {
        'orderNum':function(){
            //数字验证
              $(document).on('input propertychange','.mui-popup-text input',function (e) {
                 if (e.type === "input" || e.orignalEvent.propertyName === "value") {
                      this.value =this.value.replace(/[^(\d||/.)]/g,'');
                  }
                });
        }
       };
    LZ['fillDate'] = {
        'pendOrder' :function(page1){
             HH_LZ.data.pendOrder(page1,function(json){
                if(json.code == 1){
                    lz.device.LYUIHandle.hideHUD();
                    $('.mui-pull-bottom-tips').show();
                    if(json.data&&json.data.length){
                       data_len1 = json.data.length;
                    } 
                    $('#item1mobile .mui-loading').hide();
                    $('#item1mobile .no-order').hide();
                    $('#item1mobile .mui-pull-bottom-tips').show();
                    order_ul ='';
                    $(json.data).each(function(){
                           //订单状态
                          if(this.state == 10){
                              price = (this.amount&&this.amount||"");
                             state_val = '<span class="order-type wait-pay">未支付</span>';
                              pay_tit = '';
                            order_centain = '<span class="creat_time">'+this.createTime+'</span>'+
                                            '<div class="btn_all"><span href="javascript:;" class="mui-btn mui-btn-primary modify" data-id='+this.id+' data-price='+price+' data-title='+this.goodsName+' data-num='+this.orderNo+'>修改价格</span>'+
                                            '<span href="javascript:;" class="mui-btn mui-btn-primary contact_user" data-id='+this.userId+' data-name='+this.userName+' data-logo='+this.logo+'>联系客户</span></div>';
                          }else if(this.state == 11){
                              price = (this.amount&&this.amount||"");
                            state_val = '<span class="order-type already-pay">已支付</span>';
                              pay_tit = '';
                              order_centain ='<span class="creat_time">'+this.createTime+'</span>'+'<div class="btn_all"><a href="javascript:;" class="mui-btn mui-btn-primary" data-num='+this.orderNo+'>交付订单</a></div>';
                          }
                          else if(this.state == 12){
                              price = (this.amount&&this.amount||"");
                            state_val = '<span class="order-type already-pay"">已支付</span>';
                              pay_tit = '';
                            order_centain ='<span class="creat_time">'+this.createTime+'</span>';
                          }else if(this.state == 13){
                              price = (this.amount&&this.amount||"");
                            state_val = '<span class="order-type already-pay"">已支付</span>';
                              pay_tit = '';
                            order_centain ='<span class="creat_time">'+this.createTime+'</span>';
                          }
                          if(!this.logo){
                              var logo = '../images/userImg.png';
                          }else{
                                  logo = this.logo;
                          }
                          order_ul +='<ul class="mui-table-view "><div class="order-tit">'+
                                     '<span class="order-date "><i class="tc"><img src="'+logo+'"></i>'+this.userName+'</span>'+state_val+'</div>'+
                                     '<li class="order-item"><a href="javascript:;"  data-num='+this.orderNo+'><span class="mui-icon mui-icon-arrowright"></span>'+
                                     '<em class="loading"><i class="mui-spinner"></i><img class="mui-media-object mui-pull-left" src="'+this.goodsImageUrl+'"></em>'+
                                     '<p><span>'+this.goodsName+'</span><em class='+this.id+'>￥'+price+'</em>元<i class="wai-user">'+pay_tit+'</i></p></a></li>'+
                                     '<div class="order-centain">'+order_centain+'</div></ul>';
                    });
                    $('#item1mobile .mui-table-wrap').append(order_ul);
                   if($('#item1mobile .mui-table-view ').length == 0){   
                        HH_LZ.data.emptyOrder('#item1mobile');
                        HH_LZ.data.closeTouch('#item1mobile');
                        $('#item1mobile .mui-pull-bottom-tips').hide(); 
                      }else if($('#item1mobile .mui-table-view ').length<20){
                       $('#item1mobile .mui-pull-loading').text('已经全部加载完毕'); 
                     }    
                }else if(json.code == 0){
                  HH_LZ.data.emptyOrder('#item1mobile'); 
                  $('item1mobile .mui-pull-bottom-tips').hide();
                  mui.alert(json.msg, '信息提示', function() {
                      location.reload();
                    });
                }else if(json.conde == 10){
                   if(typeof LYRouterHandle != "undefined"){
                       LYUserHandle.checkLoginState(JSON.stringify({"removeCookie":true}),function(arg){
                            var arg = JSON.parse(arg);
                            if(arg.loginState){
                                LYRouterHandle.openUrl(JSON.stringify({'type':'push','url':lawyer_api+"lawyer-order-details.html",'params':{}}));
                            }else{

                            }
                        });
                     }
                }   
            });
        },
        'allOrder' :function(page2){
                HH_LZ.data.allOrder(page2,function(json){
                if(json.code ==1){ 
                 lz.device.LYUIHandle.hideHUD(); 
                 $('.mui-pull-bottom-tips').show();    
                    if(json.data&&json.data.length){
                       data_len2 = json.data.length;
                    }
                    $('#item2mobile .mui-loading').hide();
                    $('#item2mobile .no-order').hide();
                    $('#item2mobile .mui-pull-bottom-tips').show();
                    order_ul ='',order_centain='';
                    $(json.data).each(function(){
                          //订单状态
                           if(this.state == 10){
                               price =(this.amount&&this.amount||"");
                             state_val = '<span class="order-type wait-pay">未支付</span>';
                              pay_tit = '';
                            order_centain = '<span class="creat_time">'+this.createTime+'</span>'+
                                            '<div class="btn_all"><span href="javascript:;" class="mui-btn mui-btn-primary modify" data-id='+this.id+' data-price='+price+' data-title='+this.goodsName+' data-num='+this.orderNo+'>修改价格</span>'+
                                            '<span href="javascript:;" class="mui-btn mui-btn-primary contact_user" data-id='+this.userId+' data-name='+this.userName+' data-logo='+this.logo+'>联系客户</span></div>';
                          }else if(this.state == 11){;
                               price = (this.amount&&this.amount||"");
                            state_val = '<span class="order-type already-pay">已支付</span>';
                              pay_tit = '';
                              order_centain ='<span class="creat_time">'+this.createTime+'</span>'+
                                             '<div class="btn_all"><a href="javascript:;" class="mui-btn mui-btn-primary" data-num='+this.orderNo+'>交付订单</a></div>';
                          }else if(this.state == 12){
                               price =(this.amount&&this.amount||"");
                            state_val = '<span class="order-type already-pay"">已支付</span>';
                              pay_tit = '';
                            order_centain ='<span class="creat_time">'+this.createTime+'</span>';
                          }else if(this.state == 13){
                               price = (this.amount&&this.amount||"");
                            state_val = '<span class="order-type already-pay"">已支付</span>';
                              pay_tit = '';
                            order_centain ='<span class="creat_time">'+this.createTime+'</span>';
                          }else if(this.state == 14){
                               price = (this.amount&&this.amount||"");
                            state_val = '<span class="order-type wait-pay">交易成功</span>';
                              pay_tit = '';
                            order_centain ='<span class="creat_time">'+this.createTime+'</span>'+'<div class="btn_all"><span href="javascript:;" class="mui-btn mui-btn-primary del" data-num='+this.orderNo+'>删除订单</span></div>';
                          }else if(this.state == 15){
                             price = (this.priceStart&&this.priceStart||"");
                            state_val = '<span class="order-type wait-pay">支付失败</span>';
                              pay_tit = '';
                             order_centain ='<span class="creat_time">'+this.createTime+'</span>'+'<div class="btn_all"><span href="javascript:;" class="mui-btn mui-btn-primary del" data-num='+this.orderNo+'>删除订单</span><div>';
                          }else if(this.state == 20){
                               price = (this.amount&&this.amount||"");
                            state_val = '<span class="order-type wait-pay">已取消</span>';
                              pay_tit = '';
                             order_centain ='<span class="creat_time">'+this.createTime+'</span>'+'<div class="btn_all"><span href="javascript:;" class="mui-btn mui-btn-primary del" data-num='+this.orderNo+'>删除订单</span><div>';
                          }
                          //价格
                           if(this.state == 20&&this.priceConfirm ==1){
                               price = (this.amount&&this.amount||"");
                            }
                             if(!this.logo){
                              var logo ='../images/userImg.png';
                            }else{
                                    logo = this.logo;
                            }
                           order_ul +='<ul class="mui-table-view "><div class="order-tit">'+
                                     '<span class="order-date "><i class="tc"><img src="'+logo+'"></i>'+this.userName+'</span>'+state_val+'</div>'+
                                     '<li class="order-item"><a href="javascript:;"  data-num='+this.orderNo+'><span class="mui-icon mui-icon-arrowright"></span>'+
                                     '<em class="loading"><i class="mui-spinner"></i><img class="mui-media-object mui-pull-left" src="'+this.goodsImageUrl+'"></em>'+
                                     '<p><span>'+this.goodsName+'</span><em class='+this.id+'>￥'+price+'</em>元<i class="wai-user">'+pay_tit+'</i></p></a></li>'+
                                     '<div class="order-centain">'+order_centain+'</div></ul>';
                    });
                    $('#item2mobile .mui-table-wrap').append(order_ul);
                    if($('#item2mobile .mui-table-view ').length == 0){    
                        HH_LZ.data.emptyOrder('#item2mobile');
                        HH_LZ.data.closeTouch('#item2mobile'); 
                       $('#item2mobile .mui-pull-bottom-tips').hide(); 
                      }else if($('#item2mobile .mui-table-view ').length<20){
                       $('#item2mobile .mui-pull-loading').text('已经全部加载完毕');
                       
                     }
                }else if(json.code == 0){
                  HH_LZ.data.emptyOrder('#item2mobile'); 
                  $('item2mobile .mui-pull-bottom-tips').hide();
                  mui.alert(json.msg, '信息提示', function() {
                      location.reload();
                    });
                }else if(json.conde == 10){
                   if(typeof LYRouterHandle != "undefined"){
                       LYUserHandle.checkLoginState(JSON.stringify({"removeCookie":true}),function(arg){
                            var arg = JSON.parse(arg);
                            if(arg.loginState){
                                LYRouterHandle.openUrl(JSON.stringify({'type':'push','url':lawyer_api+"lawyer-order.html",'params':{}}));
                            }
                        });
                     }
                }
            });

        },
        'init' : function(){  
                  //数字验证
                  HH_LZ.validate.orderNum();
                  page1 = 1,page2 = 1;
                  HH_LZ.fillDate.pendOrder(page1);
                  HH_LZ.fillDate.allOrder(page2);
                  $('body').on('tap','.mui-table-first a',function(){
                           order_num = $(this).attr('data-num');
                           if(typeof LYRouterHandle != "undefined"){
                             LYRouterHandle.openUrl(JSON.stringify({'type':'push','url':lawyer_url+'lawyer-order-details.html','params':{'orderNo':order_num}}));
                           }else{
                              window.location.href=lawyer_url+'lawyer-order-details.html?orderNo='+order_num;
                           } 
                      });
                   $('body').on('tap','.mui-table-first .contact_user',function(){
                           var order_id = $(this).attr('data-id'),
                             order_name = $(this).attr('data-name'),
                             order_logo = $(this).attr('data-logo');
                           if(typeof LYRouterHandle != "undefined"){
                              LYRouterHandle.openNative(JSON.stringify({'type':'push','page':'LYLawyerPlatformLawyer://chatVC','params':{'userName':order_name,'userId':order_id,'logo':order_logo}}));
                           }
                      });
                  mui('.mui-slider').slider().setStopped(true); 
                   //修改订单
                     $('body').on('tap','.order-centain .modify',function() {
                       $('.mui-popup-title').css('background-image','none');
                       order_no = $(this).attr('data-num');
                       //判断是否为苹果
                       var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE')!= -1;
                       var btnArray = ['取 消', '确 认'],
                              _this = $(this),
                       modify_price = _this.attr('data-price'),
                          modefy_id = _this.attr('data-id'),
                         modify_txt = '<input type="number"  value="'+modify_price+'" name="order_price"/><p class="error"></p>',
                         modify_tit = _this.attr('data-title');
                      mui.confirm(modify_txt, modify_tit, btnArray, function(e) {
                        param = {
                                  "token":token,
                                  "amount": $('.mui-popup-text input').val(),
                                  "orderNo":order_no
                                };
                         if (e.index == 1) {
                              if($('.mui-popup-text input').val()>=0.01){ 
                                HH_LZ.data.modifyOrder(param,function(json){
                                    if(json.code == 1){
                                        var amount_val = Number($('.mui-popup-text input').val()).toFixed(2);
                                        $('.'+modefy_id).text('￥'+amount_val);
                                        _this.attr('data-price',amount_val);
                                        if(isIPHONE){
                                        $('.mui-popup-text input').blur();   
                                        }                                  
                                    }
                                });  
                             }else{
                                $('.mui-popup-text .error').html('订单金额不得低于0.01元').show();
                                return false;
                             }    
                        }else{
                          if(isIPHONE){
                          $('.mui-popup-text input').blur();
                         }
                        }
                      }); 
                     });
                   //删除订单
                    $('body').on('tap','.order-centain .del',function() {
                      var item = $(this).parents('.mui-table-view');
                      order_no = $(this).attr('data-num');
                      var btnArray = ['取 消', '确 认'],
                          del_tit ='<div class="mui-popup-title mui-popup-title1">确定要删除该订单吗?</div>';
                      mui.confirm('', del_tit, btnArray, function(e) {
                        if (e.index == 1) {
                           HH_LZ.data.delOrder(order_no,function(json){
                                if(json.code == 1){
                                   item.remove();
                                }
                            });
                        }
                      })
                    });             
        },
      'pull':function(){  
                var deceleration = mui.os.ios?0.0003:0.0006;
                  mui('.mui-scroll-wrapper').scroll({
                      bounce: true,
                      indicators: true,
                      deceleration:deceleration,
                    }); 
                (function(mui, doc, $) {
                   var ul,type,self;
                   var scroller = [];
                    mui.ready(function() {
                    mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
                        mui(pullRefreshEl).pullToRefresh({
                            down: {
                                auto: true,
                                callback: function() {
                                     self = this;
                                     $('.mui-slider-group').css('top',80);
                                     setTimeout(function() {
                                      ul = self.element.querySelector('.mui-table-wrap');
                                      type = ul.getAttribute('type');
                                      page1=1,page2=1;
                                      $('.mui-slider-group').css('top',40);
                                      $('.mui-pull-bottom-tips,.mui-pull-caption').hide();
                                        if(type == 1){
                                            $('#item1mobile .mui-table-wrap').empty().append(HH_LZ.fillDate.pendOrder(page1));  
                                            // mui('.mui-slider').slider().gotoItem(0);
                                            self.endPullDownToRefresh(); 
                                            self.refresh(true); 
                                                      
                                        }else if(type == 2){
                                            $('#item2mobile .mui-table-wrap').empty().append(HH_LZ.fillDate.allOrder(page2));  
                                            // mui('.mui-slider').slider().gotoItem(1);
                                            self.endPullDownToRefresh();
                                            self.refresh(true);
                                       
                                        }
                                    }, 1000);
                                }
                              },
                            up: {
                                callback: function() {
                                    self = this;
                                     if($('#item1mobile .mui-table-view').length<20){
                                        $('#item1mobile .mui-pull-bottom-tips span').html('已经全部加载完毕');
                                      }else if($('#item2mobile .mui-table-view').length<20){
                                        $('#item2mobile .mui-pull-bottom-tips span').html('已经全部加载完毕');
                                      } 
                                    setTimeout(function() {
                                        ul = self.element.querySelector('.mui-table-wrap');
                                        type = ul.getAttribute('type');
                                        if(type == 1){
                                          page1++;
                                          if(HH_LZ.fillDate.pendOrder(page1)){
                                            ul.append(HH_LZ.fillDate.pendOrder(page1)); 
                                          }
                                          self.endPullUpToRefresh(data_len1<20);                                  
                                        }
                                        if(type == 2){
                                          page2++;
                                          if(HH_LZ.fillDate.allOrder(page2)){
                                             ul.append(HH_LZ.fillDate.allOrder(page2));
                                          }
                                          self.endPullUpToRefresh(data_len2<20);
                                        }
                                      
                                    }, 1000);
                                }
                            }
                        });
                      
                    });
             
                });
                })(mui, document, jQuery);
        }
       
      }
        return LZ;    
})(window.HH_LZ || {}, jQuery);
var state = state||0;
if(typeof LYRouterHandle != "undefined"){
      LYUIHandle.title(JSON.stringify({"title":"我的订单"}));
      LYUserHandle.getToken(function (obj){
        token= JSON.parse(obj).token;
        HH_LZ.fillDate.init();
        HH_LZ.fillDate.pull();
      });
      LYRouterHandle.getParams(function(obj){
      if(obj){
          var _state = JSON.parse(obj).state;
          if(!!_state){ 
            state=_state;
          } 
        }
        
      });
    
}else{
    token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZWFsTmFtZSI6Iuavm-elpeWTpSIsInBob25lIjoiMTM3OTg0NTI0MzUiLCJzZXgiOiJOaWwiLCJ3YXNMb2dpbiI6dHJ1ZSwibG9nbyI6Imh0dHA6Ly8xOTIuMTY4LjEwLjIxNzoxMDgwL3VwbG9hZC91c2VyLzE5MjYvOGU0MWEwZTRmYWQxNDVhNWJhNmU5MjA3YTM0NWJlOWVfbGl0ZS5wbmciLCJpZCI6MTkyNiwidXNlck5hbWUiOiIxMzc5ODQ1MjQzNSIsInR5cGUiOiJMYXd5ZXIiLCJleHAiOjE1MDY4NDQ2MjE1MzJ9.1HbkYM0Hi9x4igANPEhqRV_yPZarpsQZdOArIJzwbYI";
    HH_LZ.fillDate.init();
    HH_LZ.fillDate.pull();
}