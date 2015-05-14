if ($ && jQuery) {

    $(document).ready(function() {
        Editor.initList();
    });

    $('.e_creat').click(function(){
        var type = $(this).attr('type');
        Editor.add(type);
    });
    $('.e_delete').on('click',function () {
        var type = $(this).arrt('type');
        Editor.remove(type);
    });
    $('#v_product_list li').on('click',function(){
        var List_current_id = $(this).attr('id');
        localData.set('List_current_id',List_current_id);
        Editor.renderPI();
    });
    $('.e_publish').click(function () {
        var List_current_id = localData.get('List_current_id');
        Editor.publish(List_current_id);
    });

};