/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('jsApp', ['appServices','appDirectives']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
                when('/main', {templateUrl: 'partials/main.html', controller: MainController}).
                when('/cart', {templateUrl: 'partials/cart.html', controller: CartController}).
                when('/cate', {templateUrl: 'partials/cate-list.html', controller: CateController}).
                when('/cate/:Id', {templateUrl: 'partials/cate-detail.html', controller: CateDetailController}).
                when('/help', {templateUrl: 'partials/help-list.html', controller: HelpController}).
                when('/help/:Id', {templateUrl: 'partials/help-detail.html', controller: HelpDetailController}).
                otherwise({redirectTo: 'main'});
    }]);
