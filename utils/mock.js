// 配置 Mock 路径
require.config({
    paths: {
        mock: 'http://mockjs.com/dist/mock'
    }
})
// 加载 Mock
require(['mock'], function(Mock){
    var Random = Mock.Random;
    //调用mock方法模拟数据
    Mock.setup({
        timeout: 1000 //响应时间
    });
    Random.extend({
        constellation: function(date) {
            var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
            return this.pick(constellations)
        }
    });
    Mock.mock(
        'http://mockjs', {
            'result|20': [{
                'id|+1': 0,
                "userName": '@cname',     //模拟名称
                "age|1-100": 100,          //模拟年龄(1-100)
                "color": "@color",    //模拟色值
                "date": "@date('yyyy-MM-dd')",  //模拟随机日期
                "nowDate" : "@now('yyyy-MM-dd HH:mm:ss SS')",//当前日期
                "url": "@url('http')",     //模拟url
                "content": "@cparagraph()", //模拟文本
                "image": "@image('200x100', '@color', '#FFF', 'png', 'hello world!')",//图片
                // "dataImage": "@dataImage('350x400','Base64')",//Base64编码图片
                "shortText": "@cword(3, 5)",//模拟3-5个汉字
                "longText": "@cword(20, 50)",//模拟10-20个汉字
                "province": "@province",//模拟省
                "number": "@integer(100, 999)",//100-999
                "constellation" : "@constellation",//星座
                "email":"@email('163.com')",//邮箱
                "id" : "@id",//身份证
            }]
        }
    );
})

