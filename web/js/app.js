/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('jsApp', ['appService']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
                when('/main', {templateUrl: 'partials/main.html', controller: MainController}).
                when('/cate', {templateUrl: 'partials/cate-list.html', controller: CateController}).
                when('/cate/:Id', {templateUrl: 'partials/cate-detail.html', controller: CateDetailController}).
                when('/help', {templateUrl: 'partials/help-list.html', controller: HelpController}).
                when('/help/:Id', {templateUrl: 'partials/help-detail.html', controller: HelpDetailController}).
                otherwise({redirectTo: 'main'});
    }]);


app.directive("showTab",
        function () {
            return {
                link: function (scope, element, attrs) {
                    element.click(function (e) {
                        e.preventDefault();
                        $(element).tab('show');
                        $(element).addClass("active");
                    });
                }
            };
        });
