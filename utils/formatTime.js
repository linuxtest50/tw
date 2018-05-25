/**
 * 时间格式化
 * @param {Object} formatTime Sun May 06 2018 10:57:59 GMT+0800 (中国标准时间)
 * @param {Object} formatStyle yyyy年MM月dd日 hh:mm:ss 星期w
 */
function timeFormat(formatTime, formatStyle) {
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
}

/**
 * 获取n天前后的时间对象
 * @param {Object} n代表天数,加号表示未来n天的此刻时间,减号表示过去n天的此刻时间
 */
function timeBefore(n) {
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
}
/**
 * 计算时间差
 * @param startTime 开始时间 xxxx-xx-xx
 * @param endTime 结束时间 xxxx-xx-xx
 * @param diffType 显示类型
 * @returns
 */
function getDateDiff(startTime, endTime, diffType) {
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
}
