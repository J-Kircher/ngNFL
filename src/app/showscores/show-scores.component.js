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
var ShowScoresComponent = (function () {
    function ShowScoresComponent(scheduleService) {
        this.scheduleService = scheduleService;
        this.gamesArr = [];
    }
    ShowScoresComponent.prototype.ngDoCheck = function () {
        // console.log('[show-scores] ngDoCheck()')
        this.gameDay = this.scheduleService.currentGameDay;
        this.gamesArr = this.scheduleService.getGamesForDay(this.gameDay).filter(function (day) { return day.homeScore !== null; });
    };
    return ShowScoresComponent;
}());
ShowScoresComponent = __decorate([
    core_1.Component({
        selector: 'show-scores',
        template: "\n    <div class=\"container well col-sm-12\">\n      <div class=\"row well showscores\">\n        <div class=\"col-sm-12\" style=\"margin-top:5px\">\n          {{gameDay}}\n        </div>\n        <div class=\"showscores col-sm-12 div-scroll\">\n          <div class='well scoreboard col-sm-12' *ngFor=\"let score of gamesArr\">\n            <show-score [score]=score></show-score>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
        styles: ["\n    .showscores {\n      font-family: Arial;\n      font-size: 14pt;\n      font-weight: bold;\n      font-style: italic;\n      vertical-align: middle;\n      margin: 0px;\n      padding: 0px;\n      border-radius: 10px;\n    }\n    .div-scroll {\n      max-height: 512px;\n      overflow-y: scroll;\n    }\n    .scoreboard {\n      font-family: Arial;\n      font-size: 12pt;\n      font-weight: bold;\n      font-style: italic;\n      text-align: center;\n      // background: rgba(0, 128, 0, 0.5);\n      margin-bottom: 0px;\n      border-radius: 5px;\n    }\n    .scoreboard:hover {\n      border-color: rgba(0, 128, 0, 0.5);\n      background-color: rgba(0, 128, 0, 0.2);\n    }\n  "]
    }),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService])
], ShowScoresComponent);
exports.ShowScoresComponent = ShowScoresComponent;
//# sourceMappingURL=show-scores.component.js.map