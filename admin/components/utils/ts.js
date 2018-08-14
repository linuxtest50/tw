// document.onkeydown = function () {
//     if (window.event && window.event.keyCode === 123) {
//         event.keyCode = 0;
//         event.returnValue = false;
//         return false;
//     }
// };
tjs.reqAniFrame()

var tableTools = document.querySelectorAll('.t-table .t-icon-item'),moreTools = document.querySelectorAll('.t-other-item')
for (var i = 0; i < tableTools.length; i++) {
    (function (i) {
        tableTools[i].onclick = function () {
            for (var j = 0; j < moreTools.length; j++) {
                moreTools[j].style.opacity = 0
                moreTools[j].style.zIndex = -1
                tableTools[j].children[0].setAttribute('xlink:href', '#icon-down')
                // 关闭
                if(parseInt(tjs.getStyle(moreTools[i], 'opacity'))){
                    moreTools[i].style.zIndex = 0
                    this.children[0].setAttribute('xlink:href', '#icon-down')
                    console.log(1)
                // 展开
                }else{
                    moreTools[i].style.cssText += ';z-index:1;opacity:1'
                    // moreTools[i].style.opacity = 1
                    this.children[0].setAttribute('xlink:href', '#icon-up')
                    console.log(2)
                }
            }
        }
    }(i))
}

class TS {
    constructor(){

    }

    /**
     * 右键
     */
    keyRight(){
        var box=document.getElementById("keyRight");
        document.oncontextmenu=function(ev){
            console.log(ev)
            box.style.display="block";
            ev=ev||event;
            box.style.left=ev.pageX+"px";
            box.style.top=ev.pageY+"px";
            return false;
        }
        document.onclick=function(){
            box.style.display="none";
        }
    }
    /**
     * 倒计时组件
     * @param timer 结束显示区
     * @param hour 小时显示区
     * @param minute 分钟显示区
     * @param second 秒显示区
     * @param date 传入时间 "2017/12/12,1:41"
     */
    backTimers(obj) {
        // console.log(this.a)
        let clearTime,
            timerEle = document.querySelector(obj.timer),
            dayEle = document.querySelector(obj.day),
            hourEle = document.querySelector(obj.hour),
            minuteEle = document.querySelector(obj.minute),
            secondEle = document.querySelector(obj.second);
        if(!timerEle || !dayEle || !hourEle || !minuteEle || !secondEle){
            return
        }
        clearTime = setInterval(function () {
            backTime(obj);
        },1000);
        function backTime(obj){
            let nowDate = new Date(),
                setDate = new Date(obj.date),
                newDate = (setDate.getTime() - nowDate.getTime())/1000,
                d=  parseInt(newDate/(24*60*60)),
                h = parseInt(newDate/(60*60)%24),
                m = parseInt((newDate/60)%60),
                s = parseInt(newDate%60);
            function addZero(ele, times){
                if(times>= 0 && times< 10){
                    ele.innerHTML = "0" + times;
                }else{
                    ele.innerHTML = times;
                }
            }
            addZero(dayEle, d);
            addZero(secondEle, s);
            addZero(minuteEle, m);
            addZero(hourEle, h);
            if(newDate<= 0){
                timerEle.innerHTML = obj.text || "活动已结束";
                timerEle.style.color = obj.color || "red";
                timerEle.style.fontSize = "16px";
                clearInterval(clearTime)
            }
        }
    }

