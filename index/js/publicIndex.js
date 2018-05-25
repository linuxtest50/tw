layui.use('carousel', function(){
    var carousel = layui.carousel, $ = layui.$
    /**
     * 轮播
     */
    carousel.render({
        elem: '#carousel'
        ,width: '100%' //设置容器宽度
        ,height:'640px'
        ,arrow: 'none' //始终显示箭头
        //,anim: 'updown' //切换动画方式
        ,autoplay: true
        ,full: false
        ,interval: 3000
        ,anim: 'fade'
    });
    var $cH2 = $('.t_carousel_info h2'), $cP = $('.t_carousel_info p'), $cA = $('.t_carousel_info a')
    tBannerAnim()
    // 切换触发
    carousel.on('change(carousel)', function(obj){
        // console.log(obj.index); //当前条目的索引
        // console.log(obj.prevIndex); //上一个条目的索引
        // console.log(obj.item); //当前条目的元素对象
        $cA.css("visibility","hidden")
        if(obj.index===1){
            $cH2.text ('游戏盾')
        }else{
            $cH2.text ('web盾')
        }
        tBannerAnim()
    });
    function tBannerAnim() {
        $cH2.css("visibility","visible").addClass('fadeInDown')
        $cP.css("visibility","visible").addClass('fadeInUp')
        setTimeout(function () {
            $cA.css("visibility","visible").addClass('fadeInUp')
        },500)
        setTimeout(function () {
            $cH2.removeClass('fadeInDown')
            $cP.removeClass('fadeInUp')
            $cA.removeClass('fadeInUp')
        },2900)
    }

    /**
     * 监听滚动
     */
    $(window).scroll(function () {
        console.log($('.t_content').offset().top - $(window).scrollTop())
        var contToTop = $('.t_content').offset().top - $(window).scrollTop()
        if(contToTop<60){
            $('header').css('background', '#0b1e39')
        }else{
            $('header').css('background', 'none')
        }
    })

    /**
     * 安全防护
     */
    $.fn.niceHover=function(option){
        var _target=$(this);
        var defaultOptions={
            color:"#00b4ff",
            weight:3,
            timer: 300
        };
        var settings= $.extend(defaultOptions,option);
        var _init=function(){
            _target.css({"position":"relative","cursor":"pointer"});
            var width=_target.outerWidth();
            var height=_target.outerHeight();
            var leftBorder=$("<span class='hover-border left-right-border left-border'></span>");
            var rightBorder=$("<span class='hover-border left-right-border right-border'></span>");

            var leftTopBorder=$("<span class='hover-border left-right-top-bottom-border left-top-border'></span>");
            var leftBottomBorder=$("<span class='hover-border left-right-top-bottom-border left-bottom-border'></span>");
            var rightTopBorder=$("<span class='hover-border left-right-top-bottom-border right-top-border'></span>");
            var rightBottomBorder=$("<span class='hover-border left-right-top-bottom-border right-bottom-border'></span>");

            _target.append(leftBorder).append(rightBorder).append(leftTopBorder).append(leftBottomBorder).append(rightTopBorder).append(rightBottomBorder);
            $(".hover-border").css({"background-color":settings.color});
            $(".left-right-border").width(settings.weight+"px");
            $(".left-right-top-bottom-border").height(settings.weight+"px");
        }
        _init();
        _target.hover(function(){
            var _self=$(this);
            $(this).find(".left-top-border").animate({"width":"50%"},settings.timer,function(){
                _self.find(".left-border").animate({"height":"100%"},settings.timer,function(){
                    _self.find(".left-bottom-border").animate({"width":"50%"},settings.timer);
                })
            });
            $(this).find(".right-bottom-border").animate({"width":"50%"},settings.timer,function(){
                _self.find(".right-border").animate({"height":"100%"},settings.timer,function(){
                    _self.find(".right-top-border").animate({"width":"50%"},settings.timer);
                })
            });
            /*setTimeout(function(){
             _self.find(".left-border").animate({"height":"100%"},500);
             },500)*/
        },function(){
            var _self=$(this);
            _self.find(".left-right-border,.left-right-top-bottom-border").stop();
            _self.find(".left-right-border").animate({"height":"0px"},settings.timer);
            _self.find(".left-right-top-bottom-border").animate({width:"0px"},settings.timer);
        })
    }
    $safe_list = $(".t_safe_content>div .t_safe_list")

    // 移入
    $safe_list.niceHover({weight:1,color:"#05b9ef"});

    //进入动效
    $($safe_list[0]).css('visibility', 'visible').addClass('fadeInLeft')
    setTimeout(function () {
        $($safe_list[1]).css('visibility', 'visible').addClass('fadeInLeft')
    },100)
    setTimeout(function () {
        $($safe_list[2]).css('visibility', 'visible').addClass('fadeInLeft')
    },200)
    setTimeout(function () {
        $($safe_list[3]).css('visibility', 'visible').addClass('fadeInLeft')
    },300)

    /**
     * 解决方案
     */
    /*banner*/
    function changeBanner() {
        var index = 0;
        var btl = document.getElementById("person_content_left");
        var btr = document.getElementById("person_content_right");
        var personUl = document.getElementById("person_ul");
        var personli = personUl.getElementsByTagName("li");
        btl.onclick=function(){
            index--;
            if(index===-2){
                index=personli.length - 6;
                personUl.style.left=-(personli[0].offsetWidth+Math.round(parseFloat(getStyle(personli[0],"marginLeft"))))*(personli.length-3)+"px";
            }
            move(personUl,"left",-(personli[0].offsetWidth+Math.round(parseFloat(getStyle(personli[0],"marginLeft"))))*(index+2),10,function () {
                console.log(personUl.style.left);
            });
        };
        btr.onclick=function(){
            index++;
            if(index>personli.length - 6){
                index=-1;
                personUl.style.left=0+"px";
            }
            move(personUl,"left",-(personli[0].offsetWidth+Math.round(parseFloat(getStyle(personli[0],"marginLeft"))))*(index+2),10,function(){
                console.log(personUl.style.left);
            });
        }
    }
    // changeBanner();

    // 移入效果
    function hoverSolu() {
        var $partsInfoLi = $("#solutionContent li");
        //
        var leaveTimer, enterTimer;
        $partsInfoLi.each(function () {
            var that = $(this);
            that.hover(function () {
                // clearTimeout(leaveTimer);
                enterTimer = setTimeout(function () {
                    that.find("div").animate({
                        height: '100%',
                        lineHeight: 28,
                        paddingTop: '12%',
                        overFlow: 'auto'
                    }, 200);
                    that.find("p").animate({
                        padding: '10%'
                    }, 200);
                }, 100);

            }, function () {
                clearTimeout(enterTimer);
                leaveTimer = setTimeout(function () {
                    that.find("div").animate({
                        height: 56,
                        lineHeight: 56,
                        paddingTop: 0,
                        overFlow: 'hidden'
                    }, 200).find("p").animate({
                        padding: 0
                    }, 200);
                }, 100);
            });
        });
    }
    hoverSolu()
});