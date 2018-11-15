/**
 * 初始化layui内置模块
 */
(function (w) {
    console.time('time')
    w.tTools = {}
    layui.use(['layer', 'form', 'element', 'table', 'laypage'], function(){
        var $ = layui.$, layer = layui.layer, form = layui.form, element = layui.element, table = layui.table, laypage = layui.laypage,that = this
        var url = 'http://v31.cycloud.net/returnSchool/returnSchoolAction!'
        var arrData = []
        /*獲取地址列表*/
        $.ajax({
            type: 'GET',
            url: url + 'doNotNeedSecurity_getAllVisitPlace.action',
            data: {},
            dataType: 'json',
            timeout: 5000,
            beforeSend: function () {

            },
            success: function (data) {
                // console.log(data)
                /*地址表格渲染*/
                arrData = data.data.reverse()
                table.render({
                    elem: '#addrTable'
                    ,id: 'addrTable'
                    ,width: 500
                    // ,url: 'http://www.layui.com/demo/table/user/' //数据接口
                    ,data: arrData
                    ,cols: [[ //表头
                        {field: 'visitPlace', title: '地址', align: 'center'}
                        ,{field: 'edit', title: '操作', toolbar: '#barAddrEdit', align: 'center', width: 200}
                    ]]
                    ,text: {
                        none: '暂无相关数据'
                    }
                })
            },
            error: function () {
                layer.msg('请求超时');
            },
            complete: function () {
                $('.loading').removeClass('loading').hide()
            }
        })




        /*监听表格工具条*/
        table.on('tool(addr_tab)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象

            if(layEvent === 'edit'){ // 修改地址
                // alert(1)
                layer.prompt({
                    formType: 2,
                    value: data.visitPlace,
                    title: '更改地址',
                    area: ['300px', '50px'] //自定义文本域宽高
                }, function(value, index, elem){ // 弹窗信息
                    // alert(value); //得到value
                    // console.log(obj.data)
                    $.ajax({
                        type: 'POST',
                        url: url + 'doNotNeedSecurity_updateVisitPlace.action',
                        data: {
                            rid: obj.data.id,
                            visitPlace: value
                        },
                        dataType: 'json',
                        success: function (data) {
                            // console.log(data)
                            //同步更新视图缓存对应的值
                            obj.update({
                                visitPlace: value
                            });
                        },
                        error: function () {
                            console.log('err')
                        }
                    })
                    layer.close(index);
                });

            }else if(layEvent === 'del'){ //删除地址
                layer.confirm('确定删除？', function(index){
                    //向服务端发送删除指令
                    // console.log(obj.data.id)
                    $.ajax({
                        type: 'POST',
                        url: url + 'doNotNeedSecurity_deleteVisitPlace.action',
                        data: {
                            rid: obj.data.id,
                        },
                        dataType: 'json',
                        success: function (data) {
                            // console.log(data)

                        },
                        error: function () {
                            console.log('err')
                        }
                    })
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);

                });
            }
        });
        /*添加地址*/
        form.on('submit(add_address)', function(data){
            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}

            var oldData = table.cache["addrTable"]
            oldData.unshift(data.field)
            // console.log(oldData)
            // 发送ajax 存储数据
            $.ajax({
                type: 'POST',
                url: url + 'doNotNeedSecurity_addVisitPlace.action',
                data: {
                    visitPlace: data.field.visitPlace
                },
                dataType: 'json',
                success: function (data) {
                    // console.log(data)
                    window.location.reload() /**********/
                },
                error: function () {
                    console.log('err')
                }
            })
            // console.log(that.tableData)
            // table.reload('addrTable',{
            //     data: oldData
            // }) // 渲染表格

            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });




        /*獲取最新配置信息并展示*/
        $.ajax({
            type: 'GET',
            url: url + 'doNotNeedSecurity_getReturnSchoolInfoConfig.action',
            dataType: 'json',
            success: function (data) {
                // console.log(data.data.need_visit)
                if(data.data.need_place){
                    /*設置并渲染checkbox*/
                    $('.place_edit').prop('checked', true)
                    form.render('checkbox')
                }
                if(data.data.need_visit){
                    /*設置并渲染checkbox*/
                    $('.visit_edit').prop('checked', true)
                    form.render('checkbox')
                }
                if(data.data.need_eat){
                    /*設置并渲染checkbox*/
                    $('.eat_edit').prop('checked', true)
                    form.render('checkbox')
                }
            },
            error: function () {
                console.log('err')
            }
        })

        /*設置配置信息*/
        form.on('submit(userinfo_item)', function(data){
            // layer.msg(JSON.stringify(data.field));
            var editMsg = data.field, placeFlag, visitFlag, eatFlag;
            /*獲取配置信息*/
            // console.log(editMsg)
            if(editMsg.place_edit && editMsg.place_edit === 'on'){
                placeFlag = 1
            }else{
                placeFlag = 0
            }
            if(editMsg.visit_edit && editMsg.visit_edit === 'on'){
                visitFlag = 1
            }else{
                visitFlag = 0
            }
            if(editMsg.eat_edit && editMsg.eat_edit === 'on'){
                eatFlag = 1
            }else{
                eatFlag = 0
            }
            $.ajax({
                type: 'POST',
                url: url + 'doNotNeedSecurity_updateReturnSchoolInfoConfig.action',
                data: {
                    need_place: placeFlag,
                    need_visit: visitFlag,
                    need_eat: eatFlag
                },
                dataType: 'json',
                success: function (data) {
                    // console.log(data)
                    layer.msg('设置成功');
                },
                error: function () {
                    // console.log('err')
                }
            })
            return false;
        });




    });
    console.timeEnd('time')
    return tTools
}(window))



