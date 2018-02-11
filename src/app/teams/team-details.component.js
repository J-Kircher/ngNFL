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
var TeamDetailsComponent = (function () {
    function TeamDetailsComponent(teamService, route) {
        this.teamService = teamService;
        this.route = route;
    }
    TeamDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.team = _this.teamService.getTeam(params['abbrev']);
            _this.total = _this.team.qb + _this.team.rb + _this.team.wr + _this.team.ol +
                _this.team.dl + _this.team.lb + _this.team.db + _this.team.st + _this.team.co;
        });
    };
    return TeamDetailsComponent;
}());
TeamDetailsComponent = __decorate([
    core_1.Component({
        selector: 'team-details',
        templateUrl: '/app/teams/team-details.component.html',
        styles: ["\n    .banner-border {\n      margin-top: 0px;\n      margin-bottom: 0px;\n    }\n    .banner-center {\n      font-style: Arial;\n      font-size: 18pt;\n      font-weight: bold;\n      text-align: center;\n      color: white;\n      margin-top: 0px;\n      margin-bottom: 0px;\n      padding-top: 0px;\n      padding-bottom: 0px;\n    }\n    td {\n      font-style: Arial;\n      font-size: 12pt;\n      font-weight: bold;\n      text-align: center;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [team_service_1.TeamService, router_1.ActivatedRoute])
], TeamDetailsComponent);
exports.TeamDetailsComponent = TeamDetailsComponent;
//# sourceMappingURL=team-details.component.js.map