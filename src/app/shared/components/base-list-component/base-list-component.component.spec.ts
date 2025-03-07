import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseListComponentComponent } from './base-list-component.component';

describe('BaseListComponentComponent', () => {
  let component: BaseListComponentComponent;
  let fixture: ComponentFixture<BaseListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
