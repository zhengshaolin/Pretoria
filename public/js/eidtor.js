var Editor = {
    // authority method for unlogin cutomer, return unique token
    auth: function() {
        console.log('auth method start');
    },
    //add method for administor creat product,page or elements
    //type 0 product
    //tyoe 1 page
    //type 2 element
    add: function(type) {
        var token = localData.get('token'),
            product_id = $('#create_element_product_id').val(),
            page_id = $('#create_element_page_id').val();
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
    fetchList: function(uid) {
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
                console.log('fetchList returned:');
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
    fetchForm: function(pid) {
        this.renderPage();
        this.renderArena();
        this.renderPlant();
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
            this.fetchForm(pid);
        } else {
            this.auth();
        }
    },
    remove: function() {

    },
    renderList: function(data) {
        // body...
    },
    renderPage: function() {

    },
    renderArena: function() {

    },
    renderPlant: function() {

    },
    store: function(data) {
        var tid = localData.get('current_id');
        localData.set(tid + "_data", data);
    },
    update: function() {

    },
    upPage: function() {

    },
};