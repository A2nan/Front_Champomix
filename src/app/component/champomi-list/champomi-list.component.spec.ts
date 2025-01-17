import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampomiListComponent } from './champomi-list.component';

describe('ChampomiListComponent', () => {
  let component: ChampomiListComponent;
  let fixture: ComponentFixture<ChampomiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampomiListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampomiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
