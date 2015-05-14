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
        var product_id = $('#product_id').val();
        Editor.publish(product_id);
    });

    $('.update_item').on('blur',function(){
        var type = $(this).attr('id');
        Editor.renderPI();
    });





};