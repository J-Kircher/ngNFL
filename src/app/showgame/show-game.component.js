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
var ShowGameComponent = (function () {
    function ShowGameComponent(teamService) {
        this.teamService = teamService;
        this.teamsArr = [];
    }
    ShowGameComponent.prototype.ngOnInit = function () {
        this.teamsArr = this.teamService.getTeams().map(function (teams) { return teams; });
    };
    return ShowGameComponent;
}());
ShowGameComponent = __decorate([
    core_1.Component({
        selector: 'show-game',
        template: "\n    <div class=\"container well col-sm-12\">\n      <div class=\"well showgame\">\n        <div class=\"show-center\">\n          <img src=\"/app/img/NFLToday.gif\" name=\"NFLToday\">\n        </div>\n        <div class=\"show-center\">\n          <div><img src=\"/app/img/V40.gif\" name=\"Vteam\" width=\"40\" height=\"40\"></div>\n          <div><img name=\"s11\" src=\"/app/img/0.gif\"><img name=\"s12\" src=\"/app/img/0.gif\"></div>\n          <div><img src=\"/app/img/Quarter.gif\"></div>\n        </div>\n        <div class=\"show-center\" style=\"margin-bottom: 0px;\">\n          <div><img src=\"/app/img/H40.gif\" name=\"Hteam\" width=\"40\" height=\"40\"></div>\n          <div><img name=\"s21\" src=\"/app/img/0.gif\"><img name=\"s22\" src=\"/app/img/0.gif\"></div>\n          <div><img src=\"/app/img/F.gif\" name=\"Period\"></div>\n        </div>\n      </div>\n    </div>\n  ",
        styles: ["\n    .showgame {\n      display: flex;\n      flex-direction: column;\n      justify-content: space-around;\n      background: black;\n      margin: 5px;\n      padding: 5px;\n      border-radius: 10px;\n    }\n    .show-center {\n      display: flex;\n      align-items: center;\n      justify-content: space-around;\n      margin-bottom: 5px;\n      background: #333;\n    }\n"]
    }),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], ShowGameComponent);
exports.ShowGameComponent = ShowGameComponent;
//# sourceMappingURL=show-game.component.js.map