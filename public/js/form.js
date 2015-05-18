if ($ && jQuery) {

    $(document).ready(function() {
        Editor.initForm();
    });

    $("#v_page_list").on("click",".e_creat", function () { 
        var type = $(this).attr('type');
        Editor.add(type);
    });

    $(".navbar-header").on("click",".e_creat", function () { 
        var type = $(this).attr('type'),
            element = $(this).attr('element');
        $('#add_type').val(element);
        Editor.add(type);
    });

    $("#v_page_list").on("click","li", function () { 
        $('#page_id').val($(this).attr('id'));
        $('#page_server_id').val($(this).attr('pid'));
        $('#element_id').val($(this).attr('id')+'_0');

        Editor.renderArena();
        Editor.renderPageAnimate();
        Editor.renderElementInfo();
        Editor.renderGlobalInfo();
    });

    $("#v_page_list").on("click",".e_delete", function () { 
        var type = $(this).attr('type');
            $('#page_id').val($(this).attr('id'));
            $('#page_server_id').val($(this).attr('pid'));
        Editor.remove(type);
    });

    $("#v_page_edit").on("click",".item", function () { 
        var element_current_id = $(this).attr('id');
        $('#element_id').val(element_current_id);
        Editor.renderArena();
        Editor.renderPageAnimate();
        Editor.renderElementInfo();
        Editor.renderGlobalInfo();
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
        console.log("update select start");
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
    });

var s,te;
$('#cnm').on('click',function(e){
    s=Drag(e);
    s[0].func=function(){
        $('#element_server_id').val($(s[0]).attr('mid'));
        $('#element_id').val($(s[0]).attr('id'));
    }
    if ($(s[0]).attr('text')&&!$('.divtext').length){
        te = $(s[0])
        var sty = $(s[0]).attr('style'); 
        var text = $('<textarea>');
        var div = $(s[0]);
        var plane = $(s[0]).attr('plane')
        var vertical = $(s[0]).attr('vertical')
        text.attr('style',sty).val(div.html()).attr('plane',plane).attr('vertical',vertical).attr('class','divtext');
        div.hide();
        $('#cnm').append(text)
        text.focus()
         var len = text[0].value.length;
        if (document.selection) {
            var sel = text[0].createTextRange();
            sel.moveStart('character',len);
            sel.collapse();
            sel.select();
        } else if (typeof text[0].selectionStart == 'number' && typeof text[0].selectionEnd == 'number') {
            text[0].selectionStart = text[0].selectionEnd = len;
        }
    }else if(te){
        te.html($('textarea').last().val())
        te.show()
        $('textarea').remove()
    }
    $('#btn,#btn1,#btn2,#btn3,#btn4,#btn5,#btn6,#btn7').unbind('click')
    $('#btn').on('click',function(){
        s.planeLeft();
    })
    $('#btn1').on('click',function(){
        console.log(s)
        s.planeMiddle()
    })
    $('#btn2').on('click',function(){
        console.log(s)
        s.planeRight()
    })
    $('#btn3').on('click',function(){
        console.log(s)
        s.planeFull()
    })
    $('#btn4').on('click',function(){
        console.log(s)
        s.verticalTop()
    })
    $('#btn5').on('click',function(){
        console.log(s)
        s.verticalMiddle()
    })
    $('#btn6').on('click',function(){
        console.log(s)
        s.verticalBottom()
    })
    $('#btn7').on('click',function(){
        console.log(s)
        s.verticalFull()
    })
})
$('#cnm').on('mousedown',function(e){
    $('#element_server_id').val($(s[0]).attr('mid'));
    $('#element_id').val($(s[0]).attr('id'));
        Editor.update(2,'element_type',0);
        Editor.update(2,'text',$(this).text());
        Editor.update(2,'z-index',$(this).css('z-index'));
        Editor.update(2,'width',$(this).css('width'));
        $('#d-width').val($(this).css('width'));
        Editor.update(2,'height',$(this).css('height'));
        Editor.update(2,'horizontal',$(this).attr('plane'));
        Editor.update(2,'vertical',$(this).attr('vertical'));
    if(e.which==3){
        $(this).smartMenu([[{
            text:'浮动到最上层',
            func:function(){
                //$(s[0]).css('zIndex',)
            }
        }],[{
            text:'删除选中层',
            func:function(){
                $(s[0]).remove();
                $('.selector').hide();
                Editor.remove(2);
            }
        }]],{offsetX:2,offsetY:2,name:''})
    }
});
};