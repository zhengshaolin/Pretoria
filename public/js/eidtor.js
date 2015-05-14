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
            page_id = $('#page_id').val();
        if (type = 0) {
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
                    $('#v_product_list').append('<li id="'+result._id+'"><img data-holder-rendered="true" src="'+ result.img +'" class="works-img" data-src="holder.js/180x320" alt="180x320"><div class="operation"><a class="e_edit" id="' + result._id + '">编辑</a><a class="e_review id="' + result._id + '">预览</a><a class="e_publish" id="' + result._id + '">发布</a><a class="last e_delete" id="" type="0">删除</a></div><div class="caption">' + result.name + '</div></li>');
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
                    $('#create_page_test_result').text(JSON.stringify(result));
                    console.log('create_page_test returned:');
                    console.log(result);
                },
                error: function(err) {
                    $('#create_page_test_result').text(JSON.stringify(err));
                    console.log('create_page_test err:');
                    console.log(err);
                }
            });
        } else if (type == 2) {
            console.log('create_element_test sended');
            $.ajax({
                type: 'POST',
                url: 'http://115.29.32.105:8080/api',
                data: {
                    'type': 2,
                    'product_id': product_id,
                    'page_id': page_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    $('#create_element_test_result').text(JSON.stringify(result));
                    console.log('create_element_test returned:');
                    console.log(result);
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
                $('#select_product_test_result').text(JSON.stringify(err));
                console.log('select_product_test err:');
                console.log(err);
            }
        });
    },
    fetchForm: function() {
        console.log('fetchForm method start');
        var token = localData.get('token');
        $.ajax({
            type: 'GET',
            url: 'http://115.29.32.105:8080/api',
            data: {
                'type': 0,
                'product_id':product_id
            },
            dataType: 'json',
            headers: {
                'Access-Token': token
            },
            success: function(products) {
                console.log('fetchForm returned');
                console.log(products);
                Editor.store(products);
                Editor.renderPage();
                Editor.renderArena();
                Editor.renderPlant();
            },
            error: function(err) {
                // $('#select_product_test_result').text(JSON.stringify(err));
                console.log('fetchForm err:');
                console.log(err);
            }
        });
    },
    initList: function() {
        if (localData.get('token') != null) {
            this.fetchList();
        } else {
            this.auth();
        }
    },
    initForm: function() {
        if (localData.get('token') != null) {
            this.fetchForm();
        } else {
            this.auth();
        }
    },
    publish:function (id) {
        
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
            element_id = $('#element_id').val();
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
                    $('#'+current_id).remove();
                },
                error: function(err) {
                    $('#delete_product_test_result').text(JSON.stringify(err));
                    console.log('delete_product_test err:');
                    console.log(err);
                }
            });
        } else if (type == 1) {
            console.log('delete_page_test sended');
            $.ajax({
                type: 'DELETE',
                url: 'http://115.29.32.105:8080/api',
                data: {
                    'type': 1,
                    'product_id': product_id,
                    'page_id': page_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    $('#delete_page_test_result').text(JSON.stringify(result));
                    console.log('delete_page_test returned:');
                    console.log(result);
                },
                error: function(err) {
                    $('#delete_page_test_result').text(JSON.stringify(err));
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
                    'page_id': page_id,
                    'element_id': element_id
                },
                dataType: 'json',
                headers: {
                    'Access-Token': token
                },
                success: function(result) {
                    $('#delete_element_test_result').text(JSON.stringify(result));
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
    renderIF:function () {
        var List_current_id = localData.get('List_current_id'),
            obj = localData.get(List_current_id+'_data');
        $('#v_product_info').find('.status').text(obj.status);
        $('#v_product_info').find('.avatar').attr('src',obj.avatar);
        $('#v_product_info').find('.creat_time').text(obj.creat_time);
        $('#v_product_info').find('.update_time').text(obj.update_time);
        $('#v_product_info').find('.product_name').val(obj.product_name);
        $('#v_product_info').find('.product_des').text(obj.product_des);

    },
    renderList: function(data) {
        console.log('renderList method start');
        $('#v_product_list').empty();
        for (var i = 0; i < data.length; i++) {
            localData.set(data[i]._id + '_data', data[i]);
            $('#v_product_list').append('<li id="'+data[i]+'"><img data-holder-rendered="true" src="' + data[i].img + '" class="works-img" data-src="holder.js/180x320" alt="180x320"><div class="operation"><a class="e_edit" id="' + data[i]._id + '">编辑</a><a class="e_review id="' + data[i]._id + '">预览</a><a class="e_publish" id="' + data[i]._id + '">发布</a><a class="last e_delete" id="" type="0">删除</a></div><div class="caption">' + data[i].name + '</div></li>');
        };
    },
    renderPage: function() {

    },
    renderArena: function() {

    },
    renderPlant: function() {

    },
    store: function(data) {
        var product_id = localData.get('Form_current_id');
        localData.set(product_id + "_data", data);
    },
    update: function() {

    },
    upPage: function() {

    },
};