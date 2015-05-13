var Editor = {
    auth:function() {
        console.log('auth method start');
    },
    add:function(){
    },
    downPage:function(){

    },
    fetchList:function(uid){
        this.initList();
    },
    fetchForm:function(pid) {
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
    initForm:function(){
        if (localData.get('token') != null) {
            this.fetchForm(pid);
        } else {
            this.auth();
        }
    },
    remove:function(){

    },
    renderPage:function(){

    },
    renderArena:function(){

    },
    renderPlant:function(){

    },
    store:function(data){
        var tid = $('#product_id').val();
        localData.set(tid + "_data", data);
    },
    update:function(){

    },
    upPage:function(){

    },
};