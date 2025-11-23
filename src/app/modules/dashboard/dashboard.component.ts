import { Component, ViewChild } from '@angular/core';
import { NgForOf, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  ChartComponent,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexPlotOptions,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels
} from 'ng-apexcharts';

// Tipagem dos gráficos
export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgForOf, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild('donutChart') donutChart!: ChartComponent;
  @ViewChild('lineChart') lineChart!: ChartComponent;

  // Cards de métricas
  metrics = [
    { title: 'Usuários Ativos', value: 1250, icon: 'people' },
    { title: 'APIs Criadas', value: 48, icon: 'api' },
    { title: 'Faturamento (R$)', value: 18750, icon: 'payments' },
    { title: 'Chamados Abertos', value: 7, icon: 'support_agent' }
  ];

  // Donut Chart (uso de APIs)
  public donutChartOptions: DonutChartOptions = {
    series: [44, 55, 41, 17],
    chart: { type: 'donut', background: 'transparent' },
    labels: ['GET', 'POST', 'PUT', 'DELETE'],
    plotOptions: { pie: { donut: { size: '60%' } } },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: 'bottom' }
        }
      }
    ]
  };

  // Line Chart (faturamento)
  public lineChartOptions: LineChartOptions = {
    series: [
      { name: 'Faturamento', data: [1200, 1500, 1800, 1700, 1900, 2200, 2100] }
    ],
    chart: { type: 'line', height: 250, background: 'transparent' },
    xaxis: { categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
    dataLabels: { enabled: false }
  };
}
