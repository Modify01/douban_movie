// 路由配置
(function () {
    'use strict';

    var app = angular
        .module('app', ['ui.router', 'app.jsonp', 'app.movieList'])
        // 
        .config(configConfig)

        //   声明全局可复用url地址
        .value('host', 'https://api.douban.com/v2/movie/')
        // 声明显示的页数
        .constant('viewCount', 20)

    configConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configConfig($stateProvider, $urlRouterProvider) {
        // 默认配置的路由
        $urlRouterProvider.otherwise('home_page');

        $stateProvider.state('home_page', {
            url: '/home_page',
            templateUrl: './views/home/home_page.html'
        })
            .state('in_theaters', {
                url: '/:movieType/:q',
                templateUrl: './views/movie/in_theaters.html',
                controller: 'movieController'
            })
            .state('detail', {
                url: '/detail/:id',
                templateUrl: './views/movie/detail.html'
            })
    }

}());

// 搜索控制器
(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainController', ControllerController);

    ControllerController.inject = ['$scope', '$state'];
    function ControllerController($scope, $state) {
        $scope.search = function (q) {
            //需要通过程序来改变URL
            $state.go('in_theaters', { movieType: 'search', q: q });
        }
    }
})();

//激活样式的控制器

(function () {
    'use strict';

    angular
        .module('app')
        .controller('activeController', ControllerController);

    ControllerController.inject = ['$scope', '$location'];
    function ControllerController($scope, $location) {
        $scope.local = $location;
        //     //默认选中码状态是首页
        $scope.selectedNum = 1;
        $scope.$watch('local.url()', function (newV, oldV) {
            switch (newV) {
                case '/home_page':
                    $scope.selectedNum = 1;
                    break;
                case '/in_theaters/':
                    $scope.selectedNum = 2;
                    break;
                case '/coming_soon/':
                    $scope.selectedNum = 3;
                    break;
                case '/top250/':
                    $scope.selectedNum = 4;
                    break;
            }
        })
    }
})();


(function () {
    'use strict';

    angular
        .module('app')
        .directive('appProcess', function() {
        return {
            templateUrl: './views/commons/process.html',
            link: function(scope, ele, attrs) {
                scope.isShow = true; //显示
            }
        }
    });
}());













