window.s_selector = '';
var Editor = {
    baseUrl:'http://www.xhyilan.com/',
    // authority method for unlogin cutomer, return unique token
    auth: function() {
        console.log('auth method start');
        //localData.set('token','554f4b95b3a3cf29e2a0ee43-89afa2366bf2fae2f47ff358a2b3080d');
        window.location.href = 'login.html';
    },
    scroll: function() {
        // body...
    },
    count:function(){
        var num = parseInt($('e_progress').attr('aria-valuenow'))+10;
        if (num == 100) {
                $('e_progress').attr('aria-valuenow','0')
        };
        $('e_progress').css('width',''+num+'%');
    },
    progress:function(){
       setInterval(this.count(),100); 
    },
    //add method for administor creat product,page or elements
    //type 0 product
    //type 1 page
    //tyoe 2 文字元素
    //type 3 图片元素
    //type 4 轮播元素
    add: function(type) {
        var token = localData.get('token'),
            product_id = $('#product_id').val(),
            page_id = $('#page_id').val(),
            page_server_id = $('#page_server_id').val(),
            element_num = $('#v_page_list').find('.item').length,
            pic = $('#upload_img_src').val(),
            slider,
            add_type = $('#add_type').val();
        if (type == 0) {
            //添加产品
            console.log('add type 0 method start');
            $.ajax({
                type: 'POST',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 0
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    $('#create_product_test_result').text(JSON.stringify(result));
                    // console.log('create_product_test returned:');
                    // console.log(result);
                    $('#v_product_list').prepend('<li id="' + result._id + '"><img data-holder-rendered="true" src="' + result.avatar + '" class="works-img"><div class="operation"><a class="e_edit" id="' + result._id + '">编辑</a><a class="e_review id="' + result._id + '">预览</a><a id="' + result._id + '" data-toggle="modal" data-target="#publishModel">发布</a><a class="last e_delete" type="0" id="' + result._id + '" type="0">删除</a></div><div class="caption">' + result.product + '</div></li>');
                },
                error: function(err) {
                    $('#create_product_test_result').text(JSON.stringify(err));
                    // console.log('create_product_test err:');
                    // console.log(err);
                }
            });
        } else if (type == 1) {
            console.log('create_page_test sended');
            //添加page
            $.ajax({
                type: 'POST',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 1,
                    'product_id': product_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    // console.log('create_page_test returned:');
                    // console.log(result);
                    Editor.store(JSON.stringify(result));
                    Editor.renderPage();
                    $('#v_page_list').find('li').last().prev().trigger('click');
                    $('#v_page_list').scrollTop($('#v_page_list').find('li').length * 214);

                },
                error: function(err) {
                    console.log('create_page_test err:');
                    console.log(err);
                }
            });
        } else if (type == 2) {
            //创建文字
            console.log('create element word sended');
            if (page_server_id == '') {
                var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
            };
            $.ajax({
                type: 'POST',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 2,
                    'product_id': product_id,
                    'page_id': page_server_id,
                    'element_type': 0
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    console.log('create_element_test returned:');
                    // console.log(result);
                    //添加文字素材
                    Editor.fetchForm(2);
                },
                error: function(err) {
                    $('#create_element_test_result').text(JSON.stringify(err));
                    console.log('create_element_test err:');
                    console.log(err);
                }
            });
        } else if (type == 3) {
            //创建图片
            console.log('create element pic sended');
            if (page_server_id == '') {
                var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
            };
            $.ajax({
                type: 'POST',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 2,
                    'product_id': product_id,
                    'page_id': page_server_id,
                    'pic': pic,
                    'element_type': 1
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    Editor.fetchForm(2);
                    $('#picModel').modal('hide');
                },
                error: function(err) {
                    // $('#create_element_test_result').text(JSON.stringify(err));
                    // console.log('create_element_test err:');
                    // console.log(err);
                }
            });
        } else if (type == 4) {
            //创建轮播
            console.log('create element slider sended');
            if (page_server_id == '') {
                var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
            };
            $.ajax({
                type: 'POST',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 2,
                    'product_id': product_id,
                    'page_id': page_server_id,
                    'slider': pic,
                    'element_type': 2
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    Editor.fetchForm(2);
                    $('#picModel').modal('hide');
                },
                error: function(err) {
                    $('#create_element_test_result').text(JSON.stringify(err));
                    // console.log('create_element_test err:');
                    // console.log(err);
                }
            });
        }
    },
    //获取列表信息
    fetchList: function() {
        console.log('fetchList method start');
        var token = localData.get('token');
        $.ajax({
            type: 'GET',
            url: ''+Editor.baseUrl+'api',
            data: {
                'type': 0
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(products) {
                console.log('fetchList returned');
                // console.log(products);
                Editor.renderList(products);
            },
            error: function(err) {
                // console.log('select_product_test err:');
                // console.log(err);
            }
        });
    },
    //获取表单信息
    //0不绘制操作区
    //1正常绘制操作区
    //2添加绘制操作区
    fetchForm: function(type) {
        console.log('fetchForm method start');
        var token = localData.get('token'),
            product_id = $('#product_id').val();
        if (type == 0) {
            $.ajax({
                type: 'GET',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 0,
                    'product_id': product_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(products) {
                    // console.log('fetchForm returned');
                    console.log(products);
                    //保存数据到本地
                    Editor.store(JSON.stringify(products));
                    //渲染左侧列表
                    Editor.renderPage();
                    //Editor.convertCanvasToImage();
                    //渲染中间操作层
                    //Editor.renderArena();
                    //渲染右侧页面元素元素信息
                    Editor.renderPageAnimate();
                    //渲染右侧元素元素信息
                    Editor.renderElementInfo();
                    //无参数，渲染右侧产品公共信息
                    Editor.renderGlobalInfo();
                },
                error: function(err) {
                    // $('#select_product_test_result').text(JSON.stringify(err));
                    console.log('fetchForm err:');
                    console.log(err);
                }
            });
        } else if (type == 1) {
            $.ajax({
                type: 'GET',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 0,
                    'product_id': product_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(products) {
                    // console.log('fetchForm returned');
                    console.log(products);
                    //保存数据到本地
                    Editor.store(JSON.stringify(products));
                    //渲染左侧列表
                    //Editor.renderPage();
                    //Editor.convertCanvasToImage();
                    //渲染中间操作层
                    Editor.renderArena(0);
                    //渲染右侧页面元素元素信息
                    Editor.renderPageAnimate();
                    //渲染右侧元素元素信息
                    Editor.renderElementInfo();
                    //无参数，渲染右侧产品公共信息
                    Editor.renderGlobalInfo();
                },
                error: function(err) {
                    // $('#select_product_test_result').text(JSON.stringify(err));
                    console.log('fetchForm err:');
                    console.log(err);
                }
            });
        } else if (type == 2) {
            $.ajax({
                type: 'GET',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 0,
                    'product_id': product_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(products) {
                    // console.log('fetchForm returned');
                    console.log(products);
                    //保存数据到本地
                    Editor.store(JSON.stringify(products));
                    //渲染左侧列表
                    //Editor.renderPage();
                    //Editor.convertCanvasToImage();
                    //渲染中间操作层
                    Editor.renderArena(1);
                    //渲染右侧页面元素元素信息
                    Editor.renderPageAnimate();
                    //渲染右侧元素元素信息
                    Editor.renderElementInfo();
                    //无参数，渲染右侧产品公共信息
                    Editor.renderGlobalInfo();
                },
                error: function(err) {
                    // $('#select_product_test_result').text(JSON.stringify(err));
                    console.log('fetchForm err:');
                    console.log(err);
                }
            });
        }
    },
    //初始化列表页
    initList: function() {
        console.log("initList method start");
        if (localData.get('token') != null) {
            this.setUsername();
            this.fetchList();
        } else {
            this.auth();
        }
    },
    //初始化表单页
    initForm: function() {
        $('#product_id').val(window.location.href.split('?')[1].split('=')[1]);
        if (localData.get('token') != null) {
            this.setUsername();
            this.fetchForm(0);
            this.renderPicBox();
        } else {
            this.auth();
        }
    },
    setUsername: function() {
        var name = localData.get('username'),
            token = localData.get('token');
        $('.v_username').html(name);

        //if (name != "admin" || token != '554f4b95b3a3cf29e2a0ee43-89afa2366bf2fae2f47ff358a2b3080d') {
        if (name != "admin") {
            $('.e_user').eq(1).parent('li').hide();
        };
    },
    quite: function() {
        localData.set('token', '');
        localData.set('username', '');
        window.location.href = 'login.html';
    },
    //发布
    publish: function() {
        var product_id = $('#product_id').val(),
            token = localData.get('token');
        $.ajax({
            type: 'GET',
            url: ''+Editor.baseUrl+'publish',
            data: {
                'product_id': product_id
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(products) {
                console.log('fetchList returned');
                // console.log("publish data:", products);
                $('#publishModel').modal('hide');
                $('#qCodeModel').modal('show');
                $('#v_qCode').empty();
                $('#v_qCode').append('<p>线上地址为：' + products.path + '</p><p><img src="' + products.qrcode + '"></img></p>');
            },
            error: function(err) {
                console.log('select_product_test err:');
                console.log(err);
            }
        });
    },
    //预览
    preview: function() {
        console.log("preview method start");
        var product_id = $('#product_id').val(),
            page_server_id = $('#page_server_id').val(),
            token = localData.get('token'),
            src;
        $.ajax({
            type: 'GET',
            url: ''+Editor.baseUrl+'publish',
            data: {
                'product_id': product_id,
                'preview': 1
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(products) {
                // console.log(products);
                if (page_server_id != '') {
                    var src = products.path + '#' + page_server_id;
                    // console.log('preview src', src);
                    $('#v_preview_src').attr('src', src);
                    $('#showModel').modal('show');
                };

                //alert('发布成功')
                //Editor.renderList(products);
            },
            error: function(err) {
                console.log('select_product_test err:');
                console.log(err);
            }
        });
    },
    publishQr: function() {
        console.log("publishQr method start");
        var product_id = $('#product_id').val(),
            token = localData.get('token');
        $.ajax({
            type: 'GET',
            url: ''+Editor.baseUrl+'publish',
            data: {
                'product_id': product_id
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(products) {
                $('#v_qrcode_share').attr('src', products.qrcode);
                $('#showModel').modal('show');
            },
            error: function(err) {
                console.log('select_product_test err:');
                console.log(err);
            }
        });
    },
    //remove method for administor delete product,page or elements
    //type 0 product
    //tyoe 1 page
    //type 2 elements
    remove: function(type) {
        console.log("remove method start");
        var token = localData.get('token'),
            current_id = localData.get('current_id'),
            product_id = $('#product_id').val(),
            page_id = $('#page_id').val(),
            page_sever_id = $('#page_server_id').val(),
            element_id = $('#element_id').val(),
            element_server_id = $('#element_server_id').val();

        if (type == 0) {
            console.log('delete_product_test sended');
            $.ajax({
                type: 'DELETE',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 0,
                    'product_id': product_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    $('#delete_product_test_result').text(JSON.stringify(result));
                    // console.log('delete_product_test returned:');
                    // console.log(result);
                    Editor.store(JSON.stringify(result));
                    if (result.ok == 1) {
                        $('#confirmModel').modal('hide');
                        $('#' + product_id).remove();
                        $('#product_id').val('');

                    };
                },
                error: function(err) {
                    // $('#delete_product_test_result').text(JSON.stringify(err));
                    // console.log('delete_product_test err:');
                    // console.log(err);
                }
            });
        } else if (type == 1) {
            console.log('delete_page_test sended');
            // console.log(page_sever_id);
            $.ajax({
                type: 'DELETE',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 1,
                    'product_id': product_id,
                    'page_id': page_sever_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    // console.log('remove_page_test returned:');
                    // console.log(result);
                    Editor.store(JSON.stringify(result));
                    Editor.renderPage();
                    $('#confirmModel').modal('hide');
                    $('#page_id').val();
                    $('#page_server_id').val('');
                    $('#cnm').empty();
                },
                error: function(err) {
                    console.log('delete_page_test err:');
                    console.log(err);
                }
            });
        } else if (type == 2) {
            console.log('delete_page_test sended');
            $.ajax({
                type: 'DELETE',
                url: ''+Editor.baseUrl+'api',
                data: {
                    'type': 2,
                    'product_id': product_id,
                    'page_id': page_sever_id,
                    'element_id': element_server_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    Editor.store(JSON.stringify(result));
                    //console.log('delete_element_test returned:');
                    //console.log(result);
                    $('#element_server_id').val('');
                    Editor.fetchForm(0);
                },
                error: function(err) {
                    $('#delete_element_test_result').text(JSON.stringify(err));
                    //console.log('delete_element_test err:');
                    //console.log(err);
                }
            });
        }
    },
    //绘制列表页右侧信息
    renderItemInfo: function(product_id) {
        var obj = JSON.parse(localData.get(product_id + '_info'));
        //console.log("dddd",obj.status);
        $('#v_product_info').find('.status').text(obj.status);
        $('#v_product_info').find('.avatar').attr('src', obj.avatar);
        $('#v_product_info').find('.creat_time').text(obj.createTime);
        $('#v_product_info').find('.update_time').text(obj.updateTime);
        $('#v_product_info').find('#d-product').val(obj.product);
        $('#v_product_info').find('.product_des').text(obj.des);
    },
    //绘制列表页展示区
    renderList: function(data) {
        console.log('renderList method start');
        $('#v_product_list').empty();
        for (var i = 0; i < data.length; i++) {
            localData.set(data[i]._id + '_info', JSON.stringify(data[i]));
            $('#v_product_list').append('<li id="' + data[i]._id + '"><img data-holder-rendered="true" src="' + data[i].avatar + '" class="works-img"><div class="operation"><a class="e_edit" id="' + data[i]._id + '">编辑</a><a class="e_review" id="' + data[i]._id + '">预览</a><a id="' + data[i]._id + '"  class="e_publish_toggle">发布</a><a class="last e_delete" id="' + data[i]._id + '" type="0">删除</a></div><div class="caption">' + data[i].product + '</div></li>');
        };
    },
    //绘制左侧页列表
    renderPage: function() {
        console.log('render page method start');
        $('#v_page_list').empty();
        var data = JSON.parse(localData.get($('#product_id').val() + '_data')),
            page_server_id = $('#page_server_id').val(),
            page_server_list = $('#v_page_list').find('li');
        $('#page_number').val(parseInt(data.pages.length + 1));
        for (var i = 0; i < data.pages.length; i++) {
            $('#v_page_list').append('<li order="' + data.pages[i].order + '" pid="' + data.pages[i]._id + '" id="p_' + i + '"><span class="page-num">' + parseInt(i + 1) + '</span><i class="del e_delete" type="1" id="p_' + i + '" pid="' + data.pages[i]._id + '"></i><span class="glyphicon glyphicon-arrow-up e_page_up" pid="' + data.pages[i]._id + '" order="' + data.pages[i].order + '" title="上移"></span><span class="glyphicon glyphicon-arrow-down e_page_down" pid="' + data.pages[i]._id + '" order="' + data.pages[i].order + '" title="下移"></span><img data-holder-rendered="true" src="' + data.pages[i].avatar + '" class="page-img" ></li>');
        };
        $('#v_page_list').append('<li><span class="page-num">' + $('#page_number').val() + '</span><div class="add-newpage e_creat" type="1"></div></li>');
        if (page_server_id == '') {
            //var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
            $('#v_page_list').find('li').first().trigger('click');
        } else {
            for (var i = 0; i < $('#v_page_list').find('li').length; i++) {
                if ($('#v_page_list').find('li').eq(i).attr('pid') == page_server_id) {
                    //console.log("abcde",$('#v_page_list').find('li').eq(i).attr('pid'));
                    $('#v_page_list').find('li').eq(i).trigger('click');
                }
            }
        }
    },
    //绘制中间操作区,不存在，新增或者初始化
    //type 0 为正常绘制
    //type 1 为添加绘制
    renderArena: function(type) {
        if (type == 0) {
            console.log('render arena method start');
            var data = JSON.parse(localData.get($('#product_id').val() + '_data')).pages,
                page_id = $('#page_id').val(),
                page_server_id = $('#page_server_id').val(),
                max_index = $('#arena_max_zindex').val();
            //console.log(page_id);
            num = parseInt(page_id.split('_')[1]) + parseInt(1);
            if (page_server_id == '') {
                var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
                $('#v_page_list').find('li').first().trigger('click');

            };
            //$('.page-name').empty().text("页面" + num);
            $('#cnm').empty();
            $('#cnm').append('<div class="selector" style="display:none;z-index:899"></div>');
            if (data != undefined) {
                var template_word = "";
                var template_pic = "";
                var template_slider = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i]._id == page_server_id) {
                        //console.log("element data:", data[i].elements);
                        //console.log("element background:", data[i].background_color);

                        if (data[i].background_type == 0) {
                            $('#cnm').css({
                                "background-color": "",
                                "background-image": ""
                            });
                        } else if (data[i].background_type == 1) {

                            $('#cnm').css({
                                "background-color": data[i].background_color,
                                "background-image": ""
                            });
                        } else if (data[i].background_type == 2) {
                            $('#cnm').css({
                                "background-color": '',
                                "background-image": "url(" + data[i].background_img + ")"
                            });
                        }
                        for (var j = 0; j < data[i].elements.length; j++) {
                            var obj = data[i].elements[j];
                            if (obj.z_index > max_index) {
                                $('#arena_max_zindex').val(obj.z_index);
                            }
                            if (obj.element_type == 0) {
                                //console.log("dsdsdsdsd",obj.horizontal)
                                //console.log("33232323", obj.ftb);
                                if (obj.horizontal == 1 || obj.horizontal == 3) {
                                    $('.input_horizontal').hide();
                                }
                                if (obj.vertical == 1 || obj.vertical == 3) {
                                    $('.input_vertical').hide();
                                }
                                template_word += "<div class='item' element_type='0' text='true' plane='" + obj.horizontal + "' mid='" + obj._id + "' vertical='" + obj.vertical + "' style='position:absolute;overflow:hidden;z-index:" + obj.z_index + ";width:" + obj.width + "px;height:" + obj.height + "px;font-size:" + obj.fts + "px; color:" + obj.ftc + ";text-align:" + obj.text_align + ";font-weight:" + obj.ftb + "; text-decoration:" + obj.ftu + "; font-style:" + obj.fti + ";";
                                if (obj.horizontal == 2) {
                                    template_word += "right:" + obj.hshift + "px;";
                                } else {
                                    template_word += "left:" + obj.hshift + "px;";
                                }
                                if (obj.vertical == 2) {
                                    template_word += "bottom:" + obj.vshift + "px;";
                                } else {
                                    template_word += "top:" + obj.vshift + "px;";
                                }
                                template_word += "'>" + obj.text + "</div>";
                                //console.log("223232332",template_word);
                                $('#cnm').append(template_word);
                                template_word = '';
                            } else if (obj.element_type == 1) {
                                //console.log(obj.pic, 21312321321312)
                                template_pic += "<img class='item' element_type='1' plane='" + obj.horizontal + "' vertical='" + obj.vertical + "' mid='" + obj._id + "' src='" + obj.pic + "' style='position:absolute;z-index:" + obj.z_index + ";width:" + obj.width + "px;height:" + obj.height + "px;text-align:" + obj.text_align + ";";
                                if (obj.horizontal == 2) {
                                    template_pic += "right:" + obj.hshift + "px;";
                                } else {
                                    template_pic += "left:" + obj.hshift + "px;";
                                }
                                if (obj.vertical == 2) {
                                    template_pic += "bottom:" + obj.vshift + "px;'";
                                } else {
                                    template_pic += "top:" + obj.vshift + "px;'";
                                }
                                template_pic += "></img>";
                                $('#cnm').append(template_pic);
                                template_pic = '';
                            } else if (obj.element_type == 2) {
                                //console.log('12121212', obj.slider);
                                if (obj.slider != '') {
                                    if (typeof(obj.slider) == 'object') {
                                        var show_pic = obj.slider[0];
                                    } else if (typeof(obj.slider) == 'string') {
                                        var show_pic = obj.slider.split(',')[0];
                                    }
                                    template_slider += "<img class='item'  element_type='2' plane='" + obj.horizontal + "' vertical='" + obj.vertical + "' mid='" + obj._id + "' src='" + show_pic + "' style='position:absolute;z-index:" + obj.z_index + ";width:" + obj.width + "px;height:" + obj.height + "px" + ";";
                                    if (obj.horizontal == 2) {
                                        template_slider += "right:" + obj.hshift + "px;";
                                    } else {
                                        template_slider += "left:" + obj.hshift + "px;";
                                    }
                                    if (obj.vertical == 2) {
                                        template_slider += "bottom:" + obj.vshift + "px;'";
                                    } else {
                                        template_slider += "top:" + obj.vshift + "px;'";
                                    }
                                    template_slider += "></img>";
                                    $('#cnm').append(template_slider);
                                    template_slider = '';
                                };

                            }
                        };
                    }
                }
            };
        } else if (type == 1) {
            console.log('render arena method start');
            var data = JSON.parse(localData.get($('#product_id').val() + '_data')).pages,
                page_id = $('#page_id').val(),
                page_server_id = $('#page_server_id').val(),
                max_index = $('#arena_max_zindex').val();
            //console.log(page_id);
            num = parseInt(page_id.split('_')[1]) + parseInt(1);
            if (page_server_id == '') {
                var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
                $('#v_page_list').find('li').first().trigger('click');

            };
            //$('.page-name').empty().text("页面" + num);
            $('#cnm').empty();
            $('#cnm').append('<div class="selector" style="display:none;z-index:899"></div>');
            if (data != undefined) {
                var template_word = "";
                var template_pic = "";
                var template_slider = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i]._id == page_server_id) {
                        //console.log("element data:", data[i].elements);
                        //console.log("element background:", data[i].background_color);

                        if (data[i].background_type == 0) {
                            $('#cnm').css({
                                "background-color": "",
                                "background-image": ""
                            });
                        } else if (data[i].background_type == 1) {

                            $('#cnm').css({
                                "background-color": data[i].background_color,
                                "background-image": ""
                            });
                        } else if (data[i].background_type == 2) {
                            $('#cnm').css({
                                "background-color": '',
                                "background-image": "url(" + data[i].background_img + ")"
                            });
                        }
                        for (var j = 0; j < data[i].elements.length; j++) {
                            var obj = data[i].elements[j];
                            if (obj.z_index > max_index) {
                                $('#arena_max_zindex').val(obj.z_index);
                            }
                            if (obj.element_type == 0) {
                                //console.log("dsdsdsdsd",obj.horizontal)
                                //console.log("33232323", obj.ftb);
                                if (obj.horizontal == 1 || obj.horizontal == 3) {
                                    $('.input_horizontal').hide();
                                }
                                if (obj.vertical == 1 || obj.vertical == 3) {
                                    $('.input_vertical').hide();
                                }
                                template_word += "<div class='item' element_type='0' text='true' plane='" + obj.horizontal + "' mid='" + obj._id + "' vertical='" + obj.vertical + "' style='position:absolute;overflow:hidden;z-index:" + obj.z_index + ";width:" + obj.width + "px;height:" + obj.height + "px;font-size:" + obj.fts + "px; color:" + obj.ftc + ";text-align:" + obj.text_align + ";font-weight:" + obj.ftb + "; text-decoration:" + obj.ftu + "; font-style:" + obj.fti + ";";
                                if (obj.horizontal == 2) {
                                    template_word += "right:" + obj.hshift + "px;";
                                } else {
                                    template_word += "left:" + obj.hshift + "px;";
                                }
                                if (obj.vertical == 2) {
                                    template_word += "bottom:" + obj.vshift + "px;";
                                } else {
                                    template_word += "top:" + obj.vshift + "px;";
                                }
                                template_word += "'>" + obj.text + "</div>";
                                //console.log("223232332",template_word);
                                $('#cnm').append(template_word);
                                template_word = '';
                            } else if (obj.element_type == 1) {
                                //console.log(obj.pic, 21312321321312)
                                template_pic += "<img class='item' element_type='1' plane='" + obj.horizontal + "' vertical='" + obj.vertical + "' mid='" + obj._id + "' src='" + obj.pic + "' style='position:absolute;z-index:" + obj.z_index + ";width:" + obj.width + "px;height:" + obj.height + "px;text-align:" + obj.text_align + ";";
                                if (obj.horizontal == 2) {
                                    template_pic += "right:" + obj.hshift + "px;";
                                } else {
                                    template_pic += "left:" + obj.hshift + "px;";
                                }
                                if (obj.vertical == 2) {
                                    template_pic += "bottom:" + obj.vshift + "px;'";
                                } else {
                                    template_pic += "top:" + obj.vshift + "px;'";
                                }
                                template_pic += "></img>";
                                $('#cnm').append(template_pic);
                                template_pic = '';
                            } else if (obj.element_type == 2) {
                                // console.log('12121212', obj.slider);
                                if (obj.slider != '') {
                                    var show_pic = obj.slider.split(',')[0];
                                    template_slider += "<img class='item'  element_type='2' plane='" + obj.horizontal + "' vertical='" + obj.vertical + "' mid='" + obj._id + "' src='" + show_pic + "' style='position:absolute;z-index:" + obj.z_index + ";width:" + obj.width + "px;height:" + obj.height + "px" + ";";
                                    if (obj.horizontal == 2) {
                                        template_slider += "right:" + obj.hshift + "px;";
                                    } else {
                                        template_slider += "left:" + obj.hshift + "px;";
                                    }
                                    if (obj.vertical == 2) {
                                        template_slider += "bottom:" + obj.vshift + "px;'";
                                    } else {
                                        template_slider += "top:" + obj.vshift + "px;'";
                                    }
                                    template_slider += "></img>";
                                    $('#cnm').append(template_slider);
                                    template_slider = '';
                                };

                            }
                        };
                    }
                }
            };
        }
        //@author xtx
        if (type == 1) {
            var obj = {
                target: $('#cnm').children().last()[0]
            }
            s_selector = Drag(obj)
        } else {
            if(arguments[1]){
                $('.selector').hide()
            }else{
                if (s_selector) {
                    for (var i in $('#cnm').children()) {
                        if ($('#cnm').children().eq(i).attr('mid') == $(s_selector[0]).attr('mid')) {
                            var obj = {
                                target: $('#cnm').children().eq(i)[0]
                            }
                            s_selector = Drag(obj)
                        }
                    }
                } else {
                    var obj = {
                        target: $('#cnm').children().last()[0]
                    }
                    s_selector = Drag(obj)
                }
            }
        };
    },
    //绘制右侧的数据中的元素信息
    renderElementInfo: function() {
        console.log('render Element method start');
        var data = JSON.parse(localData.get($('#product_id').val() + '_data')).pages,
            product_id = $('#product_id').val(),
            page_id = $('#page_id').val(),
            page_server_id = $('#page_server_id').val(),
            element_id = $('#element_id').val(),
            element_server_id = $('#element_server_id').val();
        if (page_server_id != '' && element_server_id != '') {
            //var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
            if (data != undefined) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]._id == page_server_id) {
                        for (var j = 0; j < data[i].elements.length; j++) {
                            //console.log("sds",element_server_id);
                            if (data[i].elements[j]._id != undefined || element_server_id != undefined) {
                                if (data[i].elements[j]._id == element_server_id) {
                                    var obj = data[i].elements[j];
                                    //render operation
                                    $('#d-ftb').removeClass('glyphicon_on');
                                    $('#d-fti').removeClass('glyphicon_on');
                                    $('#d-ftu').removeClass('glyphicon_on');
                                    $('#d-title').val(obj.title);
                                    $('#d-width').val(obj.width);
                                    $('#d-height').val(obj.height);
                                    $('#d-hshift').val(obj.hshift);
                                    $('#d-vshift').val(obj.vshift);
                                    $('.d-horizontal').removeClass('glyphicon_on');
                                    $('.d-horizontal').eq(obj.horizontal).addClass('glyphicon_on');
                                    $('.d-vertical').removeClass('glyphicon_on');
                                    $('.d-vertical').eq(obj.vertical).addClass('glyphicon_on');
                                    if (obj.text_align == 'left') {
                                        $('.d-align').eq(0).addClass('glyphicon_on');
                                        $('.d-align').eq(1).removeClass('glyphicon_on');
                                        $('.d-align').eq(2).removeClass('glyphicon_on');

                                    } else if (obj.text_align == 'center') {
                                        $('.d-align').eq(1).addClass('glyphicon_on');
                                        $('.d-align').eq(0).removeClass('glyphicon_on');
                                        $('.d-align').eq(2).removeClass('glyphicon_on');

                                    } else if (obj.text_align == 'right') {
                                        $('.d-align').eq(2).addClass('glyphicon_on');
                                        $('.d-align').eq(1).removeClass('glyphicon_on');
                                        $('.d-align').eq(0).removeClass('glyphicon_on');
                                    }
                                    if (obj.ftb == 'bold') {
                                        $('#d-ftb').addClass('glyphicon_on');
                                    };
                                    if (obj.fti == 'italic') {
                                        $('#d-fti').addClass('glyphicon_on');
                                    };
                                    if (obj.ftu == 'underline') {
                                        $('#d-ftu').addClass('glyphicon_on');
                                    };
                                    if (obj.pic == '') {
                                        $('#d-element_pic').attr('src', ''+Editor.baseUrl+'public/Pretoria/public/image/morentu.png');
                                    } else {
                                        $('#d-element_pic').attr('src', obj.pic);
                                    }
                                    var slider = obj.slider.split(',');
                                    console.log("slider length:", slider);
                                    $('#v_d_2').empty();
                                    if (slider.length == 1 && slider != '') {
                                        $('#v_d_2').append('<div class="clearfix lb"><div class="mt10"><p>1<span class="ml10">轮播图片1</span><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></p></div><div class="fl"><a><img data-holder-rendered="true" src="' + slider[0] + '" class="pic_slider"  style="width: 64px; height: 64px;" class="media-object" data-src="holder.js/64x64" alt="64x64"></a><h4 class="pic-name">绘图.png</h4></div><button class="e_open_box slider_update" replacetype="7">替换</button></div>');
                                        $('#v_d_2').show();
                                    } else if (slider.length > 1) {
                                        $('#v_d_2').show();
                                        for (var k = 0; k < slider.length; k++) {
                                            $('#v_d_2').append('<div class="clearfix lb"><div class="mt10"><p>' + parseInt(k + 1) + '.<span class="ml10">轮播图片' + parseInt(k + 1) + '</span><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></p></div><div class="fl"><a><img data-holder-rendered="true" src="' + slider[k] + '" class="pic_slider" style="width: 64px; height: 64px;" class="media-object" data-src="holder.js/64x64" alt="64x64"></a><h4 class="pic-name">绘图.png</h4></div><button class="e_open_box slider_update" replacetype="7" key="' + k + '">替换</button></div>');
                                        };
                                        $('#v_d_2').show();
                                    }
                                    //console.log("232323",obj.animate_effect);
                                    $('#d-ftc').val(obj.ftc);
                                    $('#d-fts').val(obj.fts);
                                    // console.log("29999",obj.animate_effect);
                                    if (obj.animate_effect == '') {
                                        $('.d-animate_effect').html("无动画");
                                    } else if (obj.animate_effect == 'bounceInLeft') {
                                        $('.d-animate_effect').html("左飞入");
                                    } else if (obj.animate_effect == 'bounceInRight') {
                                        $('.d-animate_effect').html("右飞入");
                                    } else if (obj.animate_effect == 'bounceInUp') {
                                        $('.d-animate_effect').html("上飞入");
                                    } else if (obj.animate_effect == 'bounceInDown') {
                                        $('.d-animate_effect').html("下飞入");
                                    } else if (obj.animate_effect == 'zoomIn') {
                                        $('.d-animate_effect').html("放大出现");
                                    } else if (obj.animate_effect == 'flipInX') {
                                        $('.d-animate_effect').html("上下翻转");
                                    } else if (obj.animate_effect == 'flipInY') {
                                        $('.d-animate_effect').html("左右翻转");
                                    } else if (obj.animate_effect == 'rollIn') {
                                        $('.d-animate_effect').html("旋转飞入");
                                    } else if (obj.animate_effect == 'lightSpeedIn') {
                                        $('.d-animate_effect').html("刹车进入");
                                    } else if (obj.animate_effect == 'swing') {
                                        $('.d-animate_effect').html("摆动");
                                    } else if (obj.animate_effect == 'jello') {
                                        $('.d-animate_effect').html("抖动");
                                    } else if (obj.animate_effect == 'flash') {
                                        $('.d-animate_effect').html("闪烁");
                                    } else if (obj.animate_effect == 'bounce') {
                                        $('.d-animate_effect').html("弹跳");
                                    } else if (obj.animate_effect == 'shake') {
                                        $('.d-animate_effect').html("摇摆");
                                    } else if (obj.animate_effect == 'tada') {
                                        $('.d-animate_effect').html("振铃");
                                    }
                                    //if (obj.animate_delay == '') {
                                    //$('.d-animate_delay').html("3000ms");
                                    //}else{
                                    $('.d-animate_delay').html(obj.animate_delay);
                                    //}
                                    //if (obj.animate_duration == '') {
                                    //$('.d-animate_duration').html("1000ms");
                                    //}else{
                                    $('.d-animate_duration').html(obj.animate_duration);
                                    //}                                    
                                    //$('.d-animate_effect').html(obj.animate_effect);
                                    //$('.d-animate_delay').html(obj.animate_delay);
                                    //$('.d-animate_delay').html(obj.animate_delay);
                                    //$('.d-animate_duration').html(obj.animate_duration);
                                    //$('.d-animate_duration').html(obj.animate_duration);
                                };
                            };

                        };
                    }
                }
            };
        } else {
            return false;
        }
    },
    //绘制动画弹出框内内容
    renderAnimateModel: function() {
        console.log("render animate model start");
        var data = JSON.parse(localData.get($('#product_id').val() + '_data')).pages,
            page_server_id = $('#page_server_id').val(),
            element_server_id = $('#element_server_id').val();
        if (page_server_id != '') {
            //var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
            //$('#v_animate_box').empty();
            if (data != undefined) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]._id == page_server_id) {
                        for (var j = 0; j < data[i].elements.length; j++) {
                            if (element_server_id == data[i].elements[j]._id) {
                                var obj = data[i].elements[j];
                                //$('#v_animate_box').append('<li><label>动画效果设置:</label><select class="click-action ml10 update_select d-animate_effect" elementype="2" id="d-animate_effect"><option value="slide">slide</option><option value="flash">flash</option><option value="jello">jello</option><option value="bounceIn">bounceIn</option></select></li><li><label>动画延迟设置:</label><select class="click-action ml10 update_select d-animate_delay" elementype="2" id="d-animate_delay"><option value="1000">1000毫秒</option><option value="2000">2000毫秒</option><option value="3000">3000毫秒</option><option value="4000">4000毫秒</option></select></li><li><label>动画持续时间设置:</label><select class="click-action ml10 update_select d-animate_duration" elementype="2" id="d-animate_duration"><option value="1000">1000毫秒</option><option value="2000">2000毫秒</option><option value="3000">3000毫秒</option><option value="4000">4000毫秒</option></select></li>');
                                //$('#ds-animate_effect').find("option[value='"+obj.animate_effect+"']").attr("selected",true);
                                //$('#ds-animate_effect').find("option[value='jello']")[0].selected;
                                $('#ds-animate_effect').val(obj.animate_effect);
                                $('#ds-animate_delay').val(obj.animate_delay);
                                $('#ds-animate_duration').val(obj.animate_duration);
                            };
                        };

                    };
                };
            };
        };
        $('#animateModel').modal('show');
    },
    renderListPublish: function(id) {
        console.log("renderListPublish method start");
        var data = JSON.parse(localData.get(id + '_info'));
        //console.log("bcd",data);
        if (data.weixin_share_icon == '') {
            $('#d-weixin_share_icon').attr('src', ''+Editor.baseUrl+'public/Pretoria/public/image/morentu.png');
        } else {
            $('#d-weixin_share_icon').attr('src', data.weixin_share_icon);
        };

        $('#d-weixin_share_title').val(data.weixin_share_title);
        $('#d-weixin_share_desc').val(data.weixin_share_desc);
    },
    //绘制右侧的数据中的页面动画设置
    renderPageAnimate: function() {
        console.log('render page animate method start');
        var data = JSON.parse(localData.get($('#product_id').val() + '_data')).pages,
            product_id = $('#product_id').val(),
            page_id = $('#page_id').val(),
            page_server_id = $('#page_server_id').val(),
            element_id = $('#element_id').val(),
            element_server_id = $('#element_server_id').val(),
            template_animate = "";

        if (page_server_id != '') {
            //var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
            $('#v_url').find('select').empty();
            $('#v_page_animate').empty();
            if (data != undefined) {
                for (var i = 0; i < data.length; i++) {
                    $('#v_url').find('select').append('<option value="' + data[i]._id + '">' + data[i].title + '</option>');
                    if (data[i]._id == page_server_id) {
                        $("input[name='background_type']")[data[i].background_type].checked = true;
                        $('#d-background_color').val(data[i].background_color);
                        $('#dp-title').val(data[i].title).attr('placeholder', data[i].title);
                        if (data[i].background_img == '') {
                            $('.d_page_backimg').attr('src', ''+Editor.baseUrl+'public/Pretoria/public/image/morentu.png');
                        } else {
                            $('.d_page_backimg').attr('src', data[i].background_img);
                        }

                        for (var j = 0; j < data[i].elements.length; j++) {
                            var obj = data[i].elements[j];
                            if (obj.animate_effect == '') {
                                $('#v_page_animate').append('<li><label>' + obj.title + ':</label><button class="animation-btn" data-toggle="modal" data-target="#animateModel" mid="' + obj._id + '">修改动画</button><div class="animation"><p><i class="fly"></i>动画效果为:无效果</p></div><div class="animation"><p><i class="delay"></i>延迟' + obj.animate_delay + '秒后出现</p></div><div class="animation"><p><i class="continue"></i>持续' + obj.animate_duration + '秒后</p></div></li>');
                            } else {
                                template_animate += "<li><label>" + obj.title + ":</label><button class='animation-btn' data-toggle='modal' data-target='#animateModel' mid='" + obj._id + "'>修改动画</button><div class='animation'><p><i class='fly'></i>";
                                if (obj.animate_effect == 'bounceInLeft') {
                                    template_animate += "动画效果为:左飞入</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'bounceInRight') {
                                    template_animate += "动画效果为:右飞入'</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'bounceInUp') {
                                    template_animate += "动画效果为:上飞入</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'bounceInDown') {
                                    template_animate += "动画效果为:下飞入</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'zoomIn') {
                                    template_animate += "动画效果为:放大出现</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'flipInX') {
                                    template_animate += "动画效果为:上下翻转</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'flipInY') {
                                    template_animate += "动画效果为:左右翻转</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'rollIn') {
                                    template_animate += "动画效果为:旋转飞入</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'lightSpeedIn') {
                                    template_animate += "动画效果为:刹车进入</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'swing') {
                                    template_animate += "动画效果为:摆动</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'jello') {
                                    template_animate += "动画效果为:抖动</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'flash') {
                                    template_animate += "动画效果为:闪烁</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'bounce') {
                                    template_animate += "动画效果为:弹跳</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                } else if (obj.animate_effect == 'shake') {
                                } else if (obj.animate_effect == 'tada') {
                                    template_animate += "动画效果为:振铃</p></div><div class='animation'><p><i class='delay'></i>延迟" + obj.animate_delay + "秒后出现</p></div><div class='animation'><p><i class='continue'></i>持续" + obj.animate_duration + "秒后</p></div></li>";
                                };
                                $('#v_page_animate').append(template_animate);
                                template_animate = '';
                            }

                        };

                    };
                };
            };
        };
    },
    //绘制图片库
    renderPicBox: function() {
        console.log("render picbox start");
        var product_id = $('#product_id').val(),
            token = localData.get('token');
        $.ajax({
            type: 'GET',
            url: ''+Editor.baseUrl+'api',
            data: {
                'product_id': product_id
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(products) {
                //console.log("1223232332",products);
                $('.v_pic_box').empty();
                if (products.length == 0) {
                    $('.v_pic_box').append('<li>暂无照片</li>');
                } else {
                    for (var i = 0; i < products.length; i++) {
                        $('.v_pic_box').append('<li><img src="' + products[i].path + '"></li></li>');
                    }
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    },
    //绘制右侧的数据中的产品信息
    renderGlobalInfo: function() {
        console.log('render global method start');
        var data = JSON.parse(localData.get($('#product_id').val() + '_data'));
        console.log("global info", data);
        if (data != undefined) {
            //box5
            $('#d-product').val(data.product);
            $("input[name='glass']").eq([data.glass]).attr('checked', true);
            if (data.glass_url == '') {
                $('#d-glass_url').attr('src', ''+Editor.baseUrl+'public/Pretoria/public/image/morentu.png');
            } else {
                $('#d-glass_url').attr('src', data.glass_url);

            }
            $('#d-glass_trans').val(data.glass_trans);
            $('#d-orign_num').val(data.orign_num);
            $('#d-pry').val(data.pry);
            $('#d-switch_type').val(data.switch_type);
            $('#d-weixin_share_title').val(data.weixin_share_title);
            $('#d-weixin_share_desc').val(data.weixin_share_desc);
            //box4
            //音乐列表dp-title
            $('#v_upload_music').empty();
            if (data.music == '') {
                $('#v_upload_music').prev().html("添加音乐");
                $('#v_upload_music').append('<p><em class="glyphicon glyphicon-play-circle" style="top:2px;"></em>暂无音乐资源</span></p>');
            } else {
                $('#v_upload_music').append('<p><em class="glyphicon glyphicon-play-circle" style="top:2px;"></em><a class="ml10" path="' + data.music + '">音乐资源</a></span><button type="button" class="close e_close_music" aria-label="Close"><span aria-hidden="true">&times;</span></button></p>');
            };
            $("input[name='music_pos']").eq([data.music_pos]).attr('checked', true);
            $("input[name='music_option']").eq([data.music_option]).attr('checked', true);
            //box2
            //box1           
        };
    },
    //保存数据
    store: function(data) {
        var product_id = $('#product_id').val();
        localData.set(product_id + "_data", data);
    },
    //update method for administor upddate items
    //type 0 product global element
    //tyoe 1 page element
    //type 2 elements
    //type 3 右键最下
    //type 4 左侧page上移下移
    update: function(type, key, val) {
        console.log('update method start');
        var token = localData.get('token'),
            product_id = $('#product_id').val(),
            page_id = $('#page_id').val(),
            page_server_id = $('#page_server_id').val(),
            element_id = $('#element_id').val(),
            element_server_id = $('#element_server_id').val();
        if (page_server_id == '') {
            page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
        };
        if (element_server_id == '') {
            element_server_id = $('#cnm').find('.item').eq(0).attr('mid');
        };
        if (type == 0) {
            console.log('update type 0 start');
            console.log('update_product_test sended');
            var data = {
                'type': 0,
                'product_id': product_id
            };
            data[key] = val;
            $.ajax({
                type: 'PUT',
                url: ''+Editor.baseUrl+'api',
                data: data,
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    //console.log(result);
                    Editor.initList();
                    Editor.fetchForm(1);
                },
                error: function(err) {
                    console.log('update_product_test err:');
                    console.log(err);
                }
            });
        } else if (type == 1) {
            console.log('update_product_test sended');
            var data = {
                'type': 1,
                'product_id': product_id,
                'page_id': page_server_id
            };
            data[key] = val;
            $.ajax({
                type: 'PUT',
                url: ''+Editor.baseUrl+'api',
                data: data,
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    //console.log('update_product_test returned:');
                    //console.log(result);
                    Editor.fetchForm(0);
                },
                error: function(err) {
                    console.log('update_product_test err:');
                    console.log(err);
                }
            });
        } else if (type == 2) {
            console.log('update_product_test sended');
            //console.log("addd", page_server_id);
            var data = {
                'type': 2,
                'product_id': product_id,
                'page_id': page_server_id,
                'element_id': element_server_id
            };
            data[key] = val;
            $.ajax({
                type: 'PUT',
                url: ''+Editor.baseUrl+'api',
                data: data,
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    //console.log('update_product_test returned:');
                    //console.log(result);
                    Editor.fetchForm(1);
                },
                error: function(err) {
                    console.log('update_product_test err:');
                    console.log(err);
                }
            });
        } else if (type = 3) {
            console.log('update_product_test sended');
            //console.log("abced", page_server_id);
            var data = {
                'type': 3,
                'product_id': product_id,
                'page_id': page_server_id,
                'element_id': element_server_id
            };
            $.ajax({
                type: 'PUT',
                url: ''+Editor.baseUrl+'api',
                data: data,
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    //console.log(result);
                    Editor.renderPage();
                },
                error: function(err) {
                    console.log('update_product_test err:');
                    console.log(err);
                }
            });
        }
    },
    //延迟更新，适用场景，切换page自动保存
    dealyupdate:function(key, val){
        console.log('dealyupdate method start');
        var token = localData.get('token'),
            product_id = $('#product_id').val(),
            page_server_id = $('#origin_pid').val();
            var data = {
                'type': 1,
                'product_id': product_id,
                'page_id': page_server_id
            };
            data[key] = val;
            $.ajax({
                type: 'PUT',
                url: ''+Editor.baseUrl+'api',
                data: data,
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    $('#isSave').val(0);
                    Editor.renderPage();
                },
                error: function(err) {
                    console.log('update_product_test err:');
                    console.log(err);
                }
            });  
    },
    batchupdate: function(key, val) {
        var token = localData.get('token'),
            product_id = $('#product_id').val(),
            page_id = $('#page_id').val(),
            page_server_id = $('#page_server_id').val(),
            element_id = $('#element_id').val(),
            element_server_id = $('#element_server_id').val();
        console.log('update drag sended');
        var data = {
            'type': 2,
            'product_id': product_id,
            'page_id': page_server_id,
            'element_id': element_server_id
        };
        for (var i = 0; i < key.length; i++) {
            data[key[i]] = val[i];
        };
        $.ajax({
            type: 'PUT',
            url: ''+Editor.baseUrl+'api',
            data: data,
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(result) {
                console.log('update drag update returned:');
                //console.log(result);
                Editor.store(JSON.stringify(result));
                Editor.renderElementInfo();
            },
            error: function(err) {
                console.log('update_product_test err:');
                console.log(err);
            }
        });
    },
    getSlider: function() {
        var slider = $('#v_d_2').find('.pic_slider'),
            sliderLen = slider.length,
            sliderArr = [];
        if (sliderLen == 0) {
            return false;
        } else if (sliderLen > 0) {
            for (var i = 0; i < slider.length; i++) {
                sliderArr.push(slider.attr('src'));
            };
            return sliderArr.join(",");
        }
    },
    addSlider: function(key) {
        console.log("addSlider method start");
        var data = JSON.parse(localData.get($('#product_id').val() + '_data')).pages,
            page_id = $('#page_server_id').val(),
            element_id = $('#element_server_id').val(),
            sliderArr = [];
        console.log("slider slider:", data.length);
        for (var i = 0; i < data.length; i++) {
            if (data[i]._id == page_id) {
                for (var j = 0; j < data[i].elements.length; j++) {
                    if (data[i].elements[j]._id == element_id) {
                        var sliderArr = data[i].elements[j].slider.split(',');
                        if (sliderArr.length == 0) {
                            return false;
                        } else if (sliderArr.length > 0) {
                            sliderArr.push(key);
                            var slider = sliderArr.join(',');
                            Editor.update(2, 'slider', slider);
                            Editor.renderElementInfo();
                            $('#picModel').modal('hide');
                        }
                    }
                }
            }
        }
    },
    removeSlider: function(index) {
        console.log("removeSlider method start");
        var data = JSON.parse(localData.get($('#product_id').val() + '_data')).pages,
            page_id = $('#page_server_id').val(),
            element_id = $('#element_server_id').val(),
            sliderArr = [];
        console.log("slider slider:", data.length);
        for (var i = 0; i < data.length; i++) {
            if (data[i]._id == page_id) {
                for (var j = 0; j < data[i].elements.length; j++) {
                    if (data[i].elements[j]._id == element_id) {
                        var sliderArr = data[i].elements[j].slider.split(',');
                        if (sliderArr.length == 0) {
                            return false;
                        } else if (sliderArr.length > 0) {
                            sliderArr.baoremove(index);
                            console.log("abcedf", sliderArr);
                            var slider = sliderArr.join(',');
                            Editor.update(2, 'slider', slider);
                            Editor.renderElementInfo();
                            $('#picModel').modal('hide');
                        }
                    }
                }
            }
        }
    },
    updateSlider: function(pic, index) {
        console.log("updateSlider method start");
        var data = JSON.parse(localData.get($('#product_id').val() + '_data')).pages,
            page_id = $('#page_server_id').val(),
            element_id = $('#element_server_id').val(),
            sliderArr = [];
        console.log("slider slider:", data.length);
        for (var i = 0; i < data.length; i++) {
            if (data[i]._id == page_id) {
                for (var j = 0; j < data[i].elements.length; j++) {
                    if (data[i].elements[j]._id == element_id) {
                        var sliderArr = data[i].elements[j].slider.split(',');
                        if (sliderArr.length == 0) {
                            return false;
                        } else if (sliderArr.length > 0) {
                            sliderArr[index] = pic;
                            var slider = sliderArr.join(',');
                            Editor.update(2, 'slider', slider);
                            Editor.renderElementInfo();
                            $('#picModel').modal('hide');
                        }
                    }
                }
            }
        };
        Editor.update(2, 'slider', slider);
        Editor.renderElementInfo();
        $('#picModel').modal('hide');
    },
    //canvas to 64dataurl
    //type 0 主动保存
    //type 1 被动保存
    convertCanvasToImage: function(type) {
        console.log("convertCanvasToImage method start");
        html2canvas(document.getElementById('page_edit'), {
            allowTaint: true,
            taintTest: false,
            onrendered: function(canvas) {
                canvas.id = "mycanvas";
                //document.body.appendChild(canvas);
                //生成base64图片数据
                var dataUrl = canvas.toDataURL();
                Editor.formatUrl(type,dataUrl);
                //console.log("abcdefg", dataUrl);
                //Editor.update(1, 'avatar', dataUrl);
            }
        });
    },
    //64dataurl to normal
    //type 0 主动保存
    //type 1 被动保存
    formatUrl: function(type,dataUrl) {
        console.log("formatUrl method start");
        var token = localData.get('token');
        if (type == 0) {
            $.ajax({
            type: 'POST',
            url: ''+Editor.baseUrl+'dataurl2img',
            data: {
                'dataUrl': dataUrl
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(result) {
                // console.log('update_product_test returned:');
                // console.log(result);
                Editor.update(1, 'avatar', result.url);
            },
            error: function(err) {
                // console.log('update_product_test err:');
                // console.log(err);
            }
            });
        }else if(type == 1){
            $.ajax({
            type: 'POST',
            url: ''+Editor.baseUrl+'dataurl2img',
            data: {
                'dataUrl': dataUrl
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(result) {
                // console.log('update_product_test returned:');
                // console.log(result);
                Editor.dealyupdate('avatar', result.url);
            },
            error: function(err) {
                // console.log('update_product_test err:');
                // console.log(err);
            }
            });
        }
    },
    autoSave:function(pid){
        console.log("autosave method start");
        $('#origin_pid').val(pid);
        $('#isSave').val('1');
        Editor.flip();
    },
    flip:function(){
        Editor.convertCanvasToImage(1);
        for (var i = 0; i < $('#v_page_list').find('li').length; i++) {
            if($('#v_page_list').find('li').eq(i).attr('pid') == $('#page_server_id').val()){
                $('#v_page_list').find('li').eq(i).trigger('click');
            }
        };

    },
    showPicBox:function(){
            $('e_upload_pic').trigger('click');
            $('#picModel').modal('show');
    },
    //left page change pange position
    changePos: function(id, val) {
        console.log("change pos");
        var token = localData.get('token'),
            product_id = $('#product_id').val();
        $.ajax({
            type: 'PUT',
            url: ''+Editor.baseUrl+'api',
            data: {
                'type': 4,
                'product_id': product_id,
                'page_id': id,
                'pos': val
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(result) {
                // console.log('update_product_test returned:');
                // console.log(result);
                Editor.fetchForm(0);
            },
            error: function(err) {
                // console.log('update_product_test err:');
                // console.log(err);
            }
        });
    }
};