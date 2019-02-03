import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  private appConfig;

  constructor(private http: Http) { }

  loadAppConfig() {
    return this.http.get('assets/conf.json')
      .pipe(map(resp => resp.json()))
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  getConfig() {
    return this.appConfig;
  }
}
