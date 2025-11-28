import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { ApiKeyService } from '../../services/apikey.service';
import { map, switchMap } from 'rxjs';
import { ApiKeyResponse, CreateApiKeyDto } from '../../models/apikey.model';
import { ApiKeyDialogComponent } from '../../../../components/api-key-dialog/api-key-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';


@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterModule, ClipboardModule],
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})

export class ClientFormComponent implements OnInit {
  editing = false;
  id: string | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ClientsService,
    private apiKeyService: ApiKeyService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      plan: ['Free', Validators.required]
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.editing = !!this.id;

    if (this.editing) {
      this.service.getById(this.id!).subscribe({ next: c => this.form.patchValue(c) });
    }
  }

  save() {
    if (this.form.invalid) return;
    const data = this.form.value as Partial<Client>;

    if (this.editing) {
      this.service.update(this.id!, data).subscribe({
        next: () => this.router.navigate(['/app/clients']),
        error: () => this.showErrorDialog('Erro ao atualizar cliente')
      });
    } else {
      this.service.create(data).pipe(
        switchMap(client => {
          const dto: CreateApiKeyDto = { expiresAt: undefined };
          return this.apiKeyService.generateApiKey(client.id, dto).pipe(
            map((k: ApiKeyResponse) => ({ client, apiKey: k }))
          );
        })
      ).subscribe({
        next: result => this.showApiKeyDialog(result.apiKey.apiKey),
        error: () => this.showErrorDialog('Cliente criado, mas falha ao gerar API Key.')
      });
    }
  }

  private showApiKeyDialog(apiKey: string) {
    const dialogRef = this.dialog.open(ApiKeyDialogComponent, {
      data: { apiKey }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/app/clients']));
  }

  private showErrorDialog(message: string) {
    this.dialog.open(ApiKeyDialogComponent, {
      data: { apiKey: message },
      panelClass: 'apixbr-dialog'
    }).afterClosed().subscribe(() => this.router.navigate(['/app/clients']));
  }


  back() { this.router.navigate(['/app/clients']); }
}
