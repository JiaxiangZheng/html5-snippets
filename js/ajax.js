function isSuccessHTTP(r) {
    return !r.status && location.protocol === 'file:' || 
        (r.status >= 200 && r.status < 300) || 
        (r.status === 304) ||
        (navigator.userAgent.indexOf('Safari') >= 0 && typeof r.status === 'undefined');
}

function extractResponse(r, type) {
    var ct = r.getResponseHeader("content-type"),
        data = !type && ct && ct.indexOf("xml") >= 0;

    data = type === "xml" || data ? r.responseXML : r.responseText;

    if (type === 'script') {    // just execute the script
        eval.call(window, data);
    }
    return data;
}

/**
 * options = {
 *     type: // ajax type (GET or POST)
 *     url:
 *     timeout:
 *     complete: // callback function
 *     success: // callback function
 *     error: // callback function
 *     data: // data send to the server side
 * }
 */

function Ajax(options) {
    var fnEmpty = function () {};
    options = {
        type: options.type || "POST",
        url: options.url || "",
        timeout: options.timeout || 5000,
        complete: options.complete || fnEmpty,
        success: options.success || fnEmpty,
        error:   options.error || fnEmpty,
        data: options.data || ""
    };
    var xhr = new XMLHttpRequest(),
        bTimeout = false;

    xhr.open(options.type, options.url, true);
    var _timeoutHandler = setTimeout(function () {
        bTimeout= true;
    }, options.timeout);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && !bTimeout) {
            if (isSuccessHTTP(xhr)) {
                clearTimeout(_timeoutHandler);
                options.success(extractResponse(xhr, options.type));
            } else {
                options.error();
            }
            options.complete(); // finish 
            xhr = null;
        }
    };
    xhr.send();
}
