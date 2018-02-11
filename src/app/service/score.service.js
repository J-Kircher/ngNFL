"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var SCORES = [
    {
        'gameDay': 'Thursday, September 7',
        'scores': [
            {
                'visitTeam': 13,
                'visitScore': 42,
                'homeTeam': 2,
                'homeScore': 27
            }
        ]
    },
    {
        'gameDay': 'Sunday, September 10',
        'scores': [
            {
                'visitTeam': 3,
                'visitScore': 12,
                'homeTeam': 0,
                'homeScore': 21
            },
            {
                'visitTeam': 24,
                'visitScore': 30,
                'homeTeam': 20,
                'homeScore': 17
            },
            {
                'visitTeam': 4,
                'visitScore': 26,
                'homeTeam': 5,
                'homeScore': 16
            }
        ]
    },
    {
        'gameDay': 'Monday, September 11',
        'scores': [
            {
                'visitTeam': 26,
                'visitScore': 19,
                'homeTeam': 23,
                'homeScore': 29
            },
            {
                'visitTeam': 14,
                'visitScore': 21,
                'homeTeam': 12,
                'homeScore': 24
            }
        ]
    }
];
var ScoreService = (function () {
    function ScoreService() {
    }
    ScoreService.prototype.getAllScores = function () {
        return SCORES;
    };
    ScoreService.prototype.getScoresForGameday = function (gameDay) {
        var gameDayObj;
        // console.log('[score.service] getScoresForGameDay() gameDay: ' + gameDay)
        gameDayObj = SCORES.find(function (score) { return score.gameDay === gameDay; });
        if (gameDayObj) {
            return gameDayObj.scores;
        }
        else {
            return null;
        }
    };
    return ScoreService;
}());
ScoreService = __decorate([
    core_1.Injectable()
], ScoreService);
exports.ScoreService = ScoreService;
//# sourceMappingURL=score.service.js.map