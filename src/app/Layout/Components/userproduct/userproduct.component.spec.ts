import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserproductComponent } from './userproduct.component';

describe('UserproductComponent', () => {
  let component: UserproductComponent;
  let fixture: ComponentFixture<UserproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
