var fs = require("fs"),
    path = require("path");

var md_files = fs.readdirSync("./");
md_files = md_files.filter(function (file) {
    return path.extname(file) === ".md";
});

// ����ļ�ͬʱ�첽��ȡ��callback�������ļ���ȡ��Ϻ�ִ��
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

// ����ļ����Ⱥ�˳���첽��ȡ��callback�������ļ���ȡ��Ϻ�ִ��
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
