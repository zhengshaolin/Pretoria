var Editor = {
    auth: function() {
        console.log('auth method start');
    },
    //creat product
    addProduct: function() {
        console.log('create_product_test sended');
        $.ajax({
            type: 'POST',
            url: 'http://115.29.32.105:8080/api',
            data: {
                'type': 0
            },
            dataType: 'json',
            headers: {
                'Access-Token': '554f4b95b3a3cf29e2a0ee43-89afa2366bf2fae2f47ff358a2b3080d'
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
    },
    addPage: function() {
        console.log('create_page_test sended');
        $.ajax({
            type: 'POST',
            url: 'http://115.29.32.105:8080/api',
            data: {
                'type': 1,
                'product_id': $('#create_page_product_id').val()
            },
            dataType: 'json',
            headers: {
                'Access-Token': '554f4b95b3a3cf29e2a0ee43-89afa2366bf2fae2f47ff358a2b3080d'
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
    renderList:function(data) {
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