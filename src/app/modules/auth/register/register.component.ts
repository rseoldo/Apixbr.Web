import { Component } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../core/auth/auth.service';
import { User } from '../../../features/clients/models/user.model';
import { MatOption, MatSelectModule } from "@angular/material/select";
import { PlanEnum } from '../../../core/enums/plan.enum';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    RouterLink,
    MatOption
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    plan: null
  }

  confirmPassword = '';
  error = '';

  PlanEnum = PlanEnum; // expõe enum para o template

  planOptions = [
    { value: PlanEnum.Free, label: 'Free' },
    { value: PlanEnum.Dev, label: 'Dev' },
    { value: PlanEnum.Pro, label: 'Pro' },
    { value: PlanEnum.Enterprise, label: 'Enterprise' }
  ];

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    if (this.user.password !== this.confirmPassword) {
      this.error = 'As senhas não coincidem';
      return;
    }

    this.auth.register(this.user.name, this.user.email, this.user.password, this.user.plan!).subscribe(res => {
      if (res.success) this.router.navigate(['/']);
    });
  }
}
