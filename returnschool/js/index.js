/**
 * 初始化layui内置模块
 */
(function (w) {
    console.time('time')
    w.tTools = {}
    layui.use(['layer', 'form', 'element', 'table', 'laypage', 'laydate'], function(){
        var $ = layui.$, layer = layui.layer, form = layui.form, element = layui.element,
            table = layui.table, laypage = layui.laypage,laydate = layui.laydate, that = this
        // element.on('tab(productType)', function(data){
        //     console.log($(data.elem.children()[0]).children('.layui-this').text());
        //     console.log(data.index)
        //     // $(data.elem.children()[1]).html(data.index)
        // });
        // 弹窗
        tTools.popup = function (title, width, shade, id, $ele, success, yes, btn, no) {
            layer.open({
                type: 1
                ,title: title //标题栏
                ,closeBtn: 1
                ,area: width
                ,shade: shade
                ,id: id //设定一个id，防止重复弹出
                ,btn: ['确 定', '取消']
                ,btnAlign: 'r'
                ,moveType: 1 //拖拽模式，0或者1
                ,content: $ele
                ,success: function(layero, index){
                    success(layero, index)
                }
                ,yes: function(index,layero){
                    yes(index,layero)
                }
                ,btn1: function () {
                    btn()
                }
                ,no: function () {
                    no()
                }
            })
        }


        // $.getJSON('../demo.json', function (data) {
        //     console.log(data)
        // })
        this.tableData = [];
        /*require*/
        // require.config({
        //     paths : {
        //         text : 'https://cdn.bootcss.com/require-text/2.0.12/text',
        //         json : 'https://cdn.bootcss.com/requirejs-plugins/1.0.3/json' //alias to plugin
        //     }
        // });
        // require(['json!./data/user.json'], function (dataJson) {
        //      that.tableData = dataJson.data
        // })
        var selJson = {}, flag = false;
        var arg = location.hash ? location.hash.split('=')[1] : null
        var url = 'http://v31.cycloud.net/returnSchool/returnSchoolAction!'
        // var url = 'http://192.168.2.104:9080/returnSchool/returnSchoolAction!'
        function paging(thisPage, thisPageNum, name, rstb, rste, rsnb, rsne, np, nv, ne) {
            $.ajax({
                type: 'POST',
                url: url + 'doNotNeedSecurity_findByCondition.action',
                dataType: 'json',
                data: {
                    page: thisPage || arg || 1,  // 当前第几页
                    rows: thisPageNum || 10, // 当前页数量
                    name: name,
                    returnSchoolTimeBegin: rstb,
                    returnSchoolTimeEnd: rste,
                    returnSchoolNumberBegin: rsnb,
                    returnSchoolNumberEnd: rsne,
                    isNeedPlace: np,
                    isNeedVisit: nv,
                    isNeedEat: ne
                },
                success: function (data) {
                    // console.log(data.data)
                    that.tableData = data.data.rows
                    // console.log(that.tableData)
                    $('.loading').removeClass('loading').hide()
                    // 表格渲染
                    table.render({
                        elem: '#userTable'
                        ,id: 'userTable'
                        // ,height: 500
                        // ,url: 'http://www.layui.com/demo/table/user/' //数据接口
                        ,data: that.tableData
                        ,limit : thisPageNum || 10
                        // ,page: {
                        //     limit: 5,
                        //     loading: true
                        // } //开启分页
                        ,cols: [[ //表头
                            {field: 'name', title: '联系人', width: 100, align: 'center'}
                            ,{field: 'phone', title: '联系电话', width: 200, align: 'center'}
                            ,{field: 'returnSchoolTime', title: '返校时间', sort: true, align: 'center'}
                            ,{field: 'returnNumber', title: '返校人数', align: 'center'}
                            ,{field: 'schoolClass', title: '所在班级', align: 'center'}
                            ,{field: 'isNeedPlace', title: '是否需要聚会场地', align: 'center'}
                            ,{field: 'isNeedVisit', title: '是否需要参观', align: 'center'}
                            ,{field: 'isNeedEat', title: '是否在校就餐', align: 'center'}
                            ,{field: 'remark', title: '备注', align: 'center'}
                            ,{field: 'edit', title: '操作', toolbar: '#barUserEdit', align: 'center', width: 300}
                        ]]
                        ,text: {
                            none: '暂无相关数据'
                        }
                    })

                    /*分页*/
                    laypage.render({
                        elem: 'pageDiv' //
                        ,count: data.data.total //数据总数，从服务端得到
                        ,limit: thisPageNum || 10 // 每页显示的条数
                        ,curr: thisPage || 1
                        ,limits: [10, 20, 30, 40, 50]
                        ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
                        // ,curr: location.hash.replace('#!page=', '')
                        // ,hash: 'page'
                        ,jump: function(obj, first){
                            //obj包含了当前分页的所有参数，比如：
                            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            // console.log(obj); //得到每页显示的条数

                            //首次不执行
                            if(!first){
                                flag = true
                                //do something
                                // paging(false, obj.curr, obj.limit)
                                // var selAgrs = JSON.parse(sessionStorage.getItem('selJson'))
                                // paging(obj.curr, obj.limit, selAgrs.name, selAgrs.startTime, selAgrs.endTime, selAgrs.smallNum, selAgrs.bigNum, selAgrs.isNeedPlace, selAgrs.isNeedVisit, selAgrs.isNeedEat)
                                paging(obj.curr, obj.limit, selJson.name, selJson.startTime, selJson.endTime, selJson.smallNum, selJson.bigNum, selJson.isNeedPlace, selJson.isNeedVisit, selJson.isNeedEat)
                            }
                            if(obj.count){
                                $('#pageDiv').show()
                            }else{
                                $('#pageDiv').hide()
                            }
                        }
                    });


                },
                error: function (err) {
                    console.log('err')
                }
            })

        }

        paging()


        /*select监听*/
        form.on('select(selTimer)', function (data) {
            // console.log(data.value)
            if(data.value === 'custom'){
                laydate.render({
                    elem: '.timerComp'
                    ,show: true //直接显示
                    ,trigger: 'click' //采用click弹出
                    ,closeStop: this //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
                });
            }else{
                // alert(1)
            }


        })
        /*监听查询按钮*/
        form.on('submit(criteriaQuery)', function(data) {
            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}

            selJson.name = data.field.peopleName;
            selJson.isNeedPlace = data.field.isNeedPlace;
            selJson.isNeedVisit = data.field.isNeedVisit;
            selJson.isNeedEat = data.field.isNeedEat;
            selJson.startTime = data.field.returnSchoolTime.split(' - ')[0];
            selJson.endTime = data.field.returnSchoolTime.split(' - ')[1];
            selJson.smallNum = data.field.returnPeopleNum.split('-')[0];
            selJson.bigNum = data.field.returnPeopleNum.split('-')[1]
            // console.log(bigNum)
            // sessionStorage.setItem('selJson',JSON.stringify(selJson))
            var pagNum = location.hash ? location.hash.split('=')[1] : 1
            // console.log(flag)
            if(flag){
                pagNum = 1
            }
            paging(1, 10, data.field.peopleName, selJson.startTime, selJson.endTime, selJson.smallNum, selJson.bigNum, data.field.isNeedPlace, data.field.isNeedVisit, data.field.isNeedEat)

        })

        /*监听表格工具条*/
        table.on('tool(user_tab)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象
            // console.log(obj.data)
            if(layEvent === 'detail'){ //查看
                //do somehing
                // console.log(obj.data)
            }else if(layEvent === 'reception'){ // 接待审核
                // alert(1)
                receptionFun(obj.data.status, obj.data.remark, obj.data.id, obj) // 审核状态 当前id
            }else if(layEvent === 'editTimer'){ // 时间
                // $('#timerComp').width(window.innerWidth).show()
                // $('.timerComp').removeAttr('lay-key')
                // console.log('时间')
                backTimer(obj.data.returnSchoolTime, obj.data.id, obj)

                // laydate.render({
                //     elem: '.timerComp'
                //     ,show: true //直接显示
                //     ,type: 'datetime'
                //     ,closeStop: '.changeTimerBtn'
                //     ,change: function(value, date){ //监听日期被切换
                //         // lay('#testView').html(value);
                //     }
                //     ,done: function(value, date, endDate){
                //         console.log(value); //得到日期生成的值，如：2017-08-18
                //         console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                //         console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                //         $('.timerComp').removeAttr('lay-key')
                //     }
                // });


                // lay('td[data-field="returnSchoolTime"]').each(function() {
                //     laydate.render({
                //         elem : this
                //         ,trigger : 'click'
                //         ,show: true //直接显示
                //         ,type: 'datetime'
                //         ,closeStop: '.changeTimerBtn'
                //         ,change: function(value, date){ //监听日期被切换
                //             // lay('#testView').html(value);
                //         }
                //         ,done: function(value, date, endDate){
                //             console.log(value); //得到日期生成的值，如：2017-08-18
                //             console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                //             console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                //             // $('.timerComp').removeAttr('lay-key')
                //         }
                //     });
                // });

            }else if(layEvent === 'remarks'){ //备注
                //do something
                // console.log(data)
                remarksFun(obj.data.remark, obj.data.id, obj)
                //同步更新视图缓存对应的值
                // obj.update({
                //     timer: '123'
                //     // ,title: 'xxx'
                // });
            }
        });


        /*接待审核弹窗*/
        function receptionFun(status, remark, id, obj){
            this.success = function(layero, index) {
                $('.layui-layer').addClass('layui-form')
                $(layero.children()[3]).children('a').attr({
                    'lay-filter': 'receptionBtn',
                    'lay-submit': ''
                })
                /**/
                // 设置默认选中审核状态
                $('.reception_popup dd[lay-value='+ status +']').click()
                $('textarea[name="receptionText"]').val(remark)
            }
            this.yes = function(index,layero) {
                /*表单提交*/
                form.on('submit(receptionBtn)', function(data){
                    // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
                    // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
                    // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
                    // console.log(data)
                    // data.field.id = that.tableData.length<9 ? '0' + (that.tableData.length + 1) : that.tableData.length + 1
                    // that.tableData.unshift(data.field)
                    // 发送ajax 审核
                    $.ajax({
                        type: 'POST',
                        url: url + 'doNotNeedSecurity_updateReturnSchoolRecord.action',
                        data: {
                            rid: id,
                            status: data.field.receptionStatus,
                            remark: data.field.receptionText
                        },
                        dataType: 'json',
                        success: function (dat) {
                            // console.log(data)
                            /*更新视图*/
                            obj.update({
                                status: data.field.receptionStatus,
                                remark: data.field.receptionText
                            });
                            // window.location.reload() /******/

                        },
                        error: function () {
                            console.log('err')
                        }
                    })

                    layer.close(index) // 关闭弹窗
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                });
            }
            tTools.popup('确认审核', '500px', 0.5, 'reception_check', $('.reception_popup'), this.success, this.yes)
        }

        /*备注弹窗*/
        function remarksFun(remark, id, obj){
            this.success = function(layero, index) {
                $('.layui-layer').addClass('layui-form')
                $(layero.children()[3]).children('a').attr({
                    'lay-filter': 'remarksBtn',
                    'lay-submit': ''
                })
                $('textarea[lay-verify="remarksInfo"]').val(remark)
            }
            this.yes = function(index,layero) {
                /*表单提交*/
                form.on('submit(remarksBtn)', function(data){
                    // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
                    // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
                    // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
                    // console.log(data)
                    // data.field.id = that.tableData.length<9 ? '0' + (that.tableData.length + 1) : that.tableData.length + 1
                    // that.tableData.unshift(data.field)
                    // 发送ajax 存储数据
                    $.ajax({
                        type: 'POST',
                        url: url + 'doNotNeedSecurity_updateReturnSchoolRecord.action',
                        data: {
                            rid: id,
                            remark: data.field.remarksInfo
                        },
                        dataType: 'json',
                        success: function (dat) {
                            // console.log(data)
                            // 渲染表格
                            // table.reload('userTable')
                            obj.update({
                                remark: data.field.remarksInfo
                            });
                            // window.location.assign(window.location.href)
                            // window.location.reload() /******/

                        },
                        error: function () {
                            console.log('err')
                        }
                    })
                    // 渲染表格
                    // table.reload('userTable',{
                    //     data: that.tableData
                    // })
                    layer.close(index) // 关闭弹窗
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                });
            }
            tTools.popup('添加备注信息', '500px', 0.5, 'remarks', $('.remarks_popup'), this.success, this.yes)
        }

        /*变更返校时间*/
        function backTimer(timer, id, obj) {
            // console.log(window.location.href)
            $('textarea[lay-verify="returnSchoolTime"]').val(timer)
            layer.prompt({
                formType: 2,
                value: timer,
                title: '修改返校时间，格式必须一致',
                area: ['300px', '50px'] //自定义文本域宽高
            }, function(value, index, elem){
                // alert(value); //得到value
                //同步更新视图缓存对应的值
                $.ajax({
                    type: 'POST',
                    url: url + 'doNotNeedSecurity_updateReturnSchoolRecord.action',
                    data: {
                        rid: id,
                        returnSchoolTime: value
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data)
                        /*更新视图*/
                        if(data.success){
                            obj.update({
                                returnSchoolTime: value
                            });
                        }else{
                            layer.msg('格式不正确')
                        }

                    },
                    error: function () {
                        console.log('err')
                    }
                })
                layer.close(index);
            });
        }

/*=================================================================================*/


        /*过滤*/
            // $('#findByName').click(function () {
            //     console.log(that.tableData)
            //     that.filterTableData = []
            //     this.nameValue = $('input[name="nameinput"]').val()
            //     console.log(this.nameValue)
            //     // var reg = '/'+ this.nameValue + '/ig'
            //     this.reg = new RegExp(this.nameValue, "i")
            //     // reg = JSON.parse(reg)
            //     // console.log(reg)
            //     for(var i = 0; i<that.tableData.length; i++){
            //         if(this.reg.test(that.tableData[i].username)){
            //             that.filterTableData.push(that.tableData[i])
            //             // that.tableData = that.filterTableData
            //         }
            //     }
            //     console.log(that.filterTableData)
            //     table.reload('userTable',{
            //         data: that.filterTableData
            //     }) // 渲染表格
            // })


            //页面一打开就执行弹层
            // layer.ready(function(){
            // layer.msg('很高兴一开场就见到你');
            // });

            // 加载层
            // var index = layer.load(2, {
            // shade: [0.1,'#fff'], //0.1透明度的白色背景
            // time: 2000
            // });
    });
    console.timeEnd('time')
    return tTools
}(window))



