import { Component } from '@angular/core';
import { CnpjService, CnpjEntity } from '../../features/apis/services/cnpj.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cnpj-consulta',
  templateUrl: './cnpj-consulta.component.html',
  styleUrls: ['./cnpj-consulta.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgxMaskDirective   
  ],
  providers: [
    CnpjService,
    provideNgxMask()
  ]
})
export class CnpjConsultaComponent {
  cnpjControl = new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(18)]);
  loading = false;
  cnpjData: CnpjEntity | null = null;
  error: string | null = null;

  constructor(private cnpjService: CnpjService) { }

  consultar() {
    if (this.cnpjControl.invalid) return;

    this.loading = true;
    this.cnpjData = null;
    this.error = null;

    const rawValue = this.cnpjControl.value;
    if (!rawValue) {
      this.loading = false;
      this.error = 'CNPJ inválido';
      return;
    }

    // Remove caracteres não numéricos e garante string
    const cnpj = rawValue.replace(/\D/g, '');

    this.cnpjService.getCnpj(cnpj).subscribe({
      next: data => {
        this.cnpjData = data;
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || 'Erro ao consultar CNPJ';
        this.loading = false;
      }
    });
  }
}

