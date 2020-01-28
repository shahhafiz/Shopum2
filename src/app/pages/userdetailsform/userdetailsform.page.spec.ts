import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailsformPage } from './userdetailsform.page';

describe('UserdetailsformPage', () => {
  let component: UserdetailsformPage;
  let fixture: ComponentFixture<UserdetailsformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdetailsformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdetailsformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
