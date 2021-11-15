import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMealEntryComponent } from './edit-meal-entry.component';

describe('EditMealEntryComponent', () => {
  let component: EditMealEntryComponent;
  let fixture: ComponentFixture<EditMealEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMealEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMealEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
