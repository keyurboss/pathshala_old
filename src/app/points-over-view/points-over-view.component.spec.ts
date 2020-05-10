import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsOverViewComponent } from './points-over-view.component';

describe('PointsOverViewComponent', () => {
  let component: PointsOverViewComponent;
  let fixture: ComponentFixture<PointsOverViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsOverViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsOverViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
