import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesListComponent } from './moves-list.component';

describe('MovesListComponent', () => {
  let component: MovesListComponent;
  let fixture: ComponentFixture<MovesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
