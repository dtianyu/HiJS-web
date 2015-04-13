'use strict';

/* Controllers */

var ShopController = ['$scope', '$routeParams', 'Shop', '$http', 'MeiShiFilter', function ($scope, $routeParams, Shop, $http, MeiShiFilter) {
        var key = "cn.lightshell.cate.cart";
        var url_customerorder = "http://ar.hanbell.com.cn:8480/RESTWebService/webresources/entity.customerorder";

        $scope.doFilter = MeiShiFilter;
        $scope.shop;
        $scope.shops = Shop.query();
        if ($routeParams.shopId !== undefined) {
            $scope.shop = Shop.get({shopId: $routeParams.shopId});
        }
        $scope.orderProp = "index";
        var shopId = $routeParams.shopId;
        $scope.totalQty = 0;
        $scope.totalAmts = 0;
        $scope.cartItems = loadCart(key);
        getTotal();
        $scope.addToCart = function (item) {
            var flag = true;
            var o = {"shop": shopId, "name": item.name, "price": item.price, "unit": item.unit, "qty": 1};
            angular.forEach($scope.cartItems, function (cartItem) {
                if (cartItem.shop === o.shop && cartItem.name === o.name) {
                    cartItem.qty += o.qty;
                    flag = false;
                }
            });
            if (flag) {
                $scope.cartItems.push(o);
            }
            saveCart();
            getTotal();
//        alert($scope.cartItems.length);
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

        function getTotal() {
            $scope.totalQty = 0;
            $scope.totalAmts = 0;
            angular.forEach($scope.cartItems, function (cartItem) {
                $scope.totalQty += cartItem.qty;
                $scope.totalAmts += cartItem.price * cartItem.qty;
            });
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

        Weather.query("101020700", "index_v", $scope);
    }];


var MeiShiFilterController = ['$scope', 'MeiShiFilter', function ($scope, MeiShiFilter) {
        $scope.doFilter = MeiShiFilter;

        $scope.filterCatelog = function (filter) {
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

        $scope.removefilterCatelog = function (Object) {
            $scope.doFilter.filters.pop(Object);
            $scope.doFilter.filterDetail.caixi.pop(Object.value);

        };

    }];

var WebShortcutsController = ['$scope', 'WebShortcuts', function ($scope, WebShortcuts) {
        $scope.webshortcuts;
        WebShortcuts.quert($scope);
    }];