function pageInit(){
    if(lz.util.appJs()){
        LYUIHandle.title(JSON.stringify({"title":"订单详情"}));
        lz.device.LYUIHandle.hideHUD();
    }
};
lz.util.run(pageInit);