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
var StandingsComponent = (function () {
    function StandingsComponent(teamService) {
        this.teamService = teamService;
        this.divisions = [];
        this.teamsArr = [];
    }
    StandingsComponent.prototype.ngOnInit = function () {
        // console.log('[standings] ngOnInit()')
        var _this = this;
        this.teamsArr = this.teamService.getTeams().map(function (teams) { return teams; });
        // this.divisions = ['AFC West', 'NFC West', 'AFC South', 'NFC South', 'AFC North', 'NFC North', 'AFC East', 'NFC East']
        this.teamsArr.forEach(function (team) {
            if (_this.divisions.indexOf(team.division) < 0) {
                _this.divisions.push(team.division);
            }
        });
        window.scrollTo(0, 0);
    };
    return StandingsComponent;
}());
StandingsComponent = __decorate([
    core_1.Component({
        selector: 'standings',
        template: "\n    <div class=\"container well col-sm-12\">\n      <div class=\"row well standings\">\n        <div class=\"standings col-sm-12\">\n          <div class=\"col-sm-12\" style=\"margin-top:5px\">\n            Standings\n          </div>\n          <ul class=\"nav nav-tabs\">\n            <li style=\"float: right;\">\n              <a data-toggle=\"tab\" href=\"#expanded\">Expanded</a>\n            </li>\n            <li class=\"active\" style=\"float: right;\">\n              <a data-toggle=\"tab\" href=\"#standard\">Standard</a>\n            </li>\n          </ul>\n          <div class=\"tab-content\">\n            <div id=\"standard\" class=\"tab-pane fade in active\">\n              <div *ngFor=\"let division of divisions\">\n                <standings-division [division]=\"division\"></standings-division>\n              </div>\n            </div>\n            <div id=\"expanded\" class=\"tab-pane fade\">\n              <div *ngFor=\"let division of divisions\">\n                <standings-division-expanded [division]=\"division\"></standings-division-expanded>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
        styles: ["\n    .standings {\n      font-family: Arial;\n      font-style: italic;\n      font-size: 14pt;\n      font-weight: bold;\n      vertical-align: middle;\n      margin: 0px;\n      padding: 0px;\n      border-radius: 10px;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], StandingsComponent);
exports.StandingsComponent = StandingsComponent;
//# sourceMappingURL=standings.component.js.map