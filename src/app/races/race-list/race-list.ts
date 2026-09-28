import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    ReactiveFormsModule,
    RaceCard,
  ],
  templateUrl: './race-list.html',
  styleUrl: './race-list.scss',
})
export class RaceList implements OnInit {
  private readonly raceApi = inject(RaceApi);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly races = signal<Race[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly error = signal(false);

  protected readonly searchForm = this.formBuilder.group({
    search: [''],
    distanceFrom: [null as number | null],
    distanceTo: [null as number | null],
  });

  ngOnInit(): void {
    this.loadRaces();
  }

  protected search(): void {
    const formValue = this.searchForm.getRawValue();

    const criteria: RaceSearchCriteria = {
      search: formValue.search || undefined,
      distanceFrom: formValue.distanceFrom ?? undefined,
      distanceTo: formValue.distanceTo ?? undefined,
    };

    this.loadRaces(criteria);
  }

  private loadRaces(criteria: RaceSearchCriteria = {}): void {
    this.isLoading.set(true);
    this.error.set(false);

    this.raceApi.getRaces(criteria).subscribe({
      next: (page) => {
        this.races.set(page.content);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
      },
    });
  }
}