import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RacePage } from './race-page';

@Injectable({
  providedIn: 'root',
})
export class RaceApi {
  private readonly http = inject(HttpClient);

  getRaces(): Observable<RacePage> {
    return this.http.get<RacePage>('/api/races');
  }
}