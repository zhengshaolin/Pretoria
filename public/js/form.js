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
        Editor.add(type);
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
    $('.update_select').change(function() {
        console.log("update select start");
        var type = $(this).attr('elementype'),
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

    // 预览
    $('.e_preview').click(function() {
        Editor.preview();
    });




    var s, te;
    $('#cnm').on('click', function(e) {
        s = Drag(e);
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
    $.fn.ajaxUpload = function(options) {
        var that = $(this),
            tarImg = options.tarimg || '',
            action = options.action || 'upload',
            name = options.name || 'Filename',
            genre = options.genre || 'img',
            size = options.size || 2048 * 1024,
            type = options.type || 'logo',
            data = options.data || {
                'product_id': $('#product_id').val(),
                'access_token': localData.get('token')
            },
            arrType = { //for picture appear
                'picture': $("#pictureUpload").find("img"),
                'logo': $("[rel='img-target-logo']"),
                'card': $("[rel='img-target']"),
                'avatar': $("[rel='img-target-avatar']"),
                'album': $("[rel='img-taget-album']")
            },
            text = that.text();
        new AjaxUpload(that, {
            action: action,
            name: name,
            data: data,
            validation: {
                sizeLimit: size
            },
            onSubmit: function(file, extension) {
                that.val('loading...');
                that.attr('disabled', 'disabled');
                tarImg = arrType[type];
                if (genre === 'img') {
                    if (extension && /^(jpg|png|mep3|gif|JPG|PNG|GIF)$/.test(extension)) {
                        if (type === 'picture') {
                            var activeCount = tarImg.length;
                            if (activeCount === 8) {
                                alert('您已上传了截图');
                                that.text(text);
                                that.removeAttr('disabled');
                                return false;
                            }
                        }
                    } else {
                        alert('上传的图片仅限gif,jpg,png!');
                        that.text(text);
                        that.removeAttr('disabled');
                        return false;
                    }
                }
                return true;
            },
            onComplete: function(file, res) {
                that.val('选择图片');
                if (typeof res == 'object')
                    res = res;
                else
                    res = $.parseJSON(res);
                that.removeAttr('disabled');
                options.callback.call(this, res);
            }
        });
    };
    // $('.e_uplodad').ajaxUpload({
    //     action:'http://115.29.32.105:8080/upload'
    // });
};