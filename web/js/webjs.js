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
    //$("body").load(initMap());//载入地图
//    var t = 120;
//    var u = 119;
//    doSomething(function (config) {
//        f2(config, t, u, function (data) {
//            alert(data);
//        });
//    });


});
//Baidu搜索
function gowhere1(formname) {
    var url;
    if (formname.myselectvalue.value == "0") {
        url = "http://www.baidu.com/baidu";
        document.search_form1.tn.value = "baidu";
        formname.method = "get";
    }
    if (formname.myselectvalue.value == "1") {
        url = "http://mp3.baidu.com/m";
        document.search_form1.tn.value = "baidump3";
        document.search_form1.ct.value = "134217728";
        document.search_form1.lm.value = "-1";
    }

    if (formname.myselectvalue.value == "4") {
        document.search_form1.tn.value = "news";
        document.search_form1.cl.value = "2";
        document.search_form1.rn.value = "20";
        url = "http://news.baidu.com/ns";
    }
    if (formname.myselectvalue.value == "5") {
        document.search_form1.tn.value = "baiduiamge";
        document.search_form1.ct.value = "201326592";
        document.search_form1.cl.value = "2";
        document.search_form1.lm.value = "-1";
        url = "http://image.baidu.com/i";
    }
    if (formname.myselectvalue.value == "6") {
        url = "http://tieba.baidu.com";
        document.search_form1.tn.value = "baiduPostSearch";
        document.search_form1.ct.value = "352321536";
        document.search_form1.rn.value = "10";
        document.search_form1.lm.value = "65536";
    }
    formname.action = url;
    return true;
}

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
// <div id="mapContainer" class="container" style="height: 300px;"></div>
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

