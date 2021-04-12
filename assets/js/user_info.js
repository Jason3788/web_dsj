$(function (){
    var form = layui.form
 var layer = layui.layer
    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    initUserInfo();
//获取用户信息
    function initUserInfo(){
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if(res.status !== 0) return layer.msg("获取用户信息失败")
                form.val("formUserInfo",res.data);
                // $(".layui-form [name=username]").val(res.data.username)
                // $(".layui-form [name=nickname]").val(res.data.nickname)
                // $(".layui-form [name=email]").val(res.data.email)
               
            }
        });
    }


//重置表单数据
    $("#btnReset").on("click",function(e){
       e.preventDefault();
       initUserInfo();
    })

      $(".layui-form").on("submit",function(e){
        e.preventDefault();
       $.ajax({
             type: "POST",
             url: "/my/userinfo",
             data: $(this).serialize(),
             success: function (res) {
                if(res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);

                //子页面调父页面方法
                window.parent.getUserInfo();
             }
         });

      })


 


})