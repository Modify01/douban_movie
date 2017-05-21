

/*

        //实现自己的jsonp
        //1:先生成一个唯一的编码，可以使用时间毫秒值，作为函数名 callback_1243432
        //2: 将该函数挂载到全局中 window.callback_1243432 
        //核心动态生成script标签
        //  1: 创建srcipt标签
        //  2:设置其src  url+ callback=callback_1243432  让服务器知道回调函数名称
        //      - 服务器返回的东西就是 callback_1243432(data)
        //  3:插入到document中
 */

(function() {
    var app = angular.module('app.jsonp', []);
    //创建一个服务
    app.service('jsonpService', ['$window', function($window) {
        this.jsonp = function(url, argv, callback) { // url,/detail/456 ? callback=xxxx 回调函数
            var callbackName = 'callback_';
            callbackName += Date.now() + ''; //callback_1243432
            //window.callback_1243432 = 回调函数
            $window[callbackName] = callback;

            //argv = {name:123,age:12}
            //操作url-> http://127.0.0.1/in_theaters/123?name=123&age=12
            url += '?';
            for (var key in argv) {
                var searchStr = key + '=' + argv[key] + '&';
                url += searchStr;
            }
            //添加callback
            url += 'callback=' + callbackName;

            //创建script标签
            var script = $window.document.createElement('script');
            //设置src
            script.src = url;
            //插入到文档的时候，立刻发起请求
            //script标签返回回来的js代码会立刻执行
            // 服务器返回callback_1243432('我是电影')
            $window.document.body.appendChild(script);
        }
    }])
})();


        
