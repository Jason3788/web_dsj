$(function(){
  
    //获取文章列表
   $.ajax({
       type: "GET",
       url: "/my/article/list",
       data: "data",
       dataType: "dataType",
       success: function (response) {
           
       }
   });




        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
            count: 50, //数据总数，从服务端得到
            limit: 10,
            limits: [10, 20, 30, 40, 50]
        });
  
})