import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  NgApexchartsModule,
  ChartComponent,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexAxisChartSeries,
  ApexXAxis
} from 'ng-apexcharts';
import { DashboardService } from './services/dashboard.service';
import { finalize } from 'rxjs/operators';

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any[];
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
};

interface RequestData {
  day: string;
  count: number;
}

interface DashboardData {
  totalRequestsThisMonth: number;
  activeClients: number;
  totalApiKeys: number;
  requestsLast7Days: RequestData[];
  cnpjCount: number;
  cepCount: number;
  nfseCount: number;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    NgApexchartsModule,
    MatCardModule,
    MatIconModule
  ]
})
export class DashboardComponent implements OnInit {

  @ViewChild('donutChart') donutChart!: ChartComponent;
  @ViewChild('lineChart') lineChart!: ChartComponent;

  donutChartOptions!: DonutChartOptions;
  lineChartOptions!: LineChartOptions;

  metrics = [
    { icon: 'cloud', value: 0, title: 'Requisições' },
    { icon: 'verified', value: 0, title: 'Clientes Ativos' },
    { icon: 'key', value: 0, title: 'API Keys' }
  ];

  loading = true;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.initCharts();
    this.loadDashboard();
  }

  private initCharts(): void {
    this.donutChartOptions = {
      series: [0, 0, 0],
      chart: { type: 'donut', height: 300 },
      labels: ['CNPJ', 'CEP', 'NFS-e'],
      plotOptions: { pie: { donut: { size: '60%' } } },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }]
    };

    this.lineChartOptions = {
      series: [{ name: 'Requisições', data: [] }],
      chart: { type: 'line', height: 300 },
      xaxis: { categories: [] }
    };
  }

  private loadDashboard(): void {
    this.loading = true;

    this.dashboardService.getSummary()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data: DashboardData) => {
          // Atualiza métricas
          this.metrics[0].value = data.totalRequestsThisMonth;
          this.metrics[1].value = data.activeClients;
          this.metrics[2].value = data.totalApiKeys;

          // Atualiza gráfico de linha
          this.lineChartOptions.series[0].data = data.requestsLast7Days.map((r: RequestData) => r.count);
          this.lineChartOptions.xaxis.categories = data.requestsLast7Days.map((r: RequestData) => r.day);

          // Atualiza gráfico donut
          this.donutChartOptions.series = [data.cnpjCount, data.cepCount, data.nfseCount];
        },
        error: (err: any) => {
          console.error('Erro ao carregar dashboard', err);
        }
      });
  }
}
