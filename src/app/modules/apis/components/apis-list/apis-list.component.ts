import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe, JsonPipe } from '@angular/common';
import { ApisService } from '../../apis.Service';

@Component({
  selector: 'app-apis-list',
  template: `
    <ul>
      <li *ngFor="let api of apis$ | async">
        {{ api | json }}
      </li>
    </ul>
  `,
  standalone: true,
  imports: [CommonModule, AsyncPipe, JsonPipe]
})
export class ApisListComponent {
  private apisService = inject(ApisService); // injeção imediata
  apis$ = this.apisService.getMyApis();      // ✅ funciona sem erro
}
