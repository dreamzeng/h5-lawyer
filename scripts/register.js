function pageInit(){
  if(lz.util.appJs()){
    LYUIHandle.title(JSON.stringify({"title":"用户协议"}));
    lz.device.LYUIHandle.hideHUD();
  }
};
lz.util.run(pageInit);
