 Array.prototype.baoremove = function(dx) {
     if (isNaN(dx) || dx > this.length) {
         return false;
     }
     this.splice(dx, 1);
 };
 Array.prototype.remove = function(b) {
     var a = this.indexOf(b);
     if (a >= 0) {
         this.splice(a, 1);
         return true;
     }
     return false;
 };