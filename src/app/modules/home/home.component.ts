import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgForOf } from '@angular/common';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIcon, NgForOf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      title: 'APIs Inteligentes',
      description: 'Integração fácil e rápida com dados públicos brasileiros.',
      icon: 'api'
    },
    {
      title: 'Gestão Completa',
      description: 'Controle usuários, clientes e serviços em um só lugar.',
      icon: 'people'
    },
    {
      title: 'Monitoramento em tempo real',
      description: 'Acompanhe métricas e estatísticas de forma instantânea.',
      icon: 'analytics'
    },
    {
      title: 'Segurança Avançada',
      description: 'Autenticação JWT, tokens e proteção de dados.',
      icon: 'security'
    }
  ];
}
