/**
 * 日期插件
 */
var startNowDatePoor, startEndDatePoorSecond, startDateStr, endDateStr, nowDateStr, startTimeObj, endTimeObj, isSelect = false
layui.use(['laydate', 'form'], function(){
    var laydate = layui.laydate, $ = layui.$;
    // $('.date_plugin').hide()
    $('.mytime_input').val()
    $('.mytime_input').focus(function () {
        $(this).val('')
    })
    var mydate = laydate.render({
        elem: '.date_plugin',
        type: 'datetime',
        show: false,
        max: new Date().getTime(),
        value: '', //
        btns: ['futureSevenday','futureThirtyday','futureHalfyear','futureOneyear',
            'thirtyday','halfyear','oneyear',
            'clear','confirm','onedayconfirm'],
        ready: function(date){
            // isSelect = true
            // $('.laydate-btns-confirm').addClass('laydate-disabled')
            console.log('点击日期')
            // console.log(date)
            var todayBtn = $(".laydate-btns-today"), sevendayBtn = $(".laydate-btns-sevenday"), thirtydayBtn = $(".laydate-btns-thirtyday"),
                halfyearBtn = $(".laydate-btns-halfyear"), oneyearBtn = $(".laydate-btns-oneyear"),
                // longagoBtn = $(".laydate-btns-longago"),
                onedayconfirm = $(".laydate-btns-onedayconfirm");
            todayBtn.text('今天'); sevendayBtn.text('过去7天'); thirtydayBtn.text('过去30天'); halfyearBtn.text('过去半年');oneyearBtn.text('过去一年');
            // longagoBtn.text('更久远')
            onedayconfirm.text('确认').css('color', 'red').hide();

            var futureSevendayBtn = $(".laydate-btns-futureSevenday"),
                futureThirtydayBtn = $(".laydate-btns-futureThirtyday"),
                futureHalfyearBtn = $(".laydate-btns-futureHalfyear"),
                futureOneyearBtn = $(".laydate-btns-futureOneyear");
                // futureAfterOneyearBtn = $(".laydate-btns-futureAfterOneyear");
            futureSevendayBtn.text('未来7天');
            futureThirtydayBtn.text('未来30天');
            futureHalfyearBtn.text('未来半年');
            futureOneyearBtn.text('未来一年');
            // futureAfterOneyearBtn.text('一年以后');
            futureOneyearBtn.after('<br/>')
			// console.log($('<br/>'))

            // 今天
            todayBtn.click(function(){ showTimeScope(0) })
            // 过去7天
            sevendayBtn.click(function(){ showTimeScope(7) })
            // 过去30天
            thirtydayBtn.click(function(){ showTimeScope(30) })
            // 过去半年
            halfyearBtn.click(function(){ showTimeScope(180) })
            // 过去一年
            oneyearBtn.click(function(){ showTimeScope(365) })
            // 一年以前 更久远
            // longagoBtn.click(function(){ showTimeScope(366) })


            // 未来7天
            futureSevendayBtn.click(function () {showTimeScope(-7)})
            // 未来30天
            futureThirtydayBtn.click(function () {showTimeScope(-30)})
            // 未来半年
            futureHalfyearBtn.click(function () {showTimeScope(-180)})
            // 未来一年
            futureOneyearBtn.click(function () {showTimeScope(-365)})
            // 一年以后
            // futureAfterOneyearBtn.click(function () {showTimeScope(-366)})


            // $('.laydate-btns-confirm').addClass('laydate-disabled')
            $('.layui-laydate').delegate('td:not(td.laydate-disabled)', 'click',function () {
                isSelect = true
                var flag = $('.laydate-btns-confirm').hasClass('laydate-disabled')
                console.log(flag)
                // 点击一次
                if(flag){
                    onedayconfirm.show()
                    $('.laydate-btns-confirm').hide()
                    mydate.hint('若选择当前日期00:00 至 24:00，请点击确认按钮，否则再点一次')
                    // 判断是否为当天
                    // var selDay = parseInt($(this).text()), selHeader = $(this).parents('.layui-laydate-content').prev(),
                    //     selMonth = parseInt($(selHeader).find('span[lay-type = month]').text()) - 1,
                    //     selYear = parseInt($(selHeader).find('span[lay-type = year]').text()), nowTimerObj = mydate.config.max;
                    // // console.log(selMonth,selYear)
                    // // console.log(mydate.config.max)
                    // if(selDay === nowTimerObj.date && selMonth === nowTimerObj.month && nowTimerObj.year){
                    //     console.log(mydate.config.max)
                    // }
                }else{
                    onedayconfirm.hide()
                    $('.laydate-btns-confirm').show()
                }
            })

            // 当天事件
            onedayconfirm.click(function () {
                isSelect = false
                var selDay = $(this).parents('.layui-laydate').find('td.layui-this').attr('lay-ymd'),nowTimerObj = mydate.config.max,
                    nowTimer = nowTimerObj.year + '-' + parseInt(nowTimerObj.month+1) + '-' + nowTimerObj.date
                // 判断是否为当天
                // console.log(timeBefore(0).allFormat)
                if(selDay === nowTimer){
                    showTimeScope(0)
                }else{
                    var showTimerArr = selDay.split('-')
                    var showMonth = showTimerArr[1] < 10 ? 0+showTimerArr[1] : showTimerArr[1],
                        showDay = showTimerArr[2] < 10 ? 0+showTimerArr[2] : showTimerArr[2],
                        showTimer = showTimerArr[0] + '-' + showMonth + '-' + showDay,
                        startOnlyTime = showTimer + ' 00:00:00' + ' - ' + showTimer + " 24:00:00",
                        // 判断是否为一年以上
                        datePoor = getDateDiff(showTimer, timeBefore(0).allFormat, "day")
                    console.log('时间差:' + datePoor)
                    if(datePoor>365){
                        layer.alert("抱歉!您只能查看近期一年内的数据", function () {
                            window.location.reload()
                        })
                    }else{
                        $('.mytime_input').val(startOnlyTime)
                    }
                    // console.log(datePoor)
                    $('.layui-laydate').hide()
                }
                // console.log(selDay) //lay-ymd="2018-7-28"
            })
            // console.log(isSelect)

        },
        change: function(value, date, endDate){
            isSelect = true
            console.log('日期选定')
            startDateStr = date.year + '-' + date.month + '-' + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
            endDateStr = endDate.year + '-' + endDate.month + '-' + endDate.date + ' ' + endDate.hours + ':' + endDate.minutes + ':' + endDate.seconds;
            nowDateStr = timeBefore(0).allFormat
            startTimeObj = { allFormat : value.split(' - ')[0] }
            endTimeObj = { allFormat : value.split(' - ')[1] }
            // 时间差
            startNowDatePoor = getDateDiff(startDateStr, nowDateStr, "day")
            startEndDatePoorSecond = getDateDiff(startDateStr, endDateStr, "second");
            // 判断起始日期是否为同一天
            if(!startEndDatePoorSecond){
                mydate.hint('若起始日期为同一天，请在左下角选择不同的起始时间')
            }else{
                mydate.hint('您选择的时间范围为：' + '<br/>' + value + '<br/>' + '请点击确定按钮');
            }
            // console.log(tool)
        },
        done: function(value, date, endDate){
            if(!value || !isSelect){
                return
            }
            isSelect = false
            console.log('确定')
            //console.log(value); //得到日期生成的值，如：2017-08-18
            //console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            console.log(startEndDatePoorSecond)
            // mydate.hint(value)
            if(!startEndDatePoorSecond){
                layer.alert('若起始日期为同一天，请选择不同的起始时间', function () {
                    window.location.reload()
                })
            }
            // 显示类型
            // seleTimeLinkage(startDateStr, endDateStr)
        },
        range: true //或 range: '~' 来自定义分割字符
    });

    /**
     * 快捷键显示时间范围
     * @param num
     * @returns
     */
    function showTimeScope(num){
        var recentDate = timeBefore (num), nowDate = timeBefore (0);
        startNowDatePoor = num;
        if(num === 0){
            recentDate = nowDate.yearFormat + '-' + nowDate.monthFormat + '-' + nowDate.dayFormat + ' ' + '00:00:00'
            var todayTimeObj = {}
            todayTimeObj.allFormat = recentDate
            todayTimeObj.yearFormat = nowDate.yearFormat
            todayTimeObj.monthFormat = nowDate.monthFormat
            todayTimeObj.dayFormat = nowDate.dayFormat
            todayTimeObj.hoursFormat = 0
            todayTimeObj.minuteFormat = 0
            $('.mytime_input').val(recentDate + ' - ' + nowDate.allFormat)
            startTimeObj = todayTimeObj
            // seleTimeLinkage(recentDate, nowDate.allFormat)
        }else if(num > 0){ // 过去
            $('.mytime_input').val(recentDate.allFormat + ' - ' + nowDate.allFormat)
            if(num > 365){
                $('.mytime_input').val(0 + ' - ' + recentDate.allFormat)
            }
            startTimeObj = recentDate
            // seleTimeLinkage(recentDate.allFormat, nowDate.allFormat)
        }else{ // 未来
            $('.mytime_input').val(nowDate.allFormat + ' - ' + recentDate.allFormat)
            if(num < -365){
                $('.mytime_input').val(recentDate.allFormat + ' - ' + 0)
            }
            console.log(recentDate)
            startTimeObj = recentDate
        }
        $('#layui-laydate1').hide()
        endTimeObj = nowDate
    }

    /**
     * 根据时间范围选择显示类型
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @returns
     */
    function seleTimeLinkage(startTime, endTime){
        $('#timeType+div dd[lay-value=""]').click()
        // 开始到结束的时间差
        var startEndDatePoor = getDateDiff(startTime, endTime, "hour");

        // 开始时间距当天的时间差
        // console.log('时间跨度(小时)'+startEndDatePoor)
        // console.log('开始到今天的时间差(天)'+startNowDatePoor);
        // 隐藏所有类型
        $('#timeType+div dd[lay-value!=""]').hide()
        if(startNowDatePoor>=0 && startNowDatePoor<=7){
            // console.log('7天之内')
            if(startEndDatePoor>=0 && startEndDatePoor<=1){
                // console.log('0到1')
                $('#timeType+div dd[lay-value=2]').show()
            }else if(startEndDatePoor>1 && startEndDatePoor<=24){
                // console.log('1到24')
                $('#timeType+div dd[lay-value=1],#timeType+div dd[lay-value=2]').show()
            }else{
                // console.log('24到168')
                $('#timeType+div dd').show()
            }
        }else if(startNowDatePoor>7 && startNowDatePoor<=30){
            startEndDatePoor>=0 && startEndDatePoor<=24 ? $('#timeType+div dd[lay-value=1]').show() : $('#timeType+div dd[lay-value=0],#timeType+div dd[lay-value=1]').show()
            // console.log('7到30天之内')
        }else if(startNowDatePoor>30 && startNowDatePoor<=365){
            // console.log('30到365天之内')
            $('#timeType+div dd[lay-value=0]').show()
        }else{
            // console.log('365天之后')
            console.log()
            layer.alert("抱歉!您只能查看近期一年内的数据", function () {
                window.location.reload()
            })
            $('#timeType+div dd').show()
        }
    }

})




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
function timeBefore(n, timers) {
	var date = timers ? new Date(timers) : new Date();
	var milliseconds = date.getTime() - 1000 * 60 * 60 * 24 * n;
	// getTime()方法返回Date对象的毫秒数,但是这个毫秒数不再是Date类型了,而是number类型,所以需要重新转换为Date对象,方便格式化
	var newDate = new Date(milliseconds);
	// console.log(date)
	var dateObj = {
		allFormat: timeFormat(newDate, 'yyyy-MM-dd hh:mm:ss'),
		yearFormat: timeFormat(newDate, 'yyyy'),
		monthFormat: timeFormat(newDate, 'MM'),
		dayFormat: timeFormat(newDate, 'dd'),
		hoursFormat: timeFormat(newDate, 'hh'),
        minuteFormat: timeFormat(newDate, 'mm'),
        secondFormat: timeFormat(newDate, 'ss'),
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
