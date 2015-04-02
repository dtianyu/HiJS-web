/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    //菜单自动弹出
    $("li.dropdown").hover(function () {
        $(this).removeClass("dropdown").addClass("dropdown open");
    }, function () {
        $(this).removeClass("dropdown open").addClass("dropdown");
    });

    $("body").load(initMap());

    var t = 120;
    var u = 119;
    doSomething(function (config) {
        f2(config, t, u, function (data) {
            alert(data);
        });
    });

});

function doSomething(callback) {
    var n = 110;
    callback(n);
}

function f2(a, b, c, callback) {
// I'm the callback
    var total = a + b + c;
    var sum;
    callback(total);
}

function initMap() {
    
    var map = new AMap.Map('mapContainer', {
        //resizeEnable: true,
        //rotateEnable: true,
        //dragEnable: true,
        //zoomEnable: true,
        //设置可缩放的级别
        //zooms: [3,18],
        //传入2D视图，设置中心点和缩放级别
        view: new AMap.View2D({
            center: new AMap.LngLat(121.397428, 30.90923),
            zoom: 12
        })
    });

    map.plugin(["AMap.ToolBar"], function () {
        //加载工具条
        var tool = new AMap.ToolBar();
        map.addControl(tool);
    });

    map.plugin(["AMap.MapType"], function () {
        //地图类型切换
        var type = new AMap.MapType({
            defaultType: 0 //使用2D地图
        });
        map.addControl(type);
    });
    
}