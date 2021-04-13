$(function(){
  var form = layui.form
  var layer = layui.layer
  initEditor()
 
  // 初始化图片裁剪器
  var $image = $('#image')
  // 裁剪选项
  var cropperOption = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  // 初始化裁剪区域
  $image.cropper(cropperOption)

    $.get("/my/article/cates", res =>{
        if (res.status !== 0) return layer.msg(res.message);
        var htmlStr = template('tpl-user', res)
        $(".city_se").html(htmlStr)
        form.render();
    })

$("#btnChooseCoverImage").on("click",function(e){
    e.preventDefault()
    $("#fileCover").click();
})

$("#fileCover").on("change" ,function(e){
    var files = e.target.files
    if(files.length == 0) return layer.msg("请选择照片")
    
    var tempURL = URL.createObjectURL(files[0])
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', tempURL)  // 重新设置图片路径
   .cropper(cropperOption)        // 重新初始化裁剪区域
})

var art_state = "已发布" //状态

$("#btnSave").on("click",function(){
    art_state = "草稿"
})

$("#form-pub").on("submit",function(e){
    e.preventDefault();
  
    var fd = new FormData($(this)[0]);
    
    
    $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      }).toBlob(function(blob){
        fd.append("state", art_state);
        fd.append("cover_img", blob)
        $.ajax({
            type:'POST',
            url:'/my/article/add',
            processData:false,
            contentType:false,
            data:fd,
            success:function(res) {
                console.log(res)
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
            }
        });
      })       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
     
     
})



  




})