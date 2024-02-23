import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigAddComponent } from './pig-add.component';

describe('PigAddComponent', () => {
  let component: PigAddComponent;
  let fixture: ComponentFixture<PigAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PigAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PigAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
