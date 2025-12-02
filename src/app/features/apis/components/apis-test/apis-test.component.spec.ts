import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApisTestComponent } from './apis-test.component';

describe('ApisTestComponent', () => {
  let component: ApisTestComponent;
  let fixture: ComponentFixture<ApisTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApisTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApisTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
