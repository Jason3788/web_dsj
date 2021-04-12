$(function(){
  var form = layui.form
  var layer = layui.layer
  form.verify({
    //自定义一个叫 pwd 效验规则
    pwd: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    //效验两次密码是否一样
    repwd: function (value) {
        var pwd = $(".layui-form [name=newPwd]").val();
        if (pwd != value) {
            return "两次密码不一致"
        }
    },
    xjpwd: function (value) {
        var pwd = $(".layui-form [name=oldPwd]").val();
        if (pwd == value) {
            return "新旧密码不能相同"
        }
    },
})

  $("#btnReset").on("click",function(e){
    e.preventDefault();
    $("input").val("");
  })

 $(".layui-form").on("submit",function(e){
    e.preventDefault();
    var datas = {oldPwd:$(".layui-form [name=oldPwd]").val(),newPwd:$(".layui-form [name=newPwd]").val()} 
    $.ajax({
        type: "POST",
        url: "/my/updatepwd",
        data: datas,
        success: function (res) {
            if(status !== 0) return layer.msg(res.message)
            layer.msg(res.message)
            $("input").val("");
            window.parent.localStorage.removeItem('token')
            window.parent.location.reload(true)
        }
    });

 })

     





})