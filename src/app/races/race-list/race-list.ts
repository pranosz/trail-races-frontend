import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Race } from '../race';
import { RaceApi } from '../race-api';

@Component({
  selector: 'app-race-list',
  imports: [MatCardModule],
  templateUrl: './race-list.html',
  styleUrl: './race-list.scss',
})
export class RaceList implements OnInit {
  private readonly raceApi = inject(RaceApi);

  protected readonly races = signal<Race[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly error = signal(false);

  ngOnInit(): void {
    this.loadRaces();
  }

  private loadRaces(): void {
    this.raceApi.getRaces().subscribe({
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