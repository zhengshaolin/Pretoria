if ($ && jQuery) {

    $(document).ready(function() {
        Editor.initForm();
    });

    $("#v_page_list").on("click", ".e_creat", function() {
        var type = $(this).attr('type');
        Editor.add(type);
    });

    $(".navbar-header").on("click", ".e_creat", function() {
        var type = $(this).attr('type'),
            element = $(this).attr('element');
        $('#add_type').val(element);
        if(element == 0){
            Editor.add(type);
        }else if(element == 1){
            $('#picModel').modal('show');
        }else if(element == 2){
            $('#picModel').modal('show');
        }
    });

    $("#v_page_list").on("click", "li", function() {
        $('#page_id').val($(this).attr('id'));
        $('#page_server_id').val($(this).attr('pid'));
        $('#element_id').val($(this).attr('id') + '_0');
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        Editor.renderArena();
        Editor.renderPageAnimate();
        Editor.renderElementInfo();
        Editor.renderGlobalInfo();
        Editor.fetchForm(1);
    });

    $("#v_page_list").on("click", ".e_delete", function() {
        var type = $(this).attr('type');
        $('#page_id').val($(this).attr('id'));
        $('#page_server_id').val($(this).attr('pid'));
        Editor.remove(type);
    });

    $("#v_page_edit").on("click", ".item", function() {
        var element_current_id = $(this).attr('id');
        $('#element_id').val(element_current_id);
        Editor.renderArena();
        Editor.renderPageAnimate();
        Editor.renderElementInfo();
        Editor.renderGlobalInfo();
    });

    //水平
    $('.d-horizontal').click(function(){
        var val = $(this).index();
        $(this).siblings().removeClass('glyphicon_on');
        $(this).addClass('glyphicon_on');
        if (val == 0) {
            s.planeLeft();
        }else if(val ==1){
            s.planeMiddle()
        }else if(val == 2){
            s.planeRight()
        }else if(val == 3){
            s.planeFull();
        }
        Editor.update(2,'horizontal',val);
    });
    //垂直
    $('.d-vertical').click(function(){
        var val = $(this).index();
        $(this).siblings().removeClass('glyphicon_on');
        $(this).addClass('glyphicon_on');
        if (val == 0) {
            s.verticalTop();
        }else if(val ==1){
            s.verticalMiddle();
        }else if(val == 2){
            s.verticalBottom();
        }else if(val == 3){
            s.verticalFull();
        }
        Editor.update(2,'vertical',val)
    });

    //可更新ipput
    $('.update_item').on('blur', function() {
        //elementype 0 产品全局
        //elementype 1 页面属性
        //elementype 2 元素属性
        //key 映射json里的key
        var type = $(this).attr('elementype');
        key = $(this).attr('id').split('-')[1],
        val = $(this).val();
        Editor.update(type, key, val);
    });

    //单选按钮，可更新模块
    $('.update_radio').on('click', function() {
        //elementype 0 产品全局
        //elementype 1 页面属性
        //elementype 2 元素属性
        //key 映射json里的key
        if ($(this).attr('type') == 'radio') {
            var type = $(this).parents('.panel-body').attr('elementype'),
                key = $(this).parents('.panel-body').attr('id').split('-')[1];
            val = $(this).val();
            $(this).attr("checked", true);
            Editor.update(type, key, val);
        } else {
            return false;
        }
    });

    //下拉列表，可更新数据模块
    $(document).on('change','.update_select',function() {
        console.log("update select start");
        var type = $(this).attr('elementype'),
            element_server_id = $('#element_server_id').val(),
            key = $(this).attr('id').split('-')[1];
            val = $(this).children('option:selected').val();
            Editor.update(type, key, val); 
    });

    // update span模块
    $('.update_span').click(function() {
        console.log("update span start");
        $(this).addClass('glyphicon_on');
        if ($(this).hasClass('glyphicon_on')) {
            //$(this).removeClass('glyphicon_on');
            var val = 0;
        } else {
            var val = 1;
        }
        var type = $(this).attr('elementype'),
            key = $(this).attr('id').split('-')[1];
        Editor.update(type, key, val);
    });
    // 发布
    $('body').on('click', '.e_publish', function() {
        Editor.publish();
    });

    //调取动画保存
    $(document).on('click','.e_store_animate',function(){
        if ($('#element_server_id').val() == '' || $('#page_server_id').val() == ''){
            alert("请选择page和element");
        }else if($(this).attr('mid') != undefined && $(this).attr('mid') != ''){
            $('#animateModel').modal('show');
        }else{
            $('#animateModel').modal('show');
        }
    });

    // 预览
    $('.e_preview').click(function() {
        Editor.preview();
    });


    //图片保存设置
    $(document).on('click','.e_store_pic',function (e) {
        e.preventDefault();
        $('#picModel').modal('hide');
        // todo 
    });


    var s, te;
    $('#cnm').on('click', function(e) {
        s = Drag(e);
            $('#element_server_id').val($(s[0]).attr('mid'));
            $('#element_id').val($(s[0]).attr('id'));
            $('#element_server_id').val($(s[0]).attr('mid'));
            $('#element_id').val($(s[0]).attr('id'));
            var vshift, hshift,
                element = $(s[0]).attr('elementype');
            if (element == 0) {
                //文字元素
                $('.d_0').show();
                $('.d_1').hide();
                $('.d_2').hide();
                Editor.renderElementInfo();
                Editor.renderPageAnimate();
                Editor.renderGlobalInfo();
            } else if (element == 1) {
                //图片元素
                $('.d_0').hide();
                $('.d_1').show();
                $('.d_2').hide();
                Editor.renderElementInfo();
            } else if (element == 2) {
                //轮播元素
                $('.d_0').hide();
                $('.d_1').hide();
                $('.d_2').show();
                Editor.renderElementInfo();
            }            
        //console.log(s)
        s[0].func = function() {
            $('#element_server_id').val($(s[0]).attr('mid'));
            $('#element_id').val($(s[0]).attr('id'));
            $('#element_server_id').val($(s[0]).attr('mid'));
            $('#element_id').val($(s[0]).attr('id'));
            //setTimeout(function(){

            var vshift, hshift,
                element = $(s[0]).attr('elementype');
            if (element == 0) {
                //文字元素
                if (Math.abs(parseInt($(s[0]).css('top'))) + 1) {
                    vshift = $(s[0]).css('top')
                } else {
                    vshift = $(s[0]).css('bottom')
                }
                if (Math.abs(parseInt($(s[0]).css('left'))) + 1) {
                    hshift = $(s[0]).css('left')
                } else {
                    hshift = $(s[0]).css('right')
                };
                $('.d_0').show();
                $('.d_1').hide();
                $('.d_2').hide();
                //console.log(vshift,hshift)
                //Editor.renderArena();
                Editor.update(3, 'element_type', 0);
                Editor.update(3, 'text', $(s[0]).html());
                Editor.update(3, 'z-index', $(s[0]).css('z-index'));
                Editor.update(3, 'width', parseInt($(s[0]).css('width')));
                Editor.update(3, 'height', parseInt($(s[0]).css('height')));
                Editor.update(3, 'horizontal', $(s[0]).attr('plane'));
                Editor.update(3, 'vertical', $(s[0]).attr('vertical'));
                Editor.update(3, 'vshift', parseInt(vshift));
                Editor.update(3, 'hshift', parseInt(hshift));
            } else if (elemntype == 1) {
                //图片元素
                $('.d_0').hide();
                $('.d_1').show();
                $('.d_2').hide();
                Editor.update(3, 'element_type', 1);
                //Editor.update(3,'text',$(s[0]).html());
                Editor.update(3, 'z-index', $(s[0]).css('z-index'));
                Editor.update(3, 'width', parseInt($(s[0]).css('width')));
                Editor.update(3, 'height', parseInt($(s[0]).css('height')));
                Editor.update(3, 'horizontal', $(s[0]).attr('plane'));
                Editor.update(3, 'vertical', $(s[0]).attr('vertical'));
                Editor.update(3, 'vshift', parseInt(vshift));
                Editor.update(3, 'hshift', parseInt(hshift));
            } else if (elementype == 2) {
                //轮播元素
                Editor.update(3, 'element_type', 2);
                //Editor.update(3,'text',$(s[0]).html());
                Editor.update(3, 'z-index', $(s[0]).css('z-index'));
                Editor.update(3, 'width', parseInt($(s[0]).css('width')));
                Editor.update(3, 'height', parseInt($(s[0]).css('height')));
                Editor.update(3, 'horizontal', $(s[0]).attr('plane'));
                Editor.update(3, 'vertical', $(s[0]).attr('vertical'));
                Editor.update(3, 'vshift', parseInt(vshift));
                Editor.update(3, 'hshift', parseInt(hshift));
                $('.d_0').hide();
                $('.d_1').hide();
                $('.d_2').show();
            }


            if (e.which == 3) {
                $(this).smartMenu([
                    [{
                        text: '浮动到最上层',
                        func: function() {
                            //$(s[0]).css('zIndex',)
                        }
                    }],
                    [{
                        text: '删除选中层',
                        func: function() {
                            $(s[0]).remove();
                            $('.selector').hide();
                            Editor.remove(2);
                        }
                    }]
                ], {
                    offsetX: 2,
                    offsetY: 2,
                    name: ''
                })
            }
        }
        if ($(s[0]).attr('text') && !$('.divtext').length) {
            te = $(s[0])
            var sty = $(s[0]).attr('style');
            var text = $('<textarea>');
            var div = $(s[0]);
            var plane = $(s[0]).attr('plane')
            var vertical = $(s[0]).attr('vertical')
            text.attr('style', sty).val(div.html().replace(/<br>/ig, '\r\n')).attr('plane', plane).attr('vertical', vertical).attr('class', 'divtext');
            div.hide();
            $('#cnm').append(text)
            text.focus()
            var len = text[0].value.length;
            if (document.selection) {
                var sel = text[0].createTextRange();
                sel.moveStart('character', len);
                sel.collapse();
                sel.select();
            } else if (typeof text[0].selectionStart == 'number' && typeof text[0].selectionEnd == 'number') {
                text[0].selectionStart = text[0].selectionEnd = len;
            }
        } else if (te) {
            te.html($('textarea').last().val().replace(/[\r\n]/ig, '<br \/>'))
            te.show()
            $('textarea').remove()
        }
    });
    var uploader = WebUploader.create({
    swf: 'public/js/Webuploader/Uploader.swf',
    // 文件接收服务端。
    server: 'http://115.29.32.105:8080/upload',
    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#picker',
    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false,
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
    }
});
    uploader.on( 'fileQueued', function( file ) {
        console.log(file)
    $list.append( '<div id="' + file.product_id + '" class="item">' +
        '<h4 class="info">' + file.access_token + '</h4>' +
        '<p class="state">等待上传...</p>' +
    '</div>' );
});

    uploader.on( 'uploadSuccess', function( file ) {
    $( '#'+file.id ).find('p.state').text('已上传');
});

uploader.on( 'uploadError', function( file ) {
    $( '#'+file.id ).find('p.state').text('上传出错');
});


};