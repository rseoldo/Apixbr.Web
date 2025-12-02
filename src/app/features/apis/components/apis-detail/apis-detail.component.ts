import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-apis-detail',
  template: `
    <pre *ngIf="api$ | async">{{ api$ | async | json }}</pre>
  `,
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe]
})
export class ApisDetailComponent implements OnInit {
  api$!: ReturnType<ApisService['getApi']>;

  constructor(private route: ActivatedRoute, private apisService: ApisService) {}

  ngOnInit() {
    this.api$ = this.route.paramMap.pipe(
      switchMap((params: import('@angular/router').ParamMap) => 
        this.apisService.getApi(+params.get('id')!)
      )
    );
  }
}
