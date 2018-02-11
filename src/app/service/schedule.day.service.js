"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var ScheduleDayService = (function () {
    function ScheduleDayService() {
        // Observable sources
        this.scheduleDaySource = new Subject_1.Subject();
        this.scheduleGamesSource = new Subject_1.Subject();
        // Observable streams
        this.scheduleDay$ = this.scheduleDaySource.asObservable();
        this.scheduleGames$ = this.scheduleGamesSource.asObservable();
    }
    // Service message commands
    ScheduleDayService.prototype.setScheduleDay = function (scheduleInfo, scheduleGames) {
        // console.log('[schedule.day.service] setScheduleDay() scheduleInfo: ' + scheduleInfo)
        this.scheduleDaySource.next(scheduleInfo);
        this.scheduleGamesSource.next(scheduleGames);
    };
    return ScheduleDayService;
}());
ScheduleDayService = __decorate([
    core_1.Injectable()
], ScheduleDayService);
exports.ScheduleDayService = ScheduleDayService;
//# sourceMappingURL=schedule.day.service.js.map