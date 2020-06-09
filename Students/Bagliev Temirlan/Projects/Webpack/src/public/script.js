const app = new Vue ({
	methods: {
    makeGETRequest(url, callback) {
      const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

      var xhr;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open('GET', url, true);
      xhr.send();
    }

      mounted() {
	    this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
	      this.goods = goods;
	      this.filteredGoods = goods;
	    });
 	}
	el: '#app',
	data: {
	    goods: [],
	    filteredGoods: [],
	    searchLine: ''
  }
})