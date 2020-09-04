$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6 个字之间!'
            }
        }
    })
    //调用函数
    initUserInfo() 

    //获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败! ')
                }
                console.log(res);

                //调用 form.vai() 快速为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置表单的数据
    $('#btnReset').on('click',function(e){
        //阻止表单的默认重置行为
        e.preventDefault()
        //获取用户最新的数据,重新渲染到页面
        initUserInfo() 
    })

    //监听表单的提交事件
    $('.layui-form').submit(function(e){
        //阻止表单的默认行为
        e.preventDefault()
        //发起ajax 数据请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('更新用户信息失败! ')
                }
                layer.msg('更新用户信息成功! ')
                //调用父页面中的方法, 重新渲染用户的头像和用户信息
                window.parent.getUserInfo()
            }
        })
    })
})