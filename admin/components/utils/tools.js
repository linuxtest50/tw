/**
 *  js函数库
 *  1. move            给元素加动态效果
 *  2. getStyle        动态的获取元素的指定的样式 可获取外部样式
 *  3. getEleByClass   自定义getElementsByClassName()方法 兼容
 *  4. addClass        给元素添加class
 *  5. hasClass        判断是否有class
 *  6. removeClass     移除元素class
 *  7. toggleClass     切换元素class
 *  8. bind            兼容浏览器事件绑定
 *  9. stopPropagation 阻止冒泡方法
 * 10. preventDefault  取消默认行为
 * 11. deepClone       深拷贝
 * 12. debounce        防止抖动
 * 13. throttle        在一段时间内只允许函数执行一次
 * 14. debounces       在短时间内多次触发同一个函数，只执行最后一次，或者只在开始时执行
 * 15. cssTransform    给元素添加一个获取，设置2D变化值的方法
 * 16. getRandomColor  获取随机颜色
 * 17. timeFormat      时间格式化
 * 18. timeBefore      获取n天前后时间
 * 19. getDateDiff     计算时间差
 *
 */

var tjs = {
    /**
     * 元素动态效果
     * @param {Object} obj 元素
     * @param {Object} attr 需要变动的属性
     * @param {Object} target 目标值
     * @param {Object} speed 速度
     * @param {Object} callBack 结束回调
     */
    move: function (obj, attr, target, speed, callBack) {
    //需要为每一个元素指定一个自己的timer来保存定时器
    //创建定时器之前，停止之前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var oldValue = parseInt(getStyle(obj, attr));
        //判断元素的移动方向
        //判断oldValue 和 target之间的关系
        if (oldValue > target) {
            var newValue = oldValue - speed;
            //如果新的值小于目标值，则让新值等于目标值
            if (newValue < target) {
                newValue = target;
            }
        } else {
            var newValue = oldValue + speed;
            //在赋值之前判断
            if (newValue > target) {
                newValue = target;
            }
        }
        //修改box1的left属性值
        obj.style[attr] = newValue + "px";
        //如果box1的left属性值是800px时，则停止定时器
        if (newValue == target) {
            //停止定时器
            clearInterval(obj.timer);
            //判断是否有回调函数，如果有则调用，如果没有就不调用
            if (callBack) {
                //调用回调函数
                callBack();
            }
        }
    }, 30);
},


	/**
	 * 动态的获取元素的指定的样式
	 * @param {Object} obj 获取样式的对象
	 * @param {Object} attr 获取的样式的名字
	 */
    getStyle: function (obj, attr) {
		try {
			return getComputedStyle(obj, null)[attr];
		} catch (e) {
			return obj.currentStyle[attr];
		}
	},


	/**
	 * 自定义一个getElementsByClassName()方法
	 * @param {Object} cn 类名
	 */
    getEleByClass: function (cn) {
		//定义一个数组，用来保存结果
		var result = [];
		//定义一个正则表达式检查是否包含指定的class
		// \b单词\b
		var reg = new RegExp("\\b" + cn + "\\b");
		//查询所有的元素
		var allEles = document.all;
		//遍历所有的元素
		for (var i = 0; i < allEles.length; i++) {
			//判断当前的元素的className属性是否和cn匹配
			var className = allEles[i].className;
			//判断className和cn是否相等
			if (reg.test(className)) {
				//将元素添加到结果中
				result.push(allEles[i]);
			}
		}
		return result;
	},


	/**
	 * 创建一个函数，专门用来向元素中添加class
	 * @param {Object} obj 元素
	 * @param {Object} cn 类名
	 */
    addClass: function (obj, cn) {
		//如果已经有了该class了，则不再添加
		if (!tjs.hasClass(obj, cn)) {
			//如果没有该class，则添加
			obj.className += " " + cn;
		}
	},


	/**
	 * 判断当前元素中是否包含某个class属性
	 * @param {Object} obj
	 * @param {Object} cn
	 */
    hasClass: function (obj, cn) {
		//获取obj的class
		var className = obj.className;
		//创建正则表达式
		var cnReg = new RegExp("\\b" + cn + "\\b");
		return cnReg.test(className);
	},


	/**
	 * 从元素中移除一个class
	 * @param {Object} obj
	 * @param {Object} cn
	 */
    removeClass: function (obj, cn) {
		//创建正则表达式
		var cnReg = new RegExp("\\b" + cn + "\\b");
		obj.className = obj.className.replace(cnReg, "");
	},


	/**
	 * 切换一个元素的class，如果当前元素有该class，则删除， 如果没有，则添加
	 * @param {Object} obj
	 * @param {Object} cn
	 */
    toggleClass: function (obj, cn) {
		//判断当前类是否包含cn
		if (hasClass(obj, cn)) {
			//包含当前cn,删除
			removeClass(obj, cn);
		} else {
			//不包含当前class，添加
			addClass(obj, cn);
		}
	},


	/**
	 * 绑定事件兼容方法
	 * @param {Object} obj 元素
	 * @param {Object} eventStr 事件类型
	 * @param {Object} callBack 回调
	 */
    bind: function (obj , eventStr , callBack){
		//addEventListener：正常浏览器支持
		if(obj.addEventListener){
			obj.addEventListener(eventStr , callBack , false);
		}else{
			//attachEvent：ie支持
			obj.attachEvent("on"+eventStr,function(){
				callBack.call(obj);
			});
		}

	},


	/**
	 * 阻止冒泡方法
	 * @param {Object} event 事件对象
	 */
    stopPropagation: function (event) {
		if(stopPropagation){
			event.stopPropagation();//(兼容老版chrome，firefox，IE8以上支持)
		}else{
			event.cancelBubble=true;
		}
	},


	/**
	 * 取消默认行为
	 * @param {Object} ev 事件对象
	 */
    preventDefault: function (ev) {
		if(ev.preventDefault){
			//取消火狐默认行为
			ev.preventDefault();
		}//取消IE默认行为
		return false;
	},


	/**
	 * 深拷贝
	 * @param {Object} initalObj 目标对象
	 * @param {Object} finalObj 拷贝对象
	 */
    deepClone: function (initalObj, finalObj) {
		var obj = finalObj || {};
		for (var i in initalObj) {
			var prop = initalObj[i];
			// 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
			if(prop === obj) {
				continue;
			}
			if (typeof prop === 'object') {
				obj[i] = (prop.constructor === Array) ? [] : {};
				//arguments.callee指向当前正在执行的函数
				arguments.callee(prop, obj[i]);
			} else {
				obj[i] = prop;
			}
		}
		return obj;
	},


	/**
	 * 防止抖动，解决在很短时间内触发多次事件，例如scroll
	 * @param {Object} fun 事件方法
	 * @param {Object} time 时间
	 */
    debounce: function (fun,time){
		let timer = null;
		return function(){
			let that = this;
			let args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function(){
				fun.apply(that,args);
			},time)
		}
	},


	/**
	 * 在一段时间内只允许函数执行一次
	 * @param {Object} func 事件
	 * @param {Object} delay 时间
	 */
    throttle: function (func, delay) {
		var prev = Date.now();
		return function() {
			var context = this;
			var args = arguments;
			var now = Date.now();
			if(now - prev >= delay) {
				func.apply(context, args);
				prev = Date.now();
			}
		}
	},


	/**
	 * 在短时间内多次触发同一个函数，只执行最后一次，或者只在开始时执行
	 * @param {Object} func 事件
	 * @param {Object} delay 时间
	 * @param {Object} immediate Boolean 是否立即执行
	 */
    debounces: function (func, delay, immediate) {
		var timer = null;
		return function() {
			var context = this;
			var args = arguments;
			if(timer) clearTimeout(timer);
			if(immediate) {
				var doNow = !timer;
				timer = setTimeout(function() {
					timer = null;
				}, delay);
				if(doNow) {
					func.apply(context, args);
				}
			} else {
				timer = setTimeout(function() {
					func.apply(context, args);
				}, delay);
			}
		}
	},


	/**
	 * 定义一个函数，给元素添加一个获取，设置2D变化值的方法
	 * @param {Object} el 元素
	 * @param {Object} attr 属性
	 * @param {Object} val 值
	 */
    cssTransform: function (el, attr, val) {
		/*给元素添加一个属性对象*/
		if(!el.transform){
			el.transform = {};
		}
		/*判断是取值还是赋值*/
		if(arguments.length>2){
			/*给属性对象添加方法*/
			el.transform[attr] = val;
			/*定义一个变量接收变化类型的值*/
			var transValue = "";
			/*遍历处理不同类型的属性*/
			for (var transAttr in el.transform) {
				switch(transAttr) {
					case "rotate":  /*旋转*/
					case "skew":    /*变形*/
					case "skewX":
					case "skewY":
						transValue += transAttr+"("+ el.transform[transAttr] +"deg) ";
						break;
					case "translate":  /*位移*/
					case "translateX":
					case "translateY":
					case "translateZ":
						transValue += transAttr+"("+ el.transform[transAttr] +"px) ";
						break;
					case "scale":  /*缩放*/
					case "scaleX":
					case "scaleY":
						transValue += transAttr+"("+ el.transform[transAttr] +") ";
						break;
				}
			}
			/*给属性赋值*/
			el.style.WebkitTransform = el.style.transform = transValue;
		}else{
			/*取值*/
			var val = el.transform[attr];
			if(typeof val == "undefined"){
				if(attr == "scale" || attr == "scaleX" || attr == "scaleY"){
					val = 1;
				}else{
					val = 0;
				}
			}
			return val;
		}
	},


	/**
	 * 随机返回16进制颜色
	 * @returns {string}
	 */
    getRandomColor: function (){
		return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
	},


	/**
	 * 时间格式化
	 * @param {Object} formatTime Sun May 06 2018 10:57:59 GMT+0800 (中国标准时间)
	 * @param {Object} formatStyle yyyy年MM月dd日 hh:mm:ss 星期w
	 */
    timeFormat: function (formatTime, formatStyle) {
		Date.prototype.Format = function(formatStr) {
			var str = formatStr;
			var Week = ['日', '一', '二', '三', '四', '五', '六'];
			var timerArr = ['凌晨', '上午', '中午', '下午', '晚上'];
			var hour = this.getHours()
			var fomatHour = ''
			switch(true) {
				case hour >= 0 && hour <= 5:
					fomatHour = timerArr[0]
					break
				case hour > 5 && hour <= 11:
					fomatHour = timerArr[1]
					break
				case hour > 11 && hour <= 13:
					fomatHour = timerArr[2]
					break
				case hour > 13 && hour < 18:
					fomatHour = timerArr[3]
					break
				case hour >= 18 && hour <= 24:
					fomatHour = timerArr[4]
					break
			}
			str = str.replace(/yyyy|YYYY/, this.getFullYear());

			str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

			var month = this.getMonth() + 1;

			str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);

			str = str.replace(/M/g, month);

			str = str.replace(/w|W/g, Week[this.getDay()]);

			str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());

			str = str.replace(/d|D/g, this.getDate());

			//str = str.replace(/hh|HH/, this.getHours() > 9 ? fomatHour+this.getHours().toString() : fomatHour+'0' + this.getHours());
			str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());

			//str = str.replace(/h|H/g, fomatHour+this.getHours());
			str = str.replace(/h|H/g, this.getHours());

			str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());

			str = str.replace(/m/g, this.getMinutes());

			str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());

			str = str.replace(/s|S/g, this.getSeconds());

			return str;
		}
		return new Date(formatTime).Format(formatStyle) //yyyy年MM月dd日 hh:mm:ss 星期w
	},


	/**
	 * 获取n天前后的时间对象
	 * @param {Object} n代表天数,加号表示未来n天的此刻时间,减号表示过去n天的此刻时间
	 */
    timeBefore: function (n) {
		var date = new Date();
		var milliseconds = date.getTime() - 1000 * 60 * 60 * 24 * n;
		// getTime()方法返回Date对象的毫秒数,但是这个毫秒数不再是Date类型了,而是number类型,所以需要重新转换为Date对象,方便格式化
		var newDate = new Date(milliseconds);
		console.log(newDate)
		var dateObj = {
			allFormat: timeFormat(newDate, 'yyyy-MM-dd hh:mm:ss'),
			yearFormat: timeFormat(newDate, 'yyyy'),
			monthFormat: timeFormat(newDate, 'MM'),
			dayFormat: timeFormat(newDate, 'dd'),
			hoursFormat: timeFormat(newDate, 'hh'),
			minuteFormat: timeFormat(newDate, 'mm'),
		}
		return dateObj
		// console.log(timeFormat(newDate,'yyyy-MM-dd hh:mm'))
	},


	/**
	 * 计算时间差
	 * @param startTime 开始时间 xxxx-xx-xx
	 * @param endTime 结束时间 xxxx-xx-xx
	 * @param diffType 显示类型
	 * @returns
	 */
    getDateDiff: function (startTime, endTime, diffType) {
		//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
		startTime = startTime.replace(/\-/g, "/");
		endTime = endTime.replace(/\-/g, "/");
		//将计算间隔类性字符转换为小写
		diffType = diffType.toLowerCase();
		var sTime =new Date(startTime); //开始时间
		var eTime =new Date(endTime); //结束时间
		//作为除数的数字
		var timeType =1;
		switch (diffType) {
			case"second":
				timeType =1000;
				break;
			case"minute":
				timeType =1000*60;
				break;
			case"hour":
				timeType =1000*3600;
				break;
			case"day":
				timeType =1000*3600*24;
				break;
			default:
				break;
		}
		return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
	},


    /*requestAnimationFrame*/
    reqAniFrame: function() {
		(function() {
			var lastTime = 0;
			var vendors = ['webkit', 'moz'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
			}

			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); },
						timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};

			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
		}());
	}

}











