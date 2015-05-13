if ($ && jQuery) {

    $(document).ready(function() {
        alert(Editor.token);
        Editor.initList();
    });

    $('.e_creat').click(function(){
        var type = $(this).attr('type');
        switch(type) {
            case 0:
                Editor.addProduct();
                break;
            case :
                addPage();
                break;
        }
    });

};