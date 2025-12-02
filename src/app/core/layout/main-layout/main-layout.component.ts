import { Component, inject, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/auth/auth.service';
import { TopbarComponent } from "../topbar/topbar.component";
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    TopbarComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  sidebarOpen = false;
  apiSubmenuOpen = false;
  auth = inject(AuthService);
  usuario$ = this.auth.usuario$;
  @ViewChild('topbar') topbar!: TopbarComponent;

  constructor(
    public authService: AuthService,
    private renderer: Renderer2
  ) { }

  toggleSidebarClick() {
    this.sidebarOpen = !this.sidebarOpen;
    // Fechar submenu ao fechar sidebar
    if (!this.sidebarOpen) this.apiSubmenuOpen = false;
  }

  closeSidebar() {
    this.sidebarOpen = false;
    this.apiSubmenuOpen = false;
  }

  toggleApiSubmenu() {
    this.apiSubmenuOpen = !this.apiSubmenuOpen;
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
