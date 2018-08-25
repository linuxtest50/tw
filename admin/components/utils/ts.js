// document.onkeydown = function () {
//     if (window.event && window.event.keyCode === 123) {
//         event.keyCode = 0;
//         event.returnValue = false;
//         return false;
//     }
// };
tjs.reqAniFrame()

/*table 更多*/
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

/*input*/
function inputCom() {
    var sendCode = document.querySelector('.t-input-verify>label');
    if(!sendCode)return
    sendCode.onclick = function () {
        var flag = 60, that = this;
        if(that.innerHTML !== '获取验证码'){
            return
        }
        that.innerHTML = flag + '秒后重新发送'
        var timer = setInterval(function () {
            flag--;
            that.innerHTML = flag + '秒后重新发送'
            if(flag === 0){
                clearInterval(timer)
                that.innerHTML = '获取验证码'
            }
        }, 1000)
    }
    // tjs.throttle()
}
inputCom()

/*select*/
function selectCom() {
    var sel = document.querySelectorAll('.t-select>p'), optionItem = document.querySelectorAll('.t-select>ul>li'),
        option = document.querySelectorAll('.t-select>ul'), optionIcon = document.querySelectorAll('.t-select>.t-select-icon');

    for (var j = 0; j < optionItem.length; j++) {
        (function (i) {
            optionItem[i].onclick =  function () {
                // console.log(i);
                var that = this
                this.parentNode.previousElementSibling.innerHTML = this.innerHTML;
                tjs.removeClass(this.parentNode, 'transitionDropIn')
                tjs.addClass(this.parentNode, 'transitionDropOut')
                setTimeout(function () {
                    that.parentNode.style.display = 'none'
                },500)
            }
        }(j))
    }
    for (var k = 0; k < sel.length; k++) {
        // console.log(option[k])
        sel[k].innerHTML = option[k].firstElementChild.innerHTML;
        (function (i) {
            optionIcon[i].onclick = sel[i].onclick = function () {
                for (var j = 0; j < sel.length; j++) {
                    option[j].style.display = 'none'
                }
                option[i].style.display = 'block'
                tjs.removeClass(option[i], 'transitionDropOut')
                tjs.addClass(option[i], 'transitionDropIn')
            }
        }(k))
    }
}
selectCom()

/*radio*/
function radioCom() {
    var radio = document.querySelectorAll('.t-radio');
    for (var i = 0; i < radio.length; i++) {
        radio[i].querySelector('label').onclick = function () {
            var use = this.parentNode.parentNode.querySelectorAll('use')
            for (var j = 0; j < use.length; j++) {
                use[j].setAttribute('xlink:href', '#icon-mxz1')
            }
            this.previousElementSibling.firstElementChild.setAttribute('xlink:href', '#icon-xz1')
        }
    }
}
radioCom()

/*checkbox*/
function checkboxCom() {
    var checkbox = document.querySelectorAll('.t-checkbox');
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].querySelector('label').onclick = function () {
            // var use = this.parentNode.parentNode.querySelectorAll('use')
            if(this.previousElementSibling.firstElementChild.getAttribute('xlink:href') === '#icon-dmxz'){
                this.previousElementSibling.firstElementChild.setAttribute('xlink:href', '#icon-dxz')
            }else{
                this.previousElementSibling.firstElementChild.setAttribute('xlink:href', '#icon-dmxz')
            }
        }
    }
}
checkboxCom()




class TS {
    constructor(){

    }

