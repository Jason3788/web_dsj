$(function () {
    //点击去注册账号的链接
    $("#link-reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });

    $("#link-login").on("click", function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })


    //自定义表单规则
    var form = layui.form
    var layer = layui.layer
    //通过 form.verify() 函数自定义效验规则
    form.verify({
        //自定义一个叫 pwd 效验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //效验两次密码是否一样
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd != value) {
                return "两次密码不一致"
            }
        }
    })

    //监听注册表单的提交事件
    $("#form-reg").on("submit", function (e) {
        e.preventDefault();
        var data = { username: $("#form-reg [name=username").val(), password: $("#form-reg [name=username").val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) return layer.msg(res.message, { icon: 2 });
            layer.msg("注册成功请登入", { icon: 1 });
            $("#link-login").click();
        })
    })

   //登入提交事件
   $("#form-login").on("submit", function(e){
       e.preventDefault();
       var data = $(this).serialize()//快速获取表单内数据
       $.ajax({
           type: "post",
           url: "/api/login",
           data: data,
           dataType: "json",
           success: function (res) {
            if (res.status !== 0) return layer.msg(res.message, { icon: 2 });
            layer.msg(res.message, { icon: 1 });
            //登入成功后将token 存入 localStorage
            localStorage.setItem('token',res.token);
            location.href = '/index.html'
            }
       });
     
   })

})