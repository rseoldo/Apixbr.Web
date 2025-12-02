import { Component } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apis-test',
  standalone: true,
  template: `
    <div class="test-console">
      <input placeholder="URL" [(ngModel)]="url" />
      <select [(ngModel)]="method">
        <option>GET</option><option>POST</option>
      </select>
      <textarea [(ngModel)]="body"></textarea>
      <button (click)="invoke()">Testar</button>

      <pre *ngIf="result">{{ result | json }}</pre>
    </div>
  `,
  imports: [CommonModule, JsonPipe, FormsModule]
})
export class ApisTestComponent {
  url = '';
  method = 'GET';
  body = '';
  result: any = null;
  constructor(private apis: ApisService) {}
  invoke() {
    let dto: any = { url: this.url, method: this.method };
    if (this.body) dto.body = JSON.parse(this.body);
    this.apis.testInvoke(dto).subscribe(r => this.result = r, err => this.result = { error: err });
  }
}
