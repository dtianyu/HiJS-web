'use strict';

/* Controllers */
var key = "com.jinshanlife.cate.cart";

function createOrderDetail(item) {
    var o = {"storeid": item.storeid, "id": item.id, "content": item.itemdesc, "price": item.price, "unit": item.unit, "qty": 1};
    return o;
}

function loadCart(key) {
    var cartList = localStorage.getItem(key);
    if (cartList === null || cartList === "") {
        cartList = [];
    } else {
        cartList = JSON.parse(cartList);
    }
    return cartList;
}


var MainController = ['$scope', '$routeParams', '$location', 'Cate', 'Help', function ($scope, $routeParams, $location, Cate, Help) {

        $scope.findMore = function (path) {
            $location.path(path);
        };

        $scope.catestores = Cate.top();
        $scope.helpstores = Help.top();
    }];

var CateController = ['$scope', '$routeParams', '$location', 'Cate', 'CateFilter', function ($scope, $routeParams, $location, Cate, CateFilter) {

        $scope.findMore = function (path) {
            $location.path(path);
        };

        $scope.doFilter = CateFilter;
        $scope.store;
        $scope.stores = Cate.query();
        if ($routeParams.Id !== undefined) {
            $scope.store = Cate.get({Id: $routeParams.Id});
        }
        $scope.orderProp = "idx";
        var storeId = $routeParams.storeId;

    }];

var CateDetailController = ['$scope', '$routeParams', '$location', 'Cate', function ($scope, $routeParams, $location, Cate) {

        $scope.findMore = function (path) {
            $location.path(path);
        };

        $scope.store;
        if ($routeParams.Id !== undefined) {
            $scope.store = Cate.get({Id: $routeParams.Id});
        }
        var storeId = $routeParams.Id;
        $scope.orderProp = "idx";

        $scope.totalQty = 0;
        $scope.totalAmts = 0;
        $scope.cartItems = loadCart(key);
        getTotal();

        $scope.addToCart = function (item) {
            var flag = true;
            var o = createOrderDetail(item)
            angular.forEach($scope.cartItems, function (cartItem) {
                if (cartItem.storeid === o.storeid && cartItem.id === o.id) {
                    cartItem.qty += o.qty;
                    flag = false;
                }
            });
            if (flag) {
                $scope.cartItems.push(o);
            }
            saveCart();
            getTotal();
        };
        $scope.clearCart = function () {
            if ($scope.cartItems !== null) {
                $scope.cartItems.splice(0, $scope.cartItems.length);
                saveCart();
                getTotal();
            }
        };
        $scope.delFromCart = function (item) {
            removeFromCart(item);
        };
        $scope.decreaseCartQty = function (item) {
            if (item !== null) {
                var index = $scope.cartItems.indexOf(item);
                $scope.cartItems[index].qty -= 1;
                if ($scope.cartItems[index].qty === 0) {
                    $scope.delFromCart(item);
                }
                saveCart();
                getTotal();
            }
        };
        $scope.increaseCartQty = function (item) {
            if (item !== null) {
                var index = $scope.cartItems.indexOf(item);
                $scope.cartItems[index].qty += 1;
                saveCart();
                getTotal();
            }
        };
        $scope.submitCart = function () {
            if ($scope.cartItems.length < 1) {
                alert("没有订购明细，无法提交，请先订购！");
                return false;
            }
            $http.post(url_customerorder, $scope.cartItems)
                    .success(function () {
                        alert("提交成功！");
                        $scope.clearCart();
                    })
                    .error(function () {
                        alert("提交失败，请重试！");
                    });
        };
        $scope.isCartEmpty = function () {
            if ($scope.cartItems === undefined || $scope.cartItems === null) {
                return true;
            }
            if ($scope.cartItems.length < 1) {
                return true;
            }
            return false;
        }

        function saveCart() {
            var cartList = new Array();
            angular.forEach($scope.cartItems, function (cartItem) {
                cartList.push(cartItem);
            });
            localStorage.setItem(key, JSON.stringify(cartList));
        }

        function removeFromCart(item) {
            var index = $scope.cartItems.indexOf(item);
            $scope.cartItems.splice(index, 1);
            saveCart();
            getTotal();
        }

        function getTotal() {
            $scope.totalQty = 0;
            $scope.totalAmts = 0;
            angular.forEach($scope.cartItems, function (cartItem) {
                $scope.totalQty += cartItem.qty;
                $scope.totalAmts += cartItem.price * cartItem.qty;
            });
        }
    }];

