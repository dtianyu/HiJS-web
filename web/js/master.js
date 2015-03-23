/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
    
    //菜单自动弹出
    $("li.dropdown").hover(function(){
        $(this).removeClass("dropdown").addClass("dropdown open");
    },function(){
         $(this).removeClass("dropdown open").addClass("dropdown");
    });
    
 });