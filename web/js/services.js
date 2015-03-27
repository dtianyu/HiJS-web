/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var home_url = "http://ar.hanbell.com.cn:8480/RESTWebService/webresources";

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