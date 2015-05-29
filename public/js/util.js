 Array.prototype.baoremove = function(dx){
    if(isNaN(dx)||dx>this.length){return false;}
    this.splice(dx,1);
 };
