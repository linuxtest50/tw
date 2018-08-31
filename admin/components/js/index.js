// 导航
if(!location.hash){
    tjs.addClass(document.querySelector('.layout'), 'color')
}else{
    tjs.addClass(document.querySelector('.' + location.hash.slice(2)), 'color')
}
var navLi = document.querySelectorAll('.nav>li')
for (var i = 0; i < navLi.length; i++) {
    navLi[i].querySelector('a').onclick = function () {
        if(!tjs.hasClass(this, 'color')){
            document.querySelector('aside>ul').innerHTML = ''
        }
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

    ts.keyRight()
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
            target: 50,
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
            target: 50,
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

/**
 * 城市联动
 */
/*require*/
ts.chinaLinkage()

/**
 * 文件上传
 */
function upLoad(){
    document.querySelector('.t-input-file').onchange = function (event) {
        // var e = event || window.event
        console.log(this.files)
        var fr = new FileReader(), file = this.files[0];
        //判断文件的类型
        if (file.type.match(/^text\//) !== null) {
            //读取文本文件
            // readText(fr, file);
        } else if (file.type.match(/^image\//) !== null) {
            //读取图片
            readImage(fr, file);
        } else {
            alert("你上传的文件格式无法读取");
        }
        console.log(fr)
        document.querySelector('.t-upload span').innerHTML = this.files[0].name
    }

     // * 读取图片
    function readImage(frObj, fileObj) {
        frObj.onload = function(){
            var img = document.querySelector('.t-upload-div img')
            if(img){
                img.src = frObj.result
            }else{
                img = document.createElement("img");
                img.src = frObj.result;
            }
            document.querySelector(".t-upload-div").insertBefore(img, document.querySelector(".t-upload"));
        }
        frObj.readAsDataURL(fileObj);
    }

     // * 读取文本
    function readText(frObj, fileObj) {
        frObj.onload = function(){
            var pre = document.createElement("pre");
            pre.innerHTML = frObj.result;
            // document.querySelector(".t-upload").appendChild(pre);
            document.querySelector(".t-upload-div").insertBefore(pre, document.querySelector(".t-upload"))
        };
        frObj.readAsText(fileObj);
    }
}
upLoad()

/**
 * 分页
 */
function dir( elem, dir, until ) {
    var matched = [],
        cur = elem[ dir ];
    while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !tjs.hasClass(cur, until)) ) {
        if ( cur.nodeType === 1 ) {
            matched.unshift( cur );
        }
        cur = cur[dir];
    }
    // console.log(matched)
    return matched;
}
function prevAllUntil(elem, until) { // 获取前面兄弟元素,直到为until
    return dir( elem, "previousElementSibling", until);
}
function nextAllUntil(elem, until) { // 获取后面兄弟元素,直到为until
    return dir( elem, "nextElementSibling", until);
}
var ele = document.querySelector('.pagData')
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,
51,52,53,54,55,56];
function paging(obj) {
    var pagEle = document.querySelector('.t-paging'), dataArr, targetBgNum, pageSize = obj.pageSize || 10, pageNum = Math.ceil(obj.totalSize/pageSize);
    pagEle.onclick = function (event) {
        var e = event || window.event, pagEleA = document.querySelectorAll('.t-paging a');
        if(e.target.nodeName === 'A'){ // 点击数字btn
            var pagingPre = document.querySelector('.paging-pre'),
                pagingNext = document.querySelector('.paging-next');
            for (var i = 0; i < pagEleA.length; i++) {
                tjs.removeClass(pagEleA[i], 't-bg')
            }
            if(!tjs.trim(e.target.className)){
                var isLastPre = tjs.hasClass(e.target.nextElementSibling, 'not-allowed-last'),
                    isFirstNext = tjs.hasClass(e.target.previousElementSibling, 'not-allowed-first'),
                    naFirst = document.querySelector('.not-allowed-first'),
                    naLast = document.querySelector('.not-allowed-last'),
                    firstItem = document.querySelector('.first-item');
                if(naLast){
                    var allA = prevAllUntil(naLast, 'not-allowed-first'); // 获取两个···中间的a
                }

                if(isLastPre){ // 判断是否是last···前一位a
                    // console.log(e.target.innerHTML)

                    // var allA = prevAllUntil(naLast, 'not-allowed-first');
                    // 自动页数++
                    for (var k = 0; k < allA.length; k++) {
                        allA[k].innerHTML = e.target.innerHTML++
                    }
                    // 设置bg
                    tjs.addClass(allA[0], 't-bg')
                    dataArr = showData(allA[0].innerHTML)
                    // 显示first···
                    firstItem.style.display = 'inline-block'
                    naFirst.style.display = 'inline-block'
                    // 判断是否翻页到结尾
                    if(parseInt(e.target.innerText) + 5 > pageNum){
                        var pagEndingArr = prevAllUntil(naLast, 't-bg')
                        // console.log(pagEndingArr)
                        // 隐藏多余的a
                        for (var m = 0; m < pagEndingArr.length; m++) {
                            if(parseInt(pagEndingArr[m].innerText) === pageNum){
                                var hideAArr = nextAllUntil(pagEndingArr[m], 'paging-next');
                                for (var n = 0; n < hideAArr.length; n++) {
                                    hideAArr[n].style.display = 'none';
                                }
                            }
                        }
                    }
                }else if(isFirstNext && tjs.getStyle(naFirst, 'display') === 'inline-block'){// 判断是否是first···后一位a
                    // 自动页数--
                    console.log(allA)
                    // 判断是否翻页到开头
                    if(parseInt(e.target.innerText) - 5 < 1){
                        // 隐藏first···
                        firstItem.style.display = 'none'
                        naFirst.style.display = 'none'
                    }
                    // 显示隐藏的a
                    // var showAArr = nextAllUntil(naFirst, 'paging-next');
                    for (var p = allA.length - 1; p > 0; p--) {
                        allA[p].innerHTML = e.target.innerHTML--
                        if(tjs.getStyle(allA[p], 'display') === 'none'){
                            allA[p].style.display = 'inline-block'
                        }
                    }
                    pagingNext.previousElementSibling.style.display = 'inline-block'
                    naLast.style.display = 'inline-block'

                    console.log(allA)
                    // 设置bg
                    tjs.addClass(allA[allA.length - 1], 't-bg')
                    dataArr = showData(allA[allA.length - 1].innerHTML)

                }else{ // 其他无class的a 包括pagNum位即末位a
                    tjs.addClass(e.target, 't-bg')
                    dataArr = showData(e.target.innerHTML)
                    console.log(2222222222)
                }

                // console.log(e.target.innerHTML)
                // obj.callBack(dataArr)

            }else{ // 点击有class的a

                if(e.target.className === 'paging-pre'){ // 上一页
                    // for (var j = 0; j < pagEleA.length; j++) {
                    //     // 找到有bg的a
                    //     if (tjs.hasClass(pagEleA[j], 't-bg')) {
                    //         targetBgNum = parseInt(pagEleA[j].innerText)
                    //         console.log(targetBgNum)
                    //         if (targetBgNum === 1) {
                    //             // dataArr = showData(targetBgNum--)
                    //             tjs.addClass(pagEleA[targetBgNum], 't-bg')
                    //             return
                    //         }
                    //     }
                    // }
                            // // 判断当前a是否是···
                            // if(targetNum === document.querySelector('.t-not-allowed').innerHTML){
                            //     return
                            // }

                            // tjs.removeClass(pagEleA[j], 't-bg')
                            // tjs.addClass(pagEleA[targetNum], 't-bg')
                        // }
                    // }
                }else if(e.target.className === 'paging-next'){ // 下一页

                }else{ // 点击first-item 首位a
                    if(tjs.hasClass(e.target, 't-not-allowed'))return // 略过首尾···
                    tjs.addClass(e.target, 't-bg')
                    dataArr = showData(e.target.innerHTML)
                }

            }
            obj.callBack(dataArr)

            // 判断当前页是否为首尾页
            for (var q = 0; q < pagEleA.length; q++) {
                // 找到有bg的a
                if(tjs.hasClass(pagEleA[q], 't-bg')){
                    targetBgNum = parseInt(pagEleA[q].innerText)
                    console.log(targetBgNum)
                    if(targetBgNum === 1){
                        tjs.addClass(pagingPre, 't-not-allowed')
                        return
                    }else if(targetBgNum === pageNum){
                        tjs.addClass(pagingNext, 't-not-allowed')
                        return
                    }
                    // console.log(pagingPre)
                    if(tjs.hasClass(pagingPre, 't-not-allowed')){
                        tjs.removeClass(pagingPre, 't-not-allowed')
                    }
                    if(tjs.hasClass(pagingNext, 't-not-allowed')){
                        tjs.removeClass(pagingNext, 't-not-allowed')
                    }

                    // // 判断当前a是否是···
                    // if(targetNum === document.querySelector('.t-not-allowed').innerHTML){
                    //     return
                    // }

                    // tjs.removeClass(pagEleA[j], 't-bg')
                    // tjs.addClass(pagEleA[targetNum], 't-bg')
                }
            }

        }
    }

    dataArr = showData()
    obj.callBack(dataArr)
    function showData(arg) {
        // console.log(arg)
        //currentPage 为当前页数，pageSize为每页显示的数据量数，totalSize为总数据量数，startIndex开始条数，endIndex结束条数
        var pagArr = [], currentPage = arg || 1,
            startIndex = (currentPage - 1) * pageSize + 1,
            endIndex = currentPage * pageSize,
            aEles = '<a href="javascript:;" class="paging-pre t-not-allowed">上一页</a><a href="javascript:;" class="first-item">1</a>' +
                '<a href="javascript:;" class="t-not-allowed not-allowed-first">···</a>';
        pagArr = arr.slice(startIndex - 1, endIndex)
        // console.log(pagEle.hasChildNodes())
        // 判断首次加载
        if(pagEle.hasChildNodes()) return pagArr
        // 首次加载执行
        var aLength = obj.totalSize > 7*pageSize ? 5 : pageNum;
        for (var i = 1; i <= aLength; i++) {
            if(i===1){
                aEles += '<a href="javascript:;" class="t-bg">'+ i + '</a>'
                // console.log(currentPage)
            }else{
                aEles += '<a href="javascript:;">'+ i + '</a>'
            }
        }
        if(obj.totalSize > 7*pageSize){
            aEles += '<a href="javascript:;" class="t-not-allowed not-allowed-last">···</a><a href="javascript:;">'+ pageNum +'</a>'
        }
        aEles += '<a href="javascript:;" class="paging-next">下一页</a>'
        aEles += '<select>\n' +
                 '<option value="0">10条/页</option>\n' +
                 '<option value="1">20条/页</option>\n' +
                 '<option value="2">30条/页</option>\n' +
                 '<option value="3">40条/页</option>\n' +
                 '<option value="4">50条/页</option>\n' +
                 '</select>';
        aEles += '跳到第<input type="text" value=' + pageNum +' />页' + '<button class="t-btn">确定</button>';
        pagEle.innerHTML += aEles
        // console.log(pagArr)
        return pagArr
    }
    // return dataArr
}

console.time('time')
paging({
    pageSize: 5,
    totalSize: arr.length,
    callBack: function (arg) {
        // console.log(arg)
        ele.innerHTML = ''
        arg.forEach(function (item, index) {
            ele.innerHTML += '<li>'+ item + '</li>'
        })
    }
})
console.timeEnd('time')