var CateFilterController = ['$scope', 'CateFilter', function ($scope, CateFilter) {

        $scope.doFilter = CateFilter;

        $scope.addFilterCategory = function (filter) {
            if ($scope.doFilter.filterDetail.caixi === undefined) {
                $scope.doFilter.filterDetail.caixi = [];
            }
            $scope.doFilter.filterDetail.caixi.push(filter);
            if ($scope.doFilter.filters === undefined) {
                $scope.doFilter.filters = [];
            }
            $scope.doFilter.filters.push({"key": "菜系", "value": filter});
            alert($scope.doFilter.filters);
        };

        $scope.removeFilterCategory = function (Object) {
            $scope.doFilter.filters.pop(Object);
            $scope.doFilter.filterDetail.caixi.pop(Object.value);
        };

    }];

var HelpController = ['$scope', '$routeParams', '$location', 'Help', 'HelpFilter', function ($scope, $routeParams, $location, Help, HelpFilter) {

        $scope.findMore = function (path) {
            $location.path(path);
        };

        $scope.doFilter = HelpFilter;
        $scope.store;
        $scope.stores = Help.query();
        if ($routeParams.Id !== undefined) {
            $scope.store = Help.get({Id: $routeParams.Id});
        }
        $scope.orderProp = "idx";
        var storeId = $routeParams.storeId;

    }];

var HelpDetailController = ['$scope', '$routeParams', '$location', 'Help', function ($scope, $routeParams, $location, Help) {

        $scope.findMore = function (path) {
            $location.path(path);
        };

        $scope.store;
        if ($routeParams.Id !== undefined) {
            $scope.store = Help.get({Id: $routeParams.Id});
        }
        $scope.orderProp = "idx";
        var storeId = $routeParams.storeId;

        $scope.totalQty = 0;
        $scope.totalAmts = 0;
        $scope.cartItems = loadCart(key);
        getTotal();
        $scope.addToCart = function (item) {
            var flag = true;
            var o = createOrderDetail(item);
            angular.forEach($scope.cartItems, function (cartItem) {
                if (cartItem.store === o.store && cartItem.id === o.id) {
                    cartItem.qty += o.qty;
                    flag = false;
                }
            });
            if (flag) {
                $scope.cartItems.push(o);
            }
            saveCart();
            getTotal();
        };
        $scope.clearCart = function () {
            if ($scope.cartItems !== null) {
                $scope.cartItems.splice(0, $scope.cartItems.length);
                saveCart();
                getTotal();
            }
        };
        $scope.delFromCart = function (item) {
            removeFromCart(item);
        };
        $scope.decreaseCartQty = function (item) {
            if (item !== null) {
                var index = $scope.cartItems.indexOf(item);
                $scope.cartItems[index].qty -= 1;
                if ($scope.cartItems[index].qty === 0) {
                    $scope.delFromCart(item);
                }
                saveCart();
                getTotal();
            }
        };
        $scope.increaseCartQty = function (item) {
            if (item !== null) {
                var index = $scope.cartItems.indexOf(item);
                $scope.cartItems[index].qty += 1;
                saveCart();
                getTotal();
            }
        };
        $scope.submitCart = function () {
            if ($scope.cartItems.length < 1) {
                alert("没有订购明细，无法提交，请先订购！");
                return false;
            }
            $http.post(url_customerorder, $scope.cartItems)
                    .success(function () {
                        alert("提交成功！");
                        $scope.clearCart();
                    })
                    .error(function () {
                        alert("提交失败，请重试！");
                    });
        };
        $scope.isCartEmpty = function () {
            if ($scope.cartItems === undefined || $scope.cartItems === null) {
                return true;
            }
            if ($scope.cartItems.length < 1) {
                return true;
            }
            return false;
        }

        function saveCart() {
            var cartList = new Array();
            angular.forEach($scope.cartItems, function (cartItem) {
                cartList.push(cartItem);
            });
            localStorage.setItem(key, JSON.stringify(cartList));
        }

        function removeFromCart(item) {
            var index = $scope.cartItems.indexOf(item);
            $scope.cartItems.splice(index, 1);
            saveCart();
            getTotal();
        }

        function getTotal() {
            $scope.totalQty = 0;
            $scope.totalAmts = 0;
            angular.forEach($scope.cartItems, function (cartItem) {
                $scope.totalQty += cartItem.qty;
                $scope.totalAmts += cartItem.price * cartItem.qty;
            });
        }

    }];


var WebLinksController = ['$scope', 'WebLinks', function ($scope, WebLinks) {
        $scope.weblinks = WebLinks.links();
        $scope.webshortcuts = WebLinks.shortcuts();
    }];