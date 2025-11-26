import { Component, HostBinding, Renderer2 } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  sidebarOpen = false;

  constructor(
    public authService: AuthService,
    private renderer: Renderer2
  ) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.lockScroll(this.sidebarOpen);
  }

  closeSidebar() {
    this.sidebarOpen = false;
    this.lockScroll(false);
  }

  logout() {
    this.authService.logout();
  }

  // 🔹 Bloqueia scroll quando menu aberto no mobile
  private lockScroll(lock: boolean) {
    if (lock) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }
}
