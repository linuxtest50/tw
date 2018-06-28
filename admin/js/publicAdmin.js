/**
 * 初始化layui内置模块
 */
(function (w) {
    console.time('time')
    w.tTools = {}
    layui.use(['layer', 'form', 'laypage'], function(){
        var $ = layui.$, layer = layui.layer, form = layui.form, laypage = layui.laypage, that = this
        $('.layui-header').load('../public-admin-page/public_header.html', function () {
            $('.layui-side').load('../public-admin-page/public_side.html', function () {
                layui.use('element')
                laypage.render({
                    elem: 'paging'
                    ,count: $('.t_use_list').length //数据总数
                });
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
                    $('.layui-nav-tree .' + result).css('backgroundColor','#0793ee')
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
                        $('.layui-side,.layui-side-scroll').css('overflow-x','visible')
                        var headerRH = $('.layui-header').width() - 60 + 'px'
                        $('.layui-side,.layui-logo,.layui-side-scroll').animate({ width: 60 },100)
                        $('.layui-body').animate({ left: 60 },100)
                        $('.header_right').animate({ width: headerRH },100)

                        $('.layui-logo img').attr('src', '../../img/logo6.png').width(36)
                        $('.layui-logo').css('background', '#010125')
                        $('.layui-layout-left a').removeClass('layui-icon-shrink-right').addClass('layui-icon-spread-left')

                        $('.layui-nav-tree').hide()
                        $('.hide_side').show().css('paddingTop', '11px')

                    }else{
                        flag = true
                        $('.layui-side,.layui-side-scroll').css('overflow-x','hidden')
                        $('.header_right').animate({ width: '88%' },100)
                        $('.layui-side,.layui-logo').animate({ width: '12%' },100)
                        $('.layui-side-scroll').width('100%')
                        $('.layui-body').animate({ left: '12%' },100)

                        $('.layui-logo img').attr('src', '../../img/logo7.png').width(110)
                        $('.layui-logo').css('background', '#fff')

                        $('.layui-layout-left a').removeClass('layui-icon-spread-left').addClass('layui-icon-shrink-right')

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
                $('.hide_side>li a').mouseenter(function () {
                    $(this).next('dl').show().addClass('layui-anim-scaleSpring')
                }).mouseleave(function () {
                    $(this).next('dl').hide().removeClass('layui-anim-scaleSpring')
                })

                /**
                 * 点击子菜单展开当前项
                 */
                $('.t_item>dd').click(function () {
                    var itemAttr = $(this).parents('li').attr('t-data')
                    layui.sessionData('t_data', {
                        key: 't_key',
                        value: itemAttr
                    });
                })
                var localData = layui.sessionData('t_data').t_key;
                var  $ddH = $('.' + localData).find('dd').height() * $('.' + localData).find('dd').length + 'px';
                $('.' + localData).children('dl').height($ddH);
                setTimeout(function () {
                    $('.' + localData).find('.layui-nav-more').addClass('icon_more')
                },50)
                /**
                 * 侧边栏收缩时点击子菜单展开当前项
                 */
                $('.hide_side>li').click(function () {
                    toggleSide()
                    $('.layui-nav-tree>li').find('dl').height(0)
                    var $dl = $('.layui-nav-tree>li:nth-child(' + ($(this).index()+1) +')').find('dl'),
                    $dlH = $dl.children('dd').length * $dl.children('dd').height() + 'px'
                    $dl.stop().animate({
                        height: $dlH
                    },200)
                })
                /**
                 * 侧边栏添加动画
                 */
                $('.layui-nav-tree>li').click(function () {
                    var $h = $(this).find('dl>dd').length * $(this).find('dl>dd a').height() + 'px'
                    $(this).siblings('li').find('dl').stop().animate({
                        height: 0
                    },200)
                    $(this).find('dl').stop().animate({
                        height: $h
                    },200)
                    $('.layui-nav-more').removeClass('icon_more')
                    $(this).find('.layui-nav-more').addClass('icon_more')
                    // $(this).find('dl').addClass('animate_height')
                    // console.log($h)
                    // $(this).find('dl').height($h)
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
                        ,btn: ['去支付']
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
                $('.t_page_count>span:odd').text($('.t_use_list').length)
                form.on('checkbox(use_scope)', function(data){
                    if(data.elem.checked){
                        $('.t_use_list').prop('checked', true)
                        console.log($('.t_use_list:checked').length)
                        $('.t_page_count>span:even').text($('.t_use_list:checked').length)
                        form.render('checkbox', 'scope_filter');
                        console.log($('.t_use_list').prop('checked'))
                    }else{
                        $('.t_use_list').prop('checked', false)
                        $('.t_page_count>span:even').text($('.t_use_list:checked').length)
                        form.render('checkbox', 'scope_filter');
                        console.log($('.t_use_list:checked').length)
                        console.log($('.t_use_list').prop('checked'))
                    }
                });
                /**
                 * 其中一项不选则取消全选，否则全选
                 */
                form.on('checkbox(list_scope)', function(data){
                    if(data.elem.checked){
                        $('.t_use_all').prop('checked', true)
                        $('.t_page_count>span:even').text($('.t_use_list:checked').length)
                        console.log($('.t_use_list:checked').length)
                        $('.t_use_list').each(function () {
                            if(!$(this).prop('checked')){
                                $('.t_use_all').prop('checked', false)
                            }
                        })
                        form.render('checkbox', 'scope_filter')
                    }else{
                        $('.t_use_all').prop('checked', false)
                        $('.t_page_count>span:even').text($('.t_use_list:checked').length)
                        console.log($('.t_use_list:checked').length)
                        form.render('checkbox', 'scope_filter')
                    }
                });
            })
        })

        /*login*/
        var $bodyWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            $bodyHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        $('.t_body').css({
            width: $bodyWidth,
            height: $bodyHeight
        })
        // console.log($bodyWidth,$bodyHeight)

        /*ie placeholder*/
        if( !('placeholder' in document.createElement('input')) ) {
            $('input[placeholder],textarea[placeholder]').each(function () {
                var self = $(this),
                    text = self.attr('placeholder');
                // 如果内容为空，则写入
                if (self.val() === "") {
                    self.val(text).addClass('placeholder');
                }
                // 控件激活，清空placeholder
                self.focus(function () {
                    if (self.val() === text) {
                        self.val("").removeClass('placeholder');
                    }
                    // 控件失去焦点，清空placeholder
                }).blur(function () {
                    if (self.val() === "") {
                        self.val(text).addClass('placeholder');
                    }
                });
            });
        }

        /*ie readonly*/
        $('.t_register_phone_num input').attr("unselectable","on");

        /*form tips*/
        this.userObj = {
            userMsg: ['请输入正确的手机号', '密码长度不够', '两次密码输入不一致'],
            loginTips:'<p class="t_tips"><i class="layui-icon layui-icon-close-fill"></i>登录名或登录密码不正确</p>',
            phoneValue: '',
            passwordValue: '',
            againwordValue: '',
            tipsPopupFun: function (userMsg) {
                layer.msg(userMsg, {
                    icon:5,
                    offset: 't',
                    anim: 5,
                    time: 2000
                })
            },
            loginPopupFun: function (loginTips) {
                layer.tips(loginTips, '.t_right_login input[type=text]', {
                    tips: [2, '#fff'],
                    time: 110000,
                    id:'loginTips'
                });
            }
        }

        $('.t_agreed_register').click(function () {
            that.userObj.phoneValue = $('.t_register input[name=phone]').val()
            that.userObj.passwordValue = $('.t_register input[name=password]').val()
            that.userObj.againwordValue = $('.t_register input[name=againword]').val()
            // console.log($('.t_register input[name=phone]').val())
            if(!that.userObj.phoneValue){
                that.userObj.tipsPopupFun(that.userObj.userMsg[0])
            }else if(!that.userObj.passwordValue){
                that.userObj.tipsPopupFun(that.userObj.userMsg[1])
            }else if(that.userObj.againwordValue !== that.userObj.passwordValue)
                that.userObj.tipsPopupFun(that.userObj.userMsg[2])
        })
        $('.t_agreed_login').click(function () {
            that.userObj.loginPopupFun(that.userObj.loginTips)
        })

        /*pay*/
        this.screenH = (document.documentElement.clientHeight || document.body.clientHeight) - 106;
        $(" .t_pay section").height(this.screenH)
        this.backNum = 5;
        function backTimer(){
            that.backNum--;
            $(".timer").html(that.backNum);
            if(that.backNum === 0){
                window.location.href =  "http://www.baidu.com/";
            }
        }
        // setInterval(backTimer,1000);
    });
    console.timeEnd('time')
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

