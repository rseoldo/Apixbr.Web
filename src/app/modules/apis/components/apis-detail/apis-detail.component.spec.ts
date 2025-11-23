import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApisDetailComponent } from './apis-detail.component';

describe('ApisDetailComponent', () => {
  let component: ApisDetailComponent;
  let fixture: ComponentFixture<ApisDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApisDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
