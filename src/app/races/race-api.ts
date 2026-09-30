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

  getRaces(
    criteria: RaceSearchCriteria = {},
    page = 0,
    size = 10,
    sort = 'date,asc',
  ): Observable<RacePage> {
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

    params = params
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    return this.http.get<RacePage>('/api/races', { params });
  }
}