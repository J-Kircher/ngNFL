export interface ITeam {
    city: string;
    name: string;
    abbrev: string;
    lightcolor: string;
    darkcolor: string;
    division: string;
    qb: number;
    rb: number;
    wr: number;
    ol: number;
    dl: number;
    lb: number;
    db: number;
    st: number;
    co: number;
    total?: number;
    wins?: number;
    losses?: number;
    pct?: string;
    pf?: number;
    pa?: number;
    homewins?: number;
    homelosses?: number;
    visitwins?: number;
    visitlosses?: number;
    divwins?: number;
    divlosses?: number;
    confwins?: number;
    conflosses?: number;
    othwins?: number;
    othlosses?: number;
}

export interface NFLCalendar {
  month: number;
  year: number;
}

export interface IScheduleBase {
  gameday: string;
  games: number[];
}

export interface ISchedule {
  id: number;
  gameday: string;
  visitTeam: number;
  visitScore: number;
  homeTeam: number;
  homeScore: number;
  gameResults: IGameResults[];
}

export interface IGameResults {
  teamScored: number;
  quarter: string;
  points: number;
}
