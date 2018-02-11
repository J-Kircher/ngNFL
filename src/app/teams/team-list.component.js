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
var router_1 = require("@angular/router");
var team_service_1 = require("../service/team.service");
var TeamListComponent = (function () {
    function TeamListComponent(router, teamService) {
        this.router = router;
        this.teamService = teamService;
        this.teamsArr = [];
    }
    TeamListComponent.prototype.ngOnInit = function () {
        this.teamsArr = this.teamService.getTeams().map(function (teams) { return teams; });
    };
    TeamListComponent.prototype.showTeam = function (abbrev) {
        this.router.navigate(['/teams/' + abbrev]);
    };
    return TeamListComponent;
}());
TeamListComponent = __decorate([
    core_1.Component({
        selector: 'team-list',
        template: "\n    <div class=\"container well col-sm-12\">\n      <div class=\"row well col-sm-3 team-info\" *ngFor=\"let team of teamsArr\"\n        (click)=\"showTeam(team.abbrev)\"\n        [ngStyle]=\"{'color':'#'+team.lightcolor, 'background-color':'#'+team.darkcolor}\">\n        <div style=\"margin-top:5px;\">\n            <img src=\"./app/img/{{team.abbrev}}.png\" class=\"logo\">\n            <span>{{team.city}}<br>{{team.name}}</span>\n        </div>\n      </div>\n    </div>\n  ",
        styles: ["\n    .logo {\n      float: left;\n      margin-right: 5px;\n      height: 40px;\n    }\n    .team-info {\n        font-family: Arial;\n        font-style: italic;\n        font-size: 12pt;\n        font-weight: bold;\n        text-shadow: 2px 2px 0 rgba(0,0,0,1);\n        vertical-align: middle;\n        cursor: pointer;\n        margin: 0px;\n        padding: 1px 1px 5px;\n        border-radius: 10px;\n      }\n  "]
    }),
    __metadata("design:paramtypes", [router_1.Router, team_service_1.TeamService])
], TeamListComponent);
exports.TeamListComponent = TeamListComponent;
//# sourceMappingURL=team-list.component.js.map