import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { UiMaterialModule } from '../ui.material.module';
import { FabIconButtonComponent } from './fab-icon-button.component';

describe('FabIconButtonComponent', () => {
  let component: FabIconButtonComponent;
  let fixture: ComponentFixture<FabIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FabIconButtonComponent],
      imports: [UiMaterialModule],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
