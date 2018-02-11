"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var schedule_service_1 = require("../service/schedule.service");
var schedule_day_service_1 = require("../service/schedule.day.service");
var ScheduleMonthComponent = (function () {
    function ScheduleMonthComponent(scheduleService, scheduleDayService) {
        this.scheduleService = scheduleService;
        this.scheduleDayService = scheduleDayService;
        this.gamesArr = [];
        this.monthNames = ['January', 'February', 'March',
            'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'];
        this.dayNames = ['Sunday', 'Monday', 'Tuesday',
            'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }
    ScheduleMonthComponent.prototype.ngOnInit = function () {
        this.monthName = this.monthNames[this.month - 1];
        this.buildMonth(this.month - 1, this.year);
    };
    ScheduleMonthComponent.prototype.getDaysInMonth = function (month, year) {
        switch (month) {
            case 0: return 31;
            case 1: return 28;
            case 2: return 31;
            case 3: return 30;
            case 4: return 31;
            case 5: return 30;
            case 6: return 31;
            case 7: return 31;
            case 8: return 30;
            case 9: return 31;
            case 10: return 30;
            case 11: return 31;
            default: return 0;
        }
    };
    ScheduleMonthComponent.prototype.buildMonth = function (month, year) {
        var rowCounter = 0;
        var currentDay = 0;
        var daysInMonth = this.getDaysInMonth(month, year);
        var firstDayOfMonth = new Date(year, month, 1).getDay();
        // console.log('[schedule-month] buildMonth() firstDayOfMonth: ' + firstDayOfMonth)
        this.monthArr = [];
        while (currentDay < daysInMonth) {
            this.monthArr[rowCounter] = [];
            for (var i = 0; i < 7; i++) {
                if (((currentDay === 0) && (i < firstDayOfMonth)) || (currentDay >= daysInMonth)) {
                    this.monthArr[rowCounter][i] = null;
                }
                else {
                    currentDay++;
                    // console.log('[schedule-month] buildMonth() adding day ' + currentDay + ' to monthArr[' + rowCounter + '][' + i + ']')
                    this.monthArr[rowCounter][i] = currentDay;
                }
            }
            rowCounter++;
        }
    };
    ScheduleMonthComponent.prototype.getGamesForDay = function (month, year, dayOfMonth) {
        var today = new Date(year, month - 1, dayOfMonth);
        var gameDay = this.dayNames[today.getDay()] + ', ' + this.monthNames[today.getMonth()] + ' ' + today.getDate();
        // console.log('[schedule-month] getGamesForDay() gameDay: ' + gameDay)
        this.gamesArr = this.scheduleService.getGamesForDay(gameDay);
        if (this.gamesArr.length > 0) {
            // console.log('[schedule-month] getGamesForDay() games: ' + this.gamesArr)
            this.scheduleDayService.setScheduleDay(gameDay, this.gamesArr);
        }
    };
    ScheduleMonthComponent.prototype.hasGamesForDay = function (month, year, dayOfMonth) {
        var today = new Date(year, month - 1, dayOfMonth);
        var gameDay = this.dayNames[today.getDay()] + ', ' + this.monthNames[today.getMonth()] + ' ' + today.getDate();
        return this.scheduleService.hasGamesForDay(gameDay);
    };
    return ScheduleMonthComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ScheduleMonthComponent.prototype, "month", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ScheduleMonthComponent.prototype, "year", void 0);
ScheduleMonthComponent = __decorate([
    core_1.Component({
        selector: 'schedule-month',
        template: "\n    <div class='well month col-sm-3'>\n      {{monthName}}\n      <table class='month-table' width='100%'>\n        <tr *ngFor=\"let week of monthArr\">\n          <td *ngFor=\"let day of week\">\n            <a *ngIf=\"hasGamesForDay(month, year, day); else noLink\" (click)=\"getGamesForDay(month, year, day)\">{{day}}</a>\n            <ng-template #noLink>{{day}}</ng-template>\n          </td>\n        </tr>\n      </table>\n    </div>\n  ",
        styles: ["\n    a {\n      cursor: pointer;\n      font-weight: bold;\n    }\n    .month {\n      font-family: Arial;\n      font-size: 12pt;\n      text-align: center;\n      background: rgba(0, 128, 0, 0.5);\n      min-height: 160px;\n      margin-bottom: 0px;\n      border-radius: 5px;\n    }\n    .month-table {\n      font-family: Arial;\n      font-size: 8pt;\n      color: #666;\n      background: url(./app/img/whiteback.gif);\n      min-height: 100px;\n      border-radius: 5px;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService, schedule_day_service_1.ScheduleDayService])
], ScheduleMonthComponent);
exports.ScheduleMonthComponent = ScheduleMonthComponent;
//# sourceMappingURL=schedule-month.component.js.map