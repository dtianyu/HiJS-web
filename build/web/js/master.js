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

    var t = 120;
    var u = 119;

    doSomething(function (config) {
        f2(config, t, u,function(data){
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
