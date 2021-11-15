import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMealEntryComponent } from './create-meal-entry.component';

describe('CreateMealEntryComponent', () => {
  let component: CreateMealEntryComponent;
  let fixture: ComponentFixture<CreateMealEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMealEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMealEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
