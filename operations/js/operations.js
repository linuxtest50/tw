/**
 * 初始化layui内置模块
 */
(function (w) {
    console.time('time')
    w.tTools = {}
    layui.use(['layer', 'form', 'element', 'table', 'laypage'], function(){
        var $ = layui.$, layer = layui.layer, form = layui.form, element = layui.element, table = layui.table, laypage = layui.laypage,that = this
        $('.layui-header').load('../public/header.html', function () {
            $('.layui-side').load('../public/side.html', function () {
                element.on('tab(productType)', function(data){
                    console.log($(data.elem.children()[0]).children('.layui-this').text());
                    console.log(data.index)
                    // $(data.elem.children()[1]).html(data.index)
                });
                tTools.popup = function (title, width, shade, id, $ele, success, yes, btn, no) {
                    layer.open({
                        type: 1
                        ,title: title //标题栏
                        ,closeBtn: 1
                        ,area: width
                        ,shade: shade
                        ,id: id //设定一个id，防止重复弹出
                        ,btn: ['确 定']
                        ,btnAlign: 'c'
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
                require.config({
                    paths : {
                        text : 'https://cdn.bootcss.com/require-text/2.0.12/text',
                        json : 'https://cdn.bootcss.com/requirejs-plugins/1.0.3/json' //alias to plugin
                    }
                });
                require(['json!../../data/user.json'], function (dataJson) {
                    that.tableData = dataJson.data
                    // console.log(dataJson.data)
                    // $('.list').text(dataJson.data.username)
                    // for (var i = 0; i < dataJson.data.length; i++) {
                    //
                    //     $('<p></p>').text(dataJson.data[i].username).appendTo('.list')
                    // }
                    // laypage.render({
                    //     elem: 'test1'
                    //     ,count: dataJson.data.length //数据总数，从服务端得到
                    //     ,limit: 2
                    //     ,jump: function(obj, first){
                    //         //obj包含了当前分页的所有参数，比如：
                    //         console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    //         console.log(obj.limit); //得到每页显示的条数
                    //
                    //         //首次不执行
                    //         if(!first){
                    //
                    //         }
                    //     }
                    // });

                    table.render({
                        elem: '#userTab'
                        ,id: 'userTable'
                        // ,height: 500
                        // ,url: 'http://www.layui.com/demo/table/user/' //数据接口
                        ,data: dataJson.data
                        ,page: {
                            limit: 5,
                            loading: true
                        } //开启分页
                        ,cols: [[ //表头
                            {field: 'id', title: 'ID', width: 100, fixed: 'left', align: 'center'}
                            ,{field: 'username', title: '用户名', width: 200, align: 'center'}
                            ,{field: 'phone', title: '手机号', align: 'center'}
                            ,{field: 'email', title: '邮箱', align: 'center'}
                            ,{field: 'timer', title: '注册时间', sort: true, align: 'center'}
                            ,{field: 'createman', title: '创建人', align: 'center'}
                            ,{field: 'edit', title: '操作', toolbar: '#barUserEdit', align: 'center'}
                        ]]
                        ,text: {
                            none: '暂无相关数据'
                        }
                    })
                })

                /*新增用户*/
                $('.add_user').click(function(){
                    this.success = function(layero, index) {
                        $('.layui-layer').addClass('layui-form')
                        $(layero.children()[3]).children('a').attr({
                            'lay-filter': 'addUserBtn',
                            'lay-submit': ''
                        })
                    }
                    this.yes = function(index,layero) {
                        /*表单提交*/
                        form.on('submit(addUserBtn)', function(data){
                            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
                            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
                            // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
                            // console.log(data)
                            data.field.id = that.tableData.length<9 ? '0' + (that.tableData.length + 1) : that.tableData.length + 1
                            that.tableData.unshift(data.field)
                            // 发送ajax 存储数据
                            /*$.ajax({
                                type: "POST",
                                url: "",
                                data: "name=John&location=Boston",
                                success: function(msg){

                                }
                            });*/
                            // console.log(that.tableData)
                            table.reload('userTable',{
                                data: that.tableData
                            }) // 渲染表格
                            console.log(table)
                            layer.close(index) // 关闭弹窗
                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        });
                    }
                    tTools.popup('新增用户', '500px', 0, 'addUser', $('.adduser_popup'), this.success, this.yes)
                })

                /*过滤*/
                $('#findByName').click(function () {
                    console.log(that.tableData)
                    that.filterTableData = []
                    this.nameValue = $('input[name="nameinput"]').val()
                    console.log(this.nameValue)
                    // var reg = '/'+ this.nameValue + '/ig'
                    this.reg = new RegExp(this.nameValue, "i")
                    // reg = JSON.parse(reg)
                    // console.log(reg)
                    for(var i = 0; i<that.tableData.length; i++){
                        if(this.reg.test(that.tableData[i].username)){
                            that.filterTableData.push(that.tableData[i])
                            // that.tableData = that.filterTableData
                        }
                    }
                    console.log(that.filterTableData)
                    table.reload('userTable',{
                        data: that.filterTableData
                    }) // 渲染表格
                })
                //页面一打开就执行弹层
                // layer.ready(function(){
                // layer.msg('很高兴一开场就见到你');
                // });

                // 加载层
                // var index = layer.load(2, {
                // shade: [0.1,'#fff'], //0.1透明度的白色背景
                // time: 2000
                // });


                require(['json!../../data/products.json'],function (dataJson) {
                    that.productsData = dataJson.data
                    table.render({
                        elem: '#productsTab'
                        ,id: 'productsTable'
                        // ,height: 500
                        // ,url: 'http://www.layui.com/demo/table/user/' //数据接口
                        ,data: dataJson.data
                        ,page: {
                            limit: 5,
                            loading: true
                        } //开启分页
                        ,cols: [[ //表头
                            {field: 'id', title: 'ID', width: 100, fixed: 'left', align: 'center'}
                            ,{field: 'pid', title: '产品ID', width: 200, align: 'center'}
                            ,{field: 'edit', title: '产品配置', align: 'center'}
                            ,{field: 'timer', title: '有效时间', width: 400, align: 'center'}
                            ,{field: 'pstatus', title: '产品状态', sort: true, toolbar: '#barProductsStatus', align: 'center'}
                            ,{field: 'ustatus', title: '启用状态', toolbar: '#barUseStatus', align: 'center'}
                            ,{field: 'tool', title: '操作',width: 350, toolbar: '#barProductsEdit', align: 'center'}
                        ]]
                    })
                })

                /*新增产品*/
                form.on('select(addProducts)', function(data){
                    // console.log(data.elem); //得到select原始DOM对象
                    // console.log(data.value); //得到被选中的值
                    // console.log(data.othis); //得到美化后的DOM对象
                    // $(data.elem.children()[0]).children('.layui-this').text()
                    // this.selVal = $(data.othis[0].children[1]).children('.layui-this').text()
                    // console.log(this.selVal)
                    this.success = function () {

                    }
                    this.yes = function () {

                    }
                    if(data.value===''){
                        return
                    }
                    if(parseInt(data.value)){
                        // console.log(parseInt(data.value))
                        $('.game_edit').show()
                        $('.web_edit').hide()
                        tTools.popup('新增游戏盾', '500px', 0.3, 'addProducts', $('.addpro_popup'), this.success, this.yes)
                    }else{
                        $('.web_edit').show()
                        $('.game_edit').hide()
                        tTools.popup('新增web盾', '770px', 0.3, 'addProducts', $('.addpro_popup'), this.success, this.yes)
                    }
                });


            })
        })
    });
    console.timeEnd('time')
    return tTools
}(window))



