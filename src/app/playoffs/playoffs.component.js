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
var playoff_service_1 = require("../service/playoff.service");
var PlayoffsComponent = (function () {
    function PlayoffsComponent(teamService, playoffService) {
        this.teamService = teamService;
        this.playoffService = playoffService;
        this.divisions = [];
        this.teamsArr = [];
        this.AFCPlayoffTeams = [];
        this.NFCPlayoffTeams = [];
    }
    PlayoffsComponent.prototype.ngOnInit = function () {
        // console.log('[playoffs] ngOnInit()')
        this.teamsArr = this.teamService.getTeams().map(function (teams) { return teams; });
        this.AFCPlayoffTeams = this.playoffService.getAFCPlayoffTeams().map(function (teams) { return teams; });
        this.NFCPlayoffTeams = this.playoffService.getNFCPlayoffTeams().map(function (teams) { return teams; });
        // this.SuperBowlChamp = this.playoffService.SuperBowlChamp
        window.scrollTo(0, 0);
    };
    return PlayoffsComponent;
}());
PlayoffsComponent = __decorate([
    core_1.Component({
        selector: 'playoffs',
        templateUrl: 'app/playoffs/playoffs.component.html',
        styleUrls: ['app/playoffs/playoffs.component.scss']
    }),
    __metadata("design:paramtypes", [team_service_1.TeamService, playoff_service_1.PlayoffService])
], PlayoffsComponent);
exports.PlayoffsComponent = PlayoffsComponent;
//# sourceMappingURL=playoffs.component.js.map