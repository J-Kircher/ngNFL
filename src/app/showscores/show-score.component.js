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
var ShowScoreComponent = (function () {
    function ShowScoreComponent(teamService) {
        this.teamService = teamService;
        this.teamsArr = [];
    }
    ShowScoreComponent.prototype.ngOnInit = function () {
        // console.log('[show-score] ngOnInit()')
        // console.table(this.score)
        this.teamsArr = this.teamService.getTeams().map(function (teams) { return teams; });
    };
    return ShowScoreComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ShowScoreComponent.prototype, "score", void 0);
ShowScoreComponent = __decorate([
    core_1.Component({
        selector: 'show-score',
        template: "\n    <div class=\"team-info\"><img src=\"/app/img/{{teamsArr[score.visitTeam].abbrev}}.png\" class=\"logo\">\n      <span class=\"score\"> {{score.visitScore}} </span>\n      <span class=\"team-city\">{{teamsArr[score.visitTeam].city}}</span><br>\n      <span class=\"team-name\">{{teamsArr[score.visitTeam].name}}</span>\n    </div>\n    <div class=\"team-info\"><img src=\"/app/img/{{teamsArr[score.homeTeam].abbrev}}.png\" class=\"logo\">\n      <span class=\"score\"> {{score.homeScore}} </span>\n      <span class=\"team-city\">{{teamsArr[score.homeTeam].city}}</span><br>\n      <span class=\"team-name\">{{teamsArr[score.homeTeam].name}}</span>\n    </div>\n  ",
        styles: ["\n    .team-info {\n      white-space: nowrap;\n      text-align: left;\n      x-line-height: 18px;\n    }\n    .logo {\n      float:left;\n      height: 40px;\n    }\n    .score {\n      font-family: Arial;\n      font-size: 14pt;\n      text-align: center;\n      // background: rgba(255, 255, 255, 0.5);\n      margin: 2px;\n      padding: 5px;\n      border-radius: 5px;\n      float: right;\n    }\n    .team-city {\n      font-family: Arial;\n      font-size: 10pt;\n      font-weight: normal;\n      font-style: normal;\n      -webkit-padding-start: 5px;\n    }\n    .team-name {\n      font-family: Arial;\n      font-size: 12pt;\n      font-weight: bold;\n      font-style: normal;\n      -webkit-padding-start: 5px;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], ShowScoreComponent);
exports.ShowScoreComponent = ShowScoreComponent;
//# sourceMappingURL=show-score.component.js.map