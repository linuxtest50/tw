layui.use(['layer', 'form','table'], function() {
    var table = layui.table, layer = layui.layer, form = layui.form, $ = layui.$
    // 可直接使用$
    console.log($)
    $(".pay").click(function () {
        layer.open({
            type: 1
            ,title: ['电子支付平台','text-align:center;font-size:18px;padding:0;height:60px;line-height:60px']
            ,closeBtn: 1 // 关闭按钮样式 0为不显示
            ,area: '400px'
            ,shade: 0.5 // 遮罩
            ,id: 'payPopup' //设定一个id，防止重复弹出
            ,skin: 'pay_popup_page'
            ,anim: 0 // 动画
            ,resize: false //禁止缩放
            ,scrollbar: false // 禁止浏览器滚动
            ,btn: ['确定','再想想']
            ,btnAlign: 'c'// 对齐方式
            ,moveType: 1 // 拖拽模式，0或者1
            ,maxmin: false  // 最大小化
            ,content: $('.pay_popup')
            ,success: function(layero){ // 层弹出后的回调

            },
            yes: function(index, layero){


            },
            btn2: function () {
                // alert('哼')
            }
        });
    })
})