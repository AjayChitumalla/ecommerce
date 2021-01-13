import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrregComponent } from './usrreg.component';

describe('UsrregComponent', () => {
  let component: UsrregComponent;
  let fixture: ComponentFixture<UsrregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
