import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutantCheckerComponent } from './mutant-checker.component';

describe('MutantCheckerComponent', () => {
  let component: MutantCheckerComponent;
  let fixture: ComponentFixture<MutantCheckerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MutantCheckerComponent]
    });
    fixture = TestBed.createComponent(MutantCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
