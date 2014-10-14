var submit = document.querySelector("#submit");
var fnProcess = function (response) {
    console.log(response);
};
submit.onclick = function (evt) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://localhost:4000/query?id=12345&callback=fnProcess';
    document.body.appendChild(script);
}
