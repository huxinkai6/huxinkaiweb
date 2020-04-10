layui.use(['element'], function(){
	$ = layui.jquery;
  	element = layui.element; 
  
  //导航的hover效果、二级菜单等功能，需要依赖element模块
  // larry-side-menu向左折叠
  	if($(window).width()<750){
		trun = 0;
	}else{
		trun = 1;
	}
	
$('.larry-side-menu').click(function() {
  if(trun){
			$('.x-side').animate({left: '0px'},200).siblings('.x-main').animate({left: '200px'},200);
			trun=0;
		}else{
			$('.x-side').animate({left: '-200px'},200).siblings('.x-main').animate({left: '0px'},200);
			trun=1;
		}

});

  	//监听导航点击
    element.on('nav(side)', function (elem) {
        title = elem.find('cite').text();
        if (title == "") return;
        url = elem.attr('_href');
		if(url== undefined || url==null || url=="")return;

        for (var i = 0; i < $('.x-iframe').length; i++) {
            if ($('.x-iframe').eq(i).attr('src') == url) {
                element.tabChange('x-tab', url);
                return;
            }
        };

        res = element.tabAdd('x-tab', {
            title: title//用于演示
            , content: '<iframe frameborder="0" src="' + url + '" class="x-iframe"></iframe>',
            id: url
        });
        element.tabChange('x-tab', url);

        $('.layui-tab-title li').eq(0).find('i').remove();
    });
getMenu();
    function getMenu(){
    	$.post(globalDate.server+"GetSysRightsJsonLayUI",{
    		 "roleNames":globalDate.getCurRoleNames(),
    		 "token":globalDate.myToken
    	},function(data1){
    		 $("#nav_ul").html("");
    		 $.each(data1, function(n,value) {
    		 	var s="<li class='layui-nav-item'><a class='javascript:;' href='javascript:;'><i class='layui-icon' style='top:3px;'>&#xe614;</i><cite>"+value.title+"</cite></a>";
    		 	 s+="<dl class='layui-nav-child'>";
    		 	 for(var i=0;i<value.children.length;i++){
    		 	 	var cr=value.children[i];
    		 	 	s+="<dd class='a'><dd class=''><a href='javascript:;'_href='"+cr.href+"'><cite>"+cr.title+"</cite></a></dd></dd>";
    		 	 }
    		 	 s+="</dl></li>";
    		 	 $("#nav_ul").append($(s));
    		 });
    		 element.render("nav","side");
    	},"json");
    }
});


