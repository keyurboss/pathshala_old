import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPagesComponent } from './lost-pages.component';

describe('LostPagesComponent', () => {
  let component: LostPagesComponent;
  let fixture: ComponentFixture<LostPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
