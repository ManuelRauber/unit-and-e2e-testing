/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="services/BookManagerService" />
/// <reference path="controllers/MainPageController" />

module BookManagerApp {
    'use strict';
    
    var bookManager = angular
        .module('bookManagerApp', ['ngMaterial'])
        .service('bookManagerService', BookManagerService)
        .controller('mainPageController', MainPageController);
}