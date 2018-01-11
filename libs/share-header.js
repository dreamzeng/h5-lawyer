Vue.component("share-header",{
	props:{
	   
	},
	methods:{
		closed:function(){
			this.$refs.header.setAttribute("style","display: none;");
		},
		isApp:function(){
			if(navigator.userAgent.match(/android/i)) {
				var ifr = document.createElement('iframe');
				//律师端的链接
				window.location.href= 'fyscheme://fyapp/open/article?page=hybridPush&articleId=e6d1e280bafc4c8a9a23893dca9985d7&url=http%3a%2f%2f192.168.10.224%2fstatic%2fh5user%2fv2.4.0%2ftemplates%2farticle-detail.html';//打开app的协议，有app同事提供
		         ifr.style.display = 'none';
		         document.querySelector("header").appendChild(ifr);
		         var timer=setTimeout(function(){
		            // document.querySelector("header").removeChild(ifr);
		 　　　　　　　window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hhly.lawyeru";
		         },5000);
		         $(document).on('visibilitychange webkitvisibilitychange', function() {
				    var tag = document.hidden || document.webkitHidden;
				    if (tag) {
				        clearTimeout(timer);
				    }
				});
				$(window).on('pagehide', function() {
				    clearTimeout(timer);
				});
			}
		}
	},
	mounted:function(){
		var url=(location.href.split("?")[0]),newUrl;
		if(url.match("article-detail-share.html")){
			newUrl=encodeURI(url.replace(/article-detail-share.html/g,"article-detail.html"));
		}else{
			newUrl=encodeURI(url.replace(/case-study-share.html/g,"case-study.html"));
		}
		var uuid=encodeURI(lz.util.getQueryString("uuid"));
		new lz.util.link({
            button: document.querySelector("#bu"),// 按钮
            androidLink: 'fyscheme://fyapp/open/article?page=hybridPush&articleId='+uuid+'&url='+newUrl,// 安卓的打开链接
            androidDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.hhly.lawyeru",// 安卓的下载链接
            androidYyb: false,// android 是否开启应用宝下载
         	iosLink: 'http://uat_ioslawyer.fy13322.com/h5lawyer/share/openApp.html?page=hybridPush&uuid='+uuid+'&url='+newUrl,// ios 打开链接
            ios9Link: 'http://uat_ioslawyer.fy13322.com/h5lawyer/share/openApp.html?page=hybridPush&uuid='+uuid+'&url='+newUrl,// ios 的Universal Link
            iosDownloadUrl: "https://itunes.apple.com/cn/app/id1144040243?mt=8", // ios 的下载链接
            iosUniversalLinkEnabled: true, // 是否开启 Universal Link
            iosYyb: true,// ios 是否开启应用宝下载
            yybDownloadUrl: "https://itunes.apple.com/cn/app/id1144040243?mt=8",// 应用宝下载链接
            autoLaunchApp: false, // 是否打开页面就唤起APP
            autoRedirectToDownloadUrl: true,// 是否自动跳转到下载页面
       });
	},
	template:
	'<div ref="header">'+
	'		<header >'+
	'			<div class="header-l">'+
	'				<img src="../images/closed.png" class="closed" @click="closed($event)"/>'+
	'				<div class="logo"></div>'+
	'				<p>法义APP</p>'+
	'			</div>				'+
	'			<a class="open" id="bu">打开</a>'+
	'		</header>'+
	'		<footer></footer>'+
	'	</div>'
})
