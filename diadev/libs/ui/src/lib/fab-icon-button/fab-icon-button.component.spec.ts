import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabIconButtonComponent } from './fab-icon-button.component';

describe('FabIconButtonComponent', () => {
  let component: FabIconButtonComponent;
  let fixture: ComponentFixture<FabIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabIconButtonComponent ]
    })
    .compileComponents();
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
