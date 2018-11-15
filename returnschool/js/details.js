/**
 * 初始化layui内置模块
 */
(function (w) {
    console.time('time')
    w.tTools = {}
    layui.use(['layer', 'form', 'element', 'table', 'laypage'], function(){
        var $ = layui.$, layer = layui.layer, form = layui.form, element = layui.element, table = layui.table,
            laypage = layui.laypage,that = this, laytpl = layui.laytpl;
        // console.log(location.search.split('?')[1].split('=')[1])
        var id = location.search.split('?')[1].split('=')[1]
        var url = 'http://v31.cycloud.net/returnSchool/returnSchoolAction!'
        $.ajax({
            type: 'GET',
            url: url + 'doNotNeedSecurity_detail.action',
            data: {
                rid: id
            },
            dataType: 'json',
            success: function (data) {
                $('.loading').removeClass('loading').hide()
                // console.log(data.data)
                var dataObj = data.data
                $('.students_name').text(dataObj.detail.name)
                // $('.alumnus_name').text(dataObj.name)
                // $('.alumnus_phone').text(dataObj.phone)
                // $('.alumnus_class').text(dataObj.schoolClass)
                // $('.alumnus_returnSchoolTime').text(dataObj.returnSchoolTime)
                // $('.alumnus_leaveSchoolTime').text(dataObj.leaveSchoolTime)
                // $('.alumnus_returnNumber').text(dataObj.returnNumber)

                var getTpl = studentDetails.innerHTML
                    ,view = document.getElementById('detailsView');
                laytpl(getTpl).render(dataObj, function(html){
                    view.innerHTML = html;
                });

            },
            error: function () {
                console.log('err')
            }
        })
    });






    console.timeEnd('time')
    return tTools
}(window))



