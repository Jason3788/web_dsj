$.ajaxPrefilter(function (options){
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    //统一未有权限的设置headers
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        },
        options.complete = function(res){ //不论成功失败都会调用complete 回调函数
            console.log(res.responseJSON)
            if(res.responseJSON.status == 1 && res.responseJSON.message === "身份认证失败！" || res.responseJSON.status == 0 && res.responseJSON.message === "更新密码成功！"){
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
            }
    }
   
   }) //ajax 配置对象