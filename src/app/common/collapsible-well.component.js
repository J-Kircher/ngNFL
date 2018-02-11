"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var CollapsibleWellComponent = (function () {
    function CollapsibleWellComponent() {
        this.visible = false;
    }
    CollapsibleWellComponent.prototype.toggleContent = function () {
        this.visible = !this.visible;
    };
    return CollapsibleWellComponent;
}());
CollapsibleWellComponent = __decorate([
    core_1.Component({
        selector: 'collapsible-well',
        template: "\n    <div (click)=\"toggleContent()\" class=\"pointable\">\n      <ng-content select=\"[well-title]\"></ng-content>\n      <ng-content *ngIf=\"visible\" select=\"[well-body]\"></ng-content>\n    </div>\n  "
    })
], CollapsibleWellComponent);
exports.CollapsibleWellComponent = CollapsibleWellComponent;
//# sourceMappingURL=collapsible-well.component.js.map