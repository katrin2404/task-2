/*!
 * @module ui-router-page-title
 * @description Page Title directive for angular-ui-router
 * @version v1.0.4
 * @link https://github.com/Sibiraj-S/ui-router-page-title
 * @licence MIT License, https://opensource.org/licenses/MIT
 */

var app = angular.module('uiRouterTitle', []);
var UiRouterTitleDirective = (function () {
    function UiRouterTitleDirective($timeout, $transitions) {
        this.$timeout = $timeout;
        this.$transitions = $transitions;
        this.restrict = 'A';
        this.scope = {
            ngModel: '='
        };
        UiRouterTitleDirective.prototype.link = function (scope, element, attrs) {
            $transitions.onStart({}, function (trans) {
                var title;
                title = (trans.to().data && trans.to().data.pageTitle) ? trans.to().data.pageTitle : getTitle();
                title = title;
                $timeout(function () {
                    element.text(title);
                }, 0, false);
            });
            var getTitle = function () {
                return element[0].innerText ? element[0].innerText : 'Default Title';
            };
        };
    }
    UiRouterTitleDirective.Factory = function () {
        var directive = function ($timeout, $transitions) { return new UiRouterTitleDirective($timeout, $transitions); };
        directive['$inject'] = ['$timeout', '$transitions'];
        return directive;
    };
    return UiRouterTitleDirective;
}());
app.directive('pageTitle', UiRouterTitleDirective.Factory());
