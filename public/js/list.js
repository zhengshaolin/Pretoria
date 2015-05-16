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

    $('.e_publish').click(function () {
        Editor.publish();
    });

};