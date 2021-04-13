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
   
 var layerEditId = null
 $("body").on("click",".btnEdit", function(){
    var id = $(this).attr("data-id");
   $.get("/my/article/cates/" + id ,res =>{
    if (res.status !== 0) return layer.msg(res.message);
       layerEditId = layer.open({
        type: 1,
        title: '修改文章分类',
        content: $('#boxEditCate').html(),
        area: ['500px', '250px'],
        success: function(){
            var form = layui.form
          form.val('editDialog', res.data)
        }
    });
   
   })
    
  
})


$('body').on('submit', '#boxEditCate', function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/article/updatecate",
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message);
            upData();
            layer.close(layerEditId)
        }
    });
})




$("body").on("click",".btnDelete",function(){
    var id = $(this).attr("data-id");
    $.get("/my/article/deletecate/" + id , res =>{
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        upData();
    })
    





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