import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private appConfig;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('assets/conf.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  getConfig() {
    return this.appConfig;
  }
}
