if ($ && jQuery) {

    $(document).ready(function() {
        Editor.initList();
    });

    $('.e_creat').click(function(){
        var type = $(this).attr('type');
        Editor.add(type);
    });
    $('#v_product_list').on('click','.e_delete',function () {
        var type = $(this).attr('type');
        $('#product_id').val($(this).attr('id'));
        Editor.remove(type);
    });
    $("#v_product_list").on("click","li", function () { 
        var List_current_id = $(this).attr('id');
        $('#product_id').val(List_current_id);
        Editor.renderItemInfo(List_current_id);
    });
    $('#v_product_list').on('click','.e_edit',function () {
        var id = $(this).attr('id');
        window.location.href = 'form.html?id='+id+'';
    });
    $('body').on('click','.e_publish',function () {
        Editor.publish();
    });


    $('.update_item').on('blur', function() {
        //elementype 0 产品全局
        //elementype 1 页面属性
        //elementype 2 元素属性
        //key 映射json里的key
        var type = $(this).attr('elementype');
            key = $(this).attr('id').split('-')[1],
            val = $(this).val();
        Editor.update(type,key,val);
    });

};