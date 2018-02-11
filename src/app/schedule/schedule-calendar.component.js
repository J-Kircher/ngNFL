"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ScheduleCalenderComponent = (function () {
    function ScheduleCalenderComponent() {
        this.NFLCalendarArr = [];
    }
    ScheduleCalenderComponent.prototype.ngOnInit = function () {
        this.NFLCalendarArr = [{ month: 9, year: 2017 }, { month: 10, year: 2017 }, { month: 11, year: 2017 }, { month: 12, year: 2017 }];
    };
    return ScheduleCalenderComponent;
}());
ScheduleCalenderComponent = __decorate([
    core_1.Component({
        selector: 'schedule-calendar',
        template: "\n    <div class=\"container well col-sm-12\">\n      <div class=\"row well schedule\">\n        <div class=\"schedule col-sm-12\">\n          <div class=\"col-sm-12\" style=\"margin-top:5px\">\n            Schedule\n          </div>\n          <div *ngFor=\"let schedDate of NFLCalendarArr\">\n            <schedule-month [month]=\"schedDate.month\" [year]=\"schedDate.year\"></schedule-month>\n          </div>\n        </div>\n      </div>\n    </div>\n",
        styles: ["\n    .schedule {\n      font-family: Arial;\n      font-style: italic;\n      font-size: 14pt;\n      font-weight: bold;\n      vertical-align: middle;\n      margin: 0px;\n      padding: 0px;\n      border-radius: 10px;\n    }\n  "]
    })
], ScheduleCalenderComponent);
exports.ScheduleCalenderComponent = ScheduleCalenderComponent;
//# sourceMappingURL=schedule-calendar.component.js.map