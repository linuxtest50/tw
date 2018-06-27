(function () {
    console.time('t.t')
    // console.assert(false, 'false')
    // console.log("%c禁止喧哗"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:3em");
    layui.use(['carousel', 'form'], function(){
        var carousel = layui.carousel, $ = layui.$, that = this
        $('footer').load('./public-page/public_footer.html')
        $('header').load('./public-page/public_header.html', function () {
            layui.use('element')
            /**
             * nav
             */
            var $li = $('.nav_li'), $navBar = $('.nav_bar')
            function hoverNav() {
                $li.each(function () {
                    var that = $(this), $a = $(this).children('a'), left = $a.position().left + parseInt($a.css('paddingLeft')) - 10
                    this.overEvent = function () {
                        $navBar.css('width', $a.innerWidth())
                        $navBar.animate({
                            left: left
                        }, 100)
                        that.children("ul").stop().animate({
                            height: '100%',
                            opacity: 1
                        }, 200);
                    }
                    this.outEvent = function () {
                        that.children("ul").stop().animate({
                            height: 0,
                            opacity: 0
                        }, 200)
                    }
                    that.hover(this.overEvent, this.outEvent);
                    that.click(function () {
                        console.log(left)
                        layui.sessionData('t_data', {
                            key: 't_key',
                            value: {
                                width: $a.innerWidth(),
                                left: left
                            }
                        });
                    })
                });
            }
            hoverNav()
            // 跳转后设置navbar
            if(layui.sessionData('t_data').t_key){
                $navBar.css({
                    width: layui.sessionData('t_data').t_key.width,
                    left: layui.sessionData('t_data').t_key.left
                })
            }

            /*nav_center*/
            $('.t_nav_center, .nav_register, .nav_login').click(function () {
                layui.sessionData('t_data', {
                    key: 't_key',
                    value: 't_center'
                });
                // var localData = layui.sessionData('t_data').t_key;
                // $('.' + localData).addClass('layui-nav-itemed')
                // $('.' + localData).find('.layui-nav-more').addClass('icon_more')
            })


            /**
             * 轮播
             */
            carousel.render({
                elem: '#carousel'
                , width: '100%' //设置容器宽度
                , height: '640px'
                , arrow: 'none' //始终显示箭头
                //,anim: 'updown' //切换动画方式
                , autoplay: true
                , full: false
                , interval: 3000
                , anim: 'fade'
            });
            if($(window).outerWidth()>2000){
                $('#carousel').css('height', '850px')
                console.log($('#carousel').css('height'))
            }
            var $cH2 = $('.t_carousel_info h2'), $cP = $('.t_carousel_info p'), $cA = $('.t_carousel_info a:not(".help")'), $cSpan = $('.t_carousel_info a.help')
            tBannerAnim()
            // banner 切换触发
            carousel.on('change(carousel)', function (obj) {
                // console.log(obj.index); //当前条目的索引
                // console.log(obj.prevIndex); //上一个条目的索引
                // console.log(obj.item); //当前条目的元素对象
                $cA.css("visibility", "hidden")
                if (obj.index === 1) {
                    $cH2.text('游戏盾')
                } else {
                    $cH2.text('web盾')
                }
                tBannerAnim()
            });
            // banner 动效
            function tBannerAnim() {
                $cH2.css("visibility", "visible").addClass('fadeInDown')
                $cSpan.css("visibility", "visible").addClass('fadeInDown')
                $cP.css("visibility", "visible").addClass('fadeInUp')
                setTimeout(function () {
                    $cA.css("visibility", "visible").addClass('fadeInUp')
                }, 500)
                setTimeout(function () {
                    $cH2.removeClass('fadeInDown')
                    $cP.removeClass('fadeInUp')
                    $cA.removeClass('fadeInUp')
                }, 2900)
            }


            /**
             * 监听滚动
             */
            $(window).scroll(function () {
                this.$pNav = $('.p_nav')
                this.$pFeature = $('.p_feature')
                this.bodyToTop = $(window).scrollTop()
                try{
                    this.contToTop = $('.t_content').offset().top - this.bodyToTop
                }catch (err){
                    // console.log(err)
                }
                finally{
                    // console.log($('.t_content').offset().top - $(window).scrollTop())
                    if (this.contToTop < 60) { //首页
                        $('header').css('background', '#0b1e39')
                        $(".t_to_top").css('display', 'block')
                    } else {
                        $('header').css('background', 'none')
                        $(".t_to_top").css('display', 'none')
                    }
                    if(parseInt(this.bodyToTop) > 60){
                        $('header').css('background', '#030b3e')
                    }
                    if(this.$pNav.length) {
                        this.navToTop = this.$pNav.offset().top - this.bodyToTop
                        this.featureToTop = this.$pFeature.offset().top - this.bodyToTop

                        if (this.navToTop < 0) {
                            this.$pNav.css({
                                'position': 'fixed',
                                'top': 0,
                                'z-index': 999999999
                            })
                            $('header').hide()
                            $('.buy_now').show().css('display', 'block')
                        } else if(this.navToTop >= 0 && this.featureToTop > 51){
                            this.$pNav.css({
                                'position': 'relative'
                            })
                            $('header').show()
                            $('.buy_now').hide()
                            console.log(222222222221111)
                        }
                    }
                }
            })


            /**
             * 安全防护
             */
            $.fn.niceHover = function (option) {
                var _target = $(this),
                defaultOptions = {
                    color: "#00b4ff",
                    weight: 3,
                    timer: 300
                },
                settings = $.extend(defaultOptions, option),
                _init = function () {
                    _target.css({"position": "relative", "cursor": "pointer"});
                    var width = _target.outerWidth(),
                    height = _target.outerHeight(),
                    leftBorder = $("<span class='hover-border left-right-border left-border'></span>"),
                    rightBorder = $("<span class='hover-border left-right-border right-border'></span>"),
                    leftTopBorder = $("<span class='hover-border left-right-top-bottom-border left-top-border'></span>"),
                    leftBottomBorder = $("<span class='hover-border left-right-top-bottom-border left-bottom-border'></span>"),
                    rightTopBorder = $("<span class='hover-border left-right-top-bottom-border right-top-border'></span>"),
                    rightBottomBorder = $("<span class='hover-border left-right-top-bottom-border right-bottom-border'></span>");

                    _target.append(leftBorder).append(rightBorder).append(leftTopBorder).append(leftBottomBorder).append(rightTopBorder).append(rightBottomBorder);
                    $(".hover-border").css({"background-color": settings.color});
                    $(".left-right-border").width(settings.weight + "px");
                    $(".left-right-top-bottom-border").height(settings.weight + "px");
                }
                _init();
                _target.hover(function () {
                    var _self = $(this);
                    $(this).find(".left-top-border").animate({"width": "50%"}, settings.timer, function () {
                        _self.find(".left-border").animate({"height": "100%"}, settings.timer, function () {
                            _self.find(".left-bottom-border").animate({"width": "50%"}, settings.timer);
                        })
                    });
                    $(this).find(".right-bottom-border").animate({"width": "50%"}, settings.timer, function () {
                        _self.find(".right-border").animate({"height": "100%"}, settings.timer, function () {
                            _self.find(".right-top-border").animate({"width": "50%"}, settings.timer);
                        })
                    });
                    /*setTimeout(function(){
                     _self.find(".left-border").animate({"height":"100%"},500);
                     },500)*/
                }, function () {
                    var _self = $(this);
                    _self.find(".left-right-border,.left-right-top-bottom-border").stop();
                    _self.find(".left-right-border").animate({"height": "0px"}, settings.timer);
                    _self.find(".left-right-top-bottom-border").animate({width: "0px"}, settings.timer);
                })
            }
            $safe_list = $(".t_safe_content>div .t_safe_list")
            // 移入
            $safe_list.niceHover({weight: 1, color: "#05b9ef"});
            // 进入动效
            $($safe_list[0]).css('visibility', 'visible').addClass('fadeInLeft')
            setTimeout(function () {
                $($safe_list[1]).css('visibility', 'visible').addClass('fadeInLeft')
            }, 100)
            setTimeout(function () {
                $($safe_list[2]).css('visibility', 'visible').addClass('fadeInLeft')
            }, 200)
            setTimeout(function () {
                $($safe_list[3]).css('visibility', 'visible').addClass('fadeInLeft')
            }, 300)


            /**
             * 解决方案
             */
            /*list切换*/
            function changeBanner() {
                var index = 0,
                btl = document.getElementById("person_content_left"),
                btr = document.getElementById("person_content_right"),
                personUl = document.getElementById("person_ul"),
                personli = personUl.getElementsByTagName("li");
                btl.onclick = function () {
                    index--;
                    if (index === -2) {
                        index = personli.length - 6;
                        personUl.style.left = -(personli[0].offsetWidth + Math.round(parseFloat(getStyle(personli[0], "marginLeft")))) * (personli.length - 3) + "px";
                    }
                    move(personUl, "left", -(personli[0].offsetWidth + Math.round(parseFloat(getStyle(personli[0], "marginLeft")))) * (index + 2), 10, function () {
                        console.log(personUl.style.left);
                    });
                };
                btr.onclick = function () {
                    index++;
                    if (index > personli.length - 6) {
                        index = -1;
                        personUl.style.left = 0 + "px";
                    }
                    move(personUl, "left", -(personli[0].offsetWidth + Math.round(parseFloat(getStyle(personli[0], "marginLeft")))) * (index + 2), 10, function () {
                        console.log(personUl.style.left);
                    });
                }
            }
            // changeBanner();
            // 移入效果
            function hoverSolu() {
                this.$partsInfoLi = $("#solutionContent li");
                this.$partsInfoLi.each(function () {
                    var that = $(this);
                    that.hover(function () {
                        that.find("div").stop().animate({
                            height: '100%',
                            lineHeight: 28,
                            paddingTop: '12%',
                            overFlow: 'auto'
                        }, 200);
                        that.find("p").stop().animate({
                            padding: '10%'
                        }, 200);
                    }, function () {
                        that.find("div").stop().animate({
                            height: 56,
                            lineHeight: 56,
                            paddingTop: 0,
                            overFlow: 'hidden'
                        }, 200).find("p").stop().animate({
                            padding: 0
                        }, 200);
                    });
                });
            }
            hoverSolu()


        });


        /**
         *  totop
         */
        this.$scrollToTop = $(".t_to_top");
        this.$scrollToTop.click(function(){
            $('html,body').stop().animate({
                scrollTop:'0px'
            },350)
        });

        /**
         *  侧边客服
         */
        $('.t_consultation_ask').hover(function () {
            $('.t_consultation_list').stop().css({
                transition: 'all .5s cubic-bezier(.19,.6,.65,1.35)',
                left: '-300px'
            })
        }, function () {
            $('.t_consultation_list').stop().css({
                left: '44px'
            })
        })
        
        // grayscale(document.getElementById("thisImage")); // 置灰

        /**
         *  产品页
         */
        /*点击导航滚动*/
        $('.p_nav').on('click', 'li', function (e) {
            this.scrollNum = $('.' + $(e.target).attr('t-data')).offset().top
            this.fun = function () {
                $('header').hide()
                $('.buy_now').show().css('display', 'block')
            }
            pageScroll(this.scrollNum, this.fun)
        })

        /**
         *  帮助页
         */
        this.$hDetailsTitle = $('.h_content_details>dl h3')
        $.each(this.$hDetailsTitle, function (index) {
            var that = this.innerHTML
            $('.h_side').append($('<li t-data=' + '"' + index + '"' + '>' + that + '</li>'))
        })
        $('.h_side').delegate('li', 'click', {}, function () {
            this.scrollNum = $($('.h_content_details>dl')[$(this).attr('t-data')]).offset().top - 60
            pageScroll(this.scrollNum)
        })

        /**
         * 页面滚动方法
         * @param scrollTop
         * @param fun
         */
        function pageScroll(scrollTop, fun) {
            $('html, body').stop().animate({
                scrollTop: scrollTop + 'px'
            },300, function () {
                if(fun){
                    fun()
                }
            })
        }

    })


    // base64 转码
    function imageToBase64(imgArr) {
        // debugger
        let that = this
        this.base64Arr = []
        this.imgSrcArr = imgArr;// 图片路径
        this.getBase64Image = function (img) {
            // debugger
            let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            let ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
            let dataUrl = canvas.toDataURL("image/"+ext);
            // console.log(this.image)
            return dataUrl
        }
        this.img = [];
        this.promiseAll = [];
        for(let i = 0; i < this.imgSrcArr.length; i++){
            this.promiseAll[i] = new Promise((resolve, reject)=>{
                this.img[i] = new Image();
                this.img[i].onload = function(){
                    resolve(that.img[i])
                };
                this.img[i].src = this.imgSrcArr[i];
            })
        }
        this.base64ArrFun = function () {
            return Promise.all(this.promiseAll).then((img)=>{
                for(let i = 0; i<img.length; i++){
                    that.base64 = that.getBase64Image(img[i]);
                    that.base64Arr.push(that.base64);
                }
                // console.log(that.base64Arr)
                return that.base64Arr
            })
        };
        return this.base64ArrFun()
    }

    // imageToBase64(["../img/banner.png", "../img/defense.png"]).then((resolve)=>{
    //     console.log(resolve)
    // })

    console.timeEnd('t.t')
}(window))