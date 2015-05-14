if ($ && jQuery) {

    $(document).ready(function() {
        Editor.initForm();
    });

    $('.e_creat').click(function(){
        var type = $(this).attr('type');
        Editor.add(type);
    });
    $('.e_delete').on('click',function () {
        var type = $(this).arrt('type');
        Editor.remove(type);
    });
    $('.e_publish').click(function () {
        var product_id = localData.get('Form_current_id');
        Editor.publish(product_id);
    });



    $('.update_item').on('blur',function(){
        var type = $(this).attr('id');
        localData.set('List_current_id',List_current_id);
        Editor.renderPI();
    });





};