import { Injectable } from '@angular/core';
import { ISchedule, ITeam } from '../model/nfl.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StorageService {

  constructor() { }

  public loadScheduleFromLocalStorage(): ISchedule[] {
    // console.log('[storage.service] loadScheduleFromLocalStorage()');
    let config;

    try {
      const configText = localStorage.getItem('fullSchedule');

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

  public storeScheduleToLocalStorage(newFullSchedule: ISchedule[]): void {
    // console.log('[storage.service] storeScheduleToLocalStorage()');
    try {
      const configText = JSON.stringify(newFullSchedule);
      localStorage.setItem('fullSchedule', configText);
    } catch (e) {
      console.warn('[storage.service] storeScheduleToLocalStorage() Error reading from local storage');
    }
  }

  public clearScheduleFromStorage(): Observable<boolean> {
    const subject = new Subject<boolean>();
    localStorage.removeItem('fullSchedule');
    setTimeout(() => {
      subject.next(true);
      subject.complete();
    }, 500);
    return subject;
  }

  public loadTeamsFromLocalStorage(): ITeam[] {
    // console.log('[storage.service] loadTeamsFromLocalStorage()');
    let config;

    try {
      const configText = localStorage.getItem('teams');

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

  public storeTeamsToLocalStorage(newTeams: ITeam[]): void {
    // console.log('[storage.service] storeTeamsToLocalStorage()');
    try {
      const configText = JSON.stringify(newTeams);
      localStorage.setItem('teams', configText);
    } catch (e) {
      console.warn('[storage.service] storeTeamsToLocalStorage() Error reading from local storage');
    }
  }

  public clearTeamsFromStorage(): Observable<boolean> {
    const subject = new Subject<boolean>();
    localStorage.removeItem('teams');
    setTimeout(() => {
      subject.next(true);
      subject.complete();
    }, 500);
    return subject;
  }
}
