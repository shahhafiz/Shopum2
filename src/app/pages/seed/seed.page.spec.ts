import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedPage } from './seed.page';

describe('SeedPage', () => {
  let component: SeedPage;
  let fixture: ComponentFixture<SeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
