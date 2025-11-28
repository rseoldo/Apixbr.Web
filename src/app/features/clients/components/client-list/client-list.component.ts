import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientsService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { ApiKeyService } from '../../services/apikey.service';
import { CreateApiKeyDto } from '../../models/apikey.model';

@Component({
  standalone: true,
  selector: 'app-client-list',
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})

export class ClientListComponent implements OnInit {
  cols = ['name', 'plan', 'createdAt', 'actions'];
  clients: Client[] = [];
  loading = false;
  expiresAt?: string;
  apiKey?: { id: string; expiresAt?: string };

  constructor(private service: ClientsService, private apiKeyService: ApiKeyService, private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: v => { this.clients = v; this.loading = false; },
      error: () => this.loading = false
    });
  }

  newClient() {
    this.router.navigate(['/app/clients/new']);
  }

  generateKey(client: Client) {
        if (!confirm(`Gerar nova API Key para ${client.name}?`)) return;

    const dto: CreateApiKeyDto = {
      expiresAt: this.expiresAt ? new Date(this.expiresAt).toISOString() : undefined
    };

    this.apiKeyService.generateApiKey(client.id, dto).subscribe({
      next: res => { alert(`API Key (mostrada 1 vez): ${res.apiKey}`); this.load(); },
      error: e => alert('Erro ao gerar key')
    });
  }
}