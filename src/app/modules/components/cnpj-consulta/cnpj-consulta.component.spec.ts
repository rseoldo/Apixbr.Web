import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnpjConsultaComponent } from './cnpj-consulta.component';

describe('CnpjConsultaComponent', () => {
  let component: CnpjConsultaComponent;
  let fixture: ComponentFixture<CnpjConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CnpjConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnpjConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
