$(function () {
    'use strict';

    // 判断是否登录
    var info = is_login();

    if (info !== 0) {
        // 已登录
        var info_arr = info.split("|");
        var name = info_arr[0],
            id = info_arr[1],
            $header = $('#header');

        // 渲染一个header
        $header.append("<indexheader></indexheader>");
        new Vue({
            el: '#header',
        });
        // 隐藏未登录的样式，显示已登录的样式
        var nav_no_login = $('#nav-right-nologin'),
            nav_login = $('#nav-right-login'),
            li_info = $('#info'),
            // 没有找到其他设置这个颜色的方法，均会被覆盖掉，原因不明，只能行内写style
            a_name = '<a href="#" style="color: #fff">' + name + '</a>';
        nav_no_login.hide();
        li_info.append(a_name);
        nav_login.removeClass("hide");
    } else {
        var $header = $('#header');
        // 渲染一个header
        $header.append("<indexheader></indexheader>");
        new Vue({
            el: '#header',
        });
    }

    // 设置.active
    $('.navbar #goto-index').addClass('active');

    function is_login() {
        var info;

        $.ajax({
            type: "GET",
            url: "php/is_login.php",
            // 这里一定要加下面这一句，不然无返回值，又因为是初始化页面的函数，所以同步也不是很影响用户体验
            async : false,
            success: function (response) {
                response = JSON.parse(response);
                if (response.logged === true) {
                    info = response.info;
                } else {
                    info = 0;
                }
            }
        });
        
        return info;
    }
    
})