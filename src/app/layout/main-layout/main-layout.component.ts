import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatIconModule, AsyncPipe],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

    constructor(public authService: AuthService, private router: Router) {}
    
  // Método para abrir/fechar a sidebar em mobile
  toggleSidebar() {
    const sidebarEl = document.querySelector('.sidebar');
    sidebarEl?.classList.toggle('open');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
