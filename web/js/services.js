/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var home_url = "http://127.0.0.1:8480/HiJSRESTful/webresources";
var home_api = "app/data";

var key = "com.jinshanlife.cart";

var appService = angular.module('appService', ['ngResource']);

appService.factory('Area', function ($resource) {
    return $resource("app/data/:Id.json", {}, {
        town: {method: "GET", params: {Id: "town"}, isArray: true}
    });
});
appService.factory('Cart', function () {
    return {
        cartItems: [],
        totalQty: 0,
        totalAmts: 0,
        add: function (item) {
            var flag = true;
            var o = this.create(item);
            angular.forEach(this.cartItems, function (cartItem) {
                if (cartItem.storeid === o.storeid && cartItem.id === o.id) {
                    cartItem.qty += o.qty;
                    flag = false;
                }
            });
            if (flag) {
                this.cartItems.push(o);
            }
            this.save();
            this.sum();
        },
        create: function (item) {
            var o = {"storeid": item.storeid, "id": item.id, "content": item.itemdesc, "price": item.price, "unit": item.unit, "qty": 1};
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
                    if (this.cartItems[index].qty === 0) {
                        this.remove(item);
                    }
                    save();
                    sum();
                }
            }
        },
        more: function (item) {
            if (item !== null) {
                var index = this.cartItems.indexOf(item);
                if (index !== -1) {
                    this.cartItems[index].qty += 1;
                    save();
                    sum();
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
                amts += this.cartItems[i].price * this.cartItems[i].qty;
            }
            this.totalQty = qty;
            this.totalAmts = amts;
        }
    };
});
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