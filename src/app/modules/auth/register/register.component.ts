import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.error = 'As senhas não coincidem';
      return;
    }

    this.auth.register(this.name, this.email, this.password).subscribe(res => {
      if (res.success) this.router.navigate(['/']);
    });
  }
}
