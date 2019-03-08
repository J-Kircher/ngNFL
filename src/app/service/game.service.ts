import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GameService {
  gameActive: boolean = false;

  // Observable sources
  private gameActiveSource = new BehaviorSubject<boolean>(false);

  // Observable streams
  gameActive$ = this.gameActiveSource.asObservable();

  constructor() { }

  setGameActive(data: boolean) {
    // console.log('[schedule.service] setGameActive() data: ' + data);
    this.gameActiveSource.next(data);
  }
}
