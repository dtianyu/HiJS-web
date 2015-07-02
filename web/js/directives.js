/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appDirectives = angular.module('appDirectives',[]);

appDirectives.directive("showTab",
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

appDirectives.directive("datepicker",
        function () {
            return{
                restrict:'A',
                require:'?ngModel',
                scope:{
                    select:'&'
                },
                link:function(scope,element,attrs,ngModel){
                   
                    if(!ngModel) return;
                    
                    var optDate ={};
                    
                    optDate.dateFormat ='yy-mm-dd';
                    
                    var updateModel = function(dateText){
                        scope.$apply(function(){
                            ngModel.$setViewValue(dateText);
                        });
                    };
                    
                    optDate.onSelect = function(dateText,picker){
                        updateModel(dateText);                       
                        if(scope.select){
                            scope.$apply(function(){
                                scope.select({date:dateText});
                            });
                        };
                    };
                    
                    ngModel.$render = function(){
                        element.datepicker('setDate',ngModel.$viewValue || '');                        
                    };
                    
                    element.datepicker(optDate);
                }
            };

        });

