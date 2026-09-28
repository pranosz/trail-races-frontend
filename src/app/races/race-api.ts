import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RacePage } from './race-page';
import { RaceSearchCriteria } from './race-search-criteria';

@Injectable({
  providedIn: 'root',
})
export class RaceApi {
  private readonly http = inject(HttpClient);

  getRaces(criteria: RaceSearchCriteria = {}): Observable<RacePage> {
    let params = new HttpParams();

    if (criteria.search?.trim()) {
      params = params.set('search', criteria.search.trim());
    }

    if (criteria.distanceFrom !== undefined) {
      params = params.set('distanceFrom', criteria.distanceFrom);
    }

    if (criteria.distanceTo !== undefined) {
      params = params.set('distanceTo', criteria.distanceTo);
    }

    return this.http.get<RacePage>('/api/races', { params });
  }
}