var submit = document.querySelector("#submit");
var idnode = document.querySelector("#userid");

var fnProcess = function (response) {
    console.log(response);
};

submit.onclick = function (evt) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    var query = {
      id: idnode.value, 
      callback: 'fnProcess'
    };
    var wrapQuery = function (query) {
      var arr = []
      for (var q in query) {
        arr.push(q + '=' + query[q]);
      }
      return arr.join('&');
    }
    script.src = 'http://localhost:4000/query?' + wrapQuery(query);
    document.body.appendChild(script);
}
