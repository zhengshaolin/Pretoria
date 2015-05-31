if ($ && jQuery) {
    $(document).ready(function() {
        Editor.initForm();
    });

    //导航条新建3种素材
    $(".navbar-header").on("click", ".e_creat", function() {
        var type = $(this).attr('type'),
            //添加元素的类型
            element = $(this).attr('element');
        //type保存，为添加图片功能预留参数
        $('#add_type').val(element);
        if (element == 2) {
            Editor.add(element);
        } else if (element == 3) {
            $('.e_store_pic').attr('replaceType',0);
            $('#picModel').modal('show');
        } else if (element == 4) {
            $('.e_store_pic').attr('replaceType',0);
            $('#picModel').modal('show');
        }
    });

    //左侧
    //左侧新建page 
    $("#v_page_list").on("click", ".e_creat", function() {
        var type = $(this).attr('type');
        Editor.add(type);
    });
    //左侧page选中功能
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

    //左侧page删除功能
    $("#v_page_list").on("click", ".e_delete", function() {
        var type = $(this).attr('type');
        $('#page_id').val($(this).attr('id'));
        $('#page_server_id').val($(this).attr('pid'));
        Editor.remove(type);
    });

    //展示区
    //展示区元素选中功能
    $("#v_page_edit").on("click", ".item", function() {
        var element_current_id = $(this).attr('id'),
            element_type = $(this).attr('element_type');
        $('#element_id').val(element_current_id);
        Editor.renderArena();
        Editor.renderPageAnimate();
        Editor.renderElementInfo();
        Editor.renderGlobalInfo();
        $('.d_1').hide();
        $('.d_2').hide();
        $('.d_3').hide();
        $('.d_' + element_type + '').show();
    });

    //右侧
    //右侧替换图片功能
    $(".e_tab_content").on("click", ".e_creat", function() {
        var type = $(this).attr('type'),
            element = $(this).attr('element');
        $('#add_type').val(element);
        if (element == 0) {
            Editor.add(type);
        } else if (element == 1) {
            $('#picModel').modal('show');
        } else if (element == 2) {
            $('#picModel').modal('show');
        }
    });
    //右侧水平操作
    $('.d-horizontal').click(function() {
        var val = $(this).index(),hshift;
        $(this).siblings().removeClass('glyphicon_on');
        $(this).addClass('glyphicon_on');
        if (val == 0) {
            s.planeLeft();
        } else if (val == 1) {
            s.planeMiddle()
        } else if (val == 2) {
            s.planeRight()
        } else if (val == 3) {
            s.planeFull();
             Editor.update(3, 'width', parseInt($(s[0]).css('width')));
        }
        
                if (Math.abs(parseInt($(s[0]).css('left'))) + 1) {
                    hshift = $(s[0]).css('left')
                } else {
                    hshift = $(s[0]).css('right')
                };
        Editor.update(2, 'hshift', parseInt(hshift));
        Editor.update(2, 'horizontal', val);
    });
    //右侧垂直操作
    $('.d-vertical').click(function() {
        var val = $(this).index(),vshift;
        $(this).siblings().removeClass('glyphicon_on');
        $(this).addClass('glyphicon_on');
        if (val == 0) {
            s.verticalTop();
        } else if (val == 1) {
            s.verticalMiddle();
        } else if (val == 2) {
            s.verticalBottom();
        } else if (val == 3) {
            s.verticalFull();
                Editor.update(3, 'height', parseInt($(s[0]).css('height')));
            
        }
        if (Math.abs(parseInt($(s[0]).css('top'))) + 1) {
                    vshift = $(s[0]).css('top')
                } else {
                    vshift = $(s[0]).css('bottom')
                }
        Editor.update(2, 'vshift', parseInt(vshift));
        Editor.update(2, 'vertical', val)
    });
    //右侧对齐操作
    $('.d-align').click(function() {
        var key = $(this).index(),
            val = $(this).attr('ta');
        $(this).siblings().removeClass('glyphicon_on');
        $(this).addClass('glyphicon_on');
        console.log("text-align",val);
        Editor.update(2, 'text_align', val)
    });
    //右侧可更新ipput
    $(document).on('blur', '.update_item', function() {
        //elementype 0 产品全局
        //elementype 1 页面属性
        //elementype 2 元素属性
        //key 映射json里的key
        var type = $(this).attr('elementype');
        key = $(this).attr('id').split('-')[1],
        val = $(this).val();
        Editor.update(type, key, val);
    });
    //右侧单选按钮，可更新模块
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
    //右侧下拉列表，可更新数据模块
    $(document).on('change', '.update_select', function() {
        console.log("update select start");
        var type = $(this).attr('elementype'),
            element_server_id = $('#element_server_id').val(),
            key = $(this).attr('id').split('-')[1];
        val = $(this).children('option:selected').val();
        console.log("select type",val);
        if (element_server_id == '') {
            alert("请选择页面或者元素");
            return false;
        }else{
            if (val == "page") {
                $('#v_page').removeClass('hidden').show();
                $('#v_url').addClass('hidden').hide();
            }else if(val == "url"){
                $('#v_url').removeClass('hidden').show();
                $('#v_page').addClass('hidden').hide();
            }
            console.log("select test",type,key,val);
            Editor.update(type, key, val);            
        }
    });

    // 右侧update span模块
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

    //产品
    // 产品预览
    $('body').on('click', '.e_preview', function() {
        //更新title,更新des，更新icon
        Editor.preview();
    });
    $('body').on('click', '.e_up_page', function() {
        //更新title,更新des，更新icon
        window.frames['v_preview_src'].nyx.prevPage();
    });
    $('body').on('click', '.e_down_page', function() {
        //更新title,更新des，更新icon
        window.frames['v_preview_src'].nyx.nextPage();
    });
    // 产品发布
    $('body').on('click', '.e_publish', function() {
        //更新title,更新des，更新icon
        Editor.publish();
    });



    $(document).on('click','.e_open_box',function (argument) {
        var replaceType = $(this).attr('replaceType');
        $('.e_store_pic').attr('replaceType',replaceType);
        $('#picModel').modal('show');
    });

    //弹出框
    //弹窗框图片保存设置
    //type 0 新建添加
    //type 1 元素详情替换
    //type 2 微信活动icon
    //type 3 页面背景图片替换
    //type 4 产品背景图片替换
    //type 5 轮播图片
    $(document).on('click', '.e_store_pic', function(e) {
        e.preventDefault();
        var type = $('#add_type').val(),
            replaceType = $(this).attr('replaceType'),
            pic = $(this).find('img').attr("src");
            if (replaceType == 0) {
                Editor.add(type);
            }else if(replaceType == 1){
                Editor.update(2, 'pic', pic);
                Editor.fetchForm(0);
                $('#picReplaceModel').modal('hide');
            }else if(replaceType == 2){
                Editor.update(0, 'weixin_share_icon', pic);
                $('#d-weixin_share_icon').attr('src',pic);
            }else if(replaceType == 3){
                Editor.update(1, 'background_img', pic);
                Editor.fetchForm(0);
            }else if(replaceType == 4){
                Editor.update(0, 'background_img', pic);
                Editor.fetchForm(0);
            }
    });

    //图库选中功能
    $(document).on('click', '.v_pic_box li', function() {
        var pic = $(this).find('img').attr("src");
        $(this).siblings().removeClass();
        $(this).addClass('active');
        if (pic != undefined) {
            $('#upload_img_src').val(pic);
        };
    });

    //弹出框调取动画保存
    $(document).on('click', '.e_store_animate', function() {
        if ($(this).attr('mid') != undefined && $(this).attr('mid') != '') {
            $('#element_server_id').val($(this).attr('mid'));
            Editor.renderAnimateModel();
        } else if ($('#element_server_id').val() == '' || $('#page_server_id').val() == '') {
            alert("请选择page和element");
        } else {
            Editor.renderAnimateModel();
        }
    });

    //拖拽插件
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
                $('.d_0').removeClass('hidden').show();
                $('.d_1').addClass('hidden').hide();
                $('.d_2').addClass('hidden').hide();
            Editor.renderElementInfo();
            Editor.renderPageAnimate();
            Editor.renderGlobalInfo();
        } else if (element == 1) {
            //图片元素
                $('.d_0').addClass('hidden').hide();
                $('.d_1').removeClass('hidden').show();
                $('.d_2').addClass('hidden').hide();
            Editor.renderElementInfo();
        } else if (element == 2) {
            //轮播元素
                $('.d_0').addClass('hidden').hide();
                $('.d_1').removeClass('hidden').show();
                $('.d_2').addClass('hidden').hide();
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
                elementype = $(s[0]).attr('elementype');
            console.log("drag element type",elementype);
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
            if (elementype == 0) {
                //文字元素
                $('.d_0').removeClass('hidden').show();
                $('.d_1').addClass('hidden').hide();
                $('.d_2').addClass('hidden').hide();
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
            } else if (elementype == 1) {
                //图片元素
                $('.d_0').addClass('hidden').hide();
                $('.d_1').removeClass('hidden').show();
                $('.d_2').addClass('hidden').hide();
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
                $('.d_0').addClass('hidden').hide();
                $('.d_1').addClass('hidden').hide();
                $('.d_2').removeClass('hidden').show();
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
    $('#cnm').on('mousedown',function(e){
            if (e.which == 3) {
                $(this).smartMenu([
                    // [{
                    //     text: '浮动到最上层',
                    //     func: function() {
                    //         //$(s[0]).css('zIndex',)
                    //     }
                    // }],
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
        })
    //上传控件
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
                'access_token': localData.get('token'),
                type: options.type
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
                    if (extension && /^(jpg|png|gif|JPG|PNG|GIF|mp3)$/.test(extension)) {
                        if (type === 'picture') {
                            var activeCount = tarImg.length;
                            if (activeCount === 8) {
                                alert('您已上传8张截图');
                                that.text(text);
                                that.removeAttr('disabled');
                                return false;
                            }
                        }
                    } else {
                        alert('上传的图片仅限gif,jpg,png,mp3!');
                        that.text(text);
                        that.removeAttr('disabled');
                        return false;
                    }
                }
                return true;
            },
            onComplete: function(file, res) {
                that.val('选择图片');
                //console.log(res);
                if (typeof res == 'object')
                    res = res;
                else
                    res = $.parseJSON(res);
                that.removeAttr('disabled');
                options.callback.call(this, res);
            }
        });
    };

    // 上传功能
    $(document).on('click', '.e_upload_pic', function() {
        $(this).ajaxUpload({
            action: 'http://115.29.32.105:8080/upload',
            type:0,
            callback:function (data) {
                //render picbox
                Editor.renderPicBox();
            }
        });
    });

    // 上传功能
    $(document).on('click', '.e_upload_music', function() {
        $(this).ajaxUpload({
            action: 'http://115.29.32.105:8080/upload',
            type:1,
            callback:function (data) {
                //close modal
                $('#musicModel').modal('hide');
                //update
                Editor.update(0,'music',data.path);
                // 更新右侧公共信息
                Editor.renderGlobalInfo(); 
            }
        });
    });

    // 上传功能
    $(document).on('click', '.e_close_music', function() {
         Editor.update(0,'music','');
         Editor.fetchForm(1);
    });

    $('.selector').on('dblclick', function() {
        $(this).hide()
    });

};