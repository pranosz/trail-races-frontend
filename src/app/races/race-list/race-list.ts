import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { Race } from '../race';
import { RaceApi } from '../race-api';
import { RaceCard } from '../race-card/race-card';
import { RaceSearchCriteria } from '../race-search-criteria';

@Component({
  selector: 'app-race-list',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    RaceCard,
  ],
  templateUrl: './race-list.html',
  styleUrl: './race-list.scss',
})
export class RaceList implements OnInit {
  private readonly raceApi = inject(RaceApi);
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly races = signal<Race[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly error = signal(false);

  protected readonly totalElements = signal(0);
  protected readonly currentPage = signal(0);
  protected readonly pageSize = signal(10);
  protected readonly sort = signal('date,asc');

  protected readonly searchForm = this.formBuilder.group({
    search: [''],
    distanceFrom: [null as number | null],
    distanceTo: [null as number | null],
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const search = params['search'] ?? '';
      const distanceFrom = this.parseNumber(params['distanceFrom']);
      const distanceTo = this.parseNumber(params['distanceTo']);
      const page = this.parsePage(params['page']);
      const size = this.parsePageSize(params['size']);
      const sort = this.parseSort(params['sort']);

      this.searchForm.patchValue(
        {
          search,
          distanceFrom,
          distanceTo,
        },
        { emitEvent: false },
      );

      this.loadRaces(
        {
          search: search || undefined,
          distanceFrom,
          distanceTo,
        },
        page,
        size,
        sort,
      );
    });
  }

  protected search(): void {
    const formValue = this.searchForm.getRawValue();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: formValue.search?.trim() || null,
        distanceFrom: formValue.distanceFrom ?? null,
        distanceTo: formValue.distanceTo ?? null,
        page: null,
      },
    });
  }

  protected changePage(event: PageEvent): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.pageIndex,
        size: event.pageSize,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected changeSort(sort: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  private loadRaces(
    criteria: RaceSearchCriteria,
    page: number,
    size: number,
    sort: string,
  ): void {
    this.isLoading.set(true);
    this.error.set(false);
    this.sort.set(sort);

    this.raceApi.getRaces(criteria, page, size, sort).subscribe({
      next: (racePage) => {
        this.races.set(racePage.content);
        this.totalElements.set(racePage.totalElements);
        this.currentPage.set(racePage.number);
        this.pageSize.set(racePage.size);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
      },
    });
  }

  private parseNumber(value: string | null): number | undefined {
    if (value === null) {
      return undefined;
    }

    const parsedValue = Number(value);

    return Number.isFinite(parsedValue)
      ? parsedValue
      : undefined;
  }

  private parsePage(value: string | null): number {
    const page = Number(value);

    return Number.isInteger(page) && page >= 0
      ? page
      : 0;
  }

  private parsePageSize(value: string | null): number {
    const size = Number(value);

    return [5, 10, 20].includes(size)
      ? size
      : 10;
  }

  private parseSort(value: string | null): string {
    if (!value) {
      return 'date,asc';
    }

    const [property, direction] = value.split(',');

    const allowedProperties = ['name', 'date', 'distance', 'price'];
    const allowedDirections = ['asc', 'desc'];

    if (
      allowedProperties.includes(property) &&
      allowedDirections.includes(direction)
    ) {
      return `${property},${direction}`;
    }

    return 'date,asc';
  }
}