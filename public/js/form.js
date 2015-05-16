if ($ && jQuery) {

    $(document).ready(function() {
        Editor.initForm();
    });

    $('.e_creat').click(function() {
        var type = $(this).attr('type'),
            element = $(this).attr('element');
        Editor.add(type);
    });
    $('.e_delete').on('click', function() {
        var type = $(this).arrt('type');
        Editor.remove(type);
    });

    $("#v_page_list").on("click","li", function () { 
        var page_current_id = $(this).attr('id');
        $('#page_id').val(page_current_id);
        $('#element_id').val(page_current_id+'_0');
        Editor.renderArena();
        Editor.renderPageInfo();
        Editor.renderElementInfo();
        Editor.renderGlobalInfo()
    });

    $("#v_page_edit").on("click",".item", function () { 
        var element_current_id = $(this).attr('id');
        $('#element_id').val(element_current_id);
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

    $('.update_radio').on('click', function() {
        //elementype 0 产品全局
        //elementype 1 页面属性
        //elementype 2 元素属性
        //key 映射json里的key
        if ($(this).attr('type') == 'radio') {
            var type = $(this).parents('.panel-body').attr('elementype'),
                key = $(this).parents('.panel-body').attr('id').split('-')[1];
                val = $(this).val();
            $(this).attr("checked",true);
            Editor.update(type,key,val);
        }else{
            return false;
        }
    });
    $('.update_select').change(function(){
        var type = $(this).attr('elementype'),
            key = $(this).attr('id').split('-')[1];
            val = $(this).children('option:selected').val();
            Editor.update(type,key,val);
    });

    $('.e_publish').click(function() {
        Editor.publish();
    });

    $('.e_preview').click(function () {
        Editor.preview();
    })

    // var s;
    // $('#cnm').on('click', function(e) {
    //     s = Drag(e);
    //     $('#btn,#btn1,#btn2,#btn3,#btn4,#btn5,#btn6,#btn7').unbind('click')
    //     $('#btn').on('click', function() {
    //         s.planeLeft();
    //     })
    //     $('#btn1').on('click', function() {
    //         console.log(s)
    //         s.planeMiddle()
    //     })
    //     $('#btn2').on('click', function() {
    //         console.log(s)
    //         s.planeRight()
    //     })
    //     $('#btn3').on('click', function() {
    //         console.log(s)
    //         s.planeFull()
    //     })
    //     $('#btn4').on('click', function() {
    //         console.log(s)
    //         s.verticalTop()
    //     })
    //     $('#btn5').on('click', function() {
    //         console.log(s)
    //         s.verticalMiddle()
    //     })
    //     $('#btn6').on('click', function() {
    //         console.log(s)
    //         s.verticalBottom()
    //     })
    //     $('#btn7').on('click', function() {
    //         console.log(s)
    //         s.verticalFull()
    //     })
    // })
    // $('#cnm').on('mousedown', function(e) {
    //     if (e.which == 3) {
    //         $(this).smartMenu([
    //             [{
    //                 text: '浮动到最上层',
    //                 func: function() {
    //                     //$(s[0]).css('zIndex',)
    //                 }
    //             }],
    //             [{
    //                 text: '删除选中层',
    //                 func: function() {
    //                     $(s[0]).remove();
    //                     $('.selector').hide()
    //                     /*$.ajax({

    //             })*/
    //                 }
    //             }]
    //         ], {
    //             offsetX: 2,
    //             offsetY: 2,
    //             name: ''
    //         })
    //     }
    // });
};