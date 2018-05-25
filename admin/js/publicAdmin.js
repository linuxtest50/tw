/**
 * 初始化layui内置模块
 */
(function (w) {
    w.tTools = {}
    layui.use(['layer', 'form'], function(){
        var $ = layui.$, layer = layui.layer, form = layui.form;
        $('.layui-header').load('../public-admin-page/public_header.html', function () {
            $('.layui-side').load('../public-admin-page/public_side.html', function () {
                layui.use('element')
                /**
                 * side-bg
                 */
                function setBgColor() {
                    var reg = /\.html/ig, str = window.location.href.split('/');
                    for (var num in str){
                        // console.log(str[num].search(reg))
                        // console.log(reg.test(str[num]))
                        var strFlag = reg.test(str[num])
                        if(strFlag){
                            var result = str[num].split('.')[0]
                        }
                    }
                    $('.layui-nav-tree .' + result).css('backgroundColor','#135fdf')
                    // $('.' + result).addClass('layui-anim layui-anim-fadein')
                }
                setBgColor()

                /**
                 * 切换侧边栏
                 */
                var flag = true
                function toggleSide() {
                    if(flag){
                        flag = false
                        $('.layui-layout-left a').removeClass('layui-icon-shrink-right').addClass('layui-icon-spread-left')
                        $('.layui-side,.layui-side-scroll').css('overflow-x','visible')
                        $('.layui-side,.layui-logo,.layui-side-scroll').animate({
                            width: 60
                        },100)
                        $('.layui-body,.layui-layout-left').animate({
                            left: 60
                        },100)
                        // $('.layui-nav-tree>li').removeClass('layui-nav-itemed')
                        // $('.layui-nav-tree>li>dl').hide()
                        $('.layui-nav-tree').hide()
                        //,.hide_side>li>dl
                        $('.hide_side').show()

                    }else{
                        flag = true
                        $('.layui-layout-left a').removeClass('layui-icon-spread-left').addClass('layui-icon-shrink-right')
                        $('.layui-side,.layui-side-scroll').css('overflow-x','hidden')
                        $('.layui-side,.layui-logo,.layui-side-scroll').animate({
                            width: 200
                        },100)
                        $('.layui-body,.layui-layout-left').animate({
                            left: 200
                        },100)
                        $('.layui-nav-tree').show()
                        $('.hide_side').hide()

                    }
                }
                $('.layui-layout-left>li').click(function () {
                    toggleSide()
                })

                /**
                 * 鼠标hover显示隐藏小item
                 */
                $('.hide_side>li').mouseover(function () {
                    $(this).find('dl').show().addClass('layui-anim-scaleSpring')
                }).mouseout(function () {
                    $(this).find('dl').hide().removeClass('layui-anim-scaleSpring')
                })

                /**
                 * 点击每一项展开大item
                 */
                $('.t_item>dd').click(function () {
                    var itemAttr = $(this).parents('li').attr('t-data')
                    layui.sessionData('t_data', {
                        key: 't_key',
                        value: itemAttr
                    });
                })
                var localData = layui.sessionData('t_data').t_key;
                $('.' + localData).addClass('layui-nav-itemed')

                /**
                 * 侧边栏收缩时点击展开大item
                 */
                $('.hide_side>li').click(function () {
                    toggleSide()
                    $('.layui-nav-tree>li').removeClass('layui-nav-itemed')
                    $('.layui-nav-tree>li:nth-child(' + ($(this).index()+1) +')').addClass('layui-nav-itemed')
                })

                $('.layui-nav-tree>li').click(function () {
                    // $(this).find('dl').show().animate({
                    //     'display': 'block',
                    //     'opacity': 1
                    //
                    // },100)
                    // if($(this).hasClass('layui-nav-itemed')){
                    //     $(this).find('dl').removeClass('layui-anim-up')
                    // }else{
                    //     $(this).find('dl').addClass('layui-anim-up')
                    // }

                    // alert(1)
                })

                /**
                 * 弹出层
                 */
                tTools.productsBuy = function (ele) {
                    layer.open({
                        type: 1
                        ,title: '确认产品参数' // 标题栏
                        ,closeBtn: 1 // 关闭按钮样式 0为不显示
                        ,area: '600px'
                        ,shade: 0.5 // 遮罩
                        ,id: 'productsPopup' //设定一个id，防止重复弹出
                        ,anim: 0 // 动画
                        ,resize: false //禁止缩放
                        ,scrollbar: false // 禁止浏览器滚动
                        ,btn: ['去支付','哼，不去']
                        ,btnAlign: 'c'// 对齐方式
                        ,moveType: 1 // 拖拽模式，0或者1
                        ,maxmin: false  // 最大小化
                        ,content: ele
                        ,success: function(layero){ // 层弹出后的回调
                            // var btn = layero.find('.layui-layer-btn');
                            // btn.find('.layui-layer-btn0').attr({
                            //     href: '../order-management/MyOrder.html'
                            //     ,target: '_self'
                            // });
                        },
                        yes: function(index, layero){
                            var gameInput = $('.popup_input').prop('checked')
                            console.log(gameInput)
                            if(gameInput){
                                window.open ('../order-management/my_order.html','_self')
                                layui.sessionData('t_data', {
                                    key: 't_key',
                                    value: 't_order'
                                });
                                layer.close(index); //如果设定了yes回调，需进行手工关闭
                            }else{
                                // layer.tips('不去,请先勾选协议', '.layui-layer-btn0', {
                                //     tips: [1, '#25252a']
                                // });
                                $('.tips_p').css('display','inline-block')
                            }

                        },
                        btn2: function () {
                            // alert('哼')
                        }
                    });
                }

                /**
                 *  协议
                 */
                $('.t_agreement').load('../public-admin-page/agreement.html')
                $('.agreement').click(function(){
                    layer.open({
                        type: 1
                        ,title: '产品服务协议' //标题栏
                        ,closeBtn: 1
                        ,area: '1000px'
                        ,shade: 0
                        ,id: 'arg' //设定一个id，防止重复弹出
                        ,btn: ['同意协议']
                        ,btnAlign: 'c'
                        ,moveType: 1 //拖拽模式，0或者1
                        ,content: $('.agr_content')
                        ,yes: function(index,layero){
                            $(".popup_input").prop('checked', true)
                            form.render();
                            $('.tips_p').css('display','none')
                            layer.close(index)
                        }
                    });
                })


                //页面一打开就执行弹层
                // layer.ready(function(){
                    // layer.msg('很高兴一开场就见到你');
                // });

                // 加载层
                // var index = layer.load(2, {
                // shade: [0.1,'#fff'], //0.1透明度的白色背景
                // time: 2000
                // });
                /**
                 * 全选
                 */
                form.on('checkbox(use_scope)', function(data){
                    if(data.elem.checked){
                        $('.t_use_list').prop('checked', true)
                        form.render('checkbox', 'scope_filter');
                        console.log($('.t_use_list').prop('checked'))
                    }else{
                        $('.t_use_list').prop('checked', false)
                        form.render('checkbox', 'scope_filter');
                        console.log($('.t_use_list').prop('checked'))
                    }
                });
                /**
                 * 其中一项不选则取消全选，否则全选
                 */
                form.on('checkbox(list_scope)', function(data){
                    if(data.elem.checked){
                        $('.t_use_all').prop('checked', true)
                        $('.t_use_list').each(function () {
                            if(!$(this).prop('checked')){
                                $('.t_use_all').prop('checked', false)
                            }
                        })
                        form.render('checkbox', 'scope_filter')
                    }else{
                        $('.t_use_all').prop('checked', false)
                        form.render('checkbox', 'scope_filter')
                    }
                });
            })
        })
    });

    return tTools
}(window))

// 定义模块
// layui.define(function(exports){
//     //do something
//
//     exports('demo', function(){
//         alert('Hello World!');
//     });
// });
// layui.demo()

