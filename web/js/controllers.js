'use strict';

/* Controllers */
var key = "com.jinshanlife.cart";

var getTimestamp = function () {
    return Math.round(new Date().getTime() / 1000);
};

var CartController = ['$scope', 'Cart', function ($scope, Cart) {
        $scope.cart = Cart;
        $scope.cart.init();
        $scope.cart.sum();
        $scope.currentDate ='';
        $scope.updateDate = function(date){
            //alert(date);
            $scope.cart.recdate=date + "T00:00:00+08:00";
        };
    }];

var FilterController = ['$scope', 'Filter', 'Area', function ($scope, Filter, Area) {
        $scope.town = Area.town();
        $scope.doFilter = Filter;

        $scope.addFilterCategory = function (filter) {
            var i;
            if ($scope.doFilter.filterDetail.category === undefined) {
                $scope.doFilter.filterDetail.category = [];
            }
            if ($scope.doFilter.filters === undefined) {
                $scope.doFilter.filters = [];
            }
            i = $scope.doFilter.filterDetail.category.indexOf(filter);
            if (i === -1) {
                $scope.doFilter.filterDetail.category.push(filter);
                $scope.doFilter.filters.push({"key": "category", "value": filter});
            }
        };

        $scope.addFilterTown = function (filter) {
            var i;
            if ($scope.doFilter.filterDetail.town === undefined) {
                $scope.doFilter.filterDetail.town = [];
            }
            if ($scope.doFilter.filters === undefined) {
                $scope.doFilter.filters = [];
            }
            i = $scope.doFilter.filterDetail.town.indexOf(filter);
            if (i === -1) {
                $scope.doFilter.filterDetail.town.push(filter);
                $scope.doFilter.filters.push({"key": "town", "value": filter});
            }
        };

        $scope.removeFilter = function (filterObject) {
            var i = -1;
            i = $scope.doFilter.filters.indexOf(filterObject);
            if (i !== -1) {
                $scope.doFilter.filters.splice(i, 1);
            }
            if ($scope.doFilter.filterDetail.town !== undefined) {
                i = $scope.doFilter.filterDetail.town.indexOf(filterObject.value);
                if (i !== -1) {
                    $scope.doFilter.filterDetail.town.splice(i, 1);
                }
            }
            if ($scope.doFilter.filterDetail.category !== undefined) {
                i = $scope.doFilter.filterDetail.category.indexOf(filterObject.value);
                if (i !== -1) {
                    $scope.doFilter.filterDetail.category.splice(i, 1);
                }
            }
        };

    }];

var MainController = ['$scope', '$routeParams', '$location', 'Cate', 'Help', 'StoreKind', function ($scope, $routeParams, $location, Cate, Help, StoreKind) {

        $scope.goto = function (path) {
            $location.path(path);
        };
        $scope.storekind = StoreKind.query();
        $scope.catestores = Cate.top();
        $scope.helpstores = Help.top();
    }];

var CateController = ['$scope', '$routeParams', '$location', 'Cate', 'Filter', 'Category', function ($scope, $routeParams, $location, Cate, Filter, Category) {

        $scope.goto = function (path) {
            $location.path(path);
        };

        $scope.doFilter = Filter;
        $scope.store;
        $scope.stores = Cate.query();
        if ($routeParams.Id !== undefined) {
            $scope.store = Cate.get({Id: $routeParams.Id});
        }
        $scope.orderProp = "idx";
        var storeId = $routeParams.storeId;

        $scope.category = Category.cate();

    }];

var CateDetailController = ['$scope', '$routeParams', '$location', 'Cate', 'Cart', function ($scope, $routeParams, $location, Cate, Cart) {

        $scope.goto = function (path) {
            $location.path(path);
        };
        $scope.cart = Cart;
        $scope.store;
        if ($routeParams.Id !== undefined) {
            $scope.store = Cate.get({Id: $routeParams.Id});
        }
        var storeId = $routeParams.Id;
        $scope.orderProp = "idx";

        $scope.cart.init();
        $scope.cart.sum();

    }];

var HelpController = ['$scope', '$routeParams', '$location', 'Help', 'Filter', 'Category', function ($scope, $routeParams, $location, Help, Filter, Category) {

        $scope.goto = function (path) {
            $location.path(path);
        };

        $scope.doFilter = Filter;
        $scope.store;
        $scope.stores = Help.query();
        if ($routeParams.Id !== undefined) {
            $scope.store = Help.get({Id: $routeParams.Id});
        }
        $scope.orderProp = "idx";
        var storeId = $routeParams.storeId;

        $scope.category = Category.help();

    }];

var HelpDetailController = ['$scope', '$routeParams', '$location', 'Help', 'Cart', function ($scope, $routeParams, $location, Help, Cart) {

        $scope.goto = function (path) {
            $location.path(path);
        };
        $scope.cart = Cart;
        $scope.store;
        if ($routeParams.Id !== undefined) {
            $scope.store = Help.get({Id: $routeParams.Id});
        }
        var storeId = $routeParams.storeId;
        $scope.orderProp = "idx";
        $scope.cart.init();
        $scope.cart.sum();

    }];

var WebLinksController = ['$scope', 'WebLinks', function ($scope, WebLinks) {
        $scope.weblinks = WebLinks.links();
        $scope.webshortcuts = WebLinks.shortcuts();
    }];