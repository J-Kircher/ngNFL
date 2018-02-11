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
var team_service_1 = require("../service/team.service");
var schedule_day_service_1 = require("../service/schedule.day.service");
var schedule_service_1 = require("../service/schedule.service");
var ScheduleDayComponent = (function () {
    function ScheduleDayComponent(teamService, scheduleDayService, scheduleService) {
        this.teamService = teamService;
        this.scheduleDayService = scheduleDayService;
        this.scheduleService = scheduleService;
        this.teamsArr = [];
        this.gamesArr = [];
    }
    ScheduleDayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.teamsArr = this.teamService.getTeams().map(function (teams) { return teams; });
        this.scheduleDayService.scheduleDay$.subscribe(function (data) {
            // console.log('[schedule-day] received: ' + data)
            _this.gameDay = data;
        });
        this.scheduleDayService.scheduleGames$.subscribe(function (data) {
            // console.log('[schedule-day] received: ' + data)
            _this.gamesArr = data;
            // console.table(data)
        });
    };
    ScheduleDayComponent.prototype.matchupClick = function (id) {
        this.modalGame = this.scheduleService.getGameById(id);
    };
    return ScheduleDayComponent;
}());
ScheduleDayComponent = __decorate([
    core_1.Component({
        selector: 'schedule-day',
        templateUrl: 'app/schedule/schedule-day.component.html',
        styles: ["\n    .schedule {\n      font-family: Arial;\n      font-size: 12pt;\n      font-weight: bold;\n      font-style: italic;\n      vertical-align: middle;\n      margin: 0px;\n      padding: 0px;\n      border-radius: 10px;\n    }\n    .gameday {\n      font-family: Arial;\n      font-size: 12pt;\n      font-weight: bold;\n      font-style: italic;\n      cursor: pointer;\n      margin: 0px;\n      margin-bottom: 0px;\n    }\n    .gameday:hover {\n      border-color: rgba(0, 128, 0, 0.5);\n      background-color: rgba(0, 128, 0, 0.2);\n    }\n  "]
    }),
    __metadata("design:paramtypes", [team_service_1.TeamService, schedule_day_service_1.ScheduleDayService,
        schedule_service_1.ScheduleService])
], ScheduleDayComponent);
exports.ScheduleDayComponent = ScheduleDayComponent;
//# sourceMappingURL=schedule-day.component.js.map