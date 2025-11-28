import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service'; // ajuste se seu path for outro

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  private auth = inject(AuthService);
  usuario$ = this.auth.usuario$; // observable com info do usuário

  constructor(private route: Router) {}

  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebarClick() {
    this.sidebarToggle.emit();
  }
  logout() {
    this.auth.logout();
    this.route.navigate(['/']);
  }
}