    /**
     * 提示框组件
     * @param {Object} eleTag 元素
     * @param {Object} attr 需要变动的属性
     * @param {Object} target 目标值
     * @param {Object} speed 每次移动的距离
     * @param {Object} callBack 结束回调
     */
    move(obj) {
        //需要为每一个元素指定一个自己的timer来保存定时器
        var ele = document.querySelector('.t-pop'),that = this,popWidth = document.querySelector('.t-pop').offsetWidth,
        popHeight = document.querySelector('.t-pop').offsetHeight;
        ele.innerHTML = obj.text;
        obj.speed = 10
        obj.target = obj.target || 10
        ele.style.cssText += ';opacity:1;display:block;position:fixed;left:auto;right:auto;top:auto;bottom:auto'
        // 判断类型
        if(obj.type === 't-success'){
            insertIcon("✔ ")
            obj.speed = 1
            tjs.addClass(ele, 't-success')
        }else if(obj.type === 't-err'){
            insertIcon("× ")
            obj.speed = 1
            tjs.addClass(ele, 't-err')
        }else if(obj.type === 't-info'){
            insertIcon("▪ ")
            tjs.addClass(ele, 't-info')
        }else if(obj.type === 't-warning'){
            insertIcon("! ")
            tjs.addClass(ele, 't-warning')
        }else if(obj.type === 't-alert'){
            obj.speed = 30
            tjs.addClass(ele, 't-alert')
        }

        // 判断方向
        if(obj.attr === 'top'){
            ele.style.left = 'calc(50% - 300px)'
            ele.style.top = -popHeight + 'px'
        }else if(obj.attr === 'bottom'){
            ele.style.left = 'calc(50% - 300px)'
            ele.style.bottom = -popHeight + 'px'
        }else if(obj.attr === 'left'){
            ele.style.top = 200 + 'px'
            ele.style.left = -popWidth + 'px'
        }else if(obj.attr === 'right'){
            ele.style.right = -popWidth + 'px'
        }

        clearInterval(ele.timer);
        ele.timer = setInterval(function() {
            var oldValue = parseInt(tjs.getStyle(ele, obj.attr));
            //判断元素的移动方向
            if (oldValue > obj.target) {
                var newValue = oldValue - obj.speed;
                //如果新的值小于目标值，则让新值等于目标值
                if (newValue < obj.target) {
                    newValue = obj.target;
                }
            } else {
                newValue = oldValue + obj.speed;
                //在赋值之前判断
                if (newValue > obj.target) {
                    newValue = obj.target;
                }
            }
            //修改box1的left属性值
            ele.style[obj.attr] = newValue + "px";
            if (newValue === obj.target) {
                //停止定时器
                clearInterval(ele.timer);
                if(obj.time){
                    clearTimeout(ele.timeout)
                    ele.timeout = setTimeout(function () {
                        ele.style.cssText += ';display:none;opacity:0;position:static;left:auto;right:auto;top:auto;bottom:auto';
                        tjs.removeClass(ele, obj.type)
                        //判断是否有回调函数
                        if (obj.callBack) {
                            obj.callBack();
                        }
                    },obj.time)
                }
            }
        }, 10);

        // 插入icon
        function insertIcon(icon) {
            var reg = new RegExp(icon,"g");
            if(!reg.test(ele.childNodes[0].nodeValue)){
                ele.childNodes.item(0).insertData(0,icon)
            }
        }

    }

    /**
     * 联动菜单组件
     */
    linkage(){
        var that = this,linkageArr = document.querySelectorAll('.t-linkage>p')
        // 获取所有兄弟节点
        function getsiblings(myself) {
            var siblingsArr = []
            for (var j = 0; j < myself.parentNode.children.length; j++) {
                if(myself.parentNode.children[j] !== myself){
                    siblingsArr.push(myself.parentNode.children[j])
                }
            }
            return siblingsArr
        }
        // 给子节点添加class
        function addSelfClass(siblings, index, cls, self) {
            for (var k = 0; k < siblings.length; k++) {
                // 判断兄弟的子节点是否有class
                if(tjs.hasClass(siblings[k].children[index], cls)){
                    tjs.removeClass(siblings[k].children[index], cls)
                }
            }
            tjs.addClass(self, cls)
        }
        for (var i = 0; i < linkageArr.length; i++) {
            linkageArr[i].onclick = function () {
                var myself = this.parentNode;
                if(this.nextElementSibling){
                    console.log(tjs.hasClass(this.nextElementSibling, 't-linkage-show'))
                    if(!tjs.hasClass(this.nextElementSibling, 't-linkage-show')){
                        var siblings = getsiblings(myself)
                        addSelfClass(siblings, 0, 't-linkage-select', this)
                        addSelfClass(siblings, 1, 't-linkage-show', this.nextElementSibling)
                    }
                }else{
                    addSelfClass(getsiblings(myself), 0, 't-linkage-select', this)
                }
            }
        }
    }

    /**
     * 选项卡
     */
    tabs(){
        var li = document.querySelectorAll('.t-tabs>ul>li'), div = document.querySelectorAll('.t-tabs>div');
        for(var i=0;i<li.length;i++){
            (function(i){
                li[i].onmouseover = function(){
                    for(var j = 0; j < li.length; j++){
                        li[j].className = "";
                        div[j].className = "t-hide";
                    }
                    this.className = "t-tabs-hover";
                    div[i].className = "";
                }
            })(i)
        }
    }

