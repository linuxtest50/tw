/**
 *
 * 日期插件
 */
var startNowDatePoor, startTimeObj, endTimeObj
layui.use(['laydate', 'form'], function(){
    var laydate = layui.laydate, $ = layui.$
    laydate.render({
        elem: '.web_date_plugin',
        type: 'datetime',
        max: new Date().getTime(),
        value: '',
        btns: ['today','sevenday','thirtyday','halfyear','oneyear','clear','confirm'],
        ready: function(date,value){
            console.log('点击日期')
            console.log(date)
            var todayBtn = $(".laydate-btns-today"), sevendayBtn = $(".laydate-btns-sevenday"), thirtydayBtn = $(".laydate-btns-thirtyday"),
            halfyearBtn = $(".laydate-btns-halfyear"), oneyearBtn = $(".laydate-btns-oneyear");
            todayBtn.text('今天'); sevendayBtn.text('最近7天'); thirtydayBtn.text('最近30天'); halfyearBtn.text('最近半年');oneyearBtn.text('最近1年')
            // 今天
            todayBtn.click(function(){ showTimeScope(0) })
            // 最近7天
            sevendayBtn.click(function(){ showTimeScope(7) })
            // 最近30天
            thirtydayBtn.click(function(){ showTimeScope(30) })
            // 最近半年
            halfyearBtn.click(function(){ showTimeScope(180) })
            // 最近1年
            oneyearBtn.click(function(){ showTimeScope(365) })
        },
        change: function(value, date, endDate){
            console.log('日期选定')
        },
        done: function(value, date, endDate){
            if(!value){
                return
            }
            console.log('确定')
            //console.log(value); //得到日期生成的值，如：2017-08-18
            //console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            var startDateStr = date.year + '-' + date.month + '-' + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
            var endDateStr = endDate.year + '-' + endDate.month + '-' + endDate.date + ' ' + endDate.hours + ':' + endDate.minutes + ':' + endDate.seconds;
            var nowDateStr = timeBefore(0).allFormat
            startTimeObj = {
                allFormat : value.split(' - ')[0]
            }
            endTimeObj = {
                allFormat : value.split(' - ')[1]
            }
            startNowDatePoor = getDateDiff(startDateStr, nowDateStr, "day")
            seleTimeLinkage(startDateStr, endDateStr)
        },
        range: true //或 range: '~' 来自定义分割字符
    });


    /**
     * 显示时间范围
     * @param num
     * @returns
     */
    function showTimeScope(num){
        var recentDate = timeBefore (num), nowDate = timeBefore (0);
        startNowDatePoor = num;
        if(num===0){
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
            seleTimeLinkage(recentDate, nowDate.allFormat)
        }else{
            $('.mytime_input').val(recentDate.allFormat + ' - ' + nowDate.allFormat)
            startTimeObj = recentDate
            seleTimeLinkage(recentDate.allFormat, nowDate.allFormat)
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
        var startEndDatePoorSecond = getDateDiff(startTime, endTime, "second");
        if(!startEndDatePoorSecond){
            alert('请选择不同的起始时间!')
        }
        // 开始时间距当天的时间差
        console.log('时间跨度(小时)'+startEndDatePoor)
        console.log('开始到今天的时间差(天)'+startNowDatePoor);
        // 隐藏所有类型
        $('#timeType+div dd[lay-value!=""]').hide()
        if(startNowDatePoor>=0 && startNowDatePoor<=7){
            console.log('7天之内')
            if(startEndDatePoor>=0 && startEndDatePoor<=1){
                console.log('0到1')
                $('#timeType+div dd[lay-value=2]').show()
            }else if(startEndDatePoor>1 && startEndDatePoor<=24){
                console.log('1到24')
                $('#timeType+div dd[lay-value=1],#timeType+div dd[lay-value=2]').show()
            }else{
                console.log('24到168')
                $('#timeType+div dd').show()
            }
        }else if(startNowDatePoor>7 && startNowDatePoor<=30){
            startEndDatePoor>=0 && startEndDatePoor<=24 ? $('#timeType+div dd[lay-value=1]').show() : $('#timeType+div dd[lay-value=0],#timeType+div dd[lay-value=1]').show()
            console.log('7到30天之内')
        }else if(startNowDatePoor>30 && startNowDatePoor<=365){
            console.log('30到365天之内')
            $('#timeType+div dd[lay-value=0]').show()
        }else{
            console.log('365天之后')
            alert("抱歉!您只能查看近期一年内的数据")
            $('#timeType+div dd').show()
        }
    }

})

/**
 * 图表全局配置
 */
Highcharts.setOptions({
    lang: {
        noData: '暂无数据',
        loading: '加载中...',
        numericSymbolMagnitude: 1024, // 自定义基数
        numericSymbols:["KB" , "MB" , "GB" , "P" , "E"], // 自定义单位
        thousandsSep: ',' // 千分号
    }
});
/**
 *
 * 图表数据
 * */

var chartTitle = ['产品使用量统计(GB)', '区域使用统计(GB)'];
/**
 *
 * highchars配置
 */
    // 图表类型
var chart = {
        type: 'line',
        backgroundColor: '#fff'
    };
// 图表标题
var title = {
    align: 'left',
    text: '',
    margin: 50,
    style: { "color": "#fff", "fontSize": "16px" }
};
// x轴配置
var xAxis = {
    // categories: [], // 指定横轴坐标点的值
    labels: {
        // format: '{value} x',
        x: 0, // 调节x偏移
        rotation: 0,  // 旋转,效果就是影响标签的显示方向
    },
    opposite: false,// 时间显示X轴上与下
    type: 'datetime',
    // minRange: 3600,
    dateTimeLabelFormats: {
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%m月%d',
        week: '%m月 %d',
        month: '%m月 %y',
        year: '%Y'
    },
    title: {
        align: 'high',
        text: '', // x标题
        style: {
            color: '#666',
            fontSize: '14px'
        }
    },
};
// y轴配置
var yAxis = {
    min: 0,
     // tickPositions: [], // 指定竖轴坐标点的值
    labels: {
        //	format: '{value} ',
    },
    title: {
        align: 'high',
        text: '流量', // y标题
        style: {
            color: '#666',
            fontSize: '14px'
        }
    },
    stackLabels: {
        enabled: true, // 数字显示
        style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
        }
    },
    tickAmount: 8, // y轴刻度数
    tickInterval: '', // 刻度间隔
    // tickPixelInterval: 100 // 间隔px
};
// 版权信息
var credits = {
    enabled: false // highcharts网址
};
// 数据提示框
var tooltip = {
    // headerFormat: '时间: {point.x} S<br>',
    // pointFormat: '{series.color}{series.name}: {point.y} bps <br/>', // 提示框数据内容自定义
    pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
    shared: true, // 合并显示多条数据
    valueSuffix: ' bps',//数据后
    valuePrefix: '共计',// 数据前
    //   crosshairs: true,
    //   crosshairs: [{            // 设置准星线样式
    //  width: 30,
    // color: '#fff'
    //			}],
    // 当x轴为时间轴时 提示框内的时间格式化
    dateTimeLabelFormats: {
        minute: '%H:%M. %m月. %d日. %Y年',
        hour: '%H:%M. %m月. %d日. %Y年',
        day: '%m月. %d日. %Y年',
        week: '%d日. %m月',
        month: '%m月 .%y年',
        year: '%Y年'

    },
};
// 主体配置
var plotOptions = {
    series: {
        pointPadding:0.2,
        events: {
            //控制图标的图例legend不允许切换
            legendItemClick: function (event) {
                return true; //return  true 则表示允许切换
            }
        },
        marker: {
            // enabled: false // 数据点标记
            symbol: 'circle' // 数据点形状
        }
    },
    column: {
        // percent置顶
        stacking: 'normal',
        pointPadding: 0.2,
        pointWidth: 5 , //柱子的宽度
        // 如果x轴一个点有两个柱，则这个属性设置的是这两个柱的间距。
        groupPadding : 0.5,
    }
};
// 底部分类信息
var legend = {
    align: 'center',
    verticalAlign: 'bottom',
    y: 25,
    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#fff',
    shadow: false,
    maxHeight: 50,
    padding: 15
};
