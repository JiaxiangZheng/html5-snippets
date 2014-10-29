var fs = require("fs"),
    path = require("path");

var md_files = fs.readdirSync("./");
md_files = md_files.filter(function (file) {
    return path.extname(file) === ".md";
});

// 多个文件同时异步读取，callback在所有文件读取完毕后执行
(function (i, len, count, callback) {
    for (; i < len; i++) {
        (function (index) {
            fs.readFile(md_files[index], function (err, data) {
                console.log("parellal reading: ", index);
                if (++count === len) {
                    callback();
                }
            });
        })(i);
    }
})(0, md_files.length, 0, function () {
    console.log("finished parellal reading file");
});

// 多个文件按先后顺序异步读取，callback在所有文件读取完毕后执行
(function next(i, len, callback) {
    if (i < len) {
        fs.readFile(md_files[i], function (err, data) {
            console.log("non-parellal reading: ", i);
            next(i+1, len, callback);
        });
    } else {
        callback();
    }
})(0, md_files.length, function () {
    console.log("finished non-parellal reading file");
});

// function asyncSequence(arr, callback, finish) {
// }
// function asyncParellal(arr, callback, finish) {
//     (function (i, len, count, callback) {
//         for (; i < len; i++) {
//             (function (index) {
//                 fs.readFile(md_files[index], function (err, data) {
//                     console.log("parellal reading: ", index);
//                     if (++count === len) {
//                         callback();
//                     }
//                 });
//             })(i);
//         }
//     })(0, arr.length, 0, finish);
// }
