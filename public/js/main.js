var api = {

};
var editor = {};
editor.prototype.init = function(){
	this.fetch();
};
editor.prototype.fetch = function(id){
	//将值保存到localData里
	this.storeData(data);
	this.initView();
};
editor.prototype.save = function(layer,element,key,val){
	/* body... */
};
editor.prototype.add = function (type,options) {
	// body...
};
editor.prototype.remove = function (type,options) {
	// body...
};
editor.prototype.initView = function(){
	this.renderPage();
	this.renderArena();
	this.renderPlant();
};
editor.prototype.storeData = function(data){
	var tid = $('#product_id').val();
	localData.set(tid+"_data",data);
};
//render left page
editor.prototype.renderPage = function(){
	/* body... */
};
//render middle arena
editor.prototype.renderArena = function () {
	// body...
};
//render right workshop
editor.prototype.renderPlant = function () {
	
};
