import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductComponentComponent } from './edit-product-component.component';

describe('EditProductComponentComponent', () => {
  let component: EditProductComponentComponent;
  let fixture: ComponentFixture<EditProductComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
