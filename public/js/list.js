if ($ && jQuery) {
    $(document).ready(function() {
        Editor.initList();
    });

    $('.e_creat').click(function() {
        var type = $(this).attr('type');
        Editor.add(type);
    });
    $('#v_product_list').on('click', '.e_delete', function() {
        var type = $(this).attr('type');
        $('#product_id').val($(this).attr('id'));
        $('#confirmModel').modal('show');
    });

    $(document).on('click', '.e_delete_button', function() {
        Editor.remove(0);
    });

    $(document).on('click', '.e_up_page', function() {
        //更新title,更新des，更新icon
        window.frames['v_preview_src'].nyx.prevPage();
    });

    $(document).on('click', '.e_down_page', function() {
        //更新title,更新des，更新icon
        window.frames['v_preview_src'].nyx.nextPage();
    });

    $(document).on('click', '.e_close_preview', function() {
        $('#showModel').modal('hide');
        $('#v_preview_src').attr('src', '');
    });

    $(document).on('click', '.e_open_box', function(argument) {
        var replaceType = $(this).attr('replaceType');
        Editor.renderPicBox();
        if (replaceType == 3) {
            if ($("input[name='background_type']").eq(2).attr('checked') != 'checked') {
                alert("请选择图片上传选项");
            } else {
                $('.e_store_pic').attr('replaceType', replaceType);
                $('#picModel').modal('show');
            }
        } else {
            $('.e_store_pic').attr('replaceType', replaceType);
            $('#picModel').modal('show');
        }
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
        if (pic != 0) {
            if (replaceType == 0) {
                Editor.add(type);
            } else if (replaceType == 1) {
                Editor.update(2, 'pic', pic);
                //Editor.fetchForm(0);
            } else if (replaceType == 2) {
                Editor.update(0, 'weixin_share_icon', pic);
                $('#d-weixin_share_icon').attr('src', pic);
            } else if (replaceType == 3) {
                console.log("replace 3", pic);
                Editor.update(1, 'background_img', pic);
                //Editor.fetchForm(0);
            } else if (replaceType == 4) {
                Editor.update(0, 'glass_url', pic);
                //Editor.fetchForm(0);
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
        }

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
            onChange: function(file, extension) {
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
    // 上传功能
    $(document).on('click', '.e_upload_pic', function() {
        $(this).ajaxUpload({
            action: ''+Editor.baseUrl+'upload',
            type: 0,
            callback: function(data) {
                //render picbox
                Editor.renderPicBox();
            },
            change: function() {
                //$('.e_load_area').show();
                $('.v_pic_box').append('<li><img src="public/image/load.gif"></li>');
                //console.log("正在上传中......");
            }
        });
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

    $("#v_product_list").on("click", "li", function() {
        var List_current_id = $(this).attr('id');
        $('#product_id').val(List_current_id);
        Editor.renderItemInfo(List_current_id);
    });

    $('#v_product_list').on('click', '.e_edit', function() {
        var id = $(this).attr('id');
        window.location.href = 'form.html?id=' + id + '';
    });

    $('#v_product_list').on('click', '.e_review', function() {
        var id = $(this).attr('id');
        $('#product_id').val(id);
        Editor.preview();
        Editor.publishQr();
    });

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

    $('#v_product_list').on('click', '.e_publish_toggle', function() {
        var product_id = $(this).attr('id');
        Editor.renderListPublish(product_id);
        $('#publishModel').modal('show');
    });

    $('body').on('click', '.e_publish', function() {
        Editor.publish();
    });
    $('.e_quite').click(function() {
        Editor.quite();
    });
    $('body').on('click', '.e_publish', function() {
        Editor.publish();
    });

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

};