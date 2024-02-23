import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigModifyComponent } from './pig-modify.component';

describe('PigModifyComponent', () => {
  let component: PigModifyComponent;
  let fixture: ComponentFixture<PigModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PigModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PigModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
