import { Injectable } from '@angular/core';
import { ISchedule, ITeam } from '@app/model/nfl.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StorageService {

  constructor() { }

  public loadScheduleFromLocalStorage(): ISchedule[] {
    // console.log('[storage.service] loadScheduleFromLocalStorage()');
    let config;

    try {
      const configText = localStorage.getItem('NFLfullSchedule');

      if (configText) {
        config = JSON.parse(configText);
      // } else {
      //   this.storeScheduleToLocalStorage(config);
      }
      // console.log('[storage.service] loadScheduleFromLocalStorage() SUCCESS');
    } catch (e) {
      console.warn('[storage.service] loadScheduleFromLocalStorage() Error reading from local storage');
    }
    return config;
  }

  public storeScheduleToLocalStorage(newNFLfullSchedule: ISchedule[]): void {
    // console.log('[storage.service] storeScheduleToLocalStorage()');
    try {
      const configText = JSON.stringify(newNFLfullSchedule);
      localStorage.setItem('NFLfullSchedule', configText);
    } catch (e) {
      console.warn('[storage.service] storeScheduleToLocalStorage() Error reading from local storage');
    }
  }

  public clearScheduleFromStorage(): Observable<boolean> {
    const subject = new Subject<boolean>();
    localStorage.removeItem('NFLfullSchedule');
    setTimeout(() => {
      subject.next(true);
      subject.complete();
    }, 50);
    return subject;
  }

  public loadTeamsFromLocalStorage(): ITeam[] {
    // console.log('[storage.service] loadTeamsFromLocalStorage()');
    let config;

    try {
      const configText = localStorage.getItem('NFLteams');

      if (configText) {
        config = JSON.parse(configText);
      // } else {
      //   this.storeTeamsToLocalStorage(config);
      }
      // console.log('[storage.service] loadTeamsFromLocalStorage() SUCCESS');
    } catch (e) {
      console.warn('[storage.service] loadTeamsFromLocalStorage() Error reading from local storage');
    }
    return config;
  }

  public storeTeamsToLocalStorage(newNFLteams: ITeam[]): void {
    // console.log('[storage.service] storeTeamsToLocalStorage()');
    try {
      const configText = JSON.stringify(newNFLteams);
      localStorage.setItem('NFLteams', configText);
    } catch (e) {
      console.warn('[storage.service] storeTeamsToLocalStorage() Error reading from local storage');
    }
  }

  public clearTeamsFromStorage(): Observable<boolean> {
    const subject = new Subject<boolean>();
    localStorage.removeItem('NFLteams');
    setTimeout(() => {
      subject.next(true);
      subject.complete();
    }, 50);
    return subject;
  }

  public loadPlayoffScheduleFromLocalStorage(): ISchedule[] {
    // console.log('[storage.service] loadPlayoffScheduleFromLocalStorage()');
    let config;

    try {
      const configText = localStorage.getItem('NFLplayoffSchedule');

      if (configText) {
        config = JSON.parse(configText);
      }
    } catch (e) {
      console.warn('[storage.service] loadPlayoffScheduleFromLocalStorage() Error reading from local storage');
    }
    return config;
  }

  public storePlayoffScheduleToLocalStorage(newNFLplayoffSchedule: ISchedule[]): void {
    // console.log('[storage.service] storePlayoffScheduleToLocalStorage()');
    try {
      const configText = JSON.stringify(newNFLplayoffSchedule);
      localStorage.setItem('NFLplayoffSchedule', configText);
    } catch (e) {
      console.warn('[storage.service] storePlayoffScheduleToLocalStorage() Error reading from local storage');
    }
  }

  public clearPlayoffScheduleFromStorage(): Observable<boolean> {
    const subject = new Subject<boolean>();
    localStorage.removeItem('NFLplayoffSchedule');
    setTimeout(() => {
      subject.next(true);
      subject.complete();
    }, 50);
    return subject;
  }
}
