if ($ && jQuery) {
    $(document).ready(function() {
        Editor.initForm();
    });
    //导航条新建3种素材
    //type 2 新增文字元素
    //type 3 新增图片元素
    //type 4 新增轮播元素
    //type 5 轮播图片右侧新增
    //type 6 轮播图片替换
    $(".navbar-header").on("click", ".e_creat", function() {
        var type = $(this).attr('type'),
            //添加元素的类型
            element = $(this).attr('element');
        //type保存，为添加图片功能预留参数
        $('#add_type').val(element);
        if (element == 2) {
            Editor.add(element);
        } else if (element == 3) {
            $('.e_store_pic').attr('replaceType', 0);
            $('#picModel').modal('show');
        } else if (element == 4) {
            $('.e_store_pic').attr('replaceType', 5);
            $('#picModel').modal('show');
        }else if(element == 5){
            $('.e_store_pic').attr('replaceType', 6);
            $('#picModel').modal('show'); 
        }else if(element == 6){
            $('.e_store_pic').attr('replaceType', 7);
            //$('#slider_replace_index').val();
            $('#picModel').modal('show'); 
        }
    });
    $(".page-side").on("click", ".e_creat", function() {
        var type = $(this).attr('type'),
            //添加元素的类型
            element = $(this).attr('element');
        //type保存，为添加图片功能预留参数
        $('#add_type').val(element);
        if (element == 2) {
            Editor.add(element);
        } else if (element == 3) {
            $('.e_store_pic').attr('replaceType', 0);
            $('#picModel').modal('show');
        } else if (element == 4) {
            $('.e_store_pic').attr('replaceType', 5);
            $('#picModel').modal('show');
        }else if(element == 5){
            $('.e_store_pic').attr('replaceType', 6);
            $('#picModel').modal('show'); 
        }else if(element == 6){
            $('.e_store_pic').attr('replaceType', 7);
            //$('#slider_replace_index').val();
            $('#picModel').modal('show'); 
        }
    });

    $('.e_quite').click(function () {
       Editor.quite();
    });

    $('.e-close').click(function () {
       $('.e_tab_content').hide();
    });

    //左侧
    //左侧新建page 
    $(".page-side").on("click", ".e_creat", function() {
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
        $('#confirmModel').modal('show');
        $('.e_delete_button').attr('key',type);
    });

    $(document).on('click', '.e_delete_button', function() {
        var key = $(this).attr('key');
        if (key == 1) {
            Editor.remove(1);
        }
    });

    $(document).on('click', '.e_page_up', function() {
        var origin_page_server_id = $(this).attr('pid'),
            origin_order = $(this).attr('order'),
            modify_page_server_id  = $(this).parent('li').prev('li').attr('pid'),
            modify_order = $(this).parent('li').prev('li').attr('order');
            console.log("origin_page_server_id",origin_page_server_id);
            console.log("modify_page_server_id",modify_page_server_id);
        if (origin_order == 0) {
            alert("已经是第一页了！");
        }else{
            Editor.changePos(origin_page_server_id,modify_order);
            Editor.changePos(modify_page_server_id,origin_order);
            //Editor.update(1,order,modify_order); 
            //Editor.update(1,order,modify_order);          
        }
    });

    $(document).on('click', '.e_page_down', function() {
        var origin_page_server_id = $(this).attr('pid'),
            origin_order = $(this).attr('order'),
            modify_page_server_id  = $(this).parent('li').next('li').attr('pid'),
            modify_order = $(this).parent('li').next('li').attr('order');
            console.log("origin_page_server_id",origin_page_server_id);
            console.log("modify_page_server_id",modify_page_server_id);
        if (origin_order == parseInt($('#v_page_list').find('li').length - 1)) {
            alert("已经是最后一页了！");
        }else{
            Editor.changePos(origin_page_server_id,modify_order);
            Editor.changePos(modify_page_server_id,origin_order);
            //Editor.update(1,order,modify_order); 
            //Editor.update(1,order,modify_order);          
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
        var val = $(this).index(),
            hshift;
        $(this).siblings().removeClass('glyphicon_on');
        $(this).addClass('glyphicon_on');
        if (val == 0) {
            $(this).parent().next().show();
            s.planeLeft();
        } else if (val == 1) {
            $(this).parent().next().hide();
            s.planeMiddle()
        } else if (val == 2) {
            $(this).parent().next().show();
            s.planeRight()
        } else if (val == 3) {
            $(this).parent().next().hide();
            s.planeFull();
            Editor.update(2, 'width', parseInt($(s[0]).css('width')));
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
        var val = $(this).index(),
            vshift;
        $(this).siblings().removeClass('glyphicon_on');
        $(this).addClass('glyphicon_on');
        if (val == 0) {
            $(this).parent().next().show();
            s.verticalTop();
        } else if (val == 1) {
            $(this).parent().next().hide();
            s.verticalMiddle();
        } else if (val == 2) {
            $(this).parent().next().show();
            s.verticalBottom();
        } else if (val == 3) {
            $(this).parent().next().hide();
            s.verticalFull();
            Editor.update(2, 'height', parseInt($(s[0]).css('height')));

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
        console.log("text-align", val);
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
            if (key == "background_type") {
                if (val == 0) {
                    //Editor.update(1, 'background_color', '');
                    //Editor.update(1, 'background_img', '');
                    Editor.update(type, key, val);
                }else{
                    Editor.update(type, key, val);
                }
                $(this).attr("checked", true);
            }else{
                $(this).attr("checked", true);
                Editor.update(type, key, val);
            }

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
        console.log("select type", val);
        if (element_server_id == '') {
            alert("请选择页面或者元素");
            return false;
        } else {
            if (val == "page") {
                $('#v_url').removeClass('hidden').show();
                $('#v_page').addClass('hidden').hide();
            } else if (val == "url") {
                $('#v_page').removeClass('hidden').show();
                $('#v_url').addClass('hidden').hide();

            }
            console.log("select test", type, key, val);
            Editor.update(type, key, val);
        }
    });

    $('.nav-right li').click(function (){
       var key = $(this).index(),
           page_server_id = $('#page_server_id').val();
       if (key == 0) {
            return false;
       }else if(key == 1){
            if (page_server_id != null) {
                $('.e_tab_content').show();
            };
       }else if(key == 2){
        $('.e_tab_content').show();
       }else if(key == 3){
        $('.e_tab_content').show();
       }else if(key == 4){
        $('.e_tab_content').show();
       }
    });

    // 右侧update span模块
    $('.update_span').click(function() {
        console.log("update span start");
        var type = $(this).attr('elementype'),
            key = $(this).attr('id').split('-')[1];
        if ($(this).hasClass('glyphicon_on')) {
            if (key == 'ftb') {
                var val = '';
            }else if(key == 'fti'){
                var val = '';
            }else if(key == 'ftu'){
                var val = '';
            }else{
                var val = 1;
            }
        } else {
            if (key == 'ftb') {
                var val = 'bold';
                $(this).addClass('glyphicon_on');
            }else if(key == 'fti'){
                var val = 'italic';
                $(this).addClass('glyphicon_on');
            }else if(key == 'ftu'){
                var val = 'underline';
                $(this).addClass('glyphicon_on');
            }else{
                var val = 0;
                $(this).addClass('glyphicon_on');
            }
        }
        Editor.update(type, key, val);
    });

    //产品
    //产品保存
    $('.e_generate_pic').on('click',function(){
        html2canvas(document.getElementById('page_edit')).then(function(canvas) {
            //console.log("232323",canvas.toDataURL());
            var imgUrl = canvas.toDataURL();
            console.log("generate pic src",imgUrl);
            //Editor.update(1, pic, canvas.toDataURL());
            //document.body.appendChild(canvas);
            Editor.update(1, 'avatar', imgUrl);
        });
    });
    // 产品预览
    // 产品发布       
    $('.e_preview').on('click',function(){
        Editor.preview();
        Editor.publishQr();
    });

    $('.e_publish_toggle').on('click',function(){
        $('#publishModel').modal('show');
    });


    $('.e_publish_box').on('click',function(){
        Editor.preview();
    });

    $('body').on('click','.e_publish',function(){
        Editor.publish();
    });
    // $('.e_publish').on('click',function(){
    //     conosle.log(1)
    //     Editor.publish();
    // });
    $('body').on('click', '.e_up_page', function() {
        //更新title,更新des，更新icon
        window.frames['v_preview_src'].nyx.prevPage();
    });
    $('body').on('click', '.e_down_page', function() {
        //更新title,更新des，更新icon
        window.frames['v_preview_src'].nyx.nextPage();
    });
    

    $('body').on('click','#v_upload_music a',function () {
         var path = $(this).attr('path');
         window.location.href = 'http://115.29.32.105:8080/public/Pretoria/music.html?path='+path+'';
    });

    $(document).on('click', '.e_open_box', function(argument) {
        var replaceType = $(this).attr('replaceType');

        if (replaceType == 3) {
            if ($("input[name='background_type']").eq(2).attr('checked') != 'checked') {
                alert("请选择图片上传选项");
            }else{
                $('.e_store_pic').attr('replaceType', replaceType);
                $('#picModel').modal('show');                   
            }
        }else{
            $('.e_store_pic').attr('replaceType', replaceType);
            $('#picModel').modal('show');   
        }
    });

    $(document).on('click', '.e_close_preview', function() {
        $('#v_preview_src').attr('src', '');
    });


    //弹出框
    //弹窗框图片保存设置
    //type 0 新建添加
    //type 1 元素详情替换
    //type 2 微信活动icon
    //type 3 页面背景图片替换
    //type 4 产品背景图片替换
    //type 5 轮播图片初始化新增
    //type 6 轮播图片右侧新增
    //type 7 轮播图片替换
    $(document).on('click', '.e_store_pic', function(e) {
        e.preventDefault();
        var type = $('#add_type').val(),
            replaceType = $(this).attr('replaceType'),
            pic = $('#upload_img_src').val();
        if (replaceType == 0) {
            Editor.add(type);
        } else if (replaceType == 1) {
            Editor.update(2, 'pic', pic);
            Editor.fetchForm(0);
        } else if (replaceType == 2) {
            Editor.update(0, 'weixin_share_icon', pic);
            $('#d-weixin_share_icon').attr('src', pic);
        } else if (replaceType == 3) {
            console.log("replace 3", pic);
            Editor.update(1, 'background_img', pic);
            Editor.fetchForm(0);
        } else if (replaceType == 4) {
            Editor.update(0, 'glass_url', pic);
            Editor.fetchForm(0);
        } else if (replaceType == 5) {
            Editor.add(4);
        } else if (replaceType == 6) {
            //console.log("aaa",Editor.getSlider());
            if (Editor.getSlider() != false) {
                var slider = Editor.addSlider(pic);
                Editor.update(2, 'slider', slider);
                Editor.renderElementInfo();
                $('#picModel').modal('hide');
            } else {
                return false;
            }
        } else if (replaceType == 7) {
            if (Editor.getSlider() != false) {
                var slider = Editor.getSlider();
                Editor.update(2, 'slider', slider);
                Editor.renderElementInfo();
                $('#picModel').modal('hide');
            } else {
                return false;
            }
        }
        $('#picModel').modal('hide');
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

    $(document).on('click', '#v_d_2 .close', function() {
       $(this).parents('.clearfix').remove();
       var slider = Editor.getSlider();
        Editor.update(2, 'slider', slider);
        Editor.renderElementInfo();

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
        e.stopPropagation()
        s = Drag(e);
        s_selector = s
        //window.select_area = s;
        $('#element_server_id').val($(s[0]).attr('mid'));
        $('#element_id').val($(s[0]).attr('id'));
        var vshift, hshift,
            element = $(s[0]).attr('element_type');
        $('.nav-right').find('li').removeClass("active");
        $('.nav-right').find('li').eq(0).addClass("active");
        $('.e_tab_content').find('.tab-pane').removeClass("active");
        $('.e_tab_content').find('#tab1').addClass("active");
        $('.e_tab_content').show();
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
            $('.d_1').addClass('hidden').hide();
            $('.d_2').removeClass('hidden').show();
            Editor.renderElementInfo();
        }
        //console.log(s)
        s[0].func = function() {
            $('#element_server_id').val($(s[0]).attr('mid'));
            $('#element_id').val($(s[0]).attr('id'));
            //setTimeout(function(){
            var vshift, hshift,
                elementype = $(s[0]).attr('element_type');
            console.log("drag element type", elementype);
            $('.e_tab_content').show();
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
                Editor.batchupdate(['z-index', 'width', 'height', 'horizontal', 'vertical', 'vshift', 'hshift', 'text'], [$(s[0]).css('z-index'), parseInt($(s[0]).css('width')), parseInt($(s[0]).css('height')), $(s[0]).attr('plane'),
                    $(s[0]).attr('vertical'), parseInt(vshift), parseInt(hshift), $(s[0]).html()
                ])
            } else if (elementype == 1) {
                //图片元素
                $('.d_0').addClass('hidden').hide();
                $('.d_1').removeClass('hidden').show();
                $('.d_2').addClass('hidden').hide();
                Editor.batchupdate(['z-index', 'width', 'height', 'horizontal', 'vertical', 'vshift', 'hshift'], [$(s[0]).css('z-index'), parseInt($(s[0]).css('width')), parseInt($(s[0]).css('height')), $(s[0]).attr('plane'),
                    $(s[0]).attr('vertical'), parseInt(vshift), parseInt(hshift)
                ])
            } else if (elementype == 2) {
                $('.d_0').addClass('hidden').hide();
                $('.d_1').addClass('hidden').hide();
                $('.d_2').removeClass('hidden').show();
                //轮播元素
                Editor.batchupdate(['z-index', 'width', 'height', 'horizontal', 'vertical', 'vshift', 'hshift'], [$(s[0]).css('z-index'), parseInt($(s[0]).css('width')), parseInt($(s[0]).css('height')), $(s[0]).attr('plane'),
                    $(s[0]).attr('vertical'), parseInt(vshift), parseInt(hshift)
                ])
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
            text.css('background','transparent')
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
        } else if (te && $('textarea').last().val()) {
            te.html($('textarea').last().val().replace(/[\r\n]/ig, '<br \/>'))
            te.show()
            $('textarea').remove()
        }
    });
    $('#cnm').on('mousedown', function(e) {
        if (e.which == 3) {
            $(this).smartMenu([
                [{
                    text: '浮动到最上层',
                    func: function() {
                        var max_index = parseInt(parseInt($('#arena_max_zindex').val())+1);
                        Editor.update(2,'z_index',max_index);
                    }
                }],
                [{
                    text: '浮动到最下层',
                    func: function() {
                        // var max_index = parseInt(parseInt($('#arena_max_zindex').val())+1);
                        Editor.update(3);
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
    });
    $('#v_page_list').on('mouseover', 'li', function(e) {
        $(this).find('.glyphicon').removeClass('hidden');
    });
    $('#v_page_list').on('mouseout', 'li', function(e) {
        var that = $(this);
        setTimeout(function(){that.find('.glyphicon').addClass('hidden');},3000);
    });
    $('#v_page_list').on('mouseout', '.glyphicon', function(e) {
        $(this).find('.glyphicon').removeClass('hidden');
    });

    //上传图片控件
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
            onChange: function(file, extension){
                that.val('上传中...');
                that.attr('disabled', 'disabled');
            },
            onSubmit: function(file, extension) {
                that.val('loading...');
                that.attr('disabled', 'disabled');
                tarImg = arrType[type];
                if (genre === 'img') {
                    if (extension && /^(jpg|png|gif|JPG|PNG|GIF)$/.test(extension)) {
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
    //上传音乐控件
    $.fn.ajaxMusicUpload = function(options) {
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
            onChange: function(file, extension){
                that.val('上传中...');
                that.attr('disabled', 'disabled');
            },
            onSubmit: function(file, extension) {
                that.val('loading...');
                that.attr('disabled', 'disabled');
                tarImg = arrType[type];
                if (genre === 'img') {
                    if (extension && /^(mp3)$/.test(extension)) {
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
                        alert('音乐请上传mp3格式!');
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
            type: 0,
            callback: function(data) {
                //render picbox
                Editor.renderPicBox();
            },
            change:function(){
                $('.e_load_area').show();
                //console.log("正在上传中......");
            }
        });
    });

    // 上传功能
    $(document).on('click', '.e_upload_music', function() {
        $(this).ajaxMusicUpload({
            action: 'http://115.29.32.105:8080/upload',
            type: 1,
            callback: function(data) {
                //close modal
                $('#musicModel').modal('hide');
                //update
                Editor.update(0, 'music', data.path);
                // 更新右侧公共信息
                Editor.renderGlobalInfo();
            },
            change:function () {
                $('.e_load_area').show();
            }
        });
    });

    // 上传功能
    $(document).on('click', '.e_close_music', function() {
        Editor.update(0, 'music', '');
        Editor.fetchForm(1);
    });

    $('.col-md-6').on('click', function(e) {
        e.stopPropagation();
        if(!$(e.target).hasClass('btn')){
            $('.selector').hide();
            $('.e_tab_content').hide();
            if($('#cnm').find('textarea').length){
                $(s[0]).html($('textarea').last().val().replace(/[\r\n]/ig, '<br \/>'))
                $(s[0]).show()
                $('textarea').remove();
                s[0].func();
            }
        }
    })

};