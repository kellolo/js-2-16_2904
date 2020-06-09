'use strict';
class Change {
    constructor() {
        this.str = document.querySelector('.text');
        this.btn = document.querySelector('.button');
        this.regexp = /\s'/g;
        this.regexp2 = /'\s/g;
         }
   changeText() {
      return this.strText = this.str.innerHTML.replace(this.regexp, ' "').replace(this.regexp2, '" ');
   } 
   addStyle() {
       this.str.classList.add('hide');
   }

}
let change = new Change();
change.btn.addEventListener('click', function(){
    if (!(change.str.classList.contains('hide'))) {
        change.changeText();       
        change.addStyle();       
        change.btn.innerHTML = "Замененный текс";
        change.str.insertAdjacentHTML("afterend",change.changeText()); 
    } 
})



  

