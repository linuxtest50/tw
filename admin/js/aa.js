layui.use(['layer', 'form','table', 'upload'], function() {
    var table = layui.table, layer = layui.layer, form = layui.form, $ = layui.$, upload = layui.upload
    // 可直接使用$

    //图表数据
    var product_one_date = [712,722,732,742,752,762,772,782,792,702,712,712,712,522,532,542,532,772,75,726,777,718,722,733,744,755,766,711,766,722,
        712,722,732,742,752,762,772,782,792,702,712,712,712,722,732,742,832,812,815,826,817,818,822,833,844,855,866,811,866,822];

    var product_two_date = [1048576, 71.5, 123456.789, 10737418.24, 144.0, 3048576, 135.6, 148.5, 216.4, 1048576,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 107374.1824, 30485750, 10240, 10485750, 102400, 4000, 5120, 7000, 1025,
    ];

    var timeX = ['game', '02', '03', '04', '05', '06', '07', '08', '09', '10','11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30']

    // 1初始化图表
    var initChart = editChart('gameStatisChart')
    var againChart;
    $('#queryFlowBtn').click(function () {
        // 2隐藏noData
        $('.highcharts-no-data').css('display', 'none')
        // 3显示loading
        if(againChart){
            againChart.showLoading();
        }else{
            initChart.showLoading();
        }
        // 获取input选中时间
        var that = this
        this.inputVal = $('.mytime_input').val()
        this.startTimer = this.inputVal.split(' - ')[0]
        this.endTimer = this.inputVal.split(' - ')[1]
        // 将开始时间转化成对象
        this.dateStr = timeBefore(0, this.startTimer)
        console.log(this.dateStr)
        // 获取数据
        $.ajax({
            url: 'http://mockjs',
            success: function (data) {
                this.dataArr = []
                this.dataObj = JSON.parse(data).result
                console.log(JSON.parse(data).result)
                for (var item of this.dataObj) {
                    this.dataArr.push(item.number)
                }
                console.log(this.dataArr)
                // 4如果不传 选择的pointStart时间和pointInterval显示类型(多条数据需相同)，则按照后台获取的timeX时间显示(此时提示框时间不能格式化)
                againChart = editChart('gameStatisChart', [{
                    name: 'game1',
                    color: '#ff252c',
                    // pointStart: Date.UTC(that.dateStr.yearFormat, that.dateStr.monthFormat-1 ,that.dateStr.dayFormat ,
                    //     that.dateStr.hoursFormat, that.dateStr.minuteFormat, that.dateStr.secondFormat),
                    // pointInterval: 1,// 显示时间类型 0->天 1->小时 2->分钟
                    // data: this.dataArr,
                    data: product_one_date
                },{
                    name: 'game2',
                    color: '#2dcbc8',
                    pointStart: Date.UTC(that.dateStr.yearFormat, that.dateStr.monthFormat-1 ,that.dateStr.dayFormat ,
                        that.dateStr.hoursFormat, that.dateStr.minuteFormat, that.dateStr.secondFormat),
                    pointInterval: 1,
                    data: product_two_date,
                    // pointIntervalUnit: 'day' 没用
                    visible: false,
                }], timeX)
            },
            error: function () {
                // 5错误提示
                if(againChart){
                    againChart.showLoading('网络不稳定，请重试');
                }else{
                    initChart.showLoading('网络不稳定，请重试');
                }
            }
        })
    })
})