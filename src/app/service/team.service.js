"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var TEAMS = [
    { 'city': 'Buffalo', 'name': 'Bills', 'abbrev': 'BUF', 'lightcolor': 'CF0020', 'darkcolor': '1F488F', 'division': 'AFC East', 'qb': 5, 'rb': 4, 'wr': 5, 'ol': 5, 'dl': 6, 'lb': 7, 'db': 9, 'st': 6, 'co': 6 },
    { 'city': 'Miami', 'name': 'Dolphins', 'abbrev': 'MIA', 'lightcolor': 'EF904F', 'darkcolor': '007880', 'division': 'AFC East', 'qb': 5, 'rb': 8, 'wr': 5, 'ol': 7, 'dl': 6, 'lb': 6, 'db': 6, 'st': 7, 'co': 7 },
    { 'city': 'New England', 'name': 'Patriots', 'abbrev': 'NE', 'lightcolor': 'CF0020', 'darkcolor': '203F80', 'division': 'AFC East', 'qb': 8, 'rb': 8, 'wr': 8, 'ol': 8, 'dl': 7, 'lb': 7, 'db': 6, 'st': 7, 'co': 8 },
    { 'city': 'New York', 'name': 'Jets', 'abbrev': 'NYJ', 'lightcolor': 'D0D0D0', 'darkcolor': '007352', 'division': 'AFC East', 'qb': 4, 'rb': 8, 'wr': 4, 'ol': 7, 'dl': 8, 'lb': 9, 'db': 9, 'st': 8, 'co': 7 },
    { 'city': 'Baltimore', 'name': 'Ravens', 'abbrev': 'BAL', 'lightcolor': 'DFB800', 'darkcolor': '30186F', 'division': 'AFC North', 'qb': 6, 'rb': 9, 'wr': 6, 'ol': 8, 'dl': 9, 'lb': 8, 'db': 8, 'st': 7, 'co': 7 },
    { 'city': 'Cincinnati', 'name': 'Bengals', 'abbrev': 'CIN', 'lightcolor': 'EF904F', 'darkcolor': '000000', 'division': 'AFC North', 'qb': 6, 'rb': 6, 'wr': 6, 'ol': 6, 'dl': 7, 'lb': 7, 'db': 7, 'st': 5, 'co': 7 },
    { 'city': 'Cleveland', 'name': 'Browns', 'abbrev': 'CLE', 'lightcolor': 'EF904F', 'darkcolor': '804000', 'division': 'AFC North', 'qb': 4, 'rb': 5, 'wr': 4, 'ol': 5, 'dl': 5, 'lb': 5, 'db': 5, 'st': 7, 'co': 6 },
    { 'city': 'Pittsburgh', 'name': 'Steelers', 'abbrev': 'PIT', 'lightcolor': 'F0D700', 'darkcolor': '000000', 'division': 'AFC North', 'qb': 8, 'rb': 5, 'wr': 8, 'ol': 7, 'dl': 8, 'lb': 7, 'db': 6, 'st': 7, 'co': 8 },
    { 'city': 'Houston', 'name': 'Texans', 'abbrev': 'HOU', 'lightcolor': 'CF0020', 'darkcolor': '20386F', 'division': 'AFC South', 'qb': 9, 'rb': 6, 'wr': 9, 'ol': 7, 'dl': 6, 'lb': 6, 'db': 6, 'st': 7, 'co': 6 },
    { 'city': 'Indianapolis', 'name': 'Colts', 'abbrev': 'IND', 'lightcolor': 'D0D0D0', 'darkcolor': '20386F', 'division': 'AFC South', 'qb': 9, 'rb': 6, 'wr': 9, 'ol': 8, 'dl': 7, 'lb': 7, 'db': 7, 'st': 5, 'co': 7 },
    { 'city': 'Jacksonville', 'name': 'Jaguars', 'abbrev': 'JAX', 'lightcolor': 'BF9800', 'darkcolor': '007890', 'division': 'AFC South', 'qb': 6, 'rb': 8, 'wr': 6, 'ol': 7, 'dl': 6, 'lb': 5, 'db': 4, 'st': 4, 'co': 6 },
    { 'city': 'Tennessee', 'name': 'Titans', 'abbrev': 'TEN', 'lightcolor': '5FA0DF', 'darkcolor': 'CF0020', 'division': 'AFC South', 'qb': 5, 'rb': 8, 'wr': 5, 'ol': 7, 'dl': 5, 'lb': 5, 'db': 4, 'st': 6, 'co': 8 },
    { 'city': 'Denver', 'name': 'Broncos', 'abbrev': 'DEN', 'lightcolor': 'EF904F', 'darkcolor': '10285F', 'division': 'AFC West', 'qb': 7, 'rb': 5, 'wr': 7, 'ol': 6, 'dl': 8, 'lb': 7, 'db': 7, 'st': 8, 'co': 6 },
    { 'city': 'Kansas City', 'name': 'Chiefs', 'abbrev': 'KC', 'lightcolor': 'F0D700', 'darkcolor': 'CF0020', 'division': 'AFC West', 'qb': 5, 'rb': 5, 'wr': 5, 'ol': 5, 'dl': 5, 'lb': 5, 'db': 5, 'st': 6, 'co': 6 },
    { 'city': 'Los Angeles', 'name': 'Chargers', 'abbrev': 'LAC', 'lightcolor': 'F0D700', 'darkcolor': '0F284F', 'division': 'AFC West', 'qb': 9, 'rb': 7, 'wr': 9, 'ol': 8, 'dl': 7, 'lb': 7, 'db': 6, 'st': 9, 'co': 7 },
    { 'city': 'Oakland', 'name': 'Raiders', 'abbrev': 'OAK', 'lightcolor': 'D0D0D0', 'darkcolor': '000000', 'division': 'AFC West', 'qb': 4, 'rb': 4, 'wr': 4, 'ol': 4, 'dl': 5, 'lb': 6, 'db': 7, 'st': 5, 'co': 6 },
    { 'city': 'Dallas', 'name': 'Cowboys', 'abbrev': 'DAL', 'lightcolor': 'D0D0D0', 'darkcolor': '10285F', 'division': 'NFC East', 'qb': 8, 'rb': 7, 'wr': 8, 'ol': 8, 'dl': 8, 'lb': 7, 'db': 6, 'st': 6, 'co': 7 },
    { 'city': 'New York', 'name': 'Giants', 'abbrev': 'NYG', 'lightcolor': 'CF0020', 'darkcolor': '00487F', 'division': 'NFC East', 'qb': 8, 'rb': 6, 'wr': 8, 'ol': 7, 'dl': 5, 'lb': 5, 'db': 4, 'st': 8, 'co': 8 },
    { 'city': 'Philadelphia', 'name': 'Eagles', 'abbrev': 'PHI', 'lightcolor': 'D0D0D0', 'darkcolor': '005A39', 'division': 'NFC East', 'qb': 8, 'rb': 6, 'wr': 8, 'ol': 7, 'dl': 7, 'lb': 7, 'db': 6, 'st': 9, 'co': 8 },
    { 'city': 'Washington', 'name': 'Redskins', 'abbrev': 'WAS', 'lightcolor': 'F0D72F', 'darkcolor': '7F002F', 'division': 'NFC East', 'qb': 6, 'rb': 4, 'wr': 6, 'ol': 5, 'dl': 7, 'lb': 7, 'db': 6, 'st': 4, 'co': 7 },
    { 'city': 'Chicago', 'name': 'Bears', 'abbrev': 'CHI', 'lightcolor': 'EF703F', 'darkcolor': '001F3F', 'division': 'NFC North', 'qb': 7, 'rb': 4, 'wr': 7, 'ol': 6, 'dl': 6, 'lb': 6, 'db': 5, 'st': 7, 'co': 7 },
    { 'city': 'Detroit', 'name': 'Lions', 'abbrev': 'DET', 'lightcolor': 'D0D0D0', 'darkcolor': '0082BE', 'division': 'NFC North', 'qb': 5, 'rb': 5, 'wr': 5, 'ol': 5, 'dl': 5, 'lb': 5, 'db': 4, 'st': 4, 'co': 6 },
    { 'city': 'Green Bay', 'name': 'Packers', 'abbrev': 'GB', 'lightcolor': 'F0D700', 'darkcolor': '42735A', 'division': 'NFC North', 'qb': 9, 'rb': 8, 'wr': 9, 'ol': 9, 'dl': 8, 'lb': 7, 'db': 6, 'st': 7, 'co': 6 },
    { 'city': 'Minnesota', 'name': 'Vikings', 'abbrev': 'MIN', 'lightcolor': 'F0D700', 'darkcolor': '63317B', 'division': 'NFC North', 'qb': 9, 'rb': 8, 'wr': 9, 'ol': 9, 'dl': 7, 'lb': 7, 'db': 5, 'st': 9, 'co': 6 },
    { 'city': 'Atlanta', 'name': 'Falcons', 'abbrev': 'ATL', 'lightcolor': 'CF0020', 'darkcolor': '000000', 'division': 'NFC South', 'qb': 7, 'rb': 7, 'wr': 7, 'ol': 7, 'dl': 7, 'lb': 6, 'db': 5, 'st': 5, 'co': 7 },
    { 'city': 'Carolina', 'name': 'Panthers', 'abbrev': 'CAR', 'lightcolor': 'D0D0D0', 'darkcolor': '009FD0', 'division': 'NFC South', 'qb': 5, 'rb': 8, 'wr': 5, 'ol': 7, 'dl': 7, 'lb': 8, 'db': 8, 'st': 4, 'co': 8 },
    { 'city': 'New Orleans', 'name': 'Saints', 'abbrev': 'NO', 'lightcolor': 'D0C78F', 'darkcolor': '000000', 'division': 'NFC South', 'qb': 9, 'rb': 9, 'wr': 9, 'ol': 9, 'dl': 7, 'lb': 8, 'db': 9, 'st': 7, 'co': 7 },
    { 'city': 'Tampa Bay', 'name': 'Buccaneers', 'abbrev': 'TB', 'lightcolor': '90887F', 'darkcolor': 'BF083F', 'division': 'NFC South', 'qb': 5, 'rb': 4, 'wr': 5, 'ol': 5, 'dl': 5, 'lb': 5, 'db': 5, 'st': 4, 'co': 6 },
    { 'city': 'Arizona', 'name': 'Cardinals', 'abbrev': 'ARI', 'lightcolor': 'F0D700', 'darkcolor': 'A0003F', 'division': 'NFC West', 'qb': 8, 'rb': 6, 'wr': 8, 'ol': 7, 'dl': 7, 'lb': 6, 'db': 6, 'st': 6, 'co': 8 },
    { 'city': 'Los Angeles', 'name': 'Rams', 'abbrev': 'LAR', 'lightcolor': 'F0D700', 'darkcolor': '10407F', 'division': 'NFC West', 'qb': 4, 'rb': 4, 'wr': 4, 'ol': 4, 'dl': 4, 'lb': 5, 'db': 5, 'st': 4, 'co': 6 },
    { 'city': 'San Francisco', 'name': '49ers', 'abbrev': 'SF', 'lightcolor': 'C0A87F', 'darkcolor': 'A0003F', 'division': 'NFC West', 'qb': 6, 'rb': 6, 'wr': 6, 'ol': 6, 'dl': 8, 'lb': 8, 'db': 8, 'st': 5, 'co': 6 },
    { 'city': 'Seattle', 'name': 'Seahawks', 'abbrev': 'SEA', 'lightcolor': '838EB2', 'darkcolor': '3B527B', 'division': 'NFC West', 'qb': 6, 'rb': 4, 'wr': 6, 'ol': 5, 'dl': 5, 'lb': 5, 'db': 4, 'st': 5, 'co': 8 }
];
var TeamService = (function () {
    function TeamService() {
    }
    TeamService.prototype.initTeams = function () {
        TEAMS.forEach(function (team) {
            team.total = (team.qb + team.rb + team.wr + team.ol + team.dl + team.lb + team.db + team.st + team.co);
            team.wins = 0;
            team.losses = 0;
            team.pct = '.000';
            team.pf = 0;
            team.pa = 0;
            team.homewins = 0;
            team.homelosses = 0;
            team.visitwins = 0;
            team.visitlosses = 0;
            team.divwins = 0;
            team.divlosses = 0;
            team.confwins = 0;
            team.conflosses = 0;
            team.othwins = 0;
            team.othlosses = 0;
        });
    };
    TeamService.prototype.getTeams = function () {
        return TEAMS;
    };
    TeamService.prototype.getTeam = function (abbrev) {
        return TEAMS.find(function (team) { return team.abbrev === abbrev; });
    };
    TeamService.prototype.getTeamIndex = function (abbrev) {
        var counter = 0;
        var index = -1;
        TEAMS.forEach(function (team) {
            if (team.abbrev === abbrev) {
                index = counter;
            }
            else {
                counter++;
            }
        });
        return index;
    };
    TeamService.prototype.getTeamByIndex = function (index) {
        return TEAMS[index];
    };
    TeamService.prototype.getTeamsForDivision = function (division) {
        return TEAMS.filter(function (team) { return team.division.toLocaleLowerCase() === division.toLocaleLowerCase(); });
    };
    return TeamService;
}());
TeamService = __decorate([
    core_1.Injectable()
], TeamService);
exports.TeamService = TeamService;
//# sourceMappingURL=team.service.js.map