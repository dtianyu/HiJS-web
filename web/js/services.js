/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var home_url = "http://localhost:8480/HiJS-cart/app";
var home_api = "app/data";

var key = "com.jinshanlife.cart";

var appService = angular.module('appService', ['ngResource']);

appService.factory('Area', function ($resource) {
    return $resource("app/data/:Id.json", {}, {
        town: {method: "GET", params: {Id: "town"}, isArray: true}
    });
});
appService.factory('Cart', ['$http', function ($http) {
        return {
            phone: "",
            contacter: "",
            address: "",
            cartItems: [],
            totalQty: 0,
            totalAmts: 0,
            add: function (item) {
                var flag = true;
                var o = this.create(item);
                angular.forEach(this.cartItems, function (cartItem) {
                    if (cartItem.storeid === o.storeid && cartItem.itemid === o.itemid) {
                        cartItem.qty += o.qty;
                        cartItem.amts = cartItem.price * cartItem.qty;
                        flag = false;
                    }
                });
                if (flag) {
                    o.amts = o.price * o.qty;
                    this.cartItems.push(o);
                }
                this.save();
                this.sum();
            },
            create: function (item) {
                var o = {"storeid": item.storeid, "userid": item.userid, "itemid": item.id, "content": item.itemdesc, "spec": item.itemspec, "price": item.price, "unit": item.unit, "qty": 1, "logo1": item.logo1, "remark": ""};
                return o;
            },
            clear: function () {
                if (this.cartItems.length > 0) {
                    this.cartItems.splice(0, this.cartItems.length);
                    this.save();
                    this.sum();
                }
            },
            isEmpty: function () {
                if (this.cartItems === undefined || this.cartItems.length === 0) {
                    return true;
                } else {
                    return false;
                }
            },
            init: function () {
                var index;
                var cartList = localStorage.getItem(key);
                if (cartList === null || cartList === "") {
                    cartList = [];
                } else {
                    cartList = JSON.parse(cartList);
                }
                for (var i = 0; i < cartList.length; i++)
                {
                    index = this.cartItems.indexOf(cartList[i]);
                    if (index !== -1) {
                        this.cartItems.push(cartList[i]);
                    }
                }
            },
            less: function (item) {
                if (item !== null) {
                    var index = this.cartItems.indexOf(item);
                    if (index !== -1) {
                        this.cartItems[index].qty -= 1;
                        this.cartItems[index].amts = this.cartItems[index].price * this.cartItems[index].qty;
                        if (this.cartItems[index].qty === 0) {
                            this.remove(item);
                        }
                        this.save();
                        this.sum();
                    }
                }
            },
            more: function (item) {
                if (item !== null) {
                    var index = this.cartItems.indexOf(item);
                    if (index !== -1) {
                        this.cartItems[index].qty += 1;
                        this.cartItems[index].amts = this.cartItems[index].price * this.cartItems[index].qty;
                        this.save();
                        this.sum();
                    }
                }
            },
            remove: function (item) {
                var index = this.cartItems.indexOf(item);
                if (index !== -1) {
                    this.cartItems.splice(index, 1);
                }
                this.save();
                this.sum();
            },
            save: function () {
                localStorage.removeItem(key);
                localStorage.setItem(key, JSON.stringify(this.cartItems));
            },
            sum: function () {
                var qty = 0;
                var amts = 0;
                for (var i = 0; i < this.cartItems.length; i++)
                {
                    qty += this.cartItems[i].qty;
                    amts += this.cartItems[i].amts;
                }
                this.totalQty = qty;
                this.totalAmts = amts;
            },
            submit: function () {
                if (this.isEmpty()) {
                    alert("没有购物明细！");
                    return false;
                }
                var validateReg = /^((\+?86)|(\(\+86\)))?1[3|4|5|8]\d{9}$/;
                var value = $("#phone").val();
                if (!validateReg.test(value)) {
                    $('#phonePopover').popover('show');
                    $('div.popover').on('click', function () {
                        $(this).removeAttr('style');
                    });
                    return false;
                }
                var cartId = getCartId();
                var url = home_url + '/cart';
                var url_detail = home_url + '/cartdetail';
                var cart = {"cartid": cartId, "phone": this.phone, "contacter": this.contacter, "address": this.address, "remark": ""};
                for (var i = 0; i < this.cartItems.length; i++)
                {
                    this.cartItems[i].cartid = cartId;
                }
                this.save();
                var cartList = JSON.parse(localStorage.getItem(key));
                $http.post(url, cart)
                        .success(function () {
                            $http.post(url_detail, cartList)
                                    .success(function () {
                                        window.location.href = "http://www.jinshanlife.com/HiJS-store";
                                    }).error(function () {

                            });
                        })
                        .error(function () {
                            alert("提交失败，请重试！");
                        });

            }
        };
    }]);
appService.factory('Cate', function ($resource) {
    return $resource("app/data/:Id.json", {}, {
        query: {method: "GET", params: {Id: "cate"}, isArray: true},
        top: {method: "GET", params: {Id: "cateTop"}, isArray: true}
    });
});
appService.factory('Category', function ($resource) {
    return $resource("app/data/:Id.json", {}, {
        cate: {method: "GET", params: {Id: "cateCategory"}, isArray: true},
        help: {method: "GET", params: {Id: "helpCategory"}, isArray: true}
    });
});
appService.factory('Filter', function () {
    return{
        filterDetail: {},
        filters: [],
        searchText: ''
    };
});
appService.factory('Help', function ($resource) {
    return $resource("app/data/:Id.json", {}, {
        query: {method: "GET", params: {Id: "help"}, isArray: true},
        top: {method: "GET", params: {Id: "helpTop"}, isArray: true}
    });
});
appService.factory('StoreKind', function ($resource) {
    return $resource("app/data/:Id.json", {}, {
        query: {method: 'GET', params: {Id: 'storekind'}, isArray: true}
    });
});
appService.factory('WebLinks', function ($resource) {
    return $resource("app/data/:Id.json", {}, {
        links: {method: "GET", params: {Id: "Weblink"}, isArray: true},
        shortcuts: {method: "GET", params: {Id: "Weblink2"}, isArray: true}
    });
});

var getCartId = function () {
    return Math.round(new Date().getTime() / 1000);
};

var getTimestamp = function () {
    return Math.round(new Date().getTime() / 100);
};