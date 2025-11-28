import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,
    ClipboardModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private clipboard = inject(Clipboard);
  private snack = inject(MatSnackBar);

  features = [
    { title: 'APIs Inteligentes', description: 'Integração simples com dados públicos brasileiros.', icon: 'api' },
    { title: 'Gestão Completa', description: 'Controle usuários, clientes e serviços num único painel.', icon: 'people' },
    { title: 'Monitoramento em tempo real', description: 'Métricas, logs e alertas em tempo real.', icon: 'analytics' },
    { title: 'Segurança Avançada', description: 'JWT, rotação de chaves e auditoria.', icon: 'security' }
  ];

  pricing = [
    {
      id: 'free',
      title: 'Free',
      price: 'R$ 0',
      subtitle: 'Para testes',
      bullets: ['500 requests/mês', 'Dashboard básico', 'Suporte comunidade'],
      featured: false
    },
    {
      id: 'dev',
      title: 'Dev',
      price: 'R$ 29 / mês',
      subtitle: 'Recomendado',
      bullets: ['50k requests/mês', 'Logs + Dashboard', 'Chaves rotativas'],
      featured: true
    },
    {
      id: 'pro',
      title: 'Business',
      price: 'R$ 99 / mês',
      subtitle: 'Escala & SLA',
      bullets: ['500k requests/mês', 'SLA 99.9%', 'Suporte prioritário'],
      featured: false
    }
  ];

  why = [
    { title: 'Foco no desenvolvedor', desc: 'SDKs, exemplos e suporte pensado para devs.', icon: 'code' },
    { title: 'Dados confiáveis', desc: 'Integrações com fontes oficiais e atualizações contínuas.', icon: 'verified' },
    { title: 'Escalabilidade', desc: 'Arquitetura preparada para alto throughput.', icon: 'cloud' },
    { title: 'Segurança & Conformidade', desc: 'LGPD + práticas de segurança modernas.', icon: 'security' }
  ];

  codeSnippets = {
    csharp: [
`using ApixBR.Client;
var client = new ApixClient("SUA_API_KEY");
var cnpj = await client.Cnpj.GetAsync("11222333000181");
Console.WriteLine(cnpj.RazaoSocial);`
    ].join('\n'),
    js: [
`import ApixBR from 'apixbr';
const client = new ApixBR(process.env.API_KEY);
const cnpj = await client.cnpj.get('11222333000181');
console.log(cnpj.razao_social);`
    ].join('\n'),
    py: [
`from apixbr import ApixClient
client = ApixClient("SUA_API_KEY")
cnpj = client.cnpj.get("11222333000181")
print(cnpj["razao_social"])`
    ].join('\n')
  };

  copyCode(text: string) {
    const ok = this.clipboard.copy(text);
    this.snack.open(ok ? 'Copiado para a área de transferência' : 'Falha ao copiar', 'OK', { duration: 2200, panelClass: ['apixbr-snackbar'] });
  }
}