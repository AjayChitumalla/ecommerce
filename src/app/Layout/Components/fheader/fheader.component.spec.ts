import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FheaderComponent } from './fheader.component';

describe('FheaderComponent', () => {
  let component: FheaderComponent;
  let fixture: ComponentFixture<FheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
