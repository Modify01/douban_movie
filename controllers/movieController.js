(function() {
    var app = angular.module('app.movieList', []);
    //创建控制器
    app.controller('movieController', ['$scope', '$http', 'jsonpService', '$state', 'host', 'viewCount', function($scope, $http, jsonpService, $state, host, viewCount) {

        //默认查询的参数对象是一个基本对象
        $scope.argv = { count: viewCount }; //声明
        if ($state.params.movieType === 'search') { //如果是查询按钮点击的
            $scope.argv.q = $state.params.q; //获取其参数
        }

        //url 拼接
        $scope.url = host;
        //https://api.douban.com/v2/movie/search||in_theaters||top250
        $scope.url += $state.params.movieType;


        //我们这里可以以第一页，也可以是第N页
        //封装函数，传递参数是页码
        $scope.showMoviesByPage = function(page) {


            //判断当前页是否合理  不小于1，不大于total
            if (page < 1 || page > $scope.totalPages) return;
            //计算起始start = (page-1)* viewCount
            var start = (page - 1) * viewCount;

            //给$scope.argv添加一个属性.start
            $scope.argv.start = start;

            //  /search/葫芦娃  $scope.argv: {count:5,q:'葫芦娃',start:1}
            jsonpService.jsonp($scope.url, $scope.argv, function(data) {
                $scope.isShow = false; //隐藏进度条
              console.log(data);
                //计算合计页
                $scope.totalPages = Math.ceil(data.total / viewCount);
                //获取合计记录数
                $scope.movieCount = data.total;
                //当前页码
                $scope.currentPage = page;
                //电影列表
                $scope.movies = data.subjects;
                $scope.$apply(); //只要不是angular的异步操作，就需要调用该函数通知更新
            });
        }
        $scope.showMoviesByPage(1); //默认加载的时候第一页

    }]);
})();


