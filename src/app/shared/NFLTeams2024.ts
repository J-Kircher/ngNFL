import { ITeam } from '@app/model/nfl.model';

export const _TEAMS: ITeam[] = [
  { 'city': 'Buffalo', 'name': 'Bills', 'abbrev': 'BUF', 'lightcolor': 'CF0020', 'darkcolor': '1F488F', 'division': 'AFC East',        'qb': 8, 'rb': 7, 'wr': 9, 'ol': 5, 'dl': 4, 'lb': 9, 'db': 8, 'st': 9, 'co': 7 },
  { 'city': 'Miami', 'name': 'Dolphins', 'abbrev': 'MIA', 'lightcolor': 'EF904F', 'darkcolor': '007880', 'division': 'AFC East',       'qb': 8, 'rb': 5, 'wr': 9, 'ol': 9, 'dl': 5, 'lb': 8, 'db': 5, 'st': 4, 'co': 7 },
  { 'city': 'New England', 'name': 'Patriots', 'abbrev': 'NE', 'lightcolor': 'CF0020', 'darkcolor': '203F80', 'division': 'AFC East',  'qb': 5, 'rb': 6, 'wr': 5, 'ol': 8, 'dl': 7, 'lb': 8, 'db': 9, 'st': 4, 'co': 7 },
  { 'city': 'New York', 'name': 'Jets', 'abbrev': 'NYJ', 'lightcolor': 'D0D0D0', 'darkcolor': '007352', 'division': 'AFC East',        'qb': 5, 'rb': 5, 'wr': 5, 'ol': 8, 'dl': 6, 'lb': 8, 'db': 8, 'st': 6, 'co': 7 },
  { 'city': 'Baltimore', 'name': 'Ravens', 'abbrev': 'BAL', 'lightcolor': 'DFB800', 'darkcolor': '30186F', 'division': 'AFC North',    'qb': 6, 'rb': 8, 'wr': 4, 'ol': 6, 'dl': 6, 'lb': 8, 'db': 8, 'st': 9, 'co': 7 },
  { 'city': 'Cincinnati', 'name': 'Bengals', 'abbrev': 'CIN', 'lightcolor': 'EF904F', 'darkcolor': '000000', 'division': 'AFC North',  'qb': 7, 'rb': 5, 'wr': 9, 'ol': 7, 'dl': 7, 'lb': 7, 'db': 8, 'st': 7, 'co': 7 },
  { 'city': 'Cleveland', 'name': 'Browns', 'abbrev': 'CLE', 'lightcolor': 'EF904F', 'darkcolor': '804000', 'division': 'AFC North',    'qb': 6, 'rb': 8, 'wr': 7, 'ol': 6, 'dl': 5, 'lb': 5, 'db': 7, 'st': 7, 'co': 7 },
  { 'city': 'Pittsburgh', 'name': 'Steelers', 'abbrev': 'PIT', 'lightcolor': 'F0D700', 'darkcolor': '000000', 'division': 'AFC North', 'qb': 5, 'rb': 7, 'wr': 4, 'ol': 5, 'dl': 6, 'lb': 8, 'db': 6, 'st': 6, 'co': 7 },
  { 'city': 'Houston', 'name': 'Texans', 'abbrev': 'HOU', 'lightcolor': 'CF0020', 'darkcolor': '20386F', 'division': 'AFC South',      'qb': 4, 'rb': 4, 'wr': 4, 'ol': 7, 'dl': 7, 'lb': 4, 'db': 6, 'st': 9, 'co': 7 },
  { 'city': 'Indianapolis', 'name': 'Colts', 'abbrev': 'IND', 'lightcolor': 'D0D0D0', 'darkcolor': '20386F', 'division': 'AFC South',  'qb': 4, 'rb': 5, 'wr': 4, 'ol': 8, 'dl': 5, 'lb': 7, 'db': 7, 'st': 5, 'co': 7 },
  { 'city': 'Jacksonville', 'name': 'Jaguars', 'abbrev': 'JAX', 'lightcolor': 'BF9800', 'darkcolor': '007890', 'division': 'AFC South','qb': 7, 'rb': 7, 'wr': 6, 'ol': 9, 'dl': 5, 'lb': 7, 'db': 5, 'st': 7, 'co': 7 },
  { 'city': 'Tennessee', 'name': 'Titans', 'abbrev': 'TEN', 'lightcolor': '5FA0DF', 'darkcolor': 'CF0020', 'division': 'AFC South',    'qb': 6, 'rb': 6, 'wr': 4, 'ol': 5, 'dl': 7, 'lb': 9, 'db': 5, 'st': 5, 'co': 7 },
  { 'city': 'Denver', 'name': 'Broncos', 'abbrev': 'DEN', 'lightcolor': 'EF904F', 'darkcolor': '10285F', 'division': 'AFC West',       'qb': 4, 'rb': 6, 'wr': 6, 'ol': 6, 'dl': 8, 'lb': 6, 'db': 8, 'st': 4, 'co': 7 },
  { 'city': 'Kansas City', 'name': 'Chiefs', 'abbrev': 'KC', 'lightcolor': 'F0D700', 'darkcolor': 'CF0020', 'division': 'AFC West',    'qb': 9, 'rb': 7, 'wr': 8, 'ol': 9, 'dl': 6, 'lb': 7, 'db': 6, 'st': 6, 'co': 7 },
  { 'city': 'Las Vegas', 'name': 'Raiders', 'abbrev': 'LV', 'lightcolor': 'D0D0D0', 'darkcolor': '000000', 'division': 'AFC West',     'qb': 6, 'rb': 6, 'wr': 6, 'ol': 8, 'dl': 6, 'lb': 6, 'db': 5, 'st': 7, 'co': 7 },
  { 'city': 'Los Angeles', 'name': 'Chargers', 'abbrev': 'LAC', 'lightcolor': 'FFC20E', 'darkcolor': '0080C6', 'division': 'AFC West', 'qb': 7, 'rb': 7, 'wr': 7, 'ol': 7, 'dl': 4, 'lb': 4, 'db': 8, 'st': 8, 'co': 7 },
  { 'city': 'Dallas', 'name': 'Cowboys', 'abbrev': 'DAL', 'lightcolor': 'D0D0D0', 'darkcolor': '10285F', 'division': 'NFC East',       'qb': 6, 'rb': 8, 'wr': 6, 'ol': 5, 'dl': 8, 'lb': 8, 'db': 9, 'st': 7, 'co': 7 },
  { 'city': 'New York', 'name': 'Giants', 'abbrev': 'NYG', 'lightcolor': 'CF0020', 'darkcolor': '00487F', 'division': 'NFC East',      'qb': 6, 'rb': 8, 'wr': 6, 'ol': 6, 'dl': 8, 'lb': 5, 'db': 6, 'st': 7, 'co': 7 },
  { 'city': 'Philadelphia', 'name': 'Eagles', 'abbrev': 'PHI', 'lightcolor': 'D0D0D0', 'darkcolor': '005A39', 'division': 'NFC East',  'qb': 7, 'rb': 9, 'wr': 8, 'ol': 5, 'dl': 9, 'lb': 6, 'db': 9, 'st': 7, 'co': 7 },
  { 'city': 'Washington', 'name': 'Commanders', 'abbrev': 'WAS', 'lightcolor': 'F0D72F', 'darkcolor': '7F002F', 'division': 'NFC East','qb': 5, 'rb': 6, 'wr': 6, 'ol': 5, 'dl': 6, 'lb': 8, 'db': 7, 'st': 8, 'co': 7 },
  { 'city': 'Chicago', 'name': 'Bears', 'abbrev': 'CHI', 'lightcolor': 'EF703F', 'darkcolor': '001F3F', 'division': 'NFC North',       'qb': 6, 'rb': 9, 'wr': 4, 'ol': 4, 'dl': 8, 'lb': 4, 'db': 4, 'st': 6, 'co': 7 },
  { 'city': 'Detroit', 'name': 'Lions', 'abbrev': 'DET', 'lightcolor': 'D0D0D0', 'darkcolor': '0082BE', 'division': 'NFC North',       'qb': 8, 'rb': 7, 'wr': 8, 'ol': 8, 'dl': 6, 'lb': 5, 'db': 6, 'st': 6, 'co': 7 },
  { 'city': 'Green Bay', 'name': 'Packers', 'abbrev': 'GB', 'lightcolor': 'F0D700', 'darkcolor': '42735A', 'division': 'NFC North',    'qb': 7, 'rb': 6, 'wr': 6, 'ol': 7, 'dl': 6, 'lb': 5, 'db': 8, 'st': 6, 'co': 7 },
  { 'city': 'Minnesota', 'name': 'Vikings', 'abbrev': 'MIN', 'lightcolor': 'F0D700', 'darkcolor': '63317B', 'division': 'NFC North',   'qb': 6, 'rb': 6, 'wr': 8, 'ol': 9, 'dl': 7, 'lb': 6, 'db': 5, 'st': 4, 'co': 7 },
  { 'city': 'Atlanta', 'name': 'Falcons', 'abbrev': 'ATL', 'lightcolor': 'CF0020', 'darkcolor': '000000', 'division': 'NFC South',     'qb': 6, 'rb': 8, 'wr': 5, 'ol': 7, 'dl': 7, 'lb': 5, 'db': 4, 'st': 8, 'co': 7 },
  { 'city': 'Carolina', 'name': 'Panthers', 'abbrev': 'CAR', 'lightcolor': 'D0D0D0', 'darkcolor': '009FD0', 'division': 'NFC South',   'qb': 6, 'rb': 7, 'wr': 4, 'ol': 6, 'dl': 9, 'lb': 6, 'db': 5, 'st': 7, 'co': 7 },
  { 'city': 'New Orleans', 'name': 'Saints', 'abbrev': 'NO', 'lightcolor': 'D0C78F', 'darkcolor': '000000', 'division': 'NFC South',   'qb': 6, 'rb': 6, 'wr': 5, 'ol': 5, 'dl': 7, 'lb': 6, 'db': 8, 'st': 7, 'co': 7 },
  { 'city': 'Tampa Bay', 'name': 'Buccaneers', 'abbrev': 'TB', 'lightcolor': '90887F', 'darkcolor': 'BF083F', 'division': 'NFC South', 'qb': 8, 'rb': 4, 'wr': 6, 'ol': 9, 'dl': 7, 'lb': 7, 'db': 7, 'st': 4, 'co': 7 },
  { 'city': 'Arizona', 'name': 'Cardinals', 'abbrev': 'ARI', 'lightcolor': 'F0D700', 'darkcolor': 'A0003F', 'division': 'NFC West',    'qb': 6, 'rb': 6, 'wr': 6, 'ol': 5, 'dl': 4, 'lb': 5, 'db': 6, 'st': 6, 'co': 7 },
  { 'city': 'Los Angeles', 'name': 'Rams', 'abbrev': 'LAR', 'lightcolor': 'FED030', 'darkcolor': '053790', 'division': 'NFC West',     'qb': 6, 'rb': 5, 'wr': 5, 'ol': 5, 'dl': 5, 'lb': 7, 'db': 6, 'st': 6, 'co': 7 },
  { 'city': 'San Francisco', 'name': '49ers', 'abbrev': 'SF', 'lightcolor': 'C0A87F', 'darkcolor': 'A0003F', 'division': 'NFC West',   'qb': 7, 'rb': 8, 'wr': 6, 'ol': 8, 'dl': 7, 'lb': 9, 'db': 8, 'st': 6, 'co': 7 },
  { 'city': 'Seattle', 'name': 'Seahawks', 'abbrev': 'SEA', 'lightcolor': '838EB2', 'darkcolor': '3B527B', 'division': 'NFC West',     'qb': 7, 'rb': 6, 'wr': 7, 'ol': 7, 'dl': 5, 'lb': 5, 'db': 7, 'st': 9, 'co': 7 }
];

// Copied from NFLTeams2023 on Sun May 18, 2025
// end of NFLTeams2024
