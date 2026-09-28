import { TestBed } from '@angular/core/testing';
import { RaceList } from './race-list';

describe('RaceList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceList],
    }).compileComponents();
  });

  it('should create the race list', () => {
    const fixture = TestBed.createComponent(RaceList);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the race list placeholder', () => {
    const fixture = TestBed.createComponent(RaceList);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Trail Races');
    expect(compiled.textContent).toContain('Race list will be displayed here.');
  });
});
