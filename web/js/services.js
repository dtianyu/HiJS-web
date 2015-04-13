/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var home_url = "http://ar.hanbell.com.cn:8480/HiJSRESTful/webresources/";
var appService = angular.module('appService', ['ngResource']);


appService.factory('Shop', function ($resource) {
    return $resource("app/meishi/:shopId.json", {}, {
        query: {method: "GET", params: {shopId: "shops"}, isArray: true}
    });
});
appService.factory('MeiShiFilter', function () {
    return{
        filterDetail: {},
        filters: [],
        searchText: ''
    };
});

appService.factory('WebShortcuts', ['$http', function ($http) {
        return {
            query: function ($scope) {
                var url = home_url + '/entity.entity.webshortcut';
                return $http.get(url).success(function (response) {
                    $scope.webshortcuts = response;
                }).error(function () {
                    alert("获取资料失败");
                });
            }
        };
    }]);



//appService.factory('Weather', ['$http', 'SmartWeatherAPI', function ($http, SmartWeatherAPI) {
//        var url = " http://localhost:8480/RESTWebService/webresources/comm.weather/101020700/index_v";
//        return {
//            query: function (areaid, type, $scope) {
//                return  $http.get(url).success(function (response) {
//                    $scope.weather = response;
//                    //alert($scope.weather.url);
//                    SmartWeatherAPI.query($scope.weather.url, $scope);
//                }).error(function () {
//                    alert("获取资料失败");
//                });
//            }
//        };
//    }]);
//
//appService.factory('SmartWeatherAPI', ['$http', function ($http) {
//        return {
//            query: function (url, $scope) {
//                alert(url);
//                $http.get(url, {headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true'}, dataType: 'json'})
//                        .success(function (data) {
//                            alert(data);
//                        })
//                        .error(function () {
//                            alert("$http获取资料失败，请重试！");
//                        });
//            }
//        };
//    }]);
