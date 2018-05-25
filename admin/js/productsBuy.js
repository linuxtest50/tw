layui.use(['layer', 'form','table'], function(){
    var table = layui.table,layer = layui.layer, form = layui.form, $ = layui.$
    // 可直接使用$
    console.log($)
    // 动态渲染表格
    table.render({
        elem: '#webShieldBuy'
        ,id:'qqq'
        ,url:'/demo/table/user/' // 数据接口
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
            {field:'id', title: 'ID', sort: true}
            ,{field:'username', title: '用户名'} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'sex', title: '性别', sort: true}
            ,{field:'city', title: '城市'}
            ,{field:'sign', title: '签名'}
            ,{field:'classify', title: '职业', align: 'center'} //单元格内容水平居中
            ,{field:'experience', title: '积分', sort: true, align: 'right'} //单元格内容水平居中
            ,{field:'score', title: '评分', sort: true, align: 'right'}
            ,{field:'wealth', title: '财富', sort: true, align: 'right'}
        ]]
    });
    // 产品购买
    var $web_popup = $('.web_popup'), $game_popup = $('.game_popup'), $flow_popup = $('.flow_popup');
    $('.buy_web').click(function () {
        tTools.productsBuy($web_popup)
    })
    $('.buy_game').click(function () {
        tTools.productsBuy($game_popup)
    })
    $('.buy_flow').click(function () {
        tTools.productsBuy($flow_popup)
    })

});