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
var SCHEDULE = [
    { 'gameday': 'Thursday, September 7', 'games': [13, 2] },
    { 'gameday': 'Sunday, September 10', 'games': [3, 0, 24, 20, 4, 5, 7, 6, 28, 21, 10, 8, 15, 11, 18, 19, 9, 29, 31, 22, 25, 30, 17, 16] },
    { 'gameday': 'Monday, September 11', 'games': [26, 23, 14, 12] },
    { 'gameday': 'Thursday, September 14', 'games': [8, 5] },
    { 'gameday': 'Sunday, September 17', 'games': [6, 4, 0, 25, 28, 9, 11, 10, 18, 13, 2, 26, 23, 7, 20, 27, 1, 14, 3, 15, 16, 12, 19, 29, 30, 31, 22, 24] },
    { 'gameday': 'Monday, September 18', 'games': [21, 17] },
    { 'gameday': 'Thursday, September 21', 'games': [29, 30] },
    { 'gameday': 'Sunday, September 24', 'games': [4, 10, 12, 0, 26, 25, 7, 20, 24, 21, 6, 9, 27, 23, 8, 2, 1, 3, 17, 18, 31, 11, 5, 22, 13, 14, 15, 19] },
    { 'gameday': 'Monday, September 25', 'games': [16, 28] },
    { 'gameday': 'Thursday, September 28', 'games': [20, 22] },
    { 'gameday': 'Sunday, October 1', 'games': [26, 1, 0, 24, 7, 4, 5, 6, 29, 16, 11, 8, 21, 23, 25, 2, 10, 3, 30, 28, 18, 14, 17, 27, 15, 12, 9, 31] },
    { 'gameday': 'Monday, October 2', 'games': [19, 13] },
    { 'gameday': 'Thursday, October 5', 'games': [2, 27] },
    { 'gameday': 'Sunday, October 8', 'games': [0, 5, 3, 6, 25, 21, 30, 9, 11, 1, 14, 17, 28, 18, 10, 7, 31, 29, 4, 15, 22, 16, 13, 8] },
    { 'gameday': 'Monday, October 9', 'games': [23, 20] },
    { 'gameday': 'Thursday, October 12', 'games': [18, 25] },
    { 'gameday': 'Sunday, October 15', 'games': [1, 24, 20, 4, 6, 8, 22, 23, 21, 26, 2, 3, 30, 19, 27, 28, 29, 10, 7, 13, 14, 15, 17, 12] },
    { 'gameday': 'Monday, October 16', 'games': [9, 11] },
    { 'gameday': 'Thursday, October 19', 'games': [13, 15] },
    { 'gameday': 'Sunday, October 22', 'games': [27, 0, 25, 20, 11, 6, 26, 22, 10, 9, 28, 29, 3, 1, 4, 23, 5, 7, 16, 30, 12, 14, 31, 17, 24, 2] },
    { 'gameday': 'Monday, October 23', 'games': [19, 18] },
    { 'gameday': 'Thursday, October 26', 'games': [1, 4] },
    { 'gameday': 'Sunday, October 29', 'games': [23, 6, 15, 0, 9, 5, 14, 2, 20, 26, 24, 3, 30, 18, 25, 27, 8, 31, 16, 19, 7, 21] },
    { 'gameday': 'Monday, October 30', 'games': [12, 13] },
    { 'gameday': 'Thursday, November 2', 'games': [0, 3] },
    { 'gameday': 'Sunday, November 5', 'games': [24, 25, 9, 8, 5, 10, 27, 26, 29, 17, 12, 18, 4, 11, 28, 30, 19, 31, 13, 16, 15, 1] },
    { 'gameday': 'Monday, November 6', 'games': [21, 22] },
    { 'gameday': 'Thursday, November 9', 'games': [31, 28] },
    { 'gameday': 'Sunday, November 12', 'games': [26, 0, 22, 20, 6, 21, 7, 9, 14, 10, 3, 27, 5, 11, 23, 19, 8, 29, 16, 24, 17, 30, 2, 12] },
    { 'gameday': 'Monday, November 13', 'games': [1, 25] },
    { 'gameday': 'Thursday, November 16', 'games': [11, 7] },
    { 'gameday': 'Sunday, November 19', 'games': [21, 20, 10, 6, 4, 22, 28, 8, 27, 1, 29, 23, 19, 26, 13, 17, 0, 14, 5, 12, 2, 15, 18, 16] },
    { 'gameday': 'Monday, November 20', 'games': [24, 31] },
    { 'gameday': 'Thursday, November 23', 'games': [23, 21, 14, 16, 17, 19] },
    { 'gameday': 'Sunday, November 26', 'games': [27, 24, 6, 5, 11, 9, 0, 13, 1, 2, 25, 3, 20, 18, 26, 29, 31, 30, 10, 28, 12, 15, 22, 7] },
    { 'gameday': 'Monday, November 27', 'games': [8, 4] },
    { 'gameday': 'Thursday, November 30', 'games': [19, 16] },
    { 'gameday': 'Sunday, December 3', 'games': [23, 24, 21, 4, 2, 0, 30, 20, 27, 22, 9, 10, 12, 1, 25, 26, 13, 3, 8, 11, 6, 14, 29, 28, 17, 15, 18, 31] },
    { 'gameday': 'Monday, December 4', 'games': [7, 5] },
    { 'gameday': 'Thursday, December 7', 'games': [26, 24] },
    { 'gameday': 'Sunday, December 10', 'games': [9, 0, 23, 25, 20, 5, 22, 6, 30, 8, 31, 10, 15, 13, 21, 27, 11, 28, 3, 12, 19, 14, 18, 29, 16, 17, 4, 7] },
    { 'gameday': 'Monday, December 11', 'games': [2, 1] },
    { 'gameday': 'Thursday, December 14', 'games': [12, 9] },
    { 'gameday': 'Saturday, December 16', 'games': [20, 21, 14, 13] },
    { 'gameday': 'Sunday, December 17', 'games': [1, 0, 22, 25, 4, 6, 8, 10, 5, 23, 3, 26, 18, 17, 28, 19, 29, 31, 2, 7, 11, 30, 16, 15] },
    { 'gameday': 'Monday, December 18', 'games': [24, 27] },
    { 'gameday': 'Saturday, December 23', 'games': [9, 4, 23, 22] },
    { 'gameday': 'Sunday, December 24', 'games': [27, 25, 6, 20, 21, 5, 1, 13, 0, 2, 24, 26, 14, 3, 29, 11, 12, 19, 10, 30, 17, 28, 31, 16] },
    { 'gameday': 'Monday, December 25', 'games': [7, 8, 15, 18] },
    { 'gameday': 'Sunday, December 31', 'games': [25, 24, 5, 4, 22, 21, 8, 9, 0, 1, 20, 23, 3, 2, 19, 17, 16, 18, 6, 7, 26, 27, 10, 11, 13, 12, 15, 14, 30, 29, 28, 31] },
];
var ScheduleService = (function () {
    function ScheduleService(teamService) {
        this.teamService = teamService;
        this.FULL_SCHEDULE = [];
        this.currentGame = 0;
        this.endOfSeason = false;
    }
    // {'gameday': 'Monday, September 11', 'games': [26, 23, 14, 12]},
    ScheduleService.prototype.buildFullSchedule = function () {
        var _this = this;
        // console.log('[schedule-service] buildFullSchedule()')
        var counter = 0;
        SCHEDULE.forEach(function (day) {
            for (var i = 0; i < day.games.length; i++) {
                var currentGame = {
                    id: counter++,
                    gameday: day.gameday,
                    visitTeam: day.games[i],
                    visitScore: null,
                    homeTeam: day.games[i + 1],
                    homeScore: null,
                    gameResults: []
                };
                _this.FULL_SCHEDULE.push(currentGame);
                i++;
            }
        });
        this.currentGameDay = this.FULL_SCHEDULE[this.currentGame].gameday;
        // console.log('[schedule-service] FULL_SCHEDULE:')
        // console.table(this.FULL_SCHEDULE)
    };
    ScheduleService.prototype.getGamesForDay = function (searchTerm) {
        // console.log('[schedule.service] getGamesForDay() searchTerm: ' + searchTerm)
        return this.FULL_SCHEDULE.filter(function (day) { return day.gameday === searchTerm; });
    };
    ScheduleService.prototype.hasGamesForDay = function (searchTerm) {
        var games = [];
        games = this.FULL_SCHEDULE.filter(function (day) { return day.gameday === searchTerm; });
        return games.length > 0 ? true : false;
    };
    ScheduleService.prototype.getGamesForTeam = function (team) {
        // console.log('[schedule-service] getGamesForTeam() team: ' + team)
        return this.FULL_SCHEDULE.filter(function (game) { return ((game.visitTeam === team) || (game.homeTeam === team)); });
    };
    ScheduleService.prototype.getGameById = function (id) {
        return this.FULL_SCHEDULE.find(function (game) { return game.id === id; });
    };
    ScheduleService.prototype.generateFakeScore = function (oppScore) {
        // console.log('[schedule-service] generateFakeScore(' + oppScore + ')')
        var scoreArr = [3, 7, 10, 13, 14, 17, 20, 21, 23, 24, 27, 28, 30, 31, 34, 35];
        var rndIndex = Math.floor(Math.random() * scoreArr.length);
        return scoreArr[rndIndex] !== oppScore ? scoreArr[rndIndex] : this.generateFakeScore(scoreArr[rndIndex]);
    };
    ScheduleService.prototype.zeroPad = function (value, precision) {
        if (value === 0) {
            return '.000';
        }
        if (value === 1) {
            return '1.000';
        }
        var result = '' + value;
        if (result.length > (precision + 1)) {
            result = '' + (Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision));
        }
        var decPoint = result.indexOf('.');
        for (var i = (result.length - decPoint); i <= precision; i++) {
            result += '0';
        }
        if (result[0] !== '.') {
            result = result.substring(1, result.length);
        }
        return result;
    };
    ScheduleService.prototype.getPCT = function (team) {
        return this.zeroPad((team.wins / (team.wins + team.losses)), 3);
    };
    ScheduleService.prototype.playGame = function (game) {
        // console.log('[schedule-service] playGame()')
        // console.table(game)
        var visitTeam = this.teamService.getTeamByIndex(game.visitTeam);
        var homeTeam = this.teamService.getTeamByIndex(game.homeTeam);
        game.visitScore = this.generateFakeScore(0);
        game.homeScore = this.generateFakeScore(game.visitScore);
        if (game.visitScore > game.homeScore) {
            visitTeam.wins++;
            visitTeam.visitwins++;
            homeTeam.losses++;
            homeTeam.homelosses++;
            if (visitTeam.division.substr(0, 3) === homeTeam.division.substr(0, 3)) {
                visitTeam.confwins++;
                homeTeam.conflosses++;
                if (visitTeam.division === homeTeam.division) {
                    visitTeam.divwins++;
                    homeTeam.divlosses++;
                }
            }
            else {
                visitTeam.othwins++;
                homeTeam.othlosses++;
            }
        }
        else {
            visitTeam.losses++;
            visitTeam.visitlosses++;
            homeTeam.wins++;
            homeTeam.homewins++;
            if (visitTeam.division.substr(0, 3) === homeTeam.division.substr(0, 3)) {
                visitTeam.conflosses++;
                homeTeam.confwins++;
                if (visitTeam.division === homeTeam.division) {
                    visitTeam.divlosses++;
                    homeTeam.divwins++;
                }
            }
            else {
                visitTeam.othlosses++;
                homeTeam.othwins++;
            }
        }
        visitTeam.pct = this.getPCT(visitTeam);
        visitTeam.pf += game.visitScore;
        visitTeam.pa += game.homeScore;
        homeTeam.pct = this.getPCT(homeTeam);
        homeTeam.pf += game.homeScore;
        homeTeam.pa += game.visitScore;
    };
    ScheduleService.prototype.playNextGame = function () {
        // console.log('[schedule-service] playNextGame() curr:' + this.currentGame + ' len:' + this.FULL_SCHEDULE.length)
        if (this.currentGame < this.FULL_SCHEDULE.length) {
            this.currentGameDay = this.FULL_SCHEDULE[this.currentGame].gameday;
            // console.log('[schedule-service] playNextGame() currentGameDay: ' + this.currentGameDay)
            this.playGame(this.FULL_SCHEDULE[this.currentGame]);
            this.currentGame++;
            return true;
        }
        else {
            console.log('[schedule-service] playNextGame() Season Over');
            return false;
        }
    };
    ScheduleService.prototype.checkEndOfSeason = function () {
        return this.endOfSeason = (this.currentGame >= this.FULL_SCHEDULE.length) ? true : false;
    };
    return ScheduleService;
}());
ScheduleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map