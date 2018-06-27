layui.use(['layer', 'form','table', 'upload'], function() {
    var table = layui.table, layer = layui.layer, form = layui.form, $ = layui.$, upload = layui.upload
    // 可直接使用$
    //游戏 上传证书 密钥
    upload.render({
        elem: '.game_certificate'
        ,url: '/upload/'
        ,auto: false
        ,accept: 'file'
        //,multiple: true
        ,bindAction: '#buttonFile'
        ,done: function(res){
            console.log(res)
        }
    });
    upload.render({
        elem: '.game_secretkey'
        ,url: '/upload/'
        ,auto: false
        ,accept: 'file'
        //,multiple: true
        ,bindAction: '#buttonFile'
        ,done: function(res){
            console.log(res)
        }
    });

    //game图表数据
    var product_one_date = [712,722,732,742,752,762,772,782,792,702,712,712,712,522,532,542,532,772,75,726,777,718,722,733,744,755,766,711,766,722,
        712,722,732,742,752,762,772,782,792,702,712,712,712,722,732,742,832,812,815,826,817,818,822,833,844,855,866,811,866,822];

    var product_two_date = [104857600, 71.5, 123456789, 1073741824, 144.0, 304857600, 135.6, 148.5, 216.4, 1048576000,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 1073741824, 30485750, 10240, 10485750, 1024000, 4000, 5120, 7000, 1025,
    ];

    var timeX = ['game', '02', '03', '04', '05', '06', '07', '08', '09', '10','11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30']


    editChart('gameStatisChart')

    $('#queryFlowBtn').click(function () {
        this.inputVal = $('.mytime_input').val()
        this.startTimer = this.inputVal.split(' - ')[0]
        this.endTimer = this.inputVal.split(' - ')[1]

        // timeBefore(n, this.startTimer)
        console.log(timeBefore(0, this.startTimer))
        console.log(timeBefore(1, this.endTimer))
        // $.ajax({
        //     url: 'http://mockjs',
        //     success: function (data) {
        //         console.log(data)
        //     }
        // })
        editChart('gameStatisChart', [{
            name: 'game1',
            color: '#ff252c',
            pointStart: Date.UTC(2018, 0, 1, 5, 20, 10),
            pointInterval: 2,
            data: product_one_date,
            visible: false,
        },{
            name: 'game2',
            color: '#2dcbc8',
            pointStart: Date.UTC(2018, 0, 1, 5, 20, 10),
            pointInterval: 1,
            data: product_two_date,
            // pointIntervalUnit: 'day'
        }], timeX)
    })
})