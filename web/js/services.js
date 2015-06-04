/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var home_url = "http://127.0.0.1:8480/HiJSRESTful/webresources";
var home_api = "app/data";

var appService = angular.module('appService', ['ngResource']);


appService.factory('Cate', function ($resource) {
    return $resource("app/data/:Id.json", {}, {
        query: {method: "GET", params: {Id: "cate"}, isArray: true},
        top: {method: "GET", params: {Id: "cateTop"}, isArray: true}
    });
});

appService.factory('CateFilter', function () {
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

appService.factory('HelpFilter', function () {
    return{
        filterDetail: {},
        filters: [],
        searchText: ''
    };
});

appService.factory('WebLinks', function ($resource) {
    return $resource("app/data/:Id.json", {}, {
        links: {method: "GET", params: {Id: "Weblink"}, isArray: true},
        shortcuts: {method: "GET", params: {Id: "Weblink2"}, isArray: true}
    });
});