;(function(win, doc, lib){
	var $=lib.aa.$,$$=lib.aa.$$;
	//$:返回文档中匹配指定 CSS 选择器的一个元素.
	//$$:返回所有匹配的元素(NodeList对象)
	//querySelector() 与 querySelectorAll() 的区别 
	var conf = win.pageData; //获取mock模拟数据
	function Mod() {
        this.init(conf);
    }
	Mod.prototype = {
		init:function(conf){
			var self = this;
			self.bindEvent(); 
            self.door();  
            // lib.mtop.request({
            //     api: 'mtop.taobao.aplatform.get',
            //     v: '1.0',
            //     data: {
            //         'bizType': "isSeller"
            //     }, // api对应的参数
            //     isSec: 0, // 需要安全为1
            //     ecode: 0  // 需要登录为1
            // }, function (resp, retType) {
            //     console.log(resp)
            //     self.door();
            //     //成功回调返回数据
            // }, function (resp, retType) {
            //     console.log(resp);
            //     //失败回调返回数据
            // });
		},
        door:function(){
            //门神动画
            var self = this;
            $(".open_box").addEventListener("webkitAnimationEnd", function(){ 
                //开场动画结束时事件
                $(".open_box").classList.add("open1");
                $(".cut_btn").style.display="block";
                $(".x_btn").style.display="block";
            }, false);

            $(".cut_btn").addEventListener("click",function(){ 
                var params = {
                    // 是否将截屏结果保存一份到相册中
                    inAlbum: 'true'
                };
                window.WindVane.call('WVScreen', 'capture', params, function(e) {
                    alert('success: ' + JSON.stringify(e));
                }, function(e) {
                    alert('failure: ' + JSON.stringify(e));
                });
            })

            $(".x_btn").addEventListener("click",function(){ 
                $(".open_box").style.display="none";
                $(".cut_btn").style.display="none";
                $(".x_btn").style.display="none";
                $(".disappear").style.display="block";
            })

            $(".disappear").addEventListener("webkitAnimationEnd", function(){ 
                 //消失动画结束时事件
                $(".mask").style.display="none";
            }, false);
        },
		//加载数据
		loadData:function(){
			var self = this;
	        self.lazyload();
		},
		lazyload:function(){
			var self = this;
			//参考文档http://gitlab.alibaba-inc.com/mtb/lib-img 调用方法self.lazyload();
			var imgHelper = lib.img({
				'class':'J_LazyLoad',//图片class
				'dataSrc':'data-src',//图片真实src 的data字段
				'size': '640x640',//cdn尺寸
				'sharpen': 's150',//锐化参数
				'q': ['q90', 'q70'],//图片质量[非弱网，弱网]
				'enableLazyload':true, //是否开启懒加载功能，默认true,
				'enalbeIOSWifiLoadMore':false, //ios&&wifi情况下 是否取消懒加载,采用一次性加载，默认false,
				'diffGif': false,//是否需要对gif图进行处理
				'cancelEXIF': false,//是否取消图片exif对旋转的处理，取消则后缀加g，若不取消，部分高图会被浏览器自动翻转90度
				'filterDomains':[],//自定义过滤的域名命令，适用于不能收敛的域名url
				'container': window // 选填，自定义懒加载窗口，支持dom对象和css3选择器
			});
		},
		//事件绑定
		bindEvent:function(){
			var self = this;
			
		}
	};
	// start
    doc.addEventListener('DOMContentLoaded', function(e) {
        new Mod(); //初始化
    }, false);
}(window, window.document, window.lib || (window.lib = {})))