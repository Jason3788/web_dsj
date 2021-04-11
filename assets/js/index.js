$(function () {
    getUserInfo()
    var layer = layui.layer
    $("#loginOut").on("click", function () {
        layer.confirm('确定退出登入？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })


})


function getUserInfo() {

    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg("获取用户信息失败")
            renderAvatar(res.data)
        }
    });

    //渲染用户头像
    function renderAvatar(user) {
        var name = user.nickname || user.username
        //渲染昵称
        $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
        //渲染图片头像
        if (user.user_pic !== null) {
            $(".layui-nav-img").attr('src', user.user_pic).show();
            $(".text-avatar").hide();
        } else {
            $(".layui-nav-img").hide();
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
        }

    }


}