    /**
     * 卡号复制
     */
    copyNum(){
        const copyObj = document.querySelector(".t-copy>p")
        const copySpan = document.querySelector(".t-copy>span")
        const objText = copyObj.innerText;
        // objText.substring(3,7).replace(/^4/g,'*')
        var objRep = objText.slice(0, 3) + "****" + objText.substr(-3)
        copySpan.innerText = objText
        copyObj.innerText = objRep

        copyObj.onmouseover = () => {
            copySpan.style.display = 'block'
        }
        copyObj.onmouseout = function() {
            copySpan.style.display = 'none'
        }
        copyObj.onclick = function() {
            var oInput = document.createElement('input');
            oInput.value = copySpan.innerText;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display='none';
            alert('复制成功');
        }
    }

    /**
     * 轮播组件，同时支持多个
     * @param ele 触屏元素
     * @param index 轮播元素对应的索引,默认为0，避免干扰
     */
    autoPlay(obj){
        var ele = document.querySelector(obj.ele),
            ele_ul = document.querySelector(obj.ele + '>ul'),
            ele_li = document.querySelectorAll(obj.ele + '>ul li'),
            ele_img = document.querySelectorAll(obj.ele + '>ul img');
        clearInterval(ele_ul.auto);
        for (var i = 0; i < ele_li.length; i++) {
            ele_li[i].style.width = ele.offsetWidth + 'px'
        }
        ele_ul.style.width = ele.offsetWidth * ele_li.length + 'px'
        /*定义定时器参数*/
        // var auto;
        // var timer;
        /*定义自适应参数*/
        var screenWidth;//获取可视屏幕的宽度
        var maxWidth = ele.offsetWidth;
        var minWidth = 320;
        var imgscreenWidth = 0;//轮播图的适应宽度
        //1 轮播图自适应
        screenWidth=window.innerWidth;
        for(var i=0;i<ele_img.length;i++){
            if(screenWidth>maxWidth){
                ele_img[i].style.width=maxWidth+"px";
                imgscreenWidth=maxWidth;
            }else if(screenWidth<=maxWidth && screenWidth>=minWidth){
                ele_img[i].style.width=screenWidth+"px";
                imgscreenWidth=screenWidth;
            }else if(screenWidth<minWidth){
                ele_img[i].style.width=minWidth+"px";
                imgscreenWidth=minWidth;
            }
        }

        //2 动态添加轮播导航
        var nav = ele.querySelector(".t-banner-nav");
        for(var j=0;j<ele_img.length-1;j++){
            if(nav.children.length < ele_img.length-1){
                nav.innerHTML+="<a href='javascript:;'></a>";
            }
        }
        nav.style.left=(ele.offsetWidth-nav.offsetWidth)/2+"px";

        //3 图片触屏轮播
        var startPageX;
        var movePageX;
        //触屏开始
        ele.addEventListener("touchstart",function(event){
            clearInterval(ele_ul.auto);
            var touch=event.targetTouches;//获取触摸信息

            if(touch.length===1){//一个手指触摸
                startPageX=touch[0].pageX;
                movePageX=0;
            }
        },false);

        //触屏移动
        ele.addEventListener("touchmove",function(event){
            var touch=event.targetTouches;
            if(touch.length===1){
                movePageX=touch[0].pageX;
            }
        },false);

        //触屏结束
        ele.addEventListener("touchend",function(){
            console.log(event);
            if(movePageX===0){
                return;
            }
            if(movePageX>startPageX){
                console.log("右划");
                obj.index--;//步骤1
                if(obj.index===-1){//步骤2
                    obj.index=ele_img.length-2;
                    ele_ul.style.transition="none";
                    ele_ul.style.marginLeft=-(ele_img.length-1)*imgscreenWidth+"px";
                }
                ele_ul.timer = setTimeout(function () {//步骤3
                    ele_ul.style.marginLeft = -imgscreenWidth * obj.index + "px";
                    ele_ul.style.transition = "1s linear";
                }, 100);
                navMove();
            }else{
                console.log("左划");
                runAuto();
            }
            ele_ul.auto=setInterval(runAuto,2000);
        },false);

        //4 自动轮播
        function runAuto(){
            if(obj.index===ele_img.length-2){//步骤3
                ele_ul.timer = setTimeout(
                    function(){
                        obj.index=0;
                        ele_ul.style.transition="none";
                        ele_ul.style.marginLeft=0+"px";
                    },1000
                )
            }
            obj.index++;//步骤1
            ele_ul.style.marginLeft=-imgscreenWidth*obj.index+"px";//步骤2
            ele_ul.style.transition="1s linear";
            navMove();
        }
        ele_ul.auto=setInterval(function () {
            runAuto();
        },2000);

        //5 导航点移动
        var nav_a=document.querySelectorAll('.t-banner-nav a');
        nav_a[0].style.backgroundColor="white";
        function navMove(){
            for (var i = 0; i <nav_a.length; i++) {
                nav_a[i].style.backgroundColor="";
            }
            if(obj.index<=5){
                nav_a[obj.index].style.backgroundColor="white";
            }
            if(obj.index===6){
                nav_a[0].style.backgroundColor="white";
            }
        }
    }

