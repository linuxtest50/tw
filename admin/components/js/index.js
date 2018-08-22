// 导航
if(!location.hash){
    tjs.addClass(document.querySelector('.layout'), 'color')
}else{
    tjs.addClass(document.querySelector('.' + location.hash.slice(2)), 'color')
}
var navLi = document.querySelectorAll('.nav>li')
for (var i = 0; i < navLi.length; i++) {
    navLi[i].querySelector('a').onclick = function () {
        document.querySelector('aside>ul').innerHTML = ''
        for (var j = 0; j < navLi.length; j++) {
            tjs.removeClass(navLi[j].querySelector('a'), 'color')
        }
        tjs.addClass(this, 'color')
        // var asideItem = document.querySelectorAll('h2')
    }
}

//展开代码
var tCodeBtn = document.querySelectorAll('.my_icon'), tCode = document.querySelectorAll('.t-code');
for (var i = 0; i < tCodeBtn.length; i++) {
    (function (j) {
        tCodeBtn[j].onclick = function () {
            if(parseInt(tjs.getStyle(tCode[j], 'height'))){
                tCode[j].style.height = 0
                tCode[j].style.marginTop = 0
                this.innerHTML = '☟'
            }else{
                funTransitionHeight(tCode[j])
                tCode[j].style.marginTop = 35 + 'px'
                this.innerHTML = '☝'
            }
        }
    }(i))

}
// 0 - auto height transition
function funTransitionHeight(element, time) { // time, 数值，可缺省
    if (typeof window.getComputedStyle === "undefined") return;
    var height = tjs.getStyle(element, 'height');
    // element.style.transition = "none";
    element.style.height = "auto";
    var targetHeight = tjs.getStyle(element, 'height');
    element.style.height = height;
    element.offsetWidth = element.offsetWidth;
    if (time) element.style.transition = "height "+ time +"ms";
    element.style.height = targetHeight;
}

// init
var ts = new TS()

    // ts.keyRight()
/**
 * 倒计时组件
 * @param timer 结束显示区
 * @param hour 小时显示区
 * @param minute 分钟显示区
 * @param second 秒显示区
 * @param date 传入时间 "2017/12/12,1:41"
 */
ts.backTimers({
    timer: '.t-timer',
    day: '.t-d',
    hour: '.t-h',
    minute: '.t-m',
    second: '.t-s',
    date: '2018-9-22 18:30',
    text: '结束提示',
    color: 'red'
});


/**
 * 元素动态效果
 * @param {Object} obj 元素
 * @param {Object} attr 需要变动的属性
 * @param {Object} target 目标值
 * @param {Object} callBack 结束回调
 */
var btn1 = document.querySelectorAll('.pop-btns>button')[0], btn2 = document.querySelectorAll('.pop-btns>button')[1],
    btn3 = document.querySelectorAll('.pop-btns>button')[2], btn4 = document.querySelectorAll('.pop-btns>button')[3],
    btn5 = document.querySelectorAll('.pop-btns>button')[4];
if(btn1 || btn2 || btn3 || btn4 || btn5){
    btn1.onclick = function () {
        ts.move({
            type: 't-alert',
            attr: 'top',
            target: 300,
            text: '我是弹窗',
            time: 1000,
            callBack: function () {
                // alert('O(∩_∩)O哈哈~')
            }
        })
    }
    btn2.onclick = function () {
        ts.move({
            type: 't-success',
            attr: 'top',
            target: 10,
            text: '我是成功',
            time: 1000,
            callBack: function () {
                // console.log(1)
            }
        })
    }
    btn3.onclick = function () {
        ts.move({
            type: 't-err',
            attr: 'bottom',
            target: 10,
            text: '我是err',
            time: 1000,
            callBack: function () {
                // console.log(1)
            }
        })
    }
    btn4.onclick = function () {
        ts.move({
            type: 't-info',
            attr: 'left',
            target: 100,
            text: '我是info',
            time: 1000,
            callBack: function () {
                // console.log(1)
            }
        })
    }
    btn5.onclick = function () {
        ts.move({
            type: 't-warning',
            attr: 'right',
            target: 100,
            text: '我是warning',
            time: 1000,
            callBack: function () {
                console.log(1)
            }
        })
    }
}


/**
 *  联动组件
 */
ts.linkage()

/**
 *  选项卡
 */
ts.tabs()

/**
 * 复制卡号
 */
if(document.querySelector(".t-copy")){
    ts.copyNum()
}

/**
 * 轮播组件，同时支持多个
 * @param ele 触屏元素
 * @param index 轮播元素对应的索引,默认为0，避免干扰
 */

if(document.querySelector(".t-banner")){
    ts.autoPlay({
        ele: '.t-banner',
        index: 0,
    })
}


/**
 * @param height高度
 * @param speed速度
 * @param delay时间 为0则不间断滚动
 * @param index
 */
if(document.querySelector(".t-marqueebox")){
    ts.startmarquee({
        ele: '.marqueebox1',
        width: 300,
        height: 30,
        speed:30,
        delay:1000,
    })
    ts.startmarquee({
        ele: '.marqueebox2',
        width: 300,
        height: 30,
        speed:20,
        delay:0,
    })
}


/**
 * 回到顶部
 */
if(document.querySelector('.t-top')){
    document.querySelector('.t-top').onclick = function () {
        ts.toTop({
            speed: 100, // 速度
            target: 0// 目标位置
        })
    }
}

/**
 * 进度条
 */
if(document.querySelector('.pmgressbar')){
    document.querySelector('.pmgressbar').onclick = function () {
        ts.pmgressbar({
            ele: '.t-pmgressbar'
        })
    }
}

/**
 *  获取内网IP地址
 */
ts.getUserIP(function(ip){
    document.querySelector('.nip').innerHTML = ip;
});

/**
 * 获取外网IP地址
 */
document.querySelector('.wip').innerHTML = returnCitySN.cip
document.querySelector('.address').innerHTML = returnCitySN.cname

/**
 * 获取地址
 * @type {string}
 */
// var src = 'http://ip.taobao.com/service/getIpInfo.php?ip=' + returnCitySN.cip
// https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel= phone
var src = 'http://whois.pconline.com.cn/ipJson.jsp?ip=' + returnCitySN.cip ,script = document.createElement('script')
script.setAttribute("type", "text/javascript")
script.setAttribute("src", src)
document.body.appendChild(script)
window.IPCallBack = function (data) {
    // console.log(data)
    document.querySelector('.address').innerHTML = data.addr
}

/**
 *  当前日期
 */
setInterval(function () {
    document.querySelector('.newTime').innerHTML = tjs.timeFormat(new Date(), 'yyyy年MM月dd日 hh:mm:ss 星期w')
},1000)

/**
 * 浏览器版本
 */
console.log(tjs.getBrowserInfo())
document.querySelector('.userBrowserInfo').innerHTML = '浏览器：' + tjs.getBrowserInfo()

/**
 * 滚动监听
 */
ts.listenScroll({
    nav: 'aside', // 导航条
    item: '#page h2', // 对应内容
    top: 0 // 暂停位置
})
