
class TS {
    constructor(){
        this.popWidth = document.querySelector('.t-pop').offsetWidth
        this.popHeight = document.querySelector('.t-pop').offsetHeight
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
            hourEle = document.querySelector(obj.hour),
            minuteEle = document.querySelector(obj.minute),
            secondEle = document.querySelector(obj.second);
        clearTime = setInterval(function () {
            backTime(obj);
        },1000);
        function backTime(obj){
            let nowDate = new Date(),
                setDate = new Date(obj.date),
                newDate = (setDate.getTime() - nowDate.getTime())/1000,
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
    };

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
        var ele = document.querySelector('.t-pop'),that = this;
        ele.innerHTML = obj.text;
        obj.speed = 10
        obj.target = obj.target || 10
        ele.style.cssText += ';opacity:1;display:block;position:fixed;left:auto;right:auto;top:auto;bottom:auto'
        // 判断类型
        if(obj.eleTag === 't-success'){
            insertIcon("✔ ")
            this.addClass(ele, 't-success')
        }else if(obj.eleTag === 't-err'){
            insertIcon("× ")
            this.addClass(ele, 't-err')
        }else if(obj.eleTag === 't-info'){
            insertIcon("▪ ")
            this.addClass(ele, 't-info')
        }else if(obj.eleTag === 't-warning'){
            insertIcon("! ")
            this.addClass(ele, 't-warning')
        }else if(obj.eleTag === 't-alert'){
            obj.speed = 30
            this.addClass(ele, 't-alert')
        }
        console.log(this.popWidth)
        // 判断方向
        if(obj.attr === 'top'){
            ele.style.left = 'calc(50% - 300px)'
            ele.style.top = -this.popHeight + 'px'
        }else if(obj.attr === 'bottom'){
            ele.style.left = 'calc(50% - 300px)'
            ele.style.bottom = -this.popHeight + 'px'
        }else if(obj.attr === 'left'){
            ele.style.left = -this.popWidth + 'px'
        }else if(obj.attr === 'right'){
            ele.style.right = -this.popWidth + 'px'
        }

        clearInterval(ele.timer);
        ele.timer = setInterval(function() {
            var oldValue = parseInt(that.getStyle(ele, obj.attr));
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
                        that.removeClass(ele, obj.eleTag)
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

    };

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
                if(that.hasClass(siblings[k].children[index], cls)){
                    that.removeClass(siblings[k].children[index], cls)
                }
            }
            that.addClass(self, cls)
        }
        for (var i = 0; i < linkageArr.length; i++) {
            linkageArr[i].onclick = function () {
                var myself = this.parentNode;
                if(this.nextElementSibling){
                    console.log(that.hasClass(this.nextElementSibling, 't-linkage-show'))
                    if(!that.hasClass(this.nextElementSibling, 't-linkage-show')){
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
     *  公共方法
     */
    // 获取外部样式
     getStyle(eleArg, attrArg) {
        try {
            return getComputedStyle(eleArg, null)[attrArg];
        } catch (e) {
            return eleArg.currentStyle[attrArg];
        }
    }
        // 判断是否有class
    hasClass(eleArg, cn) {
        //获取obj的class
        var className = eleArg.className;
        //创建正则表达式
        var cnReg = new RegExp("\\b" + cn + "\\b");
        return cnReg.test(className);
    }
    addClass(eleArg, cn) {
        //如果已经有了该class了，则不再添加
        if (!this.hasClass(eleArg, cn)) {
            //如果没有该class，则添加
            eleArg.className += " " + cn;
        }
    }
    removeClass(eleArg, cn) {
        //创建正则表达式
        var cnReg = new RegExp("\\b" + cn + "\\b");
        eleArg.className = eleArg.className.replace(cnReg, "");
    }
}