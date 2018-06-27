layui.use(['layer', 'form','table', 'upload'], function() {
    var table = layui.table, layer = layui.layer, form = layui.form, $ = layui.$, upload = layui.upload
    // 可直接使用$
    // console.log($)
    //web盾 上传证书 密钥
    upload.render({
        elem: '.web_certificate'
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
        elem: '.web_secretkey'
        ,url: '/upload/'
        ,auto: false
        ,accept: 'file'
        //,multiple: true
        ,bindAction: '#buttonFile'
        ,done: function(res){
            console.log(res)
        }
    });

    //web图表数据
    var product_one_date = [712,722,732,742,752,762,772,782,792,702,712,712,712,522,532,542,532,772,75,726,777,718,722,733,744,755,766,711,766,722,
        712,722,732,742,752,762,772,782,792,702,712,712,712,722,732,742,832,812,815,826,817,818,822,833,844,855,866,811,866,822];

    var product_two_date = [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 9999999
    ];

    var timeX = ['web', '02', '03', '04', '05', '06', '07', '08', '09', '10','11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30']

    var productSeries = [
        {
            name: 'web1',
            color: '#3aa0ff',
            data: product_one_date
        },
        {
            name: 'web2',
            color: '#4ecb73',
            data: product_two_date
        }
    ]

    // web图表时间
    xAxis.categories = timeX;

    // 初始化web图表
    var webFlow = {
        chart : chart,
        title : title,
        xAxis : xAxis,
        yAxis : yAxis,
        legend : legend,
        tooltip : tooltip,
        plotOptions : plotOptions,
        credits : credits,
        series : productSeries
    };
    Highcharts.chart('webStatisChart', webFlow)
})