    /**
     * 右键
     */
    keyRight(){
        var box=document.getElementById("keyRight"), keybox = document.querySelector('.key_right');
        if(!keybox)return
        keybox.oncontextmenu=function(ev){
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
        var ele = document.querySelector('.t-pop'), that = this;
        if(tjs.getStyle(ele, 'display') === 'block'){
            console.log('点快啦')
            return
        }
        ele.innerHTML = obj.text;
        obj.speed = 30
        obj.target = obj.target || 10
        ele.style.cssText += ';opacity:1;display:block;position:fixed;left:auto;right:auto;top:auto;bottom:auto';
        var popWidth = document.querySelector('.t-pop').offsetWidth,
        popHeight = document.querySelector('.t-pop').offsetHeight; // 不能获取隐藏元素的offsetHeight
        // 判断类型
        console.log(popWidth)
        if(obj.type === 't-success'){
            insertIcon("✔ ")
            obj.speed = 7
            tjs.addClass(ele, 't-success')
        }else if(obj.type === 't-err'){
            insertIcon("× ")
            obj.speed = 5
            tjs.addClass(ele, 't-err')
        }else if(obj.type === 't-info'){
            insertIcon("▪ ")
            tjs.addClass(ele, 't-info')
        }else if(obj.type === 't-warning'){
            insertIcon("! ")
            tjs.addClass(ele, 't-warning')
        }else if(obj.type === 't-alert'){
            obj.speed = 25
            tjs.addClass(ele, 't-alert')
        }

        // 判断方向
        if(obj.attr === 'top'){
            ele.style.left = 'calc(50% - '+ popWidth/2 +'px)'
            ele.style.top = -popHeight + 'px'
        }else if(obj.attr === 'bottom'){
            ele.style.left = 'calc(50% - '+ popWidth/2 +'px)'
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
                        ele.style.cssText += ';display:none;opacity:0;position:static;left:auto;right:auto;top:auto;bottom:auto'
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
        var bodyScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; // 可滚动区域/元素的滚动距离
        //  window.scrollTo(0, 0)
        console.log(bodyScroll)

        // var raf = requestAnimationFrame(function fn(){
        //     if(bodyScroll>obj.target){
        //         // bodyScroll -= obj.speed
        //         // if(document.documentElement.scrollTop){
        //         //     document.documentElement.scrollTop = bodyScroll
        //         // }else if(window.pageYOffset){
        //         //     window.pageYOffset = bodyScroll
        //         // }else{
        //         //     document.body.scrollTop = bodyScroll
        //         // }
        //         // raf = requestAnimationFrame(fn)
        //         // if(bodyScroll <= obj.target){
        //         //     cancelAnimationFrame(raf)
        //         // }
        //     }else{
        //         console.log(bodyScroll)
        //         bodyScroll += obj.speed
        //         if(document.documentElement.scrollTop){
        //             document.documentElement.scrollTop = bodyScroll
        //         }else if(window.pageYOffset){
        //             window.pageYOffset = bodyScroll
        //         }else{
        //             document.body.scrollTop = bodyScroll
        //         }
        //         raf = requestAnimationFrame(fn)
        //         // if(bodyScroll >= obj.target){
        //         //     cancelAnimationFrame(raf)
        //         // }
        //     }
        // })

        if(bodyScroll>obj.target){
            console.log('向上滚')
            var raf = requestAnimationFrame(function fn(){
                bodyScroll -= obj.speed
                // if(document.documentElement.scrollTop){
                //     document.documentElement.scrollTop = bodyScroll
                // }else if(window.pageYOffset){
                //     window.pageYOffset = bodyScroll
                // }else{
                //     document.body.scrollTop = bodyScroll
                // }
                window.pageYOffset = bodyScroll
                document.body.scrollTop = bodyScroll
                document.documentElement.scrollTop = bodyScroll
                raf = requestAnimationFrame(fn)
                if(bodyScroll < obj.target){
                    cancelAnimationFrame(raf)
                    window.pageYOffset = obj.target
                    document.body.scrollTop = obj.target
                    document.documentElement.scrollTop = obj.target
                }
            })
        }else{
            console.log('向下滚')
            var rafs = requestAnimationFrame(function fn(){
                bodyScroll += obj.speed

                window.pageYOffset = bodyScroll
                document.body.scrollTop = bodyScroll
                document.documentElement.scrollTop = bodyScroll

                // console.log(document.documentElement.scrollTop)
                rafs = requestAnimationFrame(fn)
                if(bodyScroll > obj.target){
                    cancelAnimationFrame(rafs)
                    window.pageYOffset = obj.target
                    document.body.scrollTop = obj.target
                    document.documentElement.scrollTop = obj.target
                }
            })
        }

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
     * 获取iP地址
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
     * ajax
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

    /**
     * 滚动监听
     */
    listenScroll(obj){
        var aside = document.querySelector(obj.nav), asideItem = document.querySelectorAll(obj.item), asideTop = aside.offsetTop,
            beforeScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop, that = this;
        window.onscroll = function () {
            var afterScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
            scrollDir = afterScroll - beforeScroll;
            // 元素距离document顶部距离 - 滚动条滚动距离 = 元素距离浏览器顶部距离
            // console.log(document.documentElement.scrollTop)
            if(asideTop - document.documentElement.scrollTop < obj.top){
                aside.style.cssText = ';position:fixed;top:'+ obj.top + 'px;'
            }
            // 判断滚动条方向
            if(scrollDir>0){
                // console.log('下')
                addColor()
                // for (var i = 0; i < asideItem.length; i++) {
                //     if(asideItem[i].parentNode.offsetTop <= document.documentElement.scrollTop){
                //         tjs.addClass(aside.children[0].children[i], 't-color')
                //     }
                //     if(asideItem[i].parentNode.offsetTop <= document.documentElement.scrollTop - parseInt(tjs.getStyle(asideItem[i].parentNode, 'height'))){
                //         tjs.removeClass(aside.children[0].children[i], 't-color')
                //     }
                // }
            }else{
                // console.log('上')
                if(afterScroll <= asideTop){
                    aside.style.cssText = ';position:static;top:auto'
                }
                addColor()
            }
            beforeScroll = afterScroll
        }

        function addColor() {
            for (var i = 0; i < asideItem.length; i++) {
                var scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                asideItemTop = asideItem[i].parentNode.offsetTop - scroll
                // console.log(asideItemTop)
                if(asideItemTop <= 0 && asideItemTop > -parseInt(tjs.getStyle(asideItem[i].parentNode, 'height'))){
                    tjs.addClass(aside.children[0].children[i], 't-color')
                }else{
                    tjs.removeClass(aside.children[0].children[i], 't-color')
                }
            }
        }
        /*锚点定位*/
        for (var i = 0; i < aside.children[0].children.length; i++) {
            (function (j) {
                aside.children[0].children[j].onclick = function () {
                    that.toTop({
                        speed: 50, // 速度
                        target: asideItem[j].parentNode.offsetTop// 目标位置
                    })
                }
            }(i))
        }

        // //滚动事件 firefox
        // if (document.addEventListener) {
        //     document.addEventListener('DOMMouseScroll', scrollFunc, false);
        // }
        // //ie 谷歌
        // window.onmousewheel = document.onmousewheel = scrollFunc;
        // function scrollFunc(e) {
        //     e = e || window.event;
        //     // console.log(asideTop)
        //     this.bodyTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        //     // console.log(e)
        //     if (e.wheelDelta) {  //IE，谷歌
        //         if (e.wheelDelta > 0) {
        //             // console.log('上')
        //             if (this.bodyTop < asideTop) {
        //                 aside.style.cssText = ';position:static;top:auto'
        //                 flag = false
        //             }
        //         } else {
        //             flag = true
        //             // console.log(asideItem.length)
        //             for (var i = 0; i < asideItem.length; i++) {
        //                 // console.log(asideItem[0].parentNode.offsetTop)
        //                 // console.log(this.bodyTop)
        //                 if (asideItem[i].parentNode.offsetTop < this.bodyTop + 120) {
        //                     // console.log(tjs.getStyle(asideItem[i].parentNode, 'height'))
        //                     // console.log(asideItem[i].parentNode.offsetTop)
        //                     tjs.addClass(aside.children[0].children[i], 't-color')
        //
        //                 }
        //                 // if(asideItem[i].parentNode.offsetTop < this.bodyTop + parseInt(tjs.getStyle(asideItem[i].parentNode, 'height'))){
        //                 //     console.log(i)
        //                 //     tjs.removeClass(aside.children[0].children[i], 't-color')
        //                 // }
        //             }
        //         }
        //     } else if (e.detail) {  //Firefox
        //         if (e.detail < 0) {
        //             // console.log('上')
        //
        //         } else {
        //
        //         }
        //     }
        //
        // }

    }

    /**
     * 城市联动
     */
    chinaLinkage() {
        var province = document.querySelector('.t-china-linkage .province'), city = document.querySelector('.t-china-linkage .city'),
            area = document.querySelector('.t-china-linkage .area'), street = document.querySelector('.t-china-linkage .street'),
            cp = document.querySelector('.city').previousElementSibling, ap = document.querySelector('.area').previousElementSibling,
            sp = document.querySelector('.street').previousElementSibling, cselects = document.querySelectorAll('.t-china-linkage .t-select');
        require.config({
            paths : {
                text : 'https://cdn.bootcss.com/require-text/2.0.12/text',
                json : 'https://cdn.bootcss.com/requirejs-plugins/1.0.3/json' //alias to plugin
            }
        });
        require(['json!./utils/china.json'], function (dataJson) {
            // console.log(dataJson)
            for (var i = 0; i < dataJson.length; i++) {
                province.innerHTML += '<li>'+ dataJson[i].name + '</li>'
            }
            // 省
            var pliIndex, cliIndex;
            province.onclick = function (event) {
                var e = event || window.event;
                cp.innerHTML = '请选择城市';
                ap.innerHTML = '请选择区县';
                sp.innerHTML = '请选择乡镇';
                if(e.target.nodeName.toLowerCase() === "li"){
                    var pliArr = e.target.parentNode.children;
                    pliIndex = Array.prototype.indexOf.call(pliArr, e.target);
                    console.log(pliIndex)
                    city.innerHTML = '<li>请选择城市</li>'
                    area.innerHTML = '<li>请选择区县</li>'
                    street.innerHTML = '<li>请选择乡镇</li>'
                    if(pliIndex){
                        var thisCityArr = dataJson[pliIndex - 1].children;
                        if(thisCityArr.length > 6){
                            city.style.cssText += ';height:266px; overflow-y:auto'
                        }else{
                            city.style.cssText += ';height:auto;'
                        }
                        for (var j = 0; j < thisCityArr.length; j++) {
                            city.innerHTML += '<li>'+ thisCityArr[j].name + '</li>'
                        }
                    }
                    tjs.removeClass(this, 'transitionDropIn')
                    tjs.addClass(this, 'transitionDropOut')
                    var that = this
                    setTimeout(function () {
                        that.style.display = 'none'
                    },500)
                    this.previousElementSibling.innerHTML = e.target.innerHTML
                }
            }
            // 市
            city.onclick = function (event) {
                var e = event || window.event;
                ap.innerHTML = '请选择区县';
                sp.innerHTML = '请选择乡镇';
                if(e.target.nodeName.toLowerCase() === "li"){
                    var cliArr = e.target.parentNode.children;
                    cliIndex = Array.prototype.indexOf.call(cliArr, e.target);
                    area.innerHTML = '<li>请选择区县</li>'
                    street.innerHTML = '<li>请选择乡镇</li>'
                    if(cliIndex){
                        var thisAreaArr = dataJson[pliIndex - 1].children[cliIndex - 1].children;
                        if(thisAreaArr.length > 6){
                            area.style.cssText += ';height:266px; overflow-y:auto'
                        }else{
                            area.style.cssText += ';height:auto'
                        }
                        for (var j = 0; j < thisAreaArr.length; j++) {
                            area.innerHTML += '<li>'+ thisAreaArr[j].name + '</li>'
                        }
                    }
                    tjs.removeClass(this, 'transitionDropIn')
                    tjs.addClass(this, 'transitionDropOut')
                    var that = this
                    setTimeout(function () {
                        that.style.display = 'none'
                    },500)
                    this.previousElementSibling.innerHTML = e.target.innerHTML
                }
            }
            // 县
            area.onclick = function (event) {
                var e = event || window.event;
                sp.innerHTML = '请选择乡镇';
                if(e.target.nodeName.toLowerCase() === "li"){
                    var aliArr = e.target.parentNode.children;
                    var aliIndex = Array.prototype.indexOf.call(aliArr, e.target);
                    street.innerHTML = '<li>请选择乡镇</li>'
                    if(aliIndex){
                        var thisStreetArr = dataJson[pliIndex - 1].children[cliIndex - 1].children[aliIndex - 1].children;
                        if(thisStreetArr.length > 6){
                            street.style.cssText += ';height:266px; overflow-y:auto'
                        }else{
                            street.style.cssText += ';height:auto;'
                        }
                        for (var j = 0; j < thisStreetArr.length; j++) {
                            street.innerHTML += '<li>'+ thisStreetArr[j].name + '</li>'
                        }
                    }
                    tjs.removeClass(this, 'transitionDropIn')
                    tjs.addClass(this, 'transitionDropOut')
                    var that = this
                    setTimeout(function () {
                        that.style.display = 'none'
                    },500)
                    this.previousElementSibling.innerHTML = e.target.innerHTML
                }
            }
            // 乡
            street.onclick = function (event) {
                var e = event || window.event;
                if(e.target.nodeName.toLowerCase() === "li"){
                    tjs.removeClass(this, 'transitionDropIn')
                    tjs.addClass(this, 'transitionDropOut')
                    var that = this
                    setTimeout(function () {
                        that.style.display = 'none'
                    },500)
                    this.previousElementSibling.innerHTML = e.target.innerHTML
                }
            }

            for (var j = 0; j < cselects.length; j++) {
                cselects[j].onclick = function () {
                    if(this.querySelector('ul').children.length < 8){
                        this.querySelector('ul').style.cssText += ';height:auto'
                    }
                };
            }
        })
    }



}