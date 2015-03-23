/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('jsApp', ['appService']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
                when('/main', {templateUrl: 'partials/main.html', controller: ShopController}).
                when('/meishi', {templateUrl: 'partials/meishi-list.html', controller: ShopController}).
                when('/meishi/:shopId', {templateUrl: 'partials/meishi-detail.html', controller: ShopController}).
                otherwise({redirectTo: 'main'});
    }]);


app.directive("showtab",
        function () {
            return {
                link: function (scope, element, attrs) {
                    element.click(function (e) {
                        e.preventDefault();
                        $(element).tab('show');
                    });
                }
            };
        });
