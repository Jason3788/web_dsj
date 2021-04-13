$(function () { 
   var layer = layui.layer
   upData()
   function upData(){
 $.ajax({
     type: "GET",
     url: "/my/article/cates",
     success: function (res) {
         if (res.status !== 0) return layer.msg(res.message);
         var htmlStr = template('tpl-user', res)
         $(".layui-table").html(htmlStr)
     }
 });
   }
  
var addIndex = null
 $("#btnAddCate").on("click", function(){
     addIndex = layer.open({
         type: 1,
         title: '添加文章分类',
         content: $('#boxAddCate').html(),
         area: ['500px', '250px']
     });
 })

 $('body').on('submit', '#boxAddCate', function(e) {
     e.preventDefault();
     $.ajax({
         type: "POST",
         url: "/my/article/addcates",
         data: $(this).serialize(),
         success: function (res) {
             if (res.status !== 0) return layer.msg(res.message);
             layer.msg(res.message);
             upData();
             layer.close(addIndex)
         }
     });
 })
   





 function deletList(data) {
      var noDel = [];
    for (var i = 0; i < data.length; i++) {
     if (data[i].is_delete == 0){
        noDel.push(data[i])
     }
    }
     return noDel
   }


    
 })