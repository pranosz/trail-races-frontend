import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-race-list',
  imports: [MatCardModule],
  templateUrl: './race-list.html',
  styleUrl: './race-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaceList {}