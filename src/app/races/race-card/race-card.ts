import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Race } from '../race';

@Component({
  selector: 'app-race-card',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './race-card.html',
  styleUrl: './race-card.scss',
})
export class RaceCard {
  readonly race = input.required<Race>();

  protected readonly distanceClass = computed(() => {
    const distance = this.race().distance;

    if (distance <= 20) {
      return 'race-card--short';
    }

    if (distance <= 50) {
      return 'race-card--medium';
    }

    if (distance <= 80) {
      return 'race-card--ultra';
    }

    return 'race-card--long-ultra';
  });
}