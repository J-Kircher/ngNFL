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
var schedule_service_1 = require("../service/schedule.service");
var sort_1 = require("../common/sort");
var SCHEDULE = [];
var PlayoffService = (function () {
    function PlayoffService(teamService, scheduleService) {
        this.teamService = teamService;
        this.scheduleService = scheduleService;
        this.PLAYOFF_SCHEDULE = [];
        this.currentGame = 0;
        this.AFCPlayoffTeams = [];
        this.NFCPlayoffTeams = [];
    }
    PlayoffService.prototype.buildPlayoffSchedule = function () {
        var _this = this;
        // console.log('[playoff-service] buildFullSchedule()')
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
                _this.PLAYOFF_SCHEDULE.push(currentGame);
                i++;
            }
        });
        this.currentGameDay = this.PLAYOFF_SCHEDULE[this.currentGame].gameday;
        // console.log('[playoff-service] PLAYOFF_SCHEDULE:')
        // console.table(this.PLAYOFF_SCHEDULE)
    };
    PlayoffService.prototype.getGamesForDay = function (searchTerm) {
        // console.log('[schedule.service] getGamesForDay() searchTerm: ' + searchTerm)
        return this.PLAYOFF_SCHEDULE.filter(function (day) { return day.gameday === searchTerm; });
    };
    PlayoffService.prototype.hasGamesForDay = function (searchTerm) {
        var games = [];
        games = this.PLAYOFF_SCHEDULE.filter(function (day) { return day.gameday === searchTerm; });
        return games.length > 0 ? true : false;
    };
    PlayoffService.prototype.getGamesForTeam = function (team) {
        // console.log('[playoff-service] getGamesForTeam() team: ' + team)
        return this.PLAYOFF_SCHEDULE.filter(function (game) { return ((game.visitTeam === team) || (game.homeTeam === team)); });
    };
    PlayoffService.prototype.getGameById = function (id) {
        return this.PLAYOFF_SCHEDULE.find(function (game) { return game.id === id; });
    };
    PlayoffService.prototype.playGame = function (game) {
        // console.log('[playoff-service] playGame()')
        // console.table(game)
        var visitTeam = this.teamService.getTeamByIndex(game.visitTeam);
        var homeTeam = this.teamService.getTeamByIndex(game.homeTeam);
        // game.visitScore = this.generateFakeScore(0)
        // game.homeScore = this.generateFakeScore(game.visitScore)
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
        // visitTeam.pct = this.getPCT(visitTeam)
        visitTeam.pf += game.visitScore;
        visitTeam.pa += game.homeScore;
        // homeTeam.pct = this.getPCT(homeTeam)
        homeTeam.pf += game.homeScore;
        homeTeam.pa += game.visitScore;
    };
    PlayoffService.prototype.playNextGame = function () {
        // console.log('[playoff-service] playNextGame() curr:' + this.currentGame + ' len:' + this.PLAYOFF_SCHEDULE.length)
        if (this.currentGame < this.PLAYOFF_SCHEDULE.length) {
            this.currentGameDay = this.PLAYOFF_SCHEDULE[this.currentGame].gameday;
            // console.log('[playoff-service] playNextGame() currentGameDay: ' + this.currentGameDay)
            this.playGame(this.PLAYOFF_SCHEDULE[this.currentGame]);
            this.currentGame++;
            return true;
        }
        else {
            console.log('[playoff-service] playNextGame() Season Over');
            return false;
        }
    };
    PlayoffService.prototype.getAFCPlayoffTeams = function () {
        if (this.scheduleService.checkEndOfSeason() && this.AFCPlayoffTeams.length > 0) {
            // console.log('[playoff.service] getAFCPlayoffTeams() Season is Over')
            return this.AFCPlayoffTeams;
        }
        var divisions = [];
        var teamsArr = [];
        var AFCDivLeaders = [];
        var AFCOthers = [];
        this.AFCPlayoffTeams = [];
        this.NFCPlayoffTeams = [];
        teamsArr = this.teamService.getTeams().map(function (teams) { return teams; });
        teamsArr.forEach(function (team) {
            if (divisions.indexOf(team.division) < 0) {
                divisions.push(team.division);
            }
        });
        divisions
            .filter(function (division) { return division.indexOf('AFC') > -1; })
            .forEach(function (division) {
            var thisDiv = teamsArr.filter(function (team) { return (team.division === division); });
            thisDiv.sort(sort_1.sortDivision);
            AFCDivLeaders.push(thisDiv[0]);
            AFCOthers.push(thisDiv[1]);
            AFCOthers.push(thisDiv[2]);
            AFCOthers.push(thisDiv[3]);
        });
        AFCDivLeaders.sort(sort_1.sortConference);
        AFCOthers.sort(sort_1.sortConference);
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCDivLeaders[0].abbrev));
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCDivLeaders[1].abbrev));
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCDivLeaders[2].abbrev));
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCDivLeaders[3].abbrev));
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCOthers[0].abbrev));
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCOthers[1].abbrev));
        // console.table(this.AFCPlayoffTeams)
        return this.AFCPlayoffTeams;
    };
    PlayoffService.prototype.getNFCPlayoffTeams = function () {
        if (this.scheduleService.checkEndOfSeason() && this.NFCPlayoffTeams.length > 0) {
            // console.log('[playoff.service] getNFCPlayoffTeams() Season is Over')
            return this.NFCPlayoffTeams;
        }
        var divisions = [];
        var teamsArr = [];
        var NFCDivLeaders = [];
        var NFCOthers = [];
        teamsArr = this.teamService.getTeams().map(function (teams) { return teams; });
        teamsArr.forEach(function (team) {
            if (divisions.indexOf(team.division) < 0) {
                divisions.push(team.division);
            }
        });
        divisions
            .filter(function (division) { return division.indexOf('NFC') > -1; })
            .forEach(function (division) {
            var thisDiv = teamsArr.filter(function (team) { return (team.division === division); });
            thisDiv.sort(sort_1.sortDivision);
            NFCDivLeaders.push(thisDiv[0]);
            NFCOthers.push(thisDiv[1]);
            NFCOthers.push(thisDiv[2]);
            NFCOthers.push(thisDiv[3]);
        });
        NFCDivLeaders.sort(sort_1.sortConference);
        NFCOthers.sort(sort_1.sortConference);
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCDivLeaders[0].abbrev));
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCDivLeaders[1].abbrev));
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCDivLeaders[2].abbrev));
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCDivLeaders[3].abbrev));
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCOthers[0].abbrev));
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCOthers[1].abbrev));
        // console.table(this.NFCPlayoffTeams)
        return this.NFCPlayoffTeams;
    };
    return PlayoffService;
}());
PlayoffService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [team_service_1.TeamService, schedule_service_1.ScheduleService])
], PlayoffService);
exports.PlayoffService = PlayoffService;
//# sourceMappingURL=playoff.service.js.map