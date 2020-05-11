import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPointsComponent } from './submit-points.component';

describe('SubmitPointsComponent', () => {
  let component: SubmitPointsComponent;
  let fixture: ComponentFixture<SubmitPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
