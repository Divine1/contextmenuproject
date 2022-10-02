import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonwindowComponent } from './comparisonwindow.component';

describe('ComparisonwindowComponent', () => {
  let component: ComparisonwindowComponent;
  let fixture: ComponentFixture<ComparisonwindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonwindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
