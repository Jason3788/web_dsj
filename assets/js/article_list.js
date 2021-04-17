$(function () {
    var laypage = layui.laypage;
    var layer = layui.layer
    var form = layui.form

    //定义事件过滤器
    template.defaults.imports.dataFormat = function (data) {

        const dt = new Date(data)

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss

    }
    //定义补零函数
    function padZero(n) {
        return n > 9 ? n : "0" + n
    }

    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    }
    getArticle();
    getFl();
    function getFl() {
        $.get("/my/article/cates", res => {
            if (res.status !== 0) return layer.msg(res.message);
            var htmlStr = template('tpl-fl', res)
            $("#article_fl").html(htmlStr)
            form.render();
        })
    }


    //获取文章列表
    function getArticle() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var htmlSrc = template("article_list", res);
                $(".layui-table tbody").html(htmlSrc)
                readFy(res.total)
            }
        });

    }



    $("#form-search").on("submit", function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_name]').val();
        var states = $('#article_zt select').val();
        q.cate_id = cate_id
        q.state = states;
        getArticle();
    })



    //定义分类

    function readFy(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                if (!first) {
                    getArticle();
                }
            }
        });

    }


    //删除文章
    $("tbody").on('click','.btn_delete',function(){
        var len = $(".btn_delete").length
        var id = $(this).attr("data-id");
        layer.confirm('确认删除', function(index){
            //do something
            
            $.ajax({
                type: "GET",
                url: "/my/article/delete/"+ id,
                success: function (res) {
                   if (res.status !== 0) return layer.msg(res.message);
                   layer.msg(res.message);
                   if(len === 1){
                    q.pagenum = q.pagenum === 1 ? 1 : q.pagenum -1;
                   }
                   getArticle();
                }
            });
            layer.close(index);
          });       

   
    })

    $('body').on('click', '.btn_edit', function() {
        location.href = '/article/art_edit.html?id=' + $(this).attr('data-id')
      })
})