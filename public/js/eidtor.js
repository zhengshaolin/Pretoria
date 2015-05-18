var Editor = {
    // authority method for unlogin cutomer, return unique token
    auth: function() {
        console.log('auth method start');
    },
    //add method for administor creat product,page or elements
    //type 0 product
    //tyoe 1 page
    //type 2 elements
    add: function(type) {
        var token = localData.get('token'),
            product_id = $('#product_id').val(),
            page_id = $('#page_id').val(),
            page_server_id = $('#page_server_id').val(),
            element_num = $('#v_page_list').find('.item').length,
            add_type = $('#add_type').val();
        if (type == 0) {
            console.log('add type 0 method start');
            $.ajax({
                type: 'POST',
                url: 'http://115.29.32.105:8080/api',
                data: {
                    'type': 0
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    $('#create_product_test_result').text(JSON.stringify(result));
                    console.log('create_product_test returned:');
                    console.log(result);
                    $('#v_product_list').append('<li id="' + result._id + '"><img data-holder-rendered="true" src="' + result.avatar + '" class="works-img"><div class="operation"><a class="e_edit" id="' + result._id + '">编辑</a><a class="e_review id="' + result._id + '">预览</a><a id="' + result._id + '" data-toggle="modal" data-target="#publishModel">发布</a><a class="last e_delete" type="0" id="' + result._id + '" type="0">删除</a></div><div class="caption">' + result.product + '</div></li>');
                },
                error: function(err) {
                    $('#create_product_test_result').text(JSON.stringify(err));
                    console.log('create_product_test err:');
                    console.log(err);
                }
            });
        } else if (type == 1) {
            console.log('create_page_test sended');
            $.ajax({
                type: 'POST',
                url: 'http://115.29.32.105:8080/api',
                data: {
                    'type': 1,
                    'product_id': product_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    console.log('create_page_test returned:');
                    console.log(result);
                    Editor.store(JSON.stringify(result));
                    Editor.renderPage();
                },
                error: function(err) {
                    console.log('create_page_test err:');
                    console.log(err);
                }
            });
        } else if (type == 2) {
            console.log('create_element_test sended');
            if (page_server_id == '') {
                var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
            };
            $.ajax({
                type: 'POST',
                url: 'http://115.29.32.105:8080/api',
                data: {
                    'type': 2,
                    'product_id': product_id,
                    'page_id': page_server_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    console.log('create_element_test returned:');
                    console.log(result);
                    if (add_type == 0) {
                        //添加文字素材
                        Editor.fetchForm();

                    } else if (add_type == 1) {
                        //添加图片素材
                        $('#v_page_list').append();
                    } else if (add_type == 2) {
                        //添加轮播素材
                        $('#v_page_list').append();
                    };
                },
                error: function(err) {
                    $('#create_element_test_result').text(JSON.stringify(err));
                    console.log('create_element_test err:');
                    console.log(err);
                }
            });
        }
    },
    downPage: function() {

    },
    //获取列表信息
    fetchList: function() {
        console.log('fetchList method start');
        var token = localData.get('token');
        $.ajax({
            type: 'GET',
            url: 'http://115.29.32.105:8080/api',
            data: {
                'type': 0
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(products) {
                console.log('fetchList returned');
                console.log(products);
                Editor.renderList(products);
            },
            error: function(err) {
                console.log('select_product_test err:');
                console.log(err);
            }
        });
    },
    //获取表单信息
    fetchForm: function() {
        console.log('fetchForm method start');
        var token = localData.get('token'),
            product_id = $('#product_id').val();
        $.ajax({
            type: 'GET',
            url: 'http://115.29.32.105:8080/api',
            data: {
                'type': 0,
                'product_id': product_id
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(products) {
                console.log('fetchForm returned');
                console.log(products);
                //保存数据到本地
                Editor.store(JSON.stringify(products));
                //渲染左侧列表
                Editor.renderPage();
                //渲染中间操作层
                Editor.renderArena();
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
    },
    //初始化列表页
    initList: function() {
        if (localData.get('token') != null) {
            this.fetchList();
        } else {
            this.auth();
        }
    },
    //初始化表单页
    initForm: function() {
        $('#product_id').val(window.location.href.split('?')[1].split('=')[1]);
        if (localData.get('token') != null) {
            this.fetchForm();
        } else {
            this.auth();
        }
    },
    //发布
    publish: function() {
        var product_id = $('#product_id').val(),
            token = localData.get('token');
        $.ajax({
            type: 'GET',
            url: 'http://115.29.32.105:8080/publish',
            data: {
                'product_id': product_id
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(products) {
                console.log('fetchList returned');
                console.log(products);
                alert('发布成功');
                //Editor.renderList(products);
            },
            error: function(err) {
                console.log('select_product_test err:');
                console.log(err);
            }
        });        
    },
    //预览
    preview: function() {
        var product_id = $('#product_id').val();
    },
    //remove method for administor delete product,page or elements
    //type 0 product
    //tyoe 1 page
    //type 2 elements
    remove: function(type) {
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
                url: 'http://115.29.32.105:8080/api',
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
                    console.log('delete_product_test returned:');
                    console.log(result);
                    Editor.store(JSON.stringify(result));
                    if (result.ok == 1) {
                        $('#' + product_id).remove();
                        $('#product_id').val('');
                    };
                },
                error: function(err) {
                    $('#delete_product_test_result').text(JSON.stringify(err));
                    console.log('delete_product_test err:');
                    console.log(err);
                }
            });
        } else if (type == 1) {
            console.log('delete_page_test sended');
            console.log(page_sever_id);
            $.ajax({
                type: 'DELETE',
                url: 'http://115.29.32.105:8080/api',
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
                    console.log('remove_page_test returned:');
                    console.log(result);
                    Editor.store(JSON.stringify(result));
                    Editor.renderPage();
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
                url: 'http://115.29.32.105:8080/api',
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
                    console.log('delete_element_test returned:');
                    console.log(result);
                },
                error: function(err) {
                    $('#delete_element_test_result').text(JSON.stringify(err));
                    console.log('delete_element_test err:');
                    console.log(err);
                }
            });
        }
    },
    //绘制列表页右侧信息
    renderItemInfo: function(product_id) {
        var obj = JSON.parse(localData.get(product_id + '_info'));
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
            $('#v_product_list').append('<li id="' + data[i]._id + '"><img data-holder-rendered="true" src="' + data[i].avatar + '" class="works-img"><div class="operation"><a class="e_edit" id="' + data[i]._id + '">编辑</a><a class="e_review" id="' + data[i]._id + '">预览</a><a id="' + data[i]._id + '" data-toggle="modal" data-target="#publishModel">发布</a><a class="last e_delete" id="' + data[i]._id + '" type="0">删除</a></div><div class="caption">' + data[i].product + '</div></li>');
        };
    },
    //绘制左侧页列表
    renderPage: function() {
        console.log('render page method start');
        $('#v_page_list').empty();
        var data = JSON.parse(localData.get($('#product_id').val() + '_data'));
        $('#page_number').val(parseInt(data.pages.length + 1));
        for (var i = 0; i < data.pages.length; i++) {
            $('#v_page_list').append('<li pid="' + data.pages[i]._id + '" id="p_' + i + '"><span class="page-num">' + parseInt(i + 1) + '</span><i class="del e_delete" type="1" id="p_' + i + '" pid="' + data.pages[i]._id + '"></i><img data-holder-rendered="true" src="' + data.pages[i].avatar + '" class="page-img" ></li>');
        };
        $('#v_page_list').append('<li><span class="page-num">' + $('#page_number').val() + '</span><div class="add-newpage e_creat" type="1"></div></li>');
    },
    //绘制中间操作区
    renderArena: function() {
        console.log('render arena method start');
        var data = JSON.parse(localData.get($('#product_id').val() + '_data')).pages,
            page_id = $('#page_id').val(),
            page_server_id = $('#page_server_id').val();
        //console.log(page_id);
        num = parseInt(page_id.split('_')[1]) + parseInt(1);
        if (page_server_id == '') {
            var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
        };
        $('.page-name').empty().text("页面" + num);
        $('#cnm').empty();
        $('#cnm').append('<div class="selector" style="display:none;z-index:9999"></div>');
        if (data != undefined) {
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id == page_server_id) {
                    //console.log(data[i].elements);
                    for (var j = 0; j < data[i].elements.length; j++) {
                        var obj = data[i].elements[j];
                        if (obj.element_type == 0) {
                            $('#cnm').append('<div class="item" elementype="0" id="' + page_id + '_' + j + '" mid="' + obj._id + '" style="z-index:' + j + ';position:absolute;top:' + obj.vshift + ';left:' + obj.hshift + ';width:' + obj.width + ';height:' + obj.height + ';overflow:hidden;font-size:'+obj.fts+'px; color:'+obj.ftc+';" plane="' + obj.horizontal + '" vertical="' + obj.vertical + '" "text="true">' + obj.text + '</div>');
                        }
                    };
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

        if (page_server_id == '') {
            var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
        };
        if (element_server_id == '') {
            var element_server_id = $('#cnm').find('.item').eq(0).attr('mid');
        };

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
                                $('.d-vertical').eq(obj.horizontal).addClass('glyphicon_on');
                                console.log(obj.ftb);

                                if (obj.ftb == 1) {
                                    $('#d-ftb').addClass('glyphicon_on');
                                };
                                if (obj.fti == 1) {
                                    $('#d-fti').addClass('glyphicon_on');
                                };
                                if (obj.ftu == 1) {
                                    $('#d-ftu').addClass('glyphicon_on');
                                };
                                $('#d-ftc').val(obj.ftc);
                                $('#d-fts').val(obj.fts);
                                $('#d-animate_effect').val(obj.animate_effect);
                                $('#d-animate_delay').val(obj.animate_delay);
                                $('#d-animate_duration').val(obj.animate_duration);
                            };
                        };

                    };
                }
            }
        };
    },
    //绘制右侧的数据中的页面动画设置
    renderPageAnimate: function() {
        console.log('render page animate method start');
        var data = JSON.parse(localData.get($('#product_id').val() + '_data')).pages,
            product_id = $('#product_id').val(),
            page_id = $('#page_id').val(),
            page_server_id = $('#page_server_id').val(),
            element_id = $('#element_id').val(),
            element_server_id = $('#element_server_id').val();

        if (page_server_id == '') {
            var page_server_id = $('#v_page_list').find('li').eq(0).attr('pid');
        };
        $('#v_page_animate').empty();

        if (data != undefined) {
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id == page_server_id) {
                    
                    for (var j = 0; j < data[i].elements.length; j++) {
                        var obj = data[i].elements[j];
                        $('#v_page_animate').append('<li><label>'+obj.title+':</label><button class="animation-btn" data-toggle="modal" data-target="#animateModel" mid="'+obj._id+'">修改动画</button><div class="animation"><p><i class="delay"></i>延迟'+obj.animate_effect+'秒后出现</p></div><div class="animation"><p><i class="delay"></i>延迟'+obj.animate_delay+'秒后出现</p></div><div class="animation"><p><i class="delay"></i>延迟'+obj.animate_duration+'秒后出现</p></div></li>');
                    };

                };
            };
        };
    },
    //绘制右侧的数据中的产品信息
    renderGlobalInfo: function() {
        console.log('render global method start');
        var data = JSON.parse(localData.get($('#product_id').val() + '_data'));
        console.log("global info",data);
        if (data != undefined) {
            //box5
            $('#d-product').val(data.product);
            $("input[name='glass']")[data.music_pos].checked = true;
            $('#d-glass_url').attr('src', data.glass_url);
            $('#d-glass_trans').val(data.glass_trans);
            $('#d-orign_mum').val(data.orign_num);
            $('#d-pry').val(data.pry);
            $('d-switch_type').val(data.switch_type);
            //box4
            //音乐列表
            $("input[name='music_pos']")[data.music_pos].checked = true;
            $("input[name='music_option']")[data.music_option].checked = true;
            //box3
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
            var data = { 'type': 0, 'product_id':product_id};
                data[key] = val;
            $.ajax({
                type: 'PUT',
                url: 'http://115.29.32.105:8080/api',
                data: data,
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    console.log(result);
                    Editor.initList();
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
                url: 'http://115.29.32.105:8080/api',
                data: data,
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    console.log('update_product_test returned:');
                    console.log(result);
                    Editor.fetchForm();
                },
                error: function(err) {
                    console.log('update_product_test err:');
                    console.log(err);
                }
            });
        } else if (type == 2) {
            console.log('update_product_test sended');
            console.log("2343434",page_server_id);
            var data = { 
                    'type': 2,
                    'product_id': product_id,
                    'page_id': page_server_id,
                    'element_id': element_server_id
                };
                data[key] = val;
            $.ajax({
                type: 'PUT',
                url: 'http://115.29.32.105:8080/api',
                data: data,
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    console.log('update_product_test returned:');
                    console.log(result);
                    Editor.fetchForm();
                },
                error: function(err) {
                    console.log('update_product_test err:');
                    console.log(err);
                }
            });
        }
    },
    upPage: function() {
    },
    uplodad: function() {
        return url;
    }
};