    /**
     * 滚动信息
     * @param height高度
     * @param speed速度
     * @param delay时间
     * @param index
     */
    startmarquee(obj){
        var t, p = false, o = document.querySelector(obj.ele), li = document.querySelectorAll(obj.ele + ' li')[0];
        // console.log(o)
        o.style.cssText += ';width:' + obj.width + 'px;height:' + obj.height + 'px;line-height:' + obj.height + 'px';
        li.style.cssText += ';height:' + obj.height + 'px;line-height:' + obj.height + 'px';
        o.innerHTML += o.innerHTML;
        o.onmouseover = function(){p = true}
        o.onmouseout = function(){p = false}
        o.scrollTop = 0;
        function start(){
            t = setInterval(scrolling, obj.speed);
            if(!p){ o.scrollTop += 1;}
        }
        function scrolling(){
            if(o.scrollTop % obj.height !== 0){
                o.scrollTop += 1;
                if(o.scrollTop >= o.scrollHeight/2){
                    o.scrollTop = 0;
                }
            }else{
                clearInterval(t);
                setTimeout(start, obj.delay);
            }
        }
        setTimeout(start, obj.delay);
    }

    /**
     * 回到顶部
     */
    toTop(obj){
        this.ele = document.querySelector(obj.ele);
        var bodyScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop, // 可滚动区域/元素的滚动距离
        //  window.scrollTo(0, 0)

        raf = requestAnimationFrame(function fn(){
                bodyScroll -= obj.speed
                console.log(bodyScroll)
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop = bodyScroll
                }else if(window.pageYOffset){
                    window.pageYOffset = bodyScroll
                }else{
                    document.body.scrollTop = bodyScroll
                }
                raf = requestAnimationFrame(fn)
            if(bodyScroll < 0){
                cancelAnimationFrame(raf)
            }
        })


        // var a = 1;
        // requestAnimationFrame(function aa() {
        //     a ++
        //     console.log(a)
        //     requestAnimationFrame(aa)
        // })
    }

    /**
     * 进度条
     */
    pmgressbar(obj){
        var pmgressbar = document.querySelector(obj.ele), pmgressbarWidth = tjs.getStyle(pmgressbar, 'width'), speed = 0,
        raf = requestAnimationFrame(function fn(){
            speed += 5
            pmgressbar.style.width = speed + 'px'
            console.log(window.innerWidth)
            // console.log(tjs.getStyle(pmgressbar, 'width'))
            raf = requestAnimationFrame(fn)
            if(parseInt(tjs.getStyle(pmgressbar, 'width')) >= window.innerWidth){
                cancelAnimationFrame(raf)
                pmgressbar.style.width = window.innerWidth + 'px'
            }
        })

    }

    /**
     *  获取iP地址
     */
    getUserIP(onNewIP) {
        // onNewIp - your listener function for new IPs
        // compatibility for firefox and chrome
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var pc = new myPeerConnection({
                iceServers: []
            }),
            noop = function() {},
            localIPs = {},
            ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
            key;

        function iterateIP(ip) {
            if (!localIPs[ip]) onNewIP(ip);
            localIPs[ip] = true;
        }

        //create a bogus data channel
        pc.createDataChannel("");

        // create offer and set local description
        pc.createOffer().then(function(sdp) {
            sdp.sdp.split('\n').forEach(function(line) {
                if (line.indexOf('candidate') < 0) return;
                line.match(ipRegex).forEach(iterateIP);
            });

            pc.setLocalDescription(sdp, noop, noop);
        }).catch(function(reason) {
            // An error occurred, so handle the failure to connect
        });

        //sten for candidate events
        pc.onicecandidate = function(ice) {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
    }

    /**
     *  ajax
     */
    ajax(obj) {
        //1. 创建一个xmlhttpRequest对象
        var req = createRequest();
        //2. 设置回调监听
        req.onreadystatechange = function () {
            if(req.readyState === 4 && req.status === 200){
                var result = req.responseText;
                // alert(result);
                obj.success(result)
            }
            if(req.status !== 200){
                obj.err('err')
                // console.log(err)
                // throw new Error(req.responseText)
            }
        };
        //3. 打开一个连接
        req.open("get", obj.url, true);
        //4. 发请求
        req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        req.send();
        function createRequest () {
            var xmlhttp;
            if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            return xmlhttp;
        }
    }

}