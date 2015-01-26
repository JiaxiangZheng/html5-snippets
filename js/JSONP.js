(function () {
    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });
    document.getElementById('query-date').value = new Date().toDateInputValue();
    function wrapQuery(query) {
        var strs = []
        for (var key in query) {
            strs.push(key + "=" + query[key]);
        }
        return strs.join("&");
    }
    window.fnHandleRequest = function fnHandleRequest(response) {
        if (!response.status) {
            alert("failed to load data");
            return
        }
        // response is the object created by the JSON
        console.log("查询到" + response + "趟车次！");
        alert(response.data.length);
    }
    function JSONP(_date, _from, _to) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        var query = {
            date: _date,
            from: _from,
            to: _to,
            callback: "fnHandleRequest"
        };

        script.src = "http://localhost:4000/query?" + wrapQuery(query);
        document.body.appendChild(script);
    }
    var submit = document.querySelector("#query-submit");
    submit.addEventListener('click', function (evt) {
        var _date = document.querySelector("#query-date").value;
        JSONP(_date, "HZH", "JJG");
        evt.preventDefault();
    });
